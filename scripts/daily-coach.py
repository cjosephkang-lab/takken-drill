"""宅建ドリルの日次コーチレポート。

Firestore の progress/{uid} にある実際の解答履歴を読み、
科目別の消化率・正答率・本番50問に投影した予想点を出し、
残日数から「今日どの科目を何問やるか」を計算する。

数字はすべてこのスクリプトの中で計算し、途中式が読める形で出力する
(暗算した数字を答えに書かない・グローバル規約 2026-08-25)。

認証は gcloud のアクセストークンを使う。事前に `gcloud auth login` が必要。
出力は docs/coach/YYYY-MM-DD.md と標準出力の両方。

使い方:
    python3 scripts/daily-coach.py            # 今日ぶん
    python3 scripts/daily-coach.py --stdout   # ファイルに書かず標準出力だけ
"""

import argparse
import json
import re
import subprocess
import sys
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from coach_rules import (  # noqa: E402
    HOUREI_BREAKDOWN,
    REPEATED_MISTAKE_LAPSES,
    next_topic_advice,
    verdict_for,
)

ROOT = Path(__file__).resolve().parents[1]
QUESTIONS_TS = ROOT / "src" / "data" / "questions.ts"
OUT_DIR = ROOT / "docs" / "coach"

PROJECT_ID = "takken-drill"
FIRESTORE_URL = (
    f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}"
    "/databases/(default)/documents/progress?pageSize=100"
)

# 試験日。src/App.tsx の DEFAULT_EXAM_DATE と揃える。
EXAM_DATE = date(2026, 10, 18)
# 直前に模試と総復習のために空けておく日数。
# 直前に模試・総復習へ充てる日数。App.tsx の逆算ペースが14日を確保しており、
# ここが7日だとアプリと日次コーチで必要ペースが食い違う（2026-09-06 codex指摘）。
REVIEW_RESERVE_DAYS = 14
# src/App.tsx の MASTER_STREAK と揃える（この回数連続正解で習得済み）。
MASTER_STREAK = 3

# 科目別の満点と目標得点。src/data/studyGuide.ts の studyOrder が正。
TARGETS = {
    "宅建業法": (20, 18),
    # 権利関係は8点で打ち止め。他4科目で30点取れば合計38点（安全圏）に届く。
    # 10点以上を狙って難問まで掘るのは時間効率が悪い（2026-09-05 codexレビュー）。
    "権利関係": (14, 8),
    "法令上の制限": (8, 6),
    "税・価格評定": (3, 2),
    "免除科目": (5, 4),
}
CATEGORIES = list(TARGETS)

# 模試用に温存する年度。ドリルでは解かず、初見のまま本番形式で使う。
# 解いた問題で模試をやっても実力は測れないため（2026-09-05 codexレビュー）。
# r4（着手0問）は9/6の模試で消費済みなので、以降はドリル対象に戻す。
MOCK_RESERVED_EXAMS = {"r5"}

# この問数以上をこなした日は模試とみなし、平常ペースの計算から除く。
# 通常の学習日で30問を超えることはまずない（実測の最高は13問）。
MOCK_DAY_THRESHOLD = 30

# 合格ライン。src/data/studyGuide.ts の passLine が正。
PASS_MIN, PASS_AVERAGE, PASS_SAFE = 33, 35.5, 38

# 権利関係は範囲が広く1問あたりの所要時間が長い（studyGuide.ts の rationale）。
# 時間配分だけこの倍率で割り増しする。問数の配分には使わない。
TIME_WEIGHT = {"権利関係": 1.3}

# 学習容量が落ちる期間（Googleカレンダーの確定予定から。両端を含む）。
# ratio は通常日を1.0とした時の容量。予定が変わったらここを直す。
# 旅行中は新規を積まず、期限が来た復習だけに充てる。移動中に新しい論点を
# 入れるより既習の再確認の方が定着する（2026-09-05 codexレビュー）。
LOW_CAPACITY_PERIODS = [
    (date(2026, 9, 17), date(2026, 9, 24), 0.0, "奄美旅行（復習のみ）"),
    (date(2026, 10, 9), date(2026, 10, 10), 0.0, "オール不動産三田会"),
]


def capacity_of(day: date) -> tuple[float, str]:
    """その日の学習容量（通常日=1.0）と、下がっている場合の理由。"""
    for start, end, ratio, reason in LOW_CAPACITY_PERIODS:
        if start <= day <= end:
            return ratio, reason
    return 1.0, ""


def capacity_days(start: date, end: date) -> float:
    """start〜end（両端含む）の学習容量を、通常日の何日ぶんかで返す。"""
    total = 0.0
    day = start
    while day <= end:
        total += capacity_of(day)[0]
        day += timedelta(days=1)
    return total


def access_token() -> str:
    """gcloud のアクセストークン。未ログインなら分かる形で落とす。"""
    result = subprocess.run(
        ["gcloud", "auth", "print-access-token"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        sys.exit(
            "gcloud のアクセストークンを取得できませんでした。\n"
            "`gcloud auth login` を実行してから再度ためしてください。\n"
            f"詳細: {result.stderr.strip()}"
        )
    return result.stdout.strip()


def unwrap(value):
    """Firestore REST の型付き値を素の Python 値に落とす。"""
    if "stringValue" in value:
        return value["stringValue"]
    if "integerValue" in value:
        return int(value["integerValue"])
    if "doubleValue" in value:
        return float(value["doubleValue"])
    if "booleanValue" in value:
        return value["booleanValue"]
    if "mapValue" in value:
        return {
            key: unwrap(item)
            for key, item in value["mapValue"].get("fields", {}).items()
        }
    return None


def fetch_progress() -> dict:
    """progress コレクションの最初のドキュメント（本人ぶん）を取る。"""
    request = urllib.request.Request(
        FIRESTORE_URL,
        headers={"Authorization": f"Bearer {access_token()}"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)

    documents = payload.get("documents", [])
    if not documents:
        sys.exit(
            "Firestore の progress コレクションが空でした。"
            "アプリでGoogleログインして同期されているか確認してください。"
        )

    fields = documents[0]["fields"]
    return {
        "uid": documents[0]["name"].rsplit("/", 1)[-1],
        "answers": unwrap(fields.get("answers", {"mapValue": {}})) or {},
        "dailyLog": unwrap(fields.get("dailyLog", {"mapValue": {}})) or {},
        "updatedAt": unwrap(fields.get("updatedAt", {"stringValue": ""})),
    }


def load_question_topics() -> dict:
    """topicTags.ts から 問題ID → 論点ID の対応を読む。"""
    source = (ROOT / "src" / "data" / "topicTags.ts").read_text(encoding="utf-8")
    body = re.search(
        r"export const questionTopics: Record<string, string> = \{(.*?)\n\};",
        source,
        re.S,
    )
    if not body:
        return {}
    return {
        match.group(1): match.group(2)
        for match in re.finditer(r'"([^"]+)":\s*"([^"]+)"', body.group(1))
    }


def load_question_categories() -> dict:
    """questions.ts から 問題ID → 科目 の対応を読む。"""
    source = QUESTIONS_TS.read_text(encoding="utf-8")
    categories = {}
    for match in re.finditer(
        r'"id":\s*"([^"]+)".*?"category":\s*"([^"]+)"', source, re.S
    ):
        categories.setdefault(match.group(1), match.group(2))
    return categories


def stock_by_category(categories: dict) -> dict:
    """科目ごとの、ドリルで扱う問題数。模試用に温存した年度は数えない。"""
    stock = defaultdict(int)
    for question_id, category in categories.items():
        if question_id.split("-")[0] in MOCK_RESERVED_EXAMS:
            continue
        stock[category] += 1
    return dict(stock)


def summarize(answers: dict, categories: dict) -> dict:
    """科目ごとに 着手数・直近正解数・習得数・のべ解答回数 を数える。"""
    stats = {
        category: {"touched": 0, "correct": 0, "mastered": 0, "attempts": 0}
        for category in CATEGORIES
    }
    for question_id, record in answers.items():
        category = categories.get(question_id)
        if category not in stats:
            continue
        entry = stats[category]
        entry["touched"] += 1
        entry["correct"] += 1 if record.get("correct") else 0
        entry["attempts"] += record.get("attempts", 0)
        if record.get("streak", 0) >= MASTER_STREAK:
            entry["mastered"] += 1
    return stats


def format_report(
    progress: dict, categories: dict, today: date
) -> tuple[str, dict]:
    """レポート本文と、アプリのコーチ枠を組むのに要る数値を返す。"""
    stock = stock_by_category(categories)
    stats = summarize(progress["answers"], categories)
    daily_log = progress["dailyLog"]

    days_left = (EXAM_DATE - today).days
    # 新規に使える最終日。これ以降は模試と総復習に充てる。
    new_work_end = EXAM_DATE - timedelta(days=REVIEW_RESERVE_DAYS)
    # 暦日ではなく「通常日に換算した日数」で割る。旅行や外泊で容量が落ちる日は
    # そのぶん少なく数えるため、必要ペースが実態に合う。
    work_days = max(capacity_days(today, new_work_end), 1.0)
    calendar_days = max((new_work_end - today).days + 1, 1)

    lines = []
    add = lines.append

    add(f"# 宅建ドリル 日次コーチ {today.isoformat()}")
    add("")
    add(f"試験日 {EXAM_DATE.isoformat()} まで **残り{days_left}日**")
    add("")
    add(f"新規に使えるのは {today.isoformat()} 〜 {new_work_end.isoformat()} の"
        f"{calendar_days}日。予定で容量が落ちる日があるため、通常日に換算すると"
        f" **{work_days:.1f}日ぶん**"
        f"（直前{REVIEW_RESERVE_DAYS}日は模試・総復習に確保）。")
    upcoming = [
        period
        for period in LOW_CAPACITY_PERIODS
        if period[1] >= today and period[0] <= new_work_end
    ]
    if upcoming:
        add("")
        add("容量が落ちる期間:")
        for start, end, ratio, reason in upcoming:
            add(f"- {start.isoformat()} 〜 {end.isoformat()} {reason}"
                f"（通常日の{ratio * 100:.0f}%）")
    add("")
    add(f"データ取得元: Firestore `progress/{progress['uid']}`"
        f"（最終同期 {progress['updatedAt']}）")
    add("")

    # --- 全体 ---
    touched_total = sum(s["touched"] for s in stats.values())
    stock_total = sum(stock.get(c, 0) for c in CATEGORIES)
    attempts_total = sum(s["attempts"] for s in stats.values())
    mastered_total = sum(s["mastered"] for s in stats.values())

    add("## 全体")
    add("")
    add(f"- 着手 **{touched_total}問 / {stock_total}問**"
        f" = {touched_total / stock_total * 100:.1f}%")
    add(f"- 習得済み（{MASTER_STREAK}連続正解） **{mastered_total}問**"
        f" = 全体の {mastered_total / stock_total * 100:.1f}%")
    if touched_total:
        per_question = attempts_total / touched_total
        add(f"- のべ解答 {attempts_total}回 ÷ 着手{touched_total}問"
            f" = 1問あたり **{per_question:.1f}回**")
    add("")

    # --- 科目別 ---
    add("## 科目別")
    add("")
    add("| 科目 | 着手/在庫 | 消化率 | 正答率 | 習得 | 予想点 | 目標 | 差 |")
    add("|---|---:|---:|---:|---:|---:|---:|---:|")

    predicted_total = 0.0
    target_total = 0
    gaps = {}
    predicted_by_category: dict[str, float] = {}
    for category in CATEGORIES:
        entry = stats[category]
        held = stock.get(category, 0)
        full_marks, target = TARGETS[category]
        accuracy = entry["correct"] / entry["touched"] if entry["touched"] else 0.0
        predicted = full_marks * accuracy
        predicted_by_category[category] = predicted
        predicted_total += predicted
        target_total += target
        gaps[category] = target - predicted

        accuracy_text = f"{accuracy * 100:.1f}%" if entry["touched"] else "—"
        add(
            f"| {category} | {entry['touched']}/{held}"
            f" | {entry['touched'] / held * 100:.1f}%"
            f" | {accuracy_text} | {entry['mastered']}"
            f" | {predicted:.1f} | {target} | {predicted - target:+.1f} |"
        )
    add(
        f"| **合計** | {touched_total}/{stock_total}"
        f" | {touched_total / stock_total * 100:.1f}% | | {mastered_total}"
        f" | **{predicted_total:.1f}** | {target_total}"
        f" | {predicted_total - target_total:+.1f} |"
    )
    add("")
    add("予想点 = 科目の本番配点 × いまの正答率。着手0の科目は0点として扱う"
        "（未着手は本番で取れないため）。")
    add("")
    for label, line in [
        ("合格最低ライン", PASS_MIN),
        ("平均合格点", PASS_AVERAGE),
        ("安全圏", PASS_SAFE),
    ]:
        add(f"- {label} {line} まで **{line - predicted_total:+.1f}点**")
    add("")

    # --- 今日やること ---
    add("## 今日やること")
    add("")

    remaining = {
        category: stock.get(category, 0) - stats[category]["touched"]
        for category in CATEGORIES
    }
    remaining_total = sum(remaining.values())

    base_pace = remaining_total / work_days
    today_ratio, today_reason = capacity_of(today)
    add(f"未着手 **{remaining_total}問** ÷ 実働{work_days:.1f}日ぶん"
        f" = 通常日 **{base_pace:.1f}問/日**（新規のみ）")
    if today_ratio != 1.0:
        add("")
        add(f"ただし今日は{today_reason}で容量{today_ratio * 100:.0f}%。"
            f"今日の新規は **{base_pace * today_ratio:.1f}問** でよい。")
    if touched_total:
        with_review = remaining_total * (attempts_total / touched_total) / work_days
        add(f"実測の1問あたり{attempts_total / touched_total:.1f}回で復習も込むと"
            f" **{with_review:.1f}回/日**")
    add("")

    # 得点ギャップの大きい科目ほど優先する。同点なら未着手が多い方を先に。
    priority = sorted(
        CATEGORIES,
        key=lambda c: (-gaps[c], -remaining[c]),
    )

    add("| 優先 | 科目 | 未着手 | 目標差 | 今日の新規 |")
    add("|---:|---|---:|---:|---:|")
    for rank, category in enumerate(priority, start=1):
        per_day = remaining[category] / work_days * today_ratio
        add(
            f"| {rank} | {category} | {remaining[category]}"
            f" | {-gaps[category]:+.1f} | {per_day:.1f}問 |"
        )
    add("")

    # 時間配分。未着手の残量に、権利関係だけ所要時間の割増をかける。
    weights = {
        category: remaining[category] * TIME_WEIGHT.get(category, 1.0)
        for category in CATEGORIES
    }
    weight_sum = sum(weights.values())
    if weight_sum:
        add("### 時間配分（90分確保できる日）")
        add("")
        add("| 科目 | 時間 | 割合 |")
        add("|---|---:|---:|")
        for category in sorted(weights, key=lambda c: -weights[c]):
            share = weights[category] / weight_sum
            add(f"| {category} | {share * 90:.0f}分 | {share * 100:.1f}% |")
        add("")
        add("権利関係は範囲が広く1問に時間がかかるため、時間配分だけ"
            f"{TIME_WEIGHT['権利関係']}倍で見積もっている（問数の配分には掛けない）。")
        add("")

    # --- 予備校の方針に照らした判定 ---
    verdict, verdict_line = verdict_for(predicted_total, days_left)
    add("## コーチの見立て")
    add("")
    add(f"**{verdict_line}**")
    add("")

    topics_map = load_question_topics()
    topic_touched: dict[str, int] = defaultdict(int)
    for question_id in progress["answers"]:
        topic_id = topics_map.get(question_id)
        if topic_id:
            topic_touched[topic_id] += 1
    topic_stats = {
        topic_id: {"touched": count} for topic_id, count in topic_touched.items()
    }

    pending = next_topic_advice(topic_stats)
    if pending:
        add("### まだ手をつけていない論点（易しい順）")
        add("")
        add("1つの法令を学んだらその分野の過去問を解く、が予備校の標準的な進め方"
            "（伊藤塾「法令上の制限の攻略法」）。まとめてではなく1論点ずつ潰す。")
        add("")
        for label, note in pending:
            add(f"- **{label}** — {note}")
        add("")
        add(f"アプリの論点フィルタで「{pending[0][0]}」を選ぶと、"
            "全年度ぶんがまとまって出る。")
        add("")

    # 何度も間違えている問題。直前期はここだけを繰り返す（伊藤塾）。
    repeated = [
        question_id
        for question_id, record in progress["answers"].items()
        if record.get("lapses", 0) >= REPEATED_MISTAKE_LAPSES
    ]
    if repeated:
        add(f"### 何度も間違えている問題 {len(repeated)}問")
        add("")
        add(f"{REPEATED_MISTAKE_LAPSES}回以上間違えた問題。"
            "直前期はこれだけを繰り返すのが伊藤塾の薦める型。")
        add("")
        by_category: dict[str, int] = defaultdict(int)
        for question_id in repeated:
            category = categories.get(question_id)
            if category:
                by_category[category] += 1
        for category, count in sorted(by_category.items(), key=lambda x: -x[1]):
            add(f"- {category} {count}問")
        add("")

    # --- ペース ---
    add("## ペース")
    add("")
    if daily_log:
        entries = sorted(daily_log.items())
        answered = sum(day.get("answered", 0) for _, day in entries)
        correct = sum(day.get("correct", 0) for _, day in entries)
        first_day = date.fromisoformat(entries[0][0])
        last_day = date.fromisoformat(entries[-1][0])
        span = (last_day - first_day).days + 1

        add(f"- 記録 {len(entries)}日 / のべ {answered}問 / 正解 {correct}問"
            f" = {correct / answered * 100:.1f}%")
        add(f"- 学習日あたり **{answered / len(entries):.1f}問**")
        add(f"- {first_day} 〜 {last_day} の{span}日中{len(entries)}日学習"
            f" = 稼働率 **{len(entries) / span * 100:.1f}%**")
        add("")

        add("### 直近14日")
        add("")
        add("| 日付 | 問数 | 正解 | 正答率 |")
        add("|---|---:|---:|---:|")
        for key, day in entries[-14:]:
            a = day.get("answered", 0)
            c = day.get("correct", 0)
            rate = f"{c / a * 100:.0f}%" if a else "—"
            add(f"| {key} | {a} | {c} | {rate} |")
        add("")

        # 直近7日の実績と必要ペースを比べる。休んだ日は0問として数える。
        recent = {key: day.get("answered", 0) for key, day in entries}
        window = [
            recent.get((today - timedelta(days=offset)).isoformat(), 0)
            for offset in range(7)
        ]
        actual = sum(window) / 7
        needed = remaining_total / work_days

        # 模試の日（50問を一気に解いた日）を除いた平常ペースも出す。
        # 模試込みの平均は実態より高く出て「足りている」と誤判定する
        # （2026-09-06 codex指摘。11.9問/日の実体は模試を除くと4.7問/日だった）。
        normal_days = [value for value in window if value < MOCK_DAY_THRESHOLD]
        normal_pace = sum(normal_days) / 7

        add(f"直近7日の実績 **{actual:.1f}問/日**（休んだ日も0問として平均）"
            f" に対し、必要な新規ペースは **{needed:.1f}問/日**。")
        if len(normal_days) < len(window):
            excluded = len(window) - len(normal_days)
            add("")
            add(f"うち{excluded}日は模試（{MOCK_DAY_THRESHOLD}問以上）。"
                f"模試を除いた平常ペースは **{normal_pace:.1f}問/日**。"
                "模試は1日で50問進むので、含めると実力より速く見える。")

        judge_pace = normal_pace if len(normal_days) < len(window) else actual
        add("")
        if judge_pace >= needed:
            add("→ ペースは足りている。この調子を維持する。")
        else:
            add(f"→ **{needed - judge_pace:.1f}問/日 足りない。**"
                f" このままだと未着手を{remaining_total / max(judge_pace, 0.1):.0f}日かけて"
                f"消化することになり、実働{work_days:.1f}日ぶんに間に合わない。")
    else:
        add("dailyLog が空のため、ペースを判定できません。")

    add("")
    return "\n".join(lines), {
        "predicted": predicted_total,
        "byCategory": predicted_by_category,
        "days_left": days_left,
        "priority": priority,
        "remaining": remaining,
        "base_pace": base_pace,
    }


PREDICTION_LOG = OUT_DIR / "predictions.json"


def record_prediction(today: date, predicted: float, by_category: dict) -> None:
    """その日の予想点を追記で残す。後から模試の実績と突き合わせるため。

    模試の結果は学習履歴に書き戻されるので、模試後に計算した予想点は
    実績を織り込んでいて検証にならない（2026-09-06 codex指摘）。
    毎日の予想を残しておけば、模試前日の値と実績を比べられる。
    """
    log = {}
    if PREDICTION_LOG.exists():
        log = json.loads(PREDICTION_LOG.read_text(encoding="utf-8"))

    # 同じ日に複数回叩いても、その日の最初の値を残す（模試後の上書きを防ぐ）。
    key = today.isoformat()
    if key in log:
        return

    log[key] = {
        "predicted": round(predicted, 1),
        "byCategory": {name: round(value, 1) for name, value in by_category.items()},
    }
    PREDICTION_LOG.parent.mkdir(parents=True, exist_ok=True)
    PREDICTION_LOG.write_text(
        json.dumps(log, ensure_ascii=False, indent=2, sort_keys=True),
        encoding="utf-8",
    )


def push_coaching(uid: str, coaching: dict) -> None:
    """アプリの coaching/{uid} を書き換える。アプリはここを読んで表示する。"""
    url = (
        f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}"
        f"/databases/(default)/documents/coaching/{uid}"
    )

    def wrap(value):
        if isinstance(value, str):
            return {"stringValue": value}
        if isinstance(value, list):
            return {"arrayValue": {"values": [wrap(item) for item in value]}}
        if isinstance(value, dict):
            return {
                "mapValue": {
                    "fields": {key: wrap(item) for key, item in value.items()}
                }
            }
        raise TypeError(f"未対応の型: {type(value)}")

    body = json.dumps(
        {"fields": {key: wrap(value) for key, value in coaching.items()}}
    ).encode()
    request = urllib.request.Request(
        url,
        data=body,
        method="PATCH",
        headers={
            "Authorization": f"Bearer {access_token()}",
            "Content-Type": "application/json",
        },
    )
    urllib.request.urlopen(request, timeout=30).read()


def build_coaching(
    progress: dict,
    categories: dict,
    today: date,
    predicted: float,
    days_left: int,
    priority: list,
    remaining: dict,
    base_pace: float,
) -> dict:
    """アプリの「今日の学習アドバイス」枠に出す内容を組む。

    予備校の無料コラムに書かれた方針を判定条件にしたもので、
    コラム本文は使わない（scripts/coach_rules.py に出典を明記）。
    """
    verdict, verdict_line = verdict_for(predicted, days_left)

    topics_map = load_question_topics()
    topic_touched: dict[str, int] = defaultdict(int)
    for question_id in progress["answers"]:
        topic_id = topics_map.get(question_id)
        if topic_id:
            topic_touched[topic_id] += 1
    pending = next_topic_advice(
        {topic_id: {"touched": n} for topic_id, n in topic_touched.items()}
    )

    repeated = [
        question_id
        for question_id, record in progress["answers"].items()
        if record.get("lapses", 0) >= REPEATED_MISTAKE_LAPSES
    ]

    tasks = []
    if pending:
        label, note = pending[0]
        tasks.append({
            "label": f"{label}を全年度ぶん解く",
            "detail": f"{note}。論点フィルタで選ぶとまとまって出る。"
                      "1つの法令を学んだらその分野の過去問を解くのが定石。",
        })
    weakest = priority[0] if priority else None
    if weakest:
        # 最優先の科目には今日のペースの半分を充てる。
        # 残量の比で割ると1問前後になり、0%の科目がいつまでも開かないため。
        today_count = max(round(base_pace / 2), 2)
        tasks.append({
            "label": f"{weakest}の新規を{today_count}問",
            "detail": f"未着手{remaining[weakest]}問。目標との差が最も大きい科目。",
        })
    if repeated:
        tasks.append({
            "label": f"何度も間違えた{len(repeated)}問を回す",
            "detail": f"{REPEATED_MISTAKE_LAPSES}回以上落とした問題。"
                      "直前期はここだけを繰り返す。",
        })

    if pending:
        headline = f"{pending[0][0]}から開ける"
        advice = (
            f"未着手の論点が{len(pending)}つ残っている。易しくて配点のある論点から"
            "1つずつ潰す。まとめて広く触るより、1論点を全年度ぶん続けて解く方が"
            "「毎年こう聞かれる」というパターンが見える。\n\n"
            "新しい教材は買わない。手元の過去問を繰り返すのが直前期の型。"
        )
    else:
        headline = "弱点を潰す時期"
        advice = (
            "未着手の論点はもうない。ここからは間違えた問題だけを繰り返す。"
            "点数そのものより、なぜ間違えたかを言えるようにする。"
        )

    return {
        "generatedAt": datetime.now().astimezone().isoformat(),
        "examDate": EXAM_DATE.isoformat(),
        "verdict": verdict,
        "verdictLine": verdict_line,
        "headline": headline,
        "advice": advice,
        "todayMustDo": tasks[:3],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="宅建ドリルの日次コーチレポート")
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="ファイルに書かず標準出力だけに出す",
    )
    parser.add_argument(
        "--date",
        help="基準日 (YYYY-MM-DD)。省略時は今日",
    )
    parser.add_argument(
        "--push",
        action="store_true",
        help="アプリの「今日の学習アドバイス」枠を更新する",
    )
    args = parser.parse_args()

    today = date.fromisoformat(args.date) if args.date else date.today()

    progress = fetch_progress()
    categories = load_question_categories()
    report, metrics = format_report(progress, categories, today)

    print(report)

    record_prediction(today, metrics["predicted"], metrics["byCategory"])

    coaching = build_coaching(
        progress,
        categories,
        today,
        metrics["predicted"],
        metrics["days_left"],
        metrics["priority"],
        metrics["remaining"],
        metrics["base_pace"],
    )
    if args.push:
        push_coaching(progress["uid"], coaching)
        print("\n→ アプリの「今日の学習アドバイス」を更新しました。", file=sys.stderr)
    else:
        print("\n--- アプリに出す内容（--push で反映）---", file=sys.stderr)
        print(json.dumps(coaching, ensure_ascii=False, indent=2), file=sys.stderr)

    if not args.stdout:
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        out_path = OUT_DIR / f"{today.isoformat()}.md"
        out_path.write_text(report, encoding="utf-8")
        print(f"\n→ {out_path.relative_to(ROOT)} に保存しました。", file=sys.stderr)


if __name__ == "__main__":
    main()
