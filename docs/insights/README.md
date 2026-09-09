# 宅建ドリル AIインサイト（夜間バッチ）

`scripts/ai-insights.py` が Firestore の解答履歴・メモ・根拠の一言を読み、
LLM（`claude -p`・sonnet）に「推定」を出させて Firestore `insights/{uid}` に書く。
アプリはその結果を読むだけで、端末から LLM を呼ばない（APIキーを端末に置かない）。
設計は `docs/superpowers/specs/2026-09-09-ai-learning-features-design.md` が正。

出すもの:

| 出力 | 中身 |
|---|---|
| `insights.diagnoses` | 問題ごとの最新の誤答について「なぜ間違えたか」の推定（知識欠落／数字混同／読み違い／論点混同／まぐれ） |
| `insights.patterns` | 診断の type 別集計と、予備校の公開コラムに基づく定型助言（出典URL併記） |
| `insights.confusionPairs` | 混同しやすい論点ペア（上位5組）と比較出題用の問題ID（A,B,A,B 順） |
| `insights.noteReviews` | 学習メモと解説ページの食い違い（ok / conflict / unclear） |
| `insights.explanationGrades` | 「根拠の一言」の採点（match / reason_off / number_off / unclear） |
| `docs/law-changes/candidates.json` | 法改正で正誤が変わる可能性がある問題の候補（確定はしない） |

## 動かす

```bash
python3 scripts/ai-insights.py                  # LLM を呼び、docs/ に書く。Firestore には書かない
python3 scripts/ai-insights.py --push           # Firestore insights/{uid} も更新
python3 scripts/ai-insights.py --dry-run        # LLM を呼ばず、対象件数とプロンプトを表示
python3 scripts/ai-insights.py --only diagnoses pairs   # セクションを絞る
python3 scripts/ai-insights.py --only lawchanges        # 250問の法改正候補（手動でだけ回す）
```

`gcloud auth login` が済んでいることが前提（daily-coach.py と同じ経路）。
`claude` CLI が PATH にあること。1回の呼び出しは約10秒。

セクションの既定は `diagnoses pairs notes explanations`。`lawchanges` は
250問で25回呼ぶため既定に入れず、`--only lawchanges` を明示した時だけ走る。
最後に走らせた日は `docs/insights/state.json` の `lawchangesRanAt` に残る。

検証用（Firestore を使わない）:

```bash
python3 scripts/ai-insights.py --progress-file dump.json --uid xxx --out-root /tmp/out
```

## ファイル

| パス | 役割 |
|---|---|
| `scripts/ai-insights.py` | 本体。プロンプト組み立て・JSON パース・ペア抽出・増分判定・Firestore の wrap |
| `scripts/letos_fetch.py` | 解説ページの取得と `<article>` 本文の抽出。`build/letos-cache/<問題ID>.txt` にキャッシュ |
| `scripts/test_ai_insights.py` | LLM を呼ばない純粋部分のテスト。`python3 -m unittest scripts/test_ai_insights.py` |
| `docs/insights/state.json` | 増分処理の状態（診断済みイベント時刻・照合済みメモの updatedAt・採点済み根拠の updatedAt・ペアの createdAt・lawchanges 実行日） |
| `docs/insights/insights.json` | 最後に組んだ insights ドキュメント全体。`--push` で Firestore に書く内容そのもの |
| `docs/insights/YYYY-MM-DD.md` | 人が読む要約（診断の内訳・ペア・照合件数・失敗した項目） |
| `docs/note-review/YYYY-MM-DD.md` | メモ照合と根拠採点の記録（2026-09-07 の手作業の書式に合わせる） |
| `docs/law-changes/candidates.json` | 法改正の候補。人が一次情報で確認して `status` を `confirmed` / `rejected` に変える |

## 増分処理

毎朝走らせても新しいものだけを LLM に渡す。

- 診断: 問題ごとの最新の誤答イベント（`events` の `ok=false`。無い問題は `answers` の `correct=false`）の時刻が
  `state.diagnosedEventAt[問題ID]` より新しいものだけ
- メモ照合: `notes[問題ID].updatedAt` が `state.notesReviewedAt[問題ID]` より新しいものだけ。メモを直すと未照合に戻る
- 根拠採点: 同様に `explanations[問題ID].updatedAt`
- 混同ペア: 毎回組み直すが、同じ id のペアは `state.pairs` の createdAt を引き継ぐ（作り直さない）
- 法改正候補: 毎回全250問。人が `confirmed` / `rejected` にした行は残し、今回挙がらなかった旧 `candidate` は落とす

`state.json` を消すと全件を診断し直す（LLM 呼び出しが増える）。

## 混同ペアの決め方

LLM を使わず、スクリプト内で決める。

1. 診断で `confusion`（混同相手の論点IDあり）と出た問題の論点と相手の論点 → 1回の指摘につき 10点
2. 同じ科目で、どちらにも `lapses >= 1` の問題がある論点の組 → min(論点Aの累計lapses, 論点Bの累計lapses) 点
3. 点数の高い順に上位5組。各論点から lapses の多い順に最大4問を取り、A,B,A,B の順に並べる
4. `retest` = ペア作成の翌日（JST）以降に、比較モード以外（`src != "pair"`）でその問題に答えた回数と正解数

## 助言の出典

`patterns` の助言は `scripts/ai-insights.py` の `PATTERN_ADVICE` にあり、予備校の公開コラムの方針を
条件に翻訳したもの。コラム本文は転載しない。

- アガルート「時間配分・解く順番」 https://www.agaroot.jp/takken/column/time-allocation/ （設問型の確認・1問2分以内）
- アガルート「直前対策」 https://www.agaroot.jp/takken/column/chokuzen/ （苦手分野を潰す・新しい教材を買わない）
- 伊藤塾「勉強スケジュールの組み方」 https://column.itojuku.co.jp/takken/method/benkyou-sukejuuru/ （何度も間違える問題を繰り返す）
- 資格の大原「過去問を使う学習が効率的」 https://www.o-hara.jp/course/takken/tak_column_3 （正解した問題も「なぜ正解か」を説明できるまで）

メモ照合には `scripts/note_facts.py` の数字照合（頻出数字の正解表）も併用する。
LLM が ok と言っても数字照合が warn なら `unclear` に下げて人が見る。

## 解説ページの扱い

各問の `externalExplanationUrl`（宅建レトス）を取得し、`<article>` 内のテキストだけを
根拠として LLM に渡す。本文は `build/letos-cache/`（gitignore 済み）にキャッシュし、
Firestore にもレポートにも保存しない。残すのは出典URLとページタイトルだけ。
取得には User-Agent を付け、間隔は1秒以上あける。

## LLM の呼び方

`claude -p --model sonnet --output-format json --no-session-persistence` を
`build/ai-insights/` を作業ディレクトリにして subprocess で呼ぶ（プロジェクトの CLAUDE.md を読ませないため）。
プロンプトは標準入力で渡す。返答の `result` から最初の `{` 〜 最後の `}` を取り出して JSON にする。
失敗したら1回だけ再試行し、それでも駄目ならその項目は skip して stderr とレポートに残す（次回に再試行される）。
1回の呼び出しに最大10項目をまとめる。

プロンプトで必ず指示していること: JSONだけを返す・解説本文の転載禁止（引用は20文字以内）・不明は unclear。

## 自動実行

`scripts/daily-coach.sh` から daily-coach.py の後に呼ぶ想定（配線は別途）。
`lawchanges` は毎朝は走らせない。
