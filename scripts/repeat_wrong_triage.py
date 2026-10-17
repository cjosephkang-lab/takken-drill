"""何度も間違えた問題（通算2回以上の誤答）を、定着済みかどうかで分ける。

使い方: python3 scripts/repeat_wrong_triage.py <progress.json>
progress.json は daily-coach.py の fetch_progress() の出力（Firestore progress ドキュメント）。

記録に残っているのは問題ごとの「直近の連続正解数(streak)・通算誤答(lapses)・
通算解答(attempts)・最後に解いた日時(answeredAt)・最後が正解か(correct)」だけで、
1回ごとの履歴はない。streak は自信なしで正解した時も0に戻る（App.tsx の記録規則）。
"""
import json
import sys
from datetime import datetime, timezone, timedelta

JST = timezone(timedelta(hours=9))
progress = json.load(open(sys.argv[1]))
answers = progress["answers"]

src = open("src/data/questions.ts").read()
start = src.index("export const takkenQuestions")
body = src[src.index("= [", start) + 2: src.index("\n];", start) + 2]
meta = {q["id"]: q for q in json.loads(body)}

rows = []
for qid, r in answers.items():
    if (r.get("lapses") or 0) < 2 or qid not in meta:
        continue
    last = datetime.fromisoformat(r["answeredAt"].replace("Z", "+00:00")).astimezone(JST)
    streak = r.get("streak") or 0
    if streak >= 2:
        group = "A 定着（2回以上連続で自信ありの正解）"
    elif streak == 1:
        group = "B 直近1回だけ正解（定着は未確認）"
    else:
        group = "C 直近が不正解か自信なし"
    rows.append((group, meta[qid]["category"], qid, streak, r.get("lapses"), r.get("attempts"),
                 last.strftime("%m-%d %H:%M"), r.get("unsure", False)))

rows.sort()
for g in sorted({r[0] for r in rows}):
    sub = [r for r in rows if r[0] == g]
    print(f"\n## {g}: {len(sub)}問")
    for r in sub:
        print(f"  {r[2]:10} {r[1]:8} 連続正解{r[3]} 誤答{r[4]}/解答{r[5]} 最終{r[6]}{' 自信なし' if r[7] else ''}")
print(f"\n合計 {len(rows)}問")
