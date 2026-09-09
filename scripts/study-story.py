"""学習の積み上げを、発信素材になる数字と物語に落とす。

Firestore の progress/{uid} から「これまで何をやってきたか」を集計し、
docs/study-story/YYYY-MM-DD.md に書く。合格発表のタイミングで動画・記事に
束ねるための素材で、撮影を必要としない（既に溜まっているデータだけで作る）。

数字はすべてこのスクリプトの中で計算し、途中式が読める形で出す
（暗算した数字を答えに書かない・グローバル規約 2026-08-25）。

事実だけを出す。「右肩上がりで伸びた」のような解釈は書かない。
実データは上下に振れており、綺麗な上昇曲線ではないため
（2026-09-09 確認: 8月下旬に0%の日が5日連続で並ぶ）。

使い方:
    python3 scripts/study-story.py            # 今日までを集計
    python3 scripts/study-story.py --stdout   # ファイルに書かず標準出力
"""

import argparse
import importlib.util
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "study-story"
JST = timezone(timedelta(hours=9))

# src/App.tsx の DEFAULT_EXAM_DATE と揃える。
EXAM_DATE = date(2026, 10, 18)
# src/App.tsx の MASTER_STREAK と揃える（この回数連続正解で習得済み）。
MASTER_STREAK = 3


def load_coach():
    """daily-coach.py を読み込む。ファイル名にハイフンがあり import できない。"""
    spec = importlib.util.spec_from_file_location(
        "daily_coach", Path(__file__).resolve().parent / "daily-coach.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def jst_date(iso_text: str) -> str:
    if not iso_text:
        return ""
    try:
        parsed = datetime.fromisoformat(iso_text.replace("Z", "+00:00"))
    except ValueError:
        return ""
    return parsed.astimezone(JST).strftime("%Y-%m-%d")


def streaks(days: list) -> dict:
    """連続学習日数の最長と、いま何日続いているか。

    「毎日やった」と言えるかを確かめるために出す。飛んだ日は数えない。
    """
    if not days:
        return {"longest": 0, "current": 0, "gaps": 0}
    parsed = sorted(date.fromisoformat(d) for d in days)
    longest = run = 1
    gaps = 0
    for prev, now in zip(parsed, parsed[1:]):
        if (now - prev).days == 1:
            run += 1
            longest = max(longest, run)
        else:
            gaps += (now - prev).days - 1
            run = 1
    # いま何日続いているかは、最終学習日から遡って数える。
    current = 1
    for prev, now in zip(reversed(parsed[:-1]), reversed(parsed[1:])):
        if (now - prev).days == 1:
            current += 1
        else:
            break
    return {"longest": longest, "current": current, "gaps": gaps}


def phase_split(daily_log: dict, boundary: str) -> dict:
    """ある日を境に、前後で学習量がどう変わったかを出す。

    実データでは9月に入って1日の問題数が跳ね上がっている。
    「じわじわ上達した」ではなく「途中で本気を出した」が事実なので、
    その境目を数字で示せるようにする。
    """
    before = [(k, v) for k, v in daily_log.items() if k < boundary]
    after = [(k, v) for k, v in daily_log.items() if k >= boundary]

    def agg(rows):
        days = len(rows)
        answered = sum(v.get("answered", 0) for _, v in rows)
        correct = sum(v.get("correct", 0) for _, v in rows)
        return {
            "days": days,
            "answered": answered,
            "correct": correct,
            "per_day": answered / days if days else 0,
            "rate": correct / answered * 100 if answered else 0,
        }

    return {"before": agg(before), "after": agg(after), "boundary": boundary}


def build(progress: dict, coach, today: date) -> str:
    daily_log = progress["dailyLog"]
    answers = progress["answers"]
    notes = progress["notes"]
    categories = coach.load_question_categories()

    lines = [f"# 学習の積み上げ {today.isoformat()}", ""]
    lines.append(
        "Firestore の解答履歴から機械的に出した数字。"
        "撮影や手入力を一切していない、実際の記録。"
    )
    lines.append("")

    # --- 全体 ---
    days = sorted(daily_log)
    total_answered = sum(v.get("answered", 0) for v in daily_log.values())
    total_correct = sum(v.get("correct", 0) for v in daily_log.values())
    first, last = days[0], days[-1]
    span = (date.fromisoformat(last) - date.fromisoformat(first)).days + 1
    st = streaks(days)

    lines.append("## 全体")
    lines.append("")
    lines.append(f"- 期間: {first} 〜 {last}（{span}日間）")
    lines.append(f"- 実際に解いた日: {len(days)}日（{len(days)}/{span} = "
                 f"{len(days)/span*100:.0f}%の日に手をつけた）")
    lines.append(f"- 累計解答: {total_answered}問（正解 {total_correct}）")
    lines.append(f"- 通算正答率: {total_correct}/{total_answered} = "
                 f"{total_correct/total_answered*100:.1f}%")
    lines.append(f"- 最長の連続学習: {st['longest']}日")
    lines.append(f"- 手をつけなかった日: 合計{st['gaps']}日")
    lines.append(f"- 書いたメモ: {len(notes)}件")
    lines.append("")

    # --- 途中で変わった点 ---
    split = phase_split(daily_log, "2026-09-05")
    b, a = split["before"], split["after"]
    lines.append("## 途中で学習量が変わっている")
    lines.append("")
    lines.append(
        f"9月5日を境に、1日あたりの問題数が {b['per_day']:.1f}問 から "
        f"{a['per_day']:.1f}問 に変わった。"
    )
    lines.append("")
    lines.append("| | 日数 | 解答 | 1日平均 | 正答率 |")
    lines.append("|---|---:|---:|---:|---:|")
    lines.append(f"| 9/5より前 | {b['days']}日 | {b['answered']}問 | "
                 f"{b['per_day']:.1f}問 | {b['rate']:.1f}% |")
    lines.append(f"| 9/5以降 | {a['days']}日 | {a['answered']}問 | "
                 f"{a['per_day']:.1f}問 | {a['rate']:.1f}% |")
    lines.append("")

    # --- 科目別 ---
    stock = defaultdict(int)
    for _, name in categories.items():
        stock[name] += 1
    done = defaultdict(int)
    correct_by = defaultdict(int)
    mastered = defaultdict(int)
    for question_id, answer in answers.items():
        if not isinstance(answer, dict):
            continue
        name = categories.get(question_id, "その他")
        done[name] += 1
        if answer.get("correct"):
            correct_by[name] += 1
        if answer.get("streak", 0) >= MASTER_STREAK:
            mastered[name] += 1

    lines.append("## 科目ごとの現在地")
    lines.append("")
    lines.append(f"習得は{MASTER_STREAK}回連続正解で判定している。")
    lines.append("")
    lines.append("| 科目 | 収録 | 着手 | 着手率 | 習得 |")
    lines.append("|---|---:|---:|---:|---:|")
    for name in sorted(stock, key=lambda n: -stock[n]):
        d = done[name]
        lines.append(
            f"| {name} | {stock[name]}問 | {d}問 | "
            f"{d/stock[name]*100:.0f}% | {mastered[name]}問 |"
        )
    lines.append("")

    # --- 日々の推移（そのまま出す。均さない） ---
    lines.append("## 日ごとの記録")
    lines.append("")
    lines.append("均していない生の記録。1問だけの日も0%の日もそのまま出す。")
    lines.append("")
    lines.append("| 日付 | 解答 | 正解 | 正答率 |")
    lines.append("|---|---:|---:|---:|")
    for day in days:
        v = daily_log[day]
        ans = v.get("answered", 0)
        cor = v.get("correct", 0)
        rate = f"{cor/ans*100:.0f}%" if ans else "—"
        lines.append(f"| {day} | {ans} | {cor} | {rate} |")
    lines.append("")

    # --- 試験まで ---
    remaining = (EXAM_DATE - today).days
    untouched = sum(stock[n] - done[n] for n in stock)
    lines.append("## 試験まで")
    lines.append("")
    lines.append(f"- 試験日: {EXAM_DATE.isoformat()}（あと{remaining}日）")
    lines.append(f"- 未着手: {untouched}問 / 全{sum(stock.values())}問")
    if remaining > 0:
        lines.append(
            f"- 全問に一度触れるだけでも 1日 {untouched/remaining:.1f}問 "
            f"（{untouched} ÷ {remaining}）"
        )
    lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--stdout", action="store_true")
    args = parser.parse_args()

    coach = load_coach()
    progress = coach.fetch_progress()
    today = datetime.now(JST).date()
    report = build(progress, coach, today)

    if args.stdout:
        print(report)
        return
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / f"{today.isoformat()}.md"
    path.write_text(report, encoding="utf-8")
    print(f"書き出し: {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
