# 宅建ドリル 日次コーチ

毎朝7時に、Firestore の実際の解答履歴を読んで「今日どの科目を何問やるか」を
`docs/coach/YYYY-MM-DD.md` に書き出す。数字はすべて `scripts/daily-coach.py`
の中で計算しており、途中式がレポートに残る。

## 手で叩く

```bash
python3 scripts/daily-coach.py            # 今日ぶん。ファイルにも書く
python3 scripts/daily-coach.py --stdout   # 標準出力だけ
python3 scripts/daily-coach.py --date 2026-09-20   # 指定日を基準に試算
```

`gcloud auth login` が済んでいることが前提。トークンが切れていると
その旨を出して終わる。

## 自動実行

`~/Library/LaunchAgents/com.techbull.takken-coach.plist` が毎朝7時に
`scripts/daily-coach.sh` を呼ぶ。生成できたらデスクトップ通知で
今日のペースを1行出す。ログは `docs/coach/logs/`。

止める・再開する:

```bash
launchctl unload ~/Library/LaunchAgents/com.techbull.takken-coach.plist
launchctl load   ~/Library/LaunchAgents/com.techbull.takken-coach.plist
```

## 予定が変わったら直す場所

旅行や出張で学習容量が落ちる期間は `scripts/daily-coach.py` の
`LOW_CAPACITY_PERIODS` に書いてある。カレンダーの予定が変わったらここを直す。
容量を暦日ではなく「通常日に換算した日数」で数えているので、
旅行を挟んでも必要ペースが実態に合う。

現在の設定（2026-09-05 時点のカレンダーから）:

| 期間 | 予定 | 容量 |
|---|---|---:|
| 2026-09-17 〜 2026-09-24 | 奄美旅行 | 33% |
| 2026-10-09 〜 2026-10-10 | オール不動産三田会 | 0% |

## 数字の出どころ

| 数字 | 出どころ |
|---|---|
| 解答履歴・正答・習得 | Firestore `progress/{uid}`（アプリが同期） |
| 科目ごとの収録問題数 | `src/data/questions.ts` を実際に数える |
| 満点・目標得点・合格ライン | `src/data/studyGuide.ts` |
| 習得の判定（3連続正解） | `src/App.tsx` の `MASTER_STREAK` |
| 試験日 | `scripts/daily-coach.py` の `EXAM_DATE`（App.tsx と揃える） |

予想点は「科目の本番配点 × いまの正答率」で出す。未着手の科目は
本番で取れないので0点として扱う。ここが甘いと安心してしまうため、
着手0を「不明」ではなく「0点」に倒している。
