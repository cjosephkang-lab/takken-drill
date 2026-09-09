"""宅建ドリルの夜間AIバッチ。誤答の原因推定・混同ペア・メモ照合・根拠採点・法改正候補。

Firestore の progress/{uid}（解答履歴・イベント・メモ・根拠の一言）を読み、
LLM（claude -p、sonnet）に「推定」を出させて insights/{uid} に書く。
アプリはその結果を読むだけで、LLM を端末から呼ばない。

データ契約は docs/superpowers/specs/2026-09-09-ai-learning-features-design.md が正。

原則:
- 問題・正解は公式データのみ。AI が問題データを書き換えることはない。
- 出力はすべて「推定」「照合結果」。解説ページの本文は根拠として渡すだけで、
  Firestore にもレポートにも保存しない（出典URLとタイトルだけ残す）。
- 数字はこのスクリプトの中で計算し、途中式をレポートに残す。

使い方:
    python3 scripts/ai-insights.py                 # LLM を呼び、ファイルに書く（Firestore には書かない）
    python3 scripts/ai-insights.py --push          # Firestore insights/{uid} も更新
    python3 scripts/ai-insights.py --dry-run       # LLM を呼ばず、対象件数とプロンプトだけ表示
    python3 scripts/ai-insights.py --only diagnoses pairs
    python3 scripts/ai-insights.py --only lawchanges   # 250問を対象に法改正候補（25回呼ぶので手動のみ）
    python3 scripts/ai-insights.py --progress-file dump.json --uid xxx   # Firestore を使わない検証用

状態:
    docs/insights/state.json     増分処理の状態（診断済みイベント時刻など）
    docs/insights/insights.json  最後に組んだ insights ドキュメント全体（push する内容）
"""

import argparse
import importlib.util
import itertools
import json
import subprocess
import sys
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))
from letos_fetch import fetch_explanation  # noqa: E402
from note_facts import check_note  # noqa: E402


def _load_daily_coach():
    """daily-coach.py（ファイル名にハイフン）を import する。Firestore の読み書きを再利用するため。"""
    spec = importlib.util.spec_from_file_location("daily_coach", SCRIPTS / "daily-coach.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


dc = _load_daily_coach()
access_token = dc.access_token
to_jst = dc.to_jst
JST = dc.JST
PROJECT_ID = dc.PROJECT_ID
FIRESTORE_URL = dc.FIRESTORE_URL
load_question_topics = dc.load_question_topics
load_question_labels = dc.load_question_labels

ROOT = SCRIPTS.parent
QUESTIONS_TS = ROOT / "src" / "data" / "questions.ts"
TOPIC_TAGS_TS = ROOT / "src" / "data" / "topicTags.ts"
CACHE_DIR = ROOT / "build" / "letos-cache"
LLM_CWD = ROOT / "build" / "ai-insights"

SECTIONS = ("diagnoses", "pairs", "notes", "explanations", "lawchanges")
DEFAULT_SECTIONS = ("diagnoses", "pairs", "notes", "explanations")

# 1回の LLM 呼び出しにまとめる項目数。項目ごとに呼ぶとコストが10倍になる。
BATCH_SIZE = 10
# これより速い回答は「読まずに答えた」候補。アガルートの「1問2分以内」を目安に
# 4択で選択肢を読み切るには最低でもこの程度かかる、という下限。
FAST_ANSWER_MS = 15_000
MAX_PAIRS = 5
PAIR_QUESTIONS_PER_TOPIC = 4
# 解説本文を LLM に渡す上限文字数。レトスの解説は約3,600字なのでほぼ全文が入る。
ARTICLE_MAX_CHARS = 3_500
LLM_MODEL = "sonnet"
LLM_TIMEOUT_SEC = 600

DIAGNOSIS_TYPES = {
    "knowledge": "知識欠落",
    "number": "数字混同",
    "misread": "読み違い",
    "confusion": "論点混同",
    "guess": "まぐれ",
}
CONFIDENCES = ("low", "mid", "high")
NOTE_VERDICTS = ("ok", "conflict", "unclear")
GRADE_VERDICTS = ("match", "reason_off", "number_off", "unclear")

# type ごとの定型助言。予備校の公開コラムに書かれた方針だけを使い、URLを併記する。
# コラム本文は転載しない。
PATTERN_ADVICE = {
    "misread": (
        "設問文の「正しいもの」「誤っているもの」「違反しないもの」に印を付けてから肢を読む。"
        "1問2分以内でも、設問型の確認は飛ばさない。"
        "出典: アガルート「時間配分・解く順番」 https://www.agaroot.jp/takken/column/time-allocation/"
    ),
    "number": (
        "数字は論点ごとに表にして、似た数字（5年・6か月・10年など）を並べて覚える。"
        "メモの数字は照合結果（メモ欄の下）で確認する。"
        "出典: 伊藤塾「勉強スケジュールの組み方」 https://column.itojuku.co.jp/takken/method/benkyou-sukejuuru/"
    ),
    "confusion": (
        "混同した2つの論点を続けて解き、何が違うかを一言で言えるようにする。"
        "「ほかの学習」の比較モードにペアが出る。"
        "出典: 資格の大原「過去問を使う学習が効率的」 https://www.o-hara.jp/course/takken/tak_column_3"
    ),
    "guess": (
        "分からないときは答える前に「自信がない」を押す。まぐれ正解を実力に数えないため。"
        "選んだ理由を一言で言えない問題は、正解でも解き直す。"
        "出典: 資格の大原「過去問を使う学習が効率的」 https://www.o-hara.jp/course/takken/tak_column_3"
    ),
    "knowledge": (
        "その論点の過去問を全年度ぶん続けて解く（論点フィルタ）。"
        "新しい教材は買わず、手元の過去問と解説で埋める。"
        "出典: アガルート「直前対策」 https://www.agaroot.jp/takken/column/chokuzen/"
    ),
}


# ---------------------------------------------------------------------------
# 純粋関数（テスト対象）
# ---------------------------------------------------------------------------


def chunks(items, size):
    """items を size 個ずつに切る。"""
    items = list(items)
    for start in range(0, len(items), size):
        yield items[start : start + size]


def extract_json(text: str) -> dict:
    """LLM の返答から最初の { 〜 最後の } を取り出して JSON にする。"""
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end < start:
        raise ValueError("返答に JSON オブジェクトが含まれていません")
    return json.loads(text[start : end + 1])


def wrap(value):
    """Python 値を Firestore REST の型付き値にする。配列・ネスト・None に対応。"""
    if value is None:
        return {"nullValue": None}
    if isinstance(value, bool):
        return {"booleanValue": value}
    if isinstance(value, int):
        return {"integerValue": str(value)}
    if isinstance(value, float):
        return {"doubleValue": value}
    if isinstance(value, str):
        return {"stringValue": value}
    if isinstance(value, (list, tuple)):
        return {"arrayValue": {"values": [wrap(item) for item in value]}}
    if isinstance(value, dict):
        return {"mapValue": {"fields": {key: wrap(item) for key, item in value.items()}}}
    raise TypeError(f"未対応の型: {type(value)}")


def unwrap_value(value):
    """Firestore の型付き値を素の Python 値に。daily-coach.unwrap を配列対応に拡張したもの。"""
    if "arrayValue" in value:
        return [unwrap_value(item) for item in value["arrayValue"].get("values", [])]
    if "mapValue" in value:
        return {
            key: unwrap_value(item)
            for key, item in value["mapValue"].get("fields", {}).items()
        }
    if "nullValue" in value:
        return None
    return dc.unwrap(value)


def choice_text(question_text: str, choice: int) -> str:
    """問題文に "1 …\\n\\n2 …" の形で埋まっている選択肢から、指定番号の本文を取り出す。"""
    for block in question_text.split("\n\n"):
        block = block.strip()
        if block[:1].isdigit() and block[1:2] in (" ", "　", ".", "．") and int(block[0]) == choice:
            return block[2:].strip()
    return ""


def hint_for(event: dict, question: dict) -> list[str]:
    """単発の誤答で断定しないための候補ヒント。最終判断は LLM に委ねる。"""
    hints = []
    ms = event.get("ms")
    if isinstance(ms, (int, float)) and ms < FAST_ANSWER_MS:
        hints.append(f"回答が15秒未満（{ms / 1000:.0f}秒）。guess か misread の候補")
    selected = choice_text(question.get("questionText", ""), event.get("c", 0))
    if any(ch.isdigit() for ch in selected):
        hints.append("選んだ肢に数字が含まれる。number の候補")
    return hints


def collect_wrong_events(progress: dict) -> dict:
    """問題ID → 最新の誤答イベント。events が無い問題は answers の correct=false から補う。"""
    latest: dict[str, dict] = {}
    for event in progress.get("events") or []:
        if event.get("ok") is not False or not event.get("q"):
            continue
        current = latest.get(event["q"])
        if current is None or event.get("at", "") > current.get("at", ""):
            latest[event["q"]] = dict(event)
    seen_in_events = {e.get("q") for e in progress.get("events") or []}
    for question_id, record in (progress.get("answers") or {}).items():
        if question_id in seen_in_events or record.get("correct") is not False:
            continue
        latest[question_id] = {
            "q": question_id,
            "c": record.get("selected"),
            "ok": False,
            "u": bool(record.get("unsure")),
            "ms": None,
            "at": record.get("answeredAt", ""),
            "src": "drill",
        }
    return latest


def pending_keys(latest: dict, done: dict) -> list:
    """stamp が記録済みより新しいキーだけ返す（増分判定）。"""
    return [key for key, stamp in latest.items() if stamp > done.get(key, "")]


def _note_entry(value) -> dict:
    if isinstance(value, dict):
        return {"text": value.get("text", "") or "", "updatedAt": value.get("updatedAt", "") or ""}
    return {"text": str(value or ""), "updatedAt": ""}


def pending_notes(notes: dict, state: dict, state_key: str = "notesReviewedAt") -> dict:
    """未照合（updatedAt が照合済みより新しい）のメモ。空文字のメモは対象外。"""
    entries = {qid: _note_entry(value) for qid, value in (notes or {}).items()}
    entries = {qid: e for qid, e in entries.items() if e["text"].strip()}
    latest = {qid: e["updatedAt"] or "1970-01-01T00:00:00Z" for qid, e in entries.items()}
    keys = pending_keys(latest, state.get(state_key, {}))
    return {qid: entries[qid] for qid in keys}


COMMON_RULES = (
    "出力はJSONだけ。前置き・説明・マークダウンの囲みは書かない。\n"
    "解説ページの本文を転載しない。引用するときは20文字以内。\n"
    "判断できないときは unclear（診断では confidence を low）にし、推測で断定しない。\n"
)


def build_diagnosis_prompt(items: list[dict], topics: dict) -> str:
    """誤答の原因推定プロンプト。最大 BATCH_SIZE 件をまとめる。"""
    lines = [
        "あなたは宅建試験の学習コーチ。学習者の誤答について「なぜその肢を選んだと考えられるか」を推定する。",
        COMMON_RULES,
        "type は次のいずれか:",
        "- knowledge: 知識欠落（その論点をまだ知らない・覚えていない）",
        "- number: 数字混同（期間・金額・面積などの数字を取り違えた）",
        "- misread: 読み違い（「誤っているもの」「違反しないもの」等の設問型や否定語を見落とした）",
        "- confusion: 論点混同（別の論点の知識を当てはめた）。このときだけ confusedWithTopic に下の論点IDを入れる",
        "- guess: まぐれ・当てずっぽう（根拠なく選んだ）",
        "reason は日本語1〜2文。法律の解説は書かず、選んだ肢と正解の肢の違いから推定理由だけを書く。",
        "confidence は low / mid / high。単発の誤答で断定しない。ヒントは候補であって結論ではない。",
        "",
        "論点ID一覧（confusedWithTopic に使う）:",
    ]
    for topic in topics.values():
        lines.append(f"- {topic['id']}: {topic['label']}（{topic['category']}）")
    lines.append("")
    lines.append("## 誤答")
    for index, item in enumerate(items, start=1):
        question = item["question"]
        event = item["event"]
        ms = event.get("ms")
        seconds = f"{ms / 1000:.0f}秒" if isinstance(ms, (int, float)) else "不明"
        correct = "・".join(str(c) for c in question.get("correctChoices", []))
        lines += [
            "",
            f"### {index}. questionId: {item['questionId']}",
            f"論点: {item.get('topicId', '不明')}",
            "問題文（選択肢込み）:",
            question.get("questionText", "").strip(),
            "",
            f"選んだ肢: {event.get('c')}　正解の肢: {correct}",
            f"回答時間: {seconds} / 自信なし印: {'あり' if event.get('u') else 'なし'}",
            f"この問題の過去の誤答回数: {item.get('lapses', 0)}",
            f"学習メモ: {item.get('note') or 'なし'}",
        ]
        hints = hint_for(event, question)
        if hints:
            lines.append("ヒント: " + " / ".join(hints))
    lines += [
        "",
        "## 出力形式",
        '{"results": [{"questionId": "...", "type": "knowledge|number|misread|confusion|guess", '
        '"reason": "...", "confidence": "low|mid|high", "confusedWithTopic": "論点ID（confusion のときだけ）"}]}',
    ]
    return "\n".join(lines)


def parse_diagnosis_results(data: dict, expected_ids: set, topics: dict) -> dict:
    """LLM の返答を検証して 問題ID → 診断 に。型・論点IDが不正なものは落とす。"""
    parsed = {}
    for row in data.get("results", []) or []:
        if not isinstance(row, dict):
            continue
        question_id = row.get("questionId")
        diag_type = row.get("type")
        if question_id not in expected_ids or diag_type not in DIAGNOSIS_TYPES:
            continue
        confidence = row.get("confidence") if row.get("confidence") in CONFIDENCES else "low"
        entry = {
            "type": diag_type,
            "label": DIAGNOSIS_TYPES[diag_type],
            "reason": str(row.get("reason", "")).strip(),
            "confidence": confidence,
        }
        confused = row.get("confusedWithTopic")
        if diag_type == "confusion" and confused in topics:
            entry["confusedWithTopic"] = confused
        parsed[question_id] = entry
    return parsed


def build_patterns(diagnoses: dict) -> list[dict]:
    """type 別の件数と定型助言。件数の多い順。0件の type は出さない。"""
    counts: dict[str, int] = defaultdict(int)
    for diagnosis in diagnoses.values():
        if diagnosis.get("type") in DIAGNOSIS_TYPES:
            counts[diagnosis["type"]] += 1
    patterns = [
        {
            "type": diag_type,
            "label": DIAGNOSIS_TYPES[diag_type],
            "count": count,
            "advice": PATTERN_ADVICE[diag_type],
        }
        for diag_type, count in counts.items()
    ]
    return sorted(patterns, key=lambda p: (-p["count"], p["type"]))


def _interleave(first: list, second: list) -> list:
    out = []
    for a, b in itertools.zip_longest(first, second):
        if a is not None:
            out.append(a)
        if b is not None:
            out.append(b)
    return out


def build_confusion_pairs(
    diagnoses: dict,
    answers: dict,
    question_topics: dict,
    topics: dict,
    existing_created: dict,
    now_iso: str,
) -> list[dict]:
    """混同ペアの候補を上位 MAX_PAIRS まで。

    候補の出どころ:
    (a) 診断で confusion（confusedWithTopic あり）と出た問題の論点と相手の論点
    (b) 同じ科目で、どちらにも lapses>=1 の問題がある論点の組
    score = (a) の指摘回数 × 10 + (b) の min(論点Aの累計lapses, 論点Bの累計lapses)
    """
    questions_by_topic: dict[str, list[str]] = defaultdict(list)
    for question_id, topic_id in question_topics.items():
        questions_by_topic[topic_id].append(question_id)

    lapsed: dict[str, list[tuple[str, int]]] = defaultdict(list)
    for question_id, record in answers.items():
        lapses = int(record.get("lapses", 0) or 0)
        topic_id = question_topics.get(question_id)
        if lapses >= 1 and topic_id in topics:
            lapsed[topic_id].append((question_id, lapses))

    scores: dict[tuple[str, str], float] = defaultdict(float)
    diag_hits: dict[tuple[str, str], int] = defaultdict(int)

    for question_id, diagnosis in diagnoses.items():
        other = diagnosis.get("confusedWithTopic")
        mine = question_topics.get(question_id)
        if diagnosis.get("type") != "confusion" or other not in topics or mine not in topics or other == mine:
            continue
        key = tuple(sorted((mine, other)))
        scores[key] += 10
        diag_hits[key] += 1

    by_category: dict[str, list[str]] = defaultdict(list)
    for topic_id in lapsed:
        by_category[topics[topic_id]["category"]].append(topic_id)
    for topic_ids in by_category.values():
        for a, b in itertools.combinations(sorted(topic_ids), 2):
            total_a = sum(l for _, l in lapsed[a])
            total_b = sum(l for _, l in lapsed[b])
            scores[(a, b)] += min(total_a, total_b)

    def total_lapses(topic_id: str) -> int:
        return sum(l for _, l in lapsed.get(topic_id, []))

    # 同点なら両論点の累計 lapses が多い組を先に。それも同じなら id 順で安定させる。
    ranked = sorted(
        scores.items(),
        key=lambda kv: (-kv[1], -(total_lapses(kv[0][0]) + total_lapses(kv[0][1])), kv[0]),
    )
    pairs = []
    for (a, b), _score in ranked:
        if len(pairs) >= MAX_PAIRS:
            break

        def pick(topic_id: str) -> list[str]:
            ordered = sorted(lapsed.get(topic_id, []), key=lambda x: (-x[1], x[0]))
            chosen = [qid for qid, _ in ordered]
            if not chosen:
                chosen = sorted(questions_by_topic.get(topic_id, []))
            return chosen[:PAIR_QUESTIONS_PER_TOPIC]

        qa, qb = pick(a), pick(b)
        if not qa or not qb:
            continue
        pair_id = f"{a}__{b}"
        label_a, label_b = topics[a]["label"], topics[b]["label"]
        if diag_hits.get((a, b)):
            reason = f"誤答の診断で「{label_a}」と「{label_b}」の混同が{diag_hits[(a, b)]}回指摘された。"
        else:
            reason = (
                f"同じ科目「{topics[a]['category']}」で、どちらの論点にも間違えた問題がある"
                f"（{label_a} {len(lapsed[a])}問・{label_b} {len(lapsed[b])}問）。"
            )
        pairs.append({
            "id": pair_id,
            "topicA": a,
            "topicB": b,
            "labelA": label_a,
            "labelB": label_b,
            "questionIds": _interleave(qa, qb),
            "reason": reason,
            "createdAt": existing_created.get(pair_id, now_iso),
        })
    return pairs


def _jst_date(iso_text: str) -> date | None:
    if not iso_text:
        return None
    try:
        return datetime.fromisoformat(iso_text.replace("Z", "+00:00")).astimezone(JST).date()
    except ValueError:
        return None


def count_retest(pair: dict, events: list) -> dict:
    """ペア作成の翌日以降、比較モード以外でペアの問題に答えた回数と正解数。"""
    created = _jst_date(pair.get("createdAt", ""))
    threshold = created + timedelta(days=1) if created else None
    targets = set(pair.get("questionIds", []))
    answered = correct = 0
    for event in events or []:
        if event.get("src") == "pair" or event.get("q") not in targets:
            continue
        day = _jst_date(event.get("at", ""))
        if threshold is None or day is None or day < threshold:
            continue
        answered += 1
        correct += 1 if event.get("ok") else 0
    return {"answered": answered, "correct": correct}


def _article_block(item: dict) -> list[str]:
    article = item.get("article") or {}
    text = (article.get("text") or "").strip()[:ARTICLE_MAX_CHARS]
    return [
        f"解説ページ: {article.get('title') or '（タイトル不明）'}",
        "解説本文（根拠。転載しない）:",
        text or "（取得できず）",
    ]


def build_note_prompt(items: list[dict]) -> str:
    lines = [
        "学習者が宅建の過去問に書いた学習メモが、その問題の解説ページと食い違っていないかを判定する。",
        COMMON_RULES,
        "verdict は ok（解説と矛盾しない）/ conflict（数字・結論が解説と食い違う）/ unclear（解説の範囲では判断できない）。",
        "message は日本語1〜2文。conflict のときは食い違う点と、解説に書いてある範囲で正しい数字や結論を短く。",
        "ok のときは「解説と一致」程度で短く。メモが別の論点の話をしている場合は unclear。",
        "",
        "## メモ",
    ]
    for index, item in enumerate(items, start=1):
        question = item["question"]
        lines += [
            "",
            f"### {index}. questionId: {item['questionId']}（{question.get('year')} 問{question.get('number')}）",
            "問題文（選択肢込み）:",
            question.get("questionText", "").strip(),
            f"公式の正解: {'・'.join(str(c) for c in question.get('correctChoices', []))}",
            "学習メモ:",
            item.get("text", "").strip(),
            *_article_block(item),
        ]
    lines += [
        "",
        "## 出力形式",
        '{"results": [{"questionId": "...", "verdict": "ok|conflict|unclear", "message": "..."}]}',
    ]
    return "\n".join(lines)


def build_explanation_prompt(items: list[dict]) -> str:
    lines = [
        "学習者が宅建の過去問を解いた後に書いた「根拠の一言」（なぜその肢が正解／誤りか）を、解説ページを根拠に採点する。",
        COMMON_RULES,
        "verdict は match（根拠が解説と合っている）/ reason_off（結論は合っているが理由がずれている、または理由になっていない）"
        "/ number_off（数字が違う）/ unclear（解説の範囲では判断できない）。",
        "message は日本語1〜2文。ずれている点を短く。正しい数字や結論は解説に書いてある範囲で。",
        "",
        "## 根拠の一言",
    ]
    for index, item in enumerate(items, start=1):
        question = item["question"]
        lines += [
            "",
            f"### {index}. questionId: {item['questionId']}（{question.get('year')} 問{question.get('number')}）",
            "問題文（選択肢込み）:",
            question.get("questionText", "").strip(),
            f"公式の正解: {'・'.join(str(c) for c in question.get('correctChoices', []))}",
            "学習者の根拠の一言:",
            item.get("text", "").strip(),
            *_article_block(item),
        ]
    lines += [
        "",
        "## 出力形式",
        '{"results": [{"questionId": "...", "verdict": "match|reason_off|number_off|unclear", "message": "..."}]}',
    ]
    return "\n".join(lines)


def build_lawchange_prompt(items: list[dict]) -> str:
    lines = [
        "宅建の過去問について、出題年度より後の法改正で、現行法では正誤や記述が変わる可能性がある問題を候補として挙げる。",
        COMMON_RULES,
        "手がかり: 解説ページに「法改正により」「現在は」「令和◯年◯月施行」などの注記が入っていることが多い。それを主に見る。",
        "解説に注記がなく、あなたの知識だけで改正を疑う場合は confidence を low にする。",
        "候補は人が一次情報（e-Gov・省庁・試験機関）で確認するので、確定はしない。該当しない問題は挙げない。",
        "effectiveDateGuess は YYYY-MM-DD か「不明」。suggestedSourceUrl は一次情報のURL。分からなければ空文字（作らない）。",
        "",
        "## 問題",
    ]
    for index, item in enumerate(items, start=1):
        question = item["question"]
        lines += [
            "",
            f"### {index}. questionId: {item['questionId']}（{question.get('year')} 問{question.get('number')}・{question.get('category')}）",
            "問題文（選択肢込み）:",
            question.get("questionText", "").strip(),
            f"公式の正解: {'・'.join(str(c) for c in question.get('correctChoices', []))}",
            *_article_block(item),
        ]
    lines += [
        "",
        "## 出力形式（該当なしなら candidates を空配列に）",
        '{"candidates": [{"questionId": "...", "reason": "日本語1〜2文", "confidence": "low|mid|high", '
        '"effectiveDateGuess": "YYYY-MM-DD|不明", "suggestedSourceUrl": ""}]}',
    ]
    return "\n".join(lines)


def parse_verdicts(data: dict, expected_ids: set, allowed: tuple) -> dict:
    """{"results":[{questionId, verdict, message}]} を検証して 問題ID → {verdict, message}。"""
    parsed = {}
    for row in data.get("results", []) or []:
        if not isinstance(row, dict):
            continue
        question_id = row.get("questionId")
        if question_id not in expected_ids or row.get("verdict") not in allowed:
            continue
        parsed[question_id] = {
            "verdict": row["verdict"],
            "message": str(row.get("message", "")).strip(),
        }
    return parsed


def merge_note_facts(verdict: str, message: str, findings: list[dict]) -> tuple[str, str]:
    """note_facts の数字照合を LLM 判定に合流させる。

    LLM が ok でも数字照合が warn なら unclear に下げる（人が見る）。
    数字照合は「注意」であって断定ではないので conflict までは上げない。
    """
    if not findings:
        return verdict, message
    notes = "；".join(f"{f['topic']}: {f['message']}" for f in findings)
    merged = f"{message} 数字照合: {notes}".strip()
    if verdict == "ok" and any(f.get("level") == "warn" for f in findings):
        return "unclear", merged
    return verdict, merged


def merge_law_candidates(existing: list, new: list, labels: dict, today_text: str) -> list:
    """候補一覧を組み直す。人が status を変えた行（confirmed/rejected）はそのまま残す。

    今回挙がらなかった旧 candidate は落とす（毎回全問を見るので、残す理由がない）。
    """
    kept = {c["questionId"]: c for c in existing if c.get("status") in ("confirmed", "rejected")}
    merged = list(kept.values())
    for row in new:
        question_id = row.get("questionId")
        if not question_id or question_id in kept:
            continue
        label = labels.get(question_id, {})
        merged.append({
            "questionId": question_id,
            "year": label.get("year", ""),
            "number": label.get("number", 0),
            "reason": str(row.get("reason", "")).strip(),
            "confidence": row.get("confidence") if row.get("confidence") in CONFIDENCES else "low",
            "effectiveDateGuess": str(row.get("effectiveDateGuess", "不明") or "不明"),
            "suggestedSourceUrl": str(row.get("suggestedSourceUrl", "") or ""),
            "status": "candidate",
            "detectedAt": today_text,
        })
    return sorted(merged, key=lambda c: (c.get("year", ""), c.get("number", 0)))


# ---------------------------------------------------------------------------
# データ読み込み
# ---------------------------------------------------------------------------


def load_questions() -> dict:
    """questions.ts の配列（JSON 互換）を 問題ID → 問題 に。"""
    source = QUESTIONS_TS.read_text(encoding="utf-8")
    marker = "export const takkenQuestions: TakkenQuestion[] = "
    start = source.index(marker) + len(marker)
    end = source.index("\n];", start) + 2
    return {q["id"]: q for q in json.loads(source[start:end])}


def load_topics() -> dict:
    """topicTags.ts の topics 配列を 論点ID → {id, label, category} に。"""
    import re

    source = TOPIC_TAGS_TS.read_text(encoding="utf-8")
    body = re.search(r"export const topics: Topic\[\] = \[(.*?)\n\];", source, re.S)
    topics = {}
    for match in re.finditer(
        r'\{\s*id:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*category:\s*"([^"]+)"\s*\}',
        body.group(1) if body else "",
    ):
        topics[match.group(1)] = {"id": match.group(1), "label": match.group(2), "category": match.group(3)}
    return topics


def fetch_progress_full() -> dict:
    """progress/{uid} を events・explanations 込みで読む。無いフィールドは空。"""
    request = urllib.request.Request(
        FIRESTORE_URL, headers={"Authorization": f"Bearer {access_token()}"}
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)
    documents = payload.get("documents", [])
    if not documents:
        sys.exit("Firestore の progress コレクションが空でした。")
    fields = documents[0]["fields"]

    def field(name, default):
        return unwrap_value(fields[name]) if name in fields else default

    return {
        "uid": documents[0]["name"].rsplit("/", 1)[-1],
        "answers": field("answers", {}) or {},
        "notes": field("notes", {}) or {},
        "events": field("events", []) or [],
        "explanations": field("explanations", {}) or {},
        "updatedAt": field("updatedAt", ""),
    }


def load_progress_file(path: Path, uid: str | None) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    return {
        "uid": uid or data.get("uid") or "local",
        "answers": data.get("answers", {}),
        "notes": data.get("notes", {}),
        "events": data.get("events", []),
        "explanations": data.get("explanations", {}),
        "updatedAt": data.get("updatedAt", ""),
    }


def load_json(path: Path, default):
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return default


def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")


# ---------------------------------------------------------------------------
# LLM
# ---------------------------------------------------------------------------


class Runner:
    """LLM 呼び出しと失敗の記録。dry_run のときは呼ばずにプロンプトを表示する。"""

    def __init__(self, dry_run: bool):
        self.dry_run = dry_run
        self.calls = 0
        self.failures: list[str] = []

    def call(self, prompt: str, label: str) -> dict | None:
        if self.dry_run:
            print(f"\n----- [dry-run] {label}: プロンプト {len(prompt)}文字 -----", file=sys.stderr)
            print(prompt[:1200] + ("\n…（省略）" if len(prompt) > 1200 else ""), file=sys.stderr)
            return None
        LLM_CWD.mkdir(parents=True, exist_ok=True)
        for attempt in (1, 2):
            self.calls += 1
            try:
                proc = subprocess.run(
                    ["claude", "-p", "--model", LLM_MODEL, "--output-format", "json",
                     "--no-session-persistence"],
                    input=prompt,
                    cwd=LLM_CWD,
                    capture_output=True,
                    text=True,
                    timeout=LLM_TIMEOUT_SEC,
                )
                payload = json.loads(proc.stdout)
                if payload.get("is_error"):
                    raise ValueError(str(payload.get("result", ""))[:200])
                return extract_json(payload.get("result", ""))
            except (subprocess.TimeoutExpired, ValueError, json.JSONDecodeError) as error:
                print(f"[{label}] 試行{attempt}失敗: {error}", file=sys.stderr)
        self.failures.append(label)
        return None


def get_article(question: dict, allow_network: bool) -> dict | None:
    result = fetch_explanation(
        question["id"], question.get("externalExplanationUrl", ""), CACHE_DIR,
        allow_network=allow_network,
    )
    if result is None:
        return None
    title, text = result
    return {"title": title, "text": text, "url": question.get("externalExplanationUrl", "")}


# ---------------------------------------------------------------------------
# 各セクション
# ---------------------------------------------------------------------------


def run_diagnoses(progress, questions, topics, question_topics, state, insights, runner) -> dict:
    wrong = collect_wrong_events(progress)
    latest = {qid: e.get("at", "") for qid, e in wrong.items() if qid in questions}
    pending = pending_keys(latest, state.setdefault("diagnosedEventAt", {}))
    pending.sort()
    summary = {"candidates": len(latest), "pending": len(pending), "done": 0, "skipped": 0}
    notes = progress.get("notes") or {}

    items = []
    for qid in pending:
        items.append({
            "questionId": qid,
            "question": questions[qid],
            "event": wrong[qid],
            "note": _note_entry(notes.get(qid, "")).get("text", ""),
            "lapses": int((progress.get("answers") or {}).get(qid, {}).get("lapses", 0) or 0),
            "topicId": question_topics.get(qid, "不明"),
        })

    diagnoses = insights.setdefault("diagnoses", {})
    for batch in chunks(items, BATCH_SIZE):
        ids = {item["questionId"] for item in batch}
        data = runner.call(build_diagnosis_prompt(batch, topics), f"diagnoses {sorted(ids)[0]}〜")
        if data is None:
            summary["skipped"] += len(batch)
            continue
        parsed = parse_diagnosis_results(data, ids, topics)
        for item in batch:
            qid = item["questionId"]
            if qid not in parsed:
                summary["skipped"] += 1
                print(f"[diagnoses] {qid}: 返答に無い/不正なので skip", file=sys.stderr)
                continue
            diagnoses[qid] = {**parsed[qid], "eventAt": item["event"].get("at", "")}
            state["diagnosedEventAt"][qid] = item["event"].get("at", "")
            summary["done"] += 1
    insights["patterns"] = build_patterns(diagnoses)
    return summary


def run_pairs(progress, topics, question_topics, state, insights, now_iso) -> dict:
    existing = state.setdefault("pairs", {})
    pairs = build_confusion_pairs(
        insights.get("diagnoses", {}), progress.get("answers") or {},
        question_topics, topics, existing, now_iso,
    )
    for pair in pairs:
        pair["retest"] = count_retest(pair, progress.get("events") or [])
        existing[pair["id"]] = pair["createdAt"]
    insights["confusionPairs"] = pairs
    return {"pairs": len(pairs)}


def run_reviews(kind, progress, questions, state, insights, runner, allow_network, checked_at) -> tuple[dict, list]:
    """notes / explanations 共通。kind で入力・プロンプト・判定語彙を切り替える。"""
    if kind == "notes":
        source, state_key, out_key = progress.get("notes") or {}, "notesReviewedAt", "noteReviews"
        build, allowed, stamp_key = build_note_prompt, NOTE_VERDICTS, "noteUpdatedAt"
    else:
        source, state_key, out_key = progress.get("explanations") or {}, "explanationsGradedAt", "explanationGrades"
        build, allowed, stamp_key = build_explanation_prompt, GRADE_VERDICTS, "explanationUpdatedAt"

    pending = pending_notes(source, state, state_key)
    summary = {"pending": len(pending), "done": 0, "skipped": 0, "verdicts": defaultdict(int)}
    state.setdefault(state_key, {})
    results = insights.setdefault(out_key, {})
    rows = []  # レポート用（メモ本文・判定・出典）

    items = []
    for qid in sorted(pending):
        if qid not in questions:
            continue
        article = get_article(questions[qid], allow_network)
        if article is None:
            summary["skipped"] += 1
            print(f"[{kind}] {qid}: 解説ページを取得できないので skip", file=sys.stderr)
            continue
        items.append({"questionId": qid, "question": questions[qid], "text": pending[qid]["text"],
                      "updatedAt": pending[qid]["updatedAt"], "article": article})

    for batch in chunks(items, BATCH_SIZE):
        ids = {item["questionId"] for item in batch}
        data = runner.call(build(batch), f"{kind} {sorted(ids)[0]}〜")
        if data is None:
            summary["skipped"] += len(batch)
            continue
        parsed = parse_verdicts(data, ids, allowed)
        for item in batch:
            qid = item["questionId"]
            if qid not in parsed:
                summary["skipped"] += 1
                print(f"[{kind}] {qid}: 返答に無い/不正なので skip", file=sys.stderr)
                continue
            verdict, message = parsed[qid]["verdict"], parsed[qid]["message"]
            findings = check_note(item["text"]) if kind == "notes" else []
            if kind == "notes":
                verdict, message = merge_note_facts(verdict, message, findings)
            results[qid] = {
                "verdict": verdict,
                "message": message,
                "sourceUrl": item["article"]["url"],
                stamp_key: item["updatedAt"],
                "checkedAt": checked_at,
            }
            state[state_key][qid] = item["updatedAt"] or "1970-01-01T00:00:00Z"
            summary["done"] += 1
            summary["verdicts"][verdict] += 1
            rows.append({"questionId": qid, "question": item["question"], "text": item["text"],
                         "verdict": verdict, "message": message, "article": item["article"],
                         "findings": findings})
    return summary, rows


def run_lawchanges(questions, labels, runner, allow_network, law_path, today_text) -> dict:
    items = []
    summary = {"total": len(questions), "skipped": 0, "candidates": 0}
    for qid in sorted(questions):
        article = get_article(questions[qid], allow_network)
        if article is None:
            summary["skipped"] += 1
            print(f"[lawchanges] {qid}: 解説ページを取得できないので skip", file=sys.stderr)
            continue
        items.append({"questionId": qid, "question": questions[qid], "article": article})

    found = []
    for batch in chunks(items, BATCH_SIZE):
        ids = {item["questionId"] for item in batch}
        data = runner.call(build_lawchange_prompt(batch), f"lawchanges {sorted(ids)[0]}〜")
        if data is None:
            summary["skipped"] += len(batch)
            continue
        for row in data.get("candidates", []) or []:
            if isinstance(row, dict) and row.get("questionId") in ids:
                found.append(row)
    if runner.dry_run:
        return summary
    merged = merge_law_candidates(load_json(law_path, []), found, labels, today_text)
    save_json(law_path, merged)
    summary["candidates"] = sum(1 for c in merged if c["status"] == "candidate")
    summary["confirmed"] = sum(1 for c in merged if c["status"] == "confirmed")
    return summary


# ---------------------------------------------------------------------------
# レポート
# ---------------------------------------------------------------------------


def question_label(question: dict) -> str:
    return f"{question.get('year')} 問{question.get('number')}"


def write_note_review(rows: list, path: Path, today: date, kind: str) -> None:
    """docs/note-review/YYYY-MM-DD.md。既存（2026-09-07）の書式に合わせる。"""
    title = "学習メモの正誤確認" if kind == "notes" else "根拠の一言の採点"
    bad = [r for r in rows if r["verdict"] in ("conflict", "reason_off", "number_off")]
    unclear = [r for r in rows if r["verdict"] == "unclear"]
    good = [r for r in rows if r["verdict"] in ("ok", "match")]
    lines = [
        f"# {title} {today.isoformat()}",
        "",
        f"アプリの{'学習メモ' if kind == 'notes' else '根拠の一言'}{len(rows)}件（未照合ぶん）を、"
        "各問の解説ページ（宅建レトス）を根拠に AI（sonnet）で照合した記録。"
        "解説本文は転載せず、出典URLを各項目に付ける。判定は「推定」で、最終確認は人が行う。",
        "",
        f"**結果: {len(good)}件は一致。{len(bad)}件に食い違い。{len(unclear)}件は判定保留。**"
        f"（{len(good)} + {len(bad)} + {len(unclear)} = {len(rows)}）",
        "",
        "---",
        "",
    ]

    def section(heading: str, entries: list) -> None:
        if not entries:
            return
        lines.append(f"## {heading}")
        lines.append("")
        for row in entries:
            question = row["question"]
            lines.append(f"### {question_label(question)}（{row['article']['title'] or question.get('category')}）")
            lines.append("")
            lines.append("書いた内容:")
            lines.append("")
            for text_line in row["text"].strip().splitlines():
                lines.append(f"> {text_line}")
            lines.append("")
            lines.append(f"**判定: {row['verdict']}** — {row['message']}")
            for finding in row.get("findings", []):
                lines.append("")
                lines.append(f"数字照合（{finding['topic']}）の補足: {finding['note']}")
                if finding.get("source"):
                    lines.append(f"出典: {finding['source']}")
            lines.append("")
            lines.append(f"出典: [{row['article']['title'] or '解説ページ'}]({row['article']['url']})")
            lines.append("")
        lines.append("---")
        lines.append("")

    section("訂正が必要なもの（食い違い）", bad)
    section("判定保留（人が見る）", unclear)
    if good:
        lines.append("## 一致したもの")
        lines.append("")
        for row in good:
            first = row["text"].strip().splitlines()[0] if row["text"].strip() else ""
            lines.append(f"- {question_label(row['question'])} — {first[:60]}"
                         f"（[出典]({row['article']['url']})）")
        lines.append("")
    path.parent.mkdir(parents=True, exist_ok=True)
    existing = path.read_text(encoding="utf-8") if path.exists() else ""
    body = "\n".join(lines)
    path.write_text((existing.rstrip() + "\n\n" + body) if existing else body, encoding="utf-8")


def write_report(path: Path, today: date, uid: str, sections: list, summaries: dict,
                 insights: dict, runner: Runner, questions: dict, law_path: Path) -> None:
    lines = [f"# 宅建ドリル AIインサイト {today.isoformat()}", ""]
    source = f"Firestore `progress/{uid}`" if uid else "progress は読んでいない（問題データのみ）"
    lines.append(f"データ取得元: {source}。実行セクション: {', '.join(sections)}。"
                 f"LLM 呼び出し {runner.calls}回（sonnet・1回最大{BATCH_SIZE}項目）。")
    lines.append("すべて「推定」。数字はスクリプト内で計算し、途中式を残す。")
    lines.append("")

    diagnoses = insights.get("diagnoses", {})
    if "diagnoses" in summaries or diagnoses:
        s = summaries.get("diagnoses")
        lines += ["## 誤答の原因（推定）", ""]
        if s:
            lines.append(f"- この実行: 誤答のある問題 {s['candidates']}問のうち、未診断 {s['pending']}問"
                         f" → 診断 {s['done']}問・skip {s['skipped']}問"
                         f"（{s['done']} + {s['skipped']} = {s['pending']}）")
        lines += [f"- 累計の診断 {len(diagnoses)}問（insights.json）", "",
                  "| type | 内訳 | 件数 | 割合 |", "|---|---|---:|---:|"]
        total = len(diagnoses)
        for pattern in insights.get("patterns", []):
            share = pattern["count"] / total * 100 if total else 0
            lines.append(f"| {pattern['type']} | {pattern['label']} | {pattern['count']}"
                         f" | {pattern['count']}/{total} = {share:.0f}% |")
        lines.append("")
        new_ids = sorted(qid for qid, d in diagnoses.items()
                         if d.get("eventAt") and qid in questions)
        recent = sorted(new_ids, key=lambda q: diagnoses[q]["eventAt"], reverse=True)[:15]
        if recent:
            lines += ["直近の診断（最大15件）:", ""]
            for qid in recent:
                d = diagnoses[qid]
                extra = f"（混同相手: {d['confusedWithTopic']}）" if d.get("confusedWithTopic") else ""
                lines.append(f"- {question_label(questions[qid])} `{qid}` **{d['label']}**"
                             f"/{d['confidence']}{extra} — {d['reason']}")
            lines.append("")

    if "pairs" in summaries:
        lines += ["## 混同ペア", ""]
        pairs = insights.get("confusionPairs", [])
        if not pairs:
            lines.append("候補なし。")
        for pair in pairs:
            retest = pair.get("retest") or {}
            lines.append(f"- **{pair['labelA']} × {pair['labelB']}** `{pair['id']}`"
                         f" 問題 {', '.join(pair['questionIds'])} — {pair['reason']}"
                         f" 作成 {to_jst(pair['createdAt'])}。翌日以降の再出題 {retest.get('answered', 0)}回"
                         f"・正解 {retest.get('correct', 0)}回")
        lines.append("")

    for kind, heading, out_key in (("notes", "メモの照合", "noteReviews"),
                                   ("explanations", "根拠の一言の採点", "explanationGrades")):
        s = summaries.get(kind)
        if not s and not insights.get(out_key):
            continue
        cumulative: dict[str, int] = defaultdict(int)
        for entry in insights.get(out_key, {}).values():
            cumulative[entry.get("verdict", "?")] += 1
        cumulative_text = ", ".join(f"{k} {v}件" for k, v in sorted(cumulative.items())) or "なし"
        lines += [f"## {heading}", ""]
        if s:
            verdicts = ", ".join(f"{k} {v}件" for k, v in sorted(s["verdicts"].items())) or "なし"
            lines += [f"- この実行: 未照合 {s['pending']}件 → 照合 {s['done']}件・skip {s['skipped']}件"
                      f"（{s['done']} + {s['skipped']} = {s['pending']}）",
                      f"- この実行の判定: {verdicts}"]
        lines += [f"- 累計（insights.json）: {len(insights.get(out_key, {}))}件 = {cumulative_text}", ""]

    if "lawchanges" in summaries:
        s = summaries["lawchanges"]
        lines += ["## 法改正の候補", "",
                  f"- 対象 {s['total']}問（skip {s['skipped']}問）→ 候補 {s.get('candidates', 0)}問"
                  f"、人が確認済み {s.get('confirmed', 0)}問。一覧は `{law_path.relative_to(ROOT)}`。",
                  "- 候補は確定ではない。一次情報で確認してから `src/data/lawChanges.ts` に書く。", ""]

    lines += ["## 失敗した項目", ""]
    if runner.failures:
        for label in runner.failures:
            lines.append(f"- {label}（2回とも JSON を取れず skip。次回の実行で再試行される）")
    else:
        lines.append("なし。")
    lines.append("")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


LOCK_PATH = LLM_CWD / "lock"


def acquire_lock() -> Path | None:
    """自分の pid を書いたロックファイルを作る。生きているプロセスが持っていれば None。"""
    import os

    LLM_CWD.mkdir(parents=True, exist_ok=True)
    # O_EXCL で原子的に作る。「存在確認→作成」の2段だと同時起動の両方が通る。
    for _ in range(2):
        try:
            fd = os.open(LOCK_PATH, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError:
            try:
                owner = int(LOCK_PATH.read_text().strip() or 0)
                os.kill(owner, 0)
                return None  # まだ生きている
            except (ValueError, ProcessLookupError, PermissionError):
                LOCK_PATH.unlink(missing_ok=True)  # 残骸。もう一度だけ作り直す
                continue
        with os.fdopen(fd, "w") as handle:
            handle.write(str(os.getpid()))
        return LOCK_PATH
    return None


def release_lock(lock: Path) -> None:
    lock.unlink(missing_ok=True)


def push_insights(uid: str, insights: dict) -> None:
    """insights/{uid} を PATCH で丸ごと書き換える。progress には触らない。"""
    url = (f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}"
           f"/databases/(default)/documents/insights/{uid}")
    body = json.dumps({"fields": {key: wrap(value) for key, value in insights.items()}}).encode()
    request = urllib.request.Request(
        url, data=body, method="PATCH",
        headers={"Authorization": f"Bearer {access_token()}", "Content-Type": "application/json"},
    )
    urllib.request.urlopen(request, timeout=30).read()


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(description="宅建ドリルの夜間AIバッチ")
    parser.add_argument("--push", action="store_true", help="Firestore insights/{uid} を更新する")
    parser.add_argument("--dry-run", action="store_true", help="LLM を呼ばず、対象件数とプロンプトだけ表示")
    parser.add_argument("--only", nargs="+", choices=SECTIONS, help="実行するセクション（複数可）")
    parser.add_argument("--date", help="基準日 (YYYY-MM-DD)。省略時は今日")
    parser.add_argument("--progress-file", help="Firestore の代わりに読む progress の JSON（検証用）")
    parser.add_argument("--uid", help="--progress-file と併用するときの uid")
    parser.add_argument("--out-root", help="docs/ の出力先ルート（検証用。既定はリポジトリ）")
    args = parser.parse_args()

    today = date.fromisoformat(args.date) if args.date else date.today()
    now_iso = datetime.now(JST).isoformat()

    # 同時に2つ走ると state.json・insights.json・当日レポートを互いに上書きする
    # （2026-09-09 に手動実行と本走が重なり、メモ照合の記録が二重になった）。
    lock = acquire_lock()
    if lock is None:
        sys.exit("ai-insights.py が既に実行中です（build/ai-insights/lock）。終わってから再実行してください。")
    import atexit
    atexit.register(release_lock, lock)
    sections = list(args.only) if args.only else list(DEFAULT_SECTIONS)
    out_root = Path(args.out_root).resolve() if args.out_root else ROOT
    insights_dir = out_root / "docs" / "insights"
    state_path = insights_dir / "state.json"
    insights_path = insights_dir / "insights.json"
    law_path = out_root / "docs" / "law-changes" / "candidates.json"
    note_review_dir = out_root / "docs" / "note-review"

    questions = load_questions()
    topics = load_topics()
    question_topics = load_question_topics()
    labels = load_question_labels()
    state = load_json(state_path, {})
    insights = load_json(insights_path, {})
    for key, empty in (("diagnoses", {}), ("patterns", []), ("confusionPairs", []),
                       ("noteReviews", {}), ("explanationGrades", {})):
        insights.setdefault(key, empty)

    needs_progress = any(s in sections for s in ("diagnoses", "pairs", "notes", "explanations"))
    progress = {"uid": args.uid or "", "answers": {}, "notes": {}, "events": [], "explanations": {}}
    if needs_progress or args.push:
        if args.progress_file:
            progress = load_progress_file(Path(args.progress_file), args.uid)
        else:
            progress = fetch_progress_full()
    print(f"progress/{progress['uid'] or '(未読)'}: answers {len(progress['answers'])}件 / events {len(progress['events'])}件"
          f" / notes {len(progress['notes'])}件 / explanations {len(progress['explanations'])}件",
          file=sys.stderr)

    runner = Runner(dry_run=args.dry_run)
    allow_network = not args.dry_run
    summaries: dict = {}

    if "diagnoses" in sections:
        summaries["diagnoses"] = run_diagnoses(progress, questions, topics, question_topics, state, insights, runner)
        print(f"[diagnoses] {summaries['diagnoses']}", file=sys.stderr)
    if "pairs" in sections:
        summaries["pairs"] = run_pairs(progress, topics, question_topics, state, insights, now_iso)
        print(f"[pairs] {summaries['pairs']}", file=sys.stderr)
    for kind in ("notes", "explanations"):
        if kind in sections:
            summary, rows = run_reviews(kind, progress, questions, state, insights, runner, allow_network, now_iso)
            summaries[kind] = summary
            print(f"[{kind}] {dict(summary, verdicts=dict(summary['verdicts']))}", file=sys.stderr)
            if rows and not args.dry_run:
                write_note_review(rows, note_review_dir / f"{today.isoformat()}.md", today, kind)
    if "lawchanges" in sections:
        summaries["lawchanges"] = run_lawchanges(questions, labels, runner, allow_network, law_path, today.isoformat())
        print(f"[lawchanges] {summaries['lawchanges']}", file=sys.stderr)
        if not args.dry_run:
            state["lawchangesRanAt"] = now_iso

    if args.dry_run:
        print("\n[dry-run] LLM を呼ばず、ファイルも書きませんでした。", file=sys.stderr)
        return

    insights["generatedAt"] = now_iso
    state["lastRunAt"] = now_iso
    # insights.json（ローカルの正）は先に書く。LLM の結果を失わないため。
    save_json(insights_path, insights)
    report_path = insights_dir / f"{today.isoformat()}.md"
    write_report(report_path, today, progress["uid"], sections, summaries, insights, runner, questions, law_path)
    print(f"→ {report_path} に保存しました。", file=sys.stderr)

    # 増分状態（state.json）は Firestore への push が成功してから確定する。
    # 先に確定すると、push に失敗した項目が「処理済み」になり二度と送られない
    # （codex レビュー 2026-09-09 の指摘）。
    if args.push:
        push_insights(progress["uid"], insights)
        print(f"→ Firestore insights/{progress['uid']} を更新しました。", file=sys.stderr)
    else:
        print("（--push を付けると Firestore insights/{uid} に書きます）", file=sys.stderr)
    save_json(state_path, state)


if __name__ == "__main__":
    main()
