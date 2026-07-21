# 自分専用チートシート Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 過去問の論点タグ（付与済み）と自分の進捗から「優先度＝弱点度×出題頻度×配点重み」を算出し、優先度順のチートシートページをアプリに追加する。

**Architecture:** 純粋関数 `computeCheatSheet()`（`src/lib/cheatsheet.ts`）が `answers` + `topicTags.ts` + `studyOrder` から `CheatSheetRow[]` を計算し、新規コンポーネント `CheatSheet.tsx` がそれを表示する。既存の `MockExam.tsx` と同じ「独立コンポーネント + Props受け渡し」パターンに従う。外部通信・Firestore書き込みは一切なし。

**Tech Stack:** React + TypeScript（Vite）、Vitest（既存のテストランナーに合わせる。package.jsonで確認する）。

## Global Constraints

- 論点タグデータ `src/data/topicTags.ts` は作成済み。**変更しない**（Claudeが作成済みの正データ）。
- `src/data/questions.ts`（過去問原本）は**絶対に変更しない**。原本主義（OCR原文を保つ）が本プロジェクトのルール。
- Firestore・Cloud Functions・外部API呼び出しは一切追加しない。すべてローカル計算。
- 優先度の合成スコア（`priorityScore`）は並べ替え専用の裏方値として扱い、UIでは生の数値（正答率%・ミス回数・出題問数）を主役として見せる。ユーザーが自分の目で「確かに苦手で頻出だ」と分かる透明性を最優先する。
- MASTER_STREAK（習得済み判定の連続正解数）は `src/App.tsx:78` の `const MASTER_STREAK = 3;` を指す。この値をハードコードせず、値が必要な箇所は呼び出し元から渡す（`cheatsheet.ts` 自体はMASTER_STREAKに依存しない設計にする。正答率とミス回数だけで弱点度を出すため）。

---

### Task 1: 優先度算出ロジック `src/lib/cheatsheet.ts`

**Files:**
- Create: `src/lib/cheatsheet.ts`
- Test: `src/lib/cheatsheet.test.ts`
- Read (do not modify): `src/data/topicTags.ts`, `src/data/studyGuide.ts`

**Interfaces:**
- Consumes:
  - `topics: Topic[]` および `questionTopics: Record<string, string>` from `src/data/topicTags.ts`
    ```ts
    export type Topic = { id: string; label: string; category: string };
    export const topics: Topic[];
    export const questionTopics: Record<string, string>; // questionId -> topic.id
    ```
  - `studyOrder: StudyCategory[]` from `src/data/studyGuide.ts`
    ```ts
    export type StudyCategory = {
      category: string;
      order: number;
      fullMarks: number;
      targetScore: number;
      rationale: string;
    };
    export const studyOrder: StudyCategory[];
    ```
  - `takkenQuestions: TakkenQuestion[]` from `src/data/questions.ts`（`id`, `category` フィールドを使う）
  - 呼び出し元から渡される `answers: Record<string, { attempts: number; lapses: number }>`
    （`src/App.tsx` の `AnswerRecord` 型のうち `attempts` と `lapses` のみを使う。この関数はApp.tsxの型に依存させず、独自の最小限の型を定義する）
- Produces:
  ```ts
  export type CheatSheetRow = {
    topicId: string;
    label: string;
    category: string;
    rank: number;             // 1始まりの優先順位（priorityScore降順）
    priorityScore: number;    // 合成スコア。UIでの直接表示はしない裏方の値
    accuracy: number | null;  // 自分の正答率 0〜1。attempts=0ならnull
    lapses: number;           // 自分の累計ミス回数（その論点に属する全問題のlapses合計）
    attempts: number;         // 自分の累計挑戦回数（その論点に属する全問題のattempts合計）
    questionCount: number;    // その論点の過去問出題数（=questionTopicsでそのtopicIdを持つ問題数）
    categoryWeight: number;   // targetScore / fullMarks（0〜1）
    reasonLabel: string;      // 一言理由。下記ロジック参照
    untouched: boolean;       // attempts === 0
  };

  export type AnswerLapseInput = Record<string, { attempts: number; lapses: number }>;

  export function computeCheatSheet(
    answers: AnswerLapseInput,
  ): CheatSheetRow[];
  ```
  この関数は `src/data/topicTags.ts` / `src/data/studyGuide.ts` / `src/data/questions.ts` を内部でimportして使う（呼び出し元から渡させない。これらは静的データなので引数にする必要がない）。

**計算ロジック（この通りに実装する）:**

1. `questionTopics` を逆引きし、`topicId -> questionId[]` のマップを作る。
2. 各 topic ごとに、所属する questionId 群について `answers` から `attempts` と `lapses` を合算する（`answers` に存在しないquestionIdは attempts=0, lapses=0 として扱う）。
3. `accuracy`:
   - `attempts === 0` の場合は `null`。
   - それ以外は `1 - lapses / attempts` を `0` 未満にならないよう `Math.max(0, ...)` でクランプ。
4. `弱点度`（0〜1、大きいほど弱い）:
   - `untouched`（attempts === 0）の場合は `0.6`（未着手は「そこそこ弱点」扱い。0や1の極端値にしない。理由: 未着手を最弱扱いにすると出題数が少ない論点が不当に最上位に来てしまうため、中庸の固定値にする）。
   - それ以外は `1 - accuracy!`（accuracyが低いほど弱点度が高い）。
5. `categoryWeight` = `studyOrder.find(c => c.category === topic.category)!.targetScore / studyOrder.find(c => c.category === topic.category)!.fullMarks`。該当カテゴリが見つからない場合はエラーを投げる（データ不整合はテストで検知する前提。フォールバック値は入れない）。
6. `priorityScore` = `弱点度 * questionCount * categoryWeight`。
   - `questionCount` は出題頻度の代理指標としてそのまま使う（正規化しない。数が小さい部門同士・大きい部門同士の相対比較に使うため、素の出題数で十分。設計書の「合成スコアは裏方」の方針通り、正規化の見た目の複雑さより計算の追いやすさを優先する）。
7. `reasonLabel` の判定（上から順に最初に一致したものを採用）:
   - `untouched === true` かつ `questionCount >= 3` → `"未着手・頻出"`
   - `untouched === true` → `"未着手"`
   - `accuracy !== null && accuracy < 0.5 && questionCount >= 3` → `"頻出なのに苦手"`
   - `accuracy !== null && accuracy < 0.5` → `"苦手"`
   - `categoryWeight <= (2/3)` （税・価格評定や免除科目のような配点効率が低い科目の目安）かつ上のいずれにも該当しない → `"優先度低め（配点効率が低い科目）"`
   - それ以外 → `"順調"`
8. 全topicsについて上記を計算し、`priorityScore` の降順でソート。同点の場合は `questionCount` 降順、それも同点なら `topics` 配列内の元の順序を保つ（安定ソート）。ソート後に `rank`（1始まり）を付与する。

- [ ] **Step 1: Write the failing test for untouched-topic ranking**

```ts
// src/lib/cheatsheet.test.ts
import { describe, expect, it } from "vitest";
import { computeCheatSheet } from "./cheatsheet";

describe("computeCheatSheet", () => {
  it("ranks a frequently-tested, poorly-answered topic above a rarely-tested perfect topic", () => {
    // "宅建士登録・宅建士証" (takkenshi-toroku) appears in 7 questions across years (宅建業法, weight 18/20).
    // "地価公示法" (chika-koji) appears in 2 questions (税・価格評定, weight 2/3).
    const rows = computeCheatSheet({
      "r7-42": { attempts: 3, lapses: 2 }, // takkenshi-toroku, 66% miss
      "r7-24": { attempts: 3, lapses: 0 }, // 固定資産税 in same low-weight category, perfect
    });
    const weak = rows.find((r) => r.topicId === "takkenshi-toroku");
    const strong = rows.find((r) => r.topicId === "koteishisanzei");
    expect(weak).toBeDefined();
    expect(strong).toBeDefined();
    expect(weak!.rank).toBeLessThan(strong!.rank);
    expect(weak!.reasonLabel).toBe("苦手");
  });

  it("treats untouched topics as moderately weak, not the single strongest signal", () => {
    const rows = computeCheatSheet({});
    const untouched = rows.filter((r) => r.untouched);
    expect(untouched.length).toBe(50);
    for (const row of untouched) {
      expect(row.accuracy).toBeNull();
      expect(row.attempts).toBe(0);
    }
  });

  it("weighs category by targetScore/fullMarks so 宅建業法 outranks 税・価格評定 under equal weakness", () => {
    const rows = computeCheatSheet({});
    const gyoho = rows.find((r) => r.topicId === "hoshugaku"); // 宅建業法
    const zei = rows.find((r) => r.topicId === "inshizei"); // 税・価格評定
    expect(gyoho).toBeDefined();
    expect(zei).toBeDefined();
    expect(gyoho!.categoryWeight).toBeGreaterThan(zei!.categoryWeight);
  });

  it("computes accuracy as 1 - lapses/attempts, clamped at 0", () => {
    const rows = computeCheatSheet({
      "r7-42": { attempts: 2, lapses: 3 }, // over-lapsed edge case, should clamp to 0
    });
    const row = rows.find((r) => r.topicId === "takkenshi-toroku");
    expect(row!.accuracy).toBe(0);
  });

  it("assigns rank 1..N with no gaps, sorted by priorityScore descending", () => {
    const rows = computeCheatSheet({});
    expect(rows).toHaveLength(50);
    const ranks = rows.map((r) => r.rank);
    expect(ranks).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i - 1].priorityScore).toBeGreaterThanOrEqual(rows[i].priorityScore);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/cheatsheet.test.ts`
Expected: FAIL — `Cannot find module './cheatsheet'` (ファイル未作成のため)

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/cheatsheet.ts
import { takkenQuestions } from "../data/questions";
import { studyOrder } from "../data/studyGuide";
import { topics, questionTopics, type Topic } from "../data/topicTags";

export type AnswerLapseInput = Record<string, { attempts: number; lapses: number }>;

export type CheatSheetRow = {
  topicId: string;
  label: string;
  category: string;
  rank: number;
  priorityScore: number;
  accuracy: number | null;
  lapses: number;
  attempts: number;
  questionCount: number;
  categoryWeight: number;
  reasonLabel: string;
  untouched: boolean;
};

const UNTOUCHED_WEAKNESS = 0.6;
const LOW_WEIGHT_THRESHOLD = 2 / 3;

const questionIdsByTopic = (): Record<string, string[]> => {
  const map: Record<string, string[]> = {};
  for (const q of takkenQuestions) {
    const topicId = questionTopics[q.id];
    if (!topicId) continue;
    (map[topicId] ??= []).push(q.id);
  }
  return map;
};

const categoryWeightOf = (category: string): number => {
  const entry = studyOrder.find((c) => c.category === category);
  if (!entry) {
    throw new Error(`studyOrder has no entry for category: ${category}`);
  }
  return entry.targetScore / entry.fullMarks;
};

const reasonLabelOf = (
  untouched: boolean,
  questionCount: number,
  accuracy: number | null,
  categoryWeight: number,
): string => {
  if (untouched && questionCount >= 3) return "未着手・頻出";
  if (untouched) return "未着手";
  if (accuracy !== null && accuracy < 0.5 && questionCount >= 3) return "頻出なのに苦手";
  if (accuracy !== null && accuracy < 0.5) return "苦手";
  if (categoryWeight <= LOW_WEIGHT_THRESHOLD) return "優先度低め（配点効率が低い科目）";
  return "順調";
};

export function computeCheatSheet(answers: AnswerLapseInput): CheatSheetRow[] {
  const idsByTopic = questionIdsByTopic();

  const rows = topics.map((topic: Topic, index: number) => {
    const questionIds = idsByTopic[topic.id] ?? [];
    const questionCount = questionIds.length;

    let attempts = 0;
    let lapses = 0;
    for (const qid of questionIds) {
      const a = answers[qid];
      if (!a) continue;
      attempts += a.attempts;
      lapses += a.lapses;
    }

    const untouched = attempts === 0;
    const accuracy = untouched ? null : Math.max(0, 1 - lapses / attempts);
    const weakness = untouched ? UNTOUCHED_WEAKNESS : 1 - accuracy!;
    const categoryWeight = categoryWeightOf(topic.category);
    const priorityScore = weakness * questionCount * categoryWeight;
    const reasonLabel = reasonLabelOf(untouched, questionCount, accuracy, categoryWeight);

    return {
      topicId: topic.id,
      label: topic.label,
      category: topic.category,
      rank: 0, // assigned after sort
      priorityScore,
      accuracy,
      lapses,
      attempts,
      questionCount,
      categoryWeight,
      reasonLabel,
      untouched,
      __originalIndex: index,
    };
  });

  rows.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
    if (b.questionCount !== a.questionCount) return b.questionCount - a.questionCount;
    return a.__originalIndex - b.__originalIndex;
  });

  return rows.map((row, i) => {
    const { __originalIndex, ...rest } = row;
    return { ...rest, rank: i + 1 };
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/cheatsheet.test.ts`
Expected: PASS（5 tests）

- [ ] **Step 5: Commit**

```bash
git add src/lib/cheatsheet.ts src/lib/cheatsheet.test.ts
git commit -m "feat: チートシートの優先度算出ロジック（弱点×出題頻度×配点重み）を追加"
```

---

### Task 2: チートシート表示コンポーネント `src/CheatSheet.tsx`

**Files:**
- Create: `src/CheatSheet.tsx`
- Read (do not modify): `src/lib/cheatsheet.ts`（Task 1で作成済み）

**Interfaces:**
- Consumes: `computeCheatSheet`, `type CheatSheetRow`, `type AnswerLapseInput` from `./lib/cheatsheet`
- Produces:
  ```ts
  type Props = {
    answers: AnswerLapseInput;
    onClose: () => void;
  };
  export function CheatSheet(props: Props): JSX.Element;
  ```
  `App.tsx` から呼び出す際は、`progress.answers`（`Record<string, AnswerRecord>`。`AnswerRecord` は `attempts: number; lapses: number` を含むフィールドを持つ既存の型）をそのまま渡せる（構造的部分型でOK。`AnswerLapseInput` は `attempts`/`lapses` のみを要求するため）。

**実装方針:**
- `MockExam.tsx` と同じ「独立コンポーネント・オーバーレイ／モーダル的表示」パターンに合わせる。具体的な見た目のラッパー（モーダルかページ遷移か）は `src/App.tsx` 内で既存の `boardOpen` や `questionPickerOpen` がどう表示切り替えされているかを読んで、そのパターンに揃える（JSXの外側コンテナ構造は既存コードのCSSクラス命名規則に合わせること。新しいCSSフレームワークやライブラリを追加しない）。
- 冒頭に計算式の説明ブロックを置く。文言は次を使う:
  「優先度＝あなたの弱点 × 出題の多さ × 科目の得点効率 で並べています。上から順につぶすと当日の得点が伸びやすくなります。」
- 各行に表示する要素（Task 1の `CheatSheetRow` から）:
  - 順位 `rank`
  - 論点名 `label`
  - 科目バッジ `category`
  - 理由ラベル `reasonLabel`
  - 「あなた: 正答率○%（ミス○回）」— `accuracy` が `null` なら「未着手」と表示、そうでなければ `Math.round(accuracy * 100)}%（ミス${lapses}回）`
  - 「過去${questionCount}問 出題」
  - 科目の重み — `categoryWeight` を `Math.round(categoryWeight * 100)}%` として「得点効率${…}%」のように表示
- 上位（`rank <= 10` など、具体的な閾値は妥当な範囲でよい）は視覚的に強調するクラスを付ける。
- `untouched === true` の行は別の色分けクラスを付ける。
- `answers` が空（全問未着手）の場合でも、コンポーネント自体はクラッシュせず全論点が「未着手」として表示される（Task 1のロジックにより自然にそうなる。特別な空状態分岐は不要）。ただし進捗ゼロの新規ユーザー向けに「学習を進めるとここが更新されます」という一文をリストの上に添える。

- [ ] **Step 1: 型チェックが通る最小のコンポーネントを書く**

```tsx
// src/CheatSheet.tsx
import { useMemo } from "react";
import { computeCheatSheet, type AnswerLapseInput, type CheatSheetRow } from "./lib/cheatsheet";

type Props = {
  answers: AnswerLapseInput;
  onClose: () => void;
};

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

const accuracyLabel = (row: CheatSheetRow) => {
  if (row.accuracy === null) return "未着手";
  return `正答率${formatPercent(row.accuracy)}（ミス${row.lapses}回）`;
};

export function CheatSheet({ answers, onClose }: Props) {
  const rows = useMemo(() => computeCheatSheet(answers), [answers]);

  return (
    <div className="cheatsheet">
      <div className="cheatsheet-header">
        <h2>チートシート</h2>
        <button type="button" onClick={onClose}>
          閉じる
        </button>
      </div>
      <p className="cheatsheet-explainer">
        優先度＝あなたの弱点 × 出題の多さ × 科目の得点効率
        で並べています。上から順につぶすと当日の得点が伸びやすくなります。
      </p>
      <ol className="cheatsheet-list">
        {rows.map((row) => (
          <li
            key={row.topicId}
            className={
              "cheatsheet-row" +
              (row.rank <= 10 ? " cheatsheet-row--top" : "") +
              (row.untouched ? " cheatsheet-row--untouched" : "")
            }
          >
            <span className="cheatsheet-rank">{row.rank}</span>
            <span className="cheatsheet-label">{row.label}</span>
            <span className="cheatsheet-category">{row.category}</span>
            <span className="cheatsheet-reason">{row.reasonLabel}</span>
            <span className="cheatsheet-accuracy">{accuracyLabel(row)}</span>
            <span className="cheatsheet-frequency">過去{row.questionCount}問 出題</span>
            <span className="cheatsheet-weight">
              得点効率{formatPercent(row.categoryWeight)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 2: 型チェックを走らせる**

Run: `npx tsc --noEmit`
Expected: エラーなし（既存の他ファイルのエラーが元々あればそれは無視してよいが、CheatSheet.tsx由来のエラーがないことを確認する）

- [ ] **Step 3: Commit**

```bash
git add src/CheatSheet.tsx
git commit -m "feat: チートシート表示コンポーネントを追加"
```

---

### Task 3: `App.tsx` にチートシートへの導線を追加

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `CheatSheet` from `./CheatSheet`（Task 2で作成）
- 既存の `progress.answers`（型 `Record<string, AnswerRecord>`）をそのまま `CheatSheet` の `answers` propに渡す。

**実装方針:**
1. `src/App.tsx` の冒頭importに `import { CheatSheet } from "./CheatSheet";` を追加。
2. 既存の `boardOpen` / `questionPickerOpen` と同じパターンで `cheatSheetOpen` の状態を追加する:
   - `UiSettings` 型（`src/App.tsx:55-64` 付近）に `cheatSheetOpen: boolean;` は**追加しない**（チートシートは開閉状態を永続化する必要がない一時的なUIなので、`useState` のみで管理し `localStorage` 保存対象の `UiSettings` には含めない。YAGNI）。
   - コンポーネント内で `const [cheatSheetOpen, setCheatSheetOpen] = useState(false);` を追加する（既存の `studyMode` や `boardOpen` の `useState` 宣言の近くに置く）。
3. 既存のナビゲーション導線（「今日やる」「ほかの学習」「成績を見る」等のボタン群がある箇所を `grep -n "成績を見る\|ほかの学習\|今日やる" src/App.tsx` で特定する）に、「チートシート」ボタンを1つ追加し、クリックで `setCheatSheetOpen(true)` する。
4. JSXの適切な場所（他のオーバーレイ／モーダル表示、例えば `{boardOpen && (...)}` のような条件レンダリングの並びに揃える）に以下を追加する:
   ```tsx
   {cheatSheetOpen && (
     <CheatSheet
       answers={progress.answers}
       onClose={() => setCheatSheetOpen(false)}
     />
   )}
   ```
5. `MASTER_STREAK` や `Coaching` 型など既存の型・定数には一切手を触れない。

**このタスクはコードの具体的な挿入行が既存ファイルの実行時の状態（900行超のJSX構造）に依存するため、実装者は必ず以下の手順で進めること:**

- [ ] **Step 1: 既存のナビゲーション導線の実装箇所を特定する**

Run: `grep -n "成績を見る\|ほかの学習\|今日やる" src/App.tsx`

出力されたJSX箇所を読み、ボタン群がどのように配置されているか（className・onClick パターン）を確認する。

- [ ] **Step 2: import文とuseState宣言を追加する**

`import { CheatSheet } from "./CheatSheet";` をTakkenQuestion等のimportの並びに追加。
`const [cheatSheetOpen, setCheatSheetOpen] = useState(false);` を `boardOpen` のuseState宣言（`src/App.tsx:515` 付近）の直後に追加。

- [ ] **Step 3: ナビゲーションボタンを追加する**

Step 1で特定した既存ボタン群と同じclassName命名規則・スタイルで「チートシート」ボタンを追加し、`onClick={() => setCheatSheetOpen(true)}` を設定する。

- [ ] **Step 4: モーダル/オーバーレイのレンダリングを追加する**

既存の条件レンダリング（`{boardOpen && (...)}` 等）と同じ並びに、上記の `{cheatSheetOpen && (<CheatSheet .../>)}` を追加する。

- [ ] **Step 5: 型チェックとビルドを確認する**

Run: `npx tsc --noEmit && npx vite build`
Expected: エラーなく完了する

- [ ] **Step 6: 手動確認**

Run: `npm run dev`
ブラウザで開き、追加した「チートシート」ボタンをクリックしてモーダル/ページが開き、50論点が優先度順に表示されることを目視確認する。進捗データがない状態（初回）では全論点が「未着手」表示になることも確認する。

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat: チートシートページへの導線をApp.tsxに追加"
```

---

## Post-plan Verification

全タスク完了後、次を実行してリグレッションがないことを確認する:

```bash
npx vitest run
npx tsc --noEmit
npx vite build
```

いずれも既存のエラーを増やさないこと（Task開始前の `npx tsc --noEmit` の出力とdiffして、CheatSheet関連ファイル以外に新規エラーが出ていないか確認する）。
