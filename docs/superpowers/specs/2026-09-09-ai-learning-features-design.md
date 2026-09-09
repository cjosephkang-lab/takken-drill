# AI学習効率化 7機能の設計（2026-09-09）

試験日 2026-10-18（残り40日）。直前14日は模試・総復習に使うため、実装は2週間で終える。
学習科学の骨格（間隔反復・想起練習・逆算ペース）は既にあるので、ここでは
「想起機会を増やす」「なぜ間違えたかを捕まえる」「メモの誤りを機械で拾う」に絞る。
第二意見（codex 2026-09-09）: 肢別○×を最優先、AI診断は「推定」表示、混同ペアは翌日以降の混合再出題まで含める、
法改正フラグは人手確認済みの表だけ表示する。

## 原則（変えない）

- 問題文・正解は公式PDF原本のみ。AIが問題データを書き換えることはない。
- AIが生成した法律解説を公式ドリルの流れに混ぜない。AIの出力は「推定」「照合結果」として別枠に表示し、必ず出典リンクを添える。
- 追加入力は増やさない。例外は「説明できるかチェック」だけで、任意・何度も間違えた問題限定。
- LLMはアプリからは呼ばない。朝のコーチと同じ経路（Mac上の `scripts/ai-insights.py` → Firestore）で夜間バッチとして走らせ、アプリは結果を読むだけ。APIキーを端末に置かない。

## 機能一覧と優先順

| # | 機能 | AI | 入力 | 実装場所 |
|---|---|---|---|---|
| 1 | 肢別○×モード | 不要 | なし | アプリ（`src/lib/choiceStatements.ts`・`src/ChoiceQuiz.tsx`） |
| 2 | 高確信誤答の優先復習 | 不要 | なし | アプリ（復習キューの並び・絞り込み） |
| 3 | 誤答の原因診断（推定） | 要 | なし | バッチ → `insights.diagnoses` / `insights.patterns` |
| 4 | 混同ペアの比較出題 | 要 | なし | バッチ → `insights.confusionPairs`、アプリの比較モード |
| 5 | メモのAI照合 | 要 | なし | バッチ → `insights.noteReviews` |
| 6 | 説明できるかチェック | 要 | 任意 | アプリの根拠入力 → バッチ → `insights.explanationGrades` |
| 7 | 法改正フラグ | 候補検出のみ | なし | バッチ → `docs/law-changes/candidates.json` → 人が確認 → `src/data/lawChanges.ts` |

## データ契約

### progress/{uid}（既存に追加）

```ts
type AnswerEvent = {
  q: string;      // 問題ID
  c: number;      // 選んだ肢 1-4
  ok: boolean;    // 正解か
  u: boolean;     // 自信なし印
  ms: number;     // 問題表示から回答までのミリ秒
  at: string;     // ISO時刻（同期のマージキー）
  src: "drill" | "mock" | "pair";  // 通常 / 模試 / 比較モード
};
type ChoiceRecord = { ok: boolean; attempts: number; lapses: number; answeredAt: string };
type ProgressState = {
  ...既存,
  events: AnswerEvent[];                       // 直近2000件まで
  choiceRecords: Record<string, ChoiceRecord>; // キー "問題ID#肢番号"
  explanations: Record<string, NoteEntry>;     // 根拠の一言（teach-back）。メモと同じ {text, updatedAt}
};
```

同期: events は `at` で和集合、choiceRecords は answeredAt が新しい方、explanations はメモと同じ updatedAt 優先。

### insights/{uid}（バッチが書く。アプリは読むだけ。firestore.rules で本人のみ read）

```ts
type Insights = {
  generatedAt: string;
  diagnoses: Record<string, {           // 問題ID → 最新の誤答の診断
    type: "knowledge" | "number" | "misread" | "confusion" | "guess";
    label: string;                      // 知識欠落 / 数字混同 / 読み違い / 論点混同 / まぐれ
    reason: string;                     // 1〜2文。解説の転載はしない
    confidence: "low" | "mid" | "high";
    confusedWithTopic?: string;         // type=confusion のとき、混同相手の論点ID
    eventAt: string;                    // 診断した誤答の時刻
  }>;
  patterns: { type: string; label: string; count: number; advice: string }[];
  confusionPairs: {
    id: string;                         // "topicA__topicB"
    topicA: string; topicB: string; labelA: string; labelB: string;
    questionIds: string[];              // A,B,A,B の順に並べ済み（各最大4問）
    reason: string;
    createdAt: string;
    retest?: { answered: number; correct: number };  // 作成翌日以降の通常出題での成績
  }[];
  noteReviews: Record<string, {
    verdict: "ok" | "conflict" | "unclear";
    message: string;                    // 食い違う点。解説本文の長い引用はしない
    sourceUrl: string;
    noteUpdatedAt: string;              // どの版のメモを見たか
    checkedAt: string;
  }>;
  explanationGrades: Record<string, {
    verdict: "match" | "reason_off" | "number_off" | "unclear";
    message: string;
    sourceUrl: string;
    explanationUpdatedAt: string;
    checkedAt: string;
  }>;
};
```

### 法改正フラグ（静的データ）

```ts
// src/data/lawChanges.ts
export type LawChange = {
  questionId: string;
  status: "confirmed" | "candidate" | "rejected";
  summary: string;       // 現行法でどう変わったか（1〜2文）
  effectiveDate: string; // 施行日
  sourceUrl: string;     // 一次情報（e-Gov・省庁・試験機関）
};
```

アプリは `confirmed` だけを問題カードの下に注記として出す。候補はバッチが `docs/law-changes/candidates.json` に出し、人が一次情報で確認してから TS に書く。

## バッチ `scripts/ai-insights.py`

- 実行: `python3 scripts/ai-insights.py [--push] [--dry-run] [--only diagnoses|pairs|notes|explanations|lawchanges]`。`daily-coach.sh` から daily-coach.py の後に呼ぶ。
- LLM呼び出しは `claude -p --model sonnet --output-format json` を、プロジェクトの CLAUDE.md を読み込まない作業ディレクトリ（`build/ai-insights/`）から実行する。1回の呼び出しに複数項目をまとめ、JSONだけを返させる。
- 解説ページ（各問の `externalExplanationUrl`）は `build/letos-cache/` にキャッシュし、`<article>` 内のテキストだけを根拠として渡す。本文はFirestoreにもレポートにも保存しない。
- 増分処理: `docs/insights/state.json` に「診断済みイベント時刻」「照合済みメモの updatedAt」「採点済み根拠の updatedAt」を持ち、新しいものだけを処理する。
- 出力: Firestore `insights/{uid}`（`--push` 時）、`docs/insights/YYYY-MM-DD.md`（人が読む要約）、メモ照合は従来どおり `docs/note-review/YYYY-MM-DD.md` にも追記。

## アプリ側

- 肢別○×: 「ほかの学習」に「肢別○×」を追加。設問型（正しいもの／誤っているもの／違反する・しない／不適当）から各肢の真偽を導ける問題だけを対象にする（「いくつあるか」「組合せ」「複数正解」「全員正解」は除外）。1肢ずつ○／×で答え、その場で正誤と「公式の答え」への根拠（この問の正解肢は◯番）を出す。出題順は「間違えた問題の肢 → 自信なしの肢 → 未着手」。
- 高確信誤答: 「自信あり」で間違えた問題を復習キューの先頭に出す。絞り込みに「自信があったのに間違えた」を追加。
- 診断の表示: 問題カードの解説枠に「前回の誤答（推定）: 数字混同 — 理由」を出す。コーチ枠に「誤答パターン（推定）」の集計と助言。
- 比較モード: 「ほかの学習」の「比較」からペアを選ぶと A,B,A,B の順に出題。終えたら対象問題の nextReviewAt を翌日に寄せ、通常の復習で混ぜて再出題する。
- メモ照合: メモ欄の下に照合結果（食い違いのみ強調・出典リンク）。メモを直すと `noteUpdatedAt` がずれるので「未照合」に戻る。
- 説明チェック: 2回以上間違えた問題で回答後に「根拠を一言」欄を出す（音声入力で入れる想定）。採点結果は同じ欄の下に出す。
- 法改正: `confirmed` の注記を問題カードに出す。
