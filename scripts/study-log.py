"""宅建ドリルの学習ログ書き出し。

Firestore の progress/{uid} を読み、指定日ぶんの実績とその日に書いたメモを
docs/study-log/YYYY-MM-DD.md に出す。

以前はアプリの「今日の学習を書き出す」ボタンを押し、コピーされた内容を
自分宛にGmailで送り、それをClaude Codeが拾って保存していた。
実績とメモはどちらも Firestore に入っているので、その手渡しは不要だった
（2026-09-09に廃止。docs/study-log/README.md に経緯）。

日付の決め方:
  - 実績（解答数・正解数）は dailyLog の日付キーをそのまま使う。
  - メモは notes[].updatedAt（UTC）を日本時間に直した日付で振り分ける。
    メモは上書き保存なので、ここに出るのは「その日に最後に触ったメモ」。

認証は daily-coach.py と同じく gcloud のアクセストークンを使う。

使い方:
    python3 scripts/study-log.py                  # 今日ぶん
    python3 scripts/study-log.py --date 2026-09-08
    python3 scripts/study-log.py --backfill       # dailyLogにある全日ぶん
    python3 scripts/study-log.py --stdout         # ファイルに書かず標準出力
"""

import argparse
import importlib.util
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "study-log"

JST = timezone(timedelta(hours=9))


def load_coach():
    """daily-coach.py を読み込む。ファイル名にハイフンがあり import できない。"""
    spec = importlib.util.spec_from_file_location(
        "daily_coach", Path(__file__).resolve().parent / "daily-coach.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def jst_date(iso_text: str) -> str:
    """FirestoreのISO時刻（UTC）を日本時間の YYYY-MM-DD にする。

    UTCのまま日付を切ると、日本時間の朝9時前に書いたメモが前日に落ちる。
    """
    if not iso_text:
        return ""
    try:
        parsed = datetime.fromisoformat(iso_text.replace("Z", "+00:00"))
    except ValueError:
        return ""
    return parsed.astimezone(JST).strftime("%Y-%m-%d")


def notes_of_day(notes: dict, target: str, labels: dict, categories: dict) -> list:
    """その日に書いた（最後に触った）メモを、科目・年度・問番号つきで返す。"""
    found = []
    for question_id, note in notes.items():
        if not isinstance(note, dict):
            continue
        if jst_date(note.get("updatedAt", "")) != target:
            continue
        text = (note.get("text") or "").strip()
        if not text:
            continue
        label = labels.get(question_id, {})
        found.append(
            {
                "id": question_id,
                "category": categories.get(question_id, "その他"),
                "year": label.get("year", ""),
                "number": label.get("number", 0),
                "text": text,
            }
        )
    found.sort(key=lambda n: (n["category"], n["year"], n["number"]))
    return found


def answered_of_day(answers: dict, target: str, categories: dict) -> dict:
    """その日に解いた問題を科目ごとに数える。dailyLog の内訳を補うため。"""
    tally = defaultdict(int)
    for question_id, answer in answers.items():
        if not isinstance(answer, dict):
            continue
        if jst_date(answer.get("answeredAt", "")) != target:
            continue
        tally[categories.get(question_id, "その他")] += 1
    return dict(tally)


def build_report(target: str, progress: dict, labels: dict, categories: dict) -> str:
    """1日ぶんの学習ログ本文を組み立てる。既存の手書き形式に揃える。"""
    lines = [f"# 学習ログ {target}", ""]

    entry = progress["dailyLog"].get(target, {})
    answered = entry.get("answered", 0)
    correct = entry.get("correct", 0)

    lines.append("## 今日の実績")
    lines.append("")
    if answered:
        # 正解数と不正解数を足すと解答数になることが読んで分かる形にする。
        wrong = answered - correct
        rate = correct / answered * 100
        lines.append(
            f"解いた問題: {answered}問（正解 {correct} / 不正解 {wrong}）"
            f" 正答率 {rate:.0f}%"
        )
        breakdown = answered_of_day(progress["answers"], target, categories)
        if breakdown:
            # answers は問題ごとに最新の1件しか持たないので、同じ問題を
            # 何度も解いた日は dailyLog より少なく出る。誤読を防ぐため明示する。
            detail = "・".join(
                f"{name} {count}問" for name, count in sorted(breakdown.items())
            )
            lines.append("")
            lines.append(f"科目の内訳（最後に解いた問題で数えた分）: {detail}")
    else:
        lines.append("この日は解答の記録がない。")
    lines.append("")

    notes = notes_of_day(progress["notes"], target, labels, categories)
    if notes:
        for note in notes:
            heading = note["category"]
            if note["year"] and note["number"]:
                heading = f"{note['category']}（{note['year']} 問{note['number']}）"
            lines.append(f"## {heading}")
            lines.append("")
            lines.append(note["text"])
            lines.append("")
    else:
        lines.append("## メモ")
        lines.append("")
        lines.append("この日に書いたメモはない。")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--date", help="対象日 YYYY-MM-DD（既定は今日）")
    parser.add_argument(
        "--backfill",
        action="store_true",
        help="dailyLog にある全日ぶんを書き出す（既存ファイルは上書きしない）",
    )
    parser.add_argument(
        "--stdout", action="store_true", help="ファイルに書かず標準出力だけ"
    )
    args = parser.parse_args()

    coach = load_coach()
    progress = coach.fetch_progress()
    labels = coach.load_question_labels()
    categories = coach.load_question_categories()

    if args.backfill:
        targets = sorted(progress["dailyLog"])
    elif args.date:
        targets = [args.date]
    else:
        targets = [datetime.now(JST).strftime("%Y-%m-%d")]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = []
    for target in targets:
        report = build_report(target, progress, labels, categories)
        if args.stdout:
            print(report)
            continue
        path = OUT_DIR / f"{target}.md"
        if args.backfill and path.exists():
            # 手で書いた過去ぶんを消さない。
            continue
        path.write_text(report, encoding="utf-8")
        written.append(path)

    if written:
        for path in written:
            print(f"書き出し: {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
