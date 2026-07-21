# 学習ログ発信パイプライン Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 宅建アプリの学習メモに日時を刻んで当日分をファイルに書き出せるようにし、gitログ＋メモから発信素材を生成する再利用可能なスキルをAI-HQに作る。

**Architecture:** takken-drillのメモ型を `string` から `{ text, updatedAt }` に拡張し、後方互換の移行・マージ・書き出し整形を純粋関数として `src/lib/notes.ts` に切り出して単体テストする。`App.tsx`/`firebase.ts` はそれを呼ぶだけにする。発信生成はAI-HQのスキルとして分離し、投稿はcoworkが担う。

**Tech Stack:** React + TypeScript + Vite（既存）、vitest（新規追加）、Firebase Firestore（既存・変更なし）

## Global Constraints

- メモの移行は「文字列なら `{ text: 文字列, updatedAt: "" }`」に変換。既存メモを絶対に壊さない。
- 端末間マージは `updatedAt` の新しい方を採用。空同士は非空テキストを優先。
- 「当日分」判定は既存の `localDateKey`（端末ローカル日付）を使う。UTCではない。
- メモ入力のUI体験は変えない。日時付与は裏側のみ。
- 発信素材は外部に出るドラフト。生成しても投稿はしない。CEOレビューを待つ。
- Haiku禁止（サブエージェントはSonnet/Opus）。

---

### Task 1: vitestテスト基盤の導入

**Files:**
- Modify: `package.json`（devDependencies に vitest 追加、scripts に test 追加）
- Create: `vitest.config.ts`
- Create: `src/lib/notes.test.ts`（スモークテスト1本）
- Create: `src/lib/notes.ts`（空エクスポート）

**Interfaces:**
- Produces: `src/lib/notes.ts` モジュール（以降のタスクが関数を足す）

- [ ] **Step 1: vitestを追加**

Run: `cd /Users/changju1109/AICompany/takken-drill && npm install -D vitest`
Expected: vitest が devDependencies に入る

- [ ] **Step 2: test スクリプトを package.json に追加**

`package.json` の `scripts` に追加:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: vitest.config.ts を作成**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: スモークテストとダミー関数を書く**

`src/lib/notes.ts`:
```ts
export const notesModuleReady = true;
```

`src/lib/notes.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { notesModuleReady } from "./notes";

describe("notes module", () => {
  it("loads", () => {
    expect(notesModuleReady).toBe(true);
  });
});
```

- [ ] **Step 5: テストを実行して通ることを確認**

Run: `npm test`
Expected: PASS（1 passed）

- [ ] **Step 6: コミット**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/notes.ts src/lib/notes.test.ts
git commit -m "test: vitestテスト基盤を導入（notesモジュールの器）"
```

---

### Task 2: メモ型 NoteEntry と 後方互換の移行関数

**Files:**
- Modify: `src/lib/notes.ts`
- Modify: `src/lib/notes.test.ts`

**Interfaces:**
- Produces:
  - `type NoteEntry = { text: string; updatedAt: string }`
  - `normalizeNote(raw: unknown): NoteEntry` — 旧`string`・新オブジェクト・不正値を `NoteEntry` に正規化
  - `normalizeNotes(raw: unknown): Record<string, NoteEntry>` — notes辞書全体を正規化

- [ ] **Step 1: 失敗するテストを書く**

`src/lib/notes.test.ts` に追記:
```ts
import { normalizeNote, normalizeNotes } from "./notes";

describe("normalizeNote", () => {
  it("旧string形式を text に移し updatedAt を空にする", () => {
    expect(normalizeNote("抵当権のメモ")).toEqual({ text: "抵当権のメモ", updatedAt: "" });
  });
  it("新オブジェクト形式はそのまま保つ", () => {
    const entry = { text: "都市計画法", updatedAt: "2026-07-21T01:00:00.000Z" };
    expect(normalizeNote(entry)).toEqual(entry);
  });
  it("不正値は空エントリにする", () => {
    expect(normalizeNote(null)).toEqual({ text: "", updatedAt: "" });
    expect(normalizeNote(42)).toEqual({ text: "", updatedAt: "" });
  });
});

describe("normalizeNotes", () => {
  it("辞書内の混在形式をすべて NoteEntry にそろえる", () => {
    const raw = { q1: "旧メモ", q2: { text: "新メモ", updatedAt: "2026-07-21T00:00:00.000Z" } };
    expect(normalizeNotes(raw)).toEqual({
      q1: { text: "旧メモ", updatedAt: "" },
      q2: { text: "新メモ", updatedAt: "2026-07-21T00:00:00.000Z" },
    });
  });
  it("非オブジェクトは空辞書にする", () => {
    expect(normalizeNotes(undefined)).toEqual({});
  });
});
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test`
Expected: FAIL（normalizeNote/normalizeNotes is not a function）

- [ ] **Step 3: 実装する**

`src/lib/notes.ts`（`notesModuleReady` は残してよい）:
```ts
export type NoteEntry = { text: string; updatedAt: string };

export const normalizeNote = (raw: unknown): NoteEntry => {
  if (typeof raw === "string") {
    return { text: raw, updatedAt: "" };
  }
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    const text = typeof obj.text === "string" ? obj.text : "";
    const updatedAt = typeof obj.updatedAt === "string" ? obj.updatedAt : "";
    return { text, updatedAt };
  }
  return { text: "", updatedAt: "" };
};

export const normalizeNotes = (raw: unknown): Record<string, NoteEntry> => {
  if (!raw || typeof raw !== "object") return {};
  const result: Record<string, NoteEntry> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    result[id] = normalizeNote(value);
  }
  return result;
};
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add src/lib/notes.ts src/lib/notes.test.ts
git commit -m "feat: メモ型NoteEntryと後方互換の移行関数（旧string→{text,updatedAt}）"
```

---

### Task 3: メモのマージ関数（端末間・updatedAt優先）

**Files:**
- Modify: `src/lib/notes.ts`
- Modify: `src/lib/notes.test.ts`

**Interfaces:**
- Consumes: `NoteEntry`, `normalizeNotes`（Task 2）
- Produces: `mergeNotes(local: unknown, remote: unknown): Record<string, NoteEntry>` — 両方を正規化し、問題IDごとに updatedAt の新しい方を採る。updatedAt が空同士なら非空テキストを優先。

- [ ] **Step 1: 失敗するテストを書く**

`src/lib/notes.test.ts` に追記:
```ts
import { mergeNotes } from "./notes";

describe("mergeNotes", () => {
  it("updatedAt が新しい方を採用する", () => {
    const local = { q1: { text: "新", updatedAt: "2026-07-21T05:00:00.000Z" } };
    const remote = { q1: { text: "旧", updatedAt: "2026-07-20T05:00:00.000Z" } };
    expect(mergeNotes(local, remote).q1.text).toBe("新");
  });
  it("remote だけにあるメモは残す", () => {
    const local = {};
    const remote = { q2: { text: "リモート", updatedAt: "2026-07-21T00:00:00.000Z" } };
    expect(mergeNotes(local, remote).q2.text).toBe("リモート");
  });
  it("updatedAt が空同士なら非空テキストを優先する", () => {
    const local = { q3: { text: "", updatedAt: "" } };
    const remote = { q3: { text: "中身あり", updatedAt: "" } };
    expect(mergeNotes(local, remote).q3.text).toBe("中身あり");
  });
  it("旧string形式が混ざっても移行してマージする", () => {
    const local = { q4: "ローカル旧" };
    const remote = {};
    expect(mergeNotes(local, remote).q4).toEqual({ text: "ローカル旧", updatedAt: "" });
  });
});
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test`
Expected: FAIL（mergeNotes is not a function）

- [ ] **Step 3: 実装する**

`src/lib/notes.ts` に追記:
```ts
export const mergeNotes = (
  local: unknown,
  remote: unknown,
): Record<string, NoteEntry> => {
  const localNotes = normalizeNotes(local);
  const remoteNotes = normalizeNotes(remote);
  const merged: Record<string, NoteEntry> = { ...remoteNotes };

  for (const [id, localEntry] of Object.entries(localNotes)) {
    const remoteEntry = merged[id];
    if (!remoteEntry) {
      merged[id] = localEntry;
      continue;
    }
    if (localEntry.updatedAt > remoteEntry.updatedAt) {
      merged[id] = localEntry;
    } else if (
      localEntry.updatedAt === remoteEntry.updatedAt &&
      !remoteEntry.text &&
      localEntry.text
    ) {
      merged[id] = localEntry;
    }
  }

  return merged;
};
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add src/lib/notes.ts src/lib/notes.test.ts
git commit -m "feat: 端末間メモマージ（updatedAt優先・旧形式も移行）"
```

---

### Task 4: 当日メモの書き出し整形

**Files:**
- Modify: `src/lib/notes.ts`
- Modify: `src/lib/notes.test.ts`

**Interfaces:**
- Consumes: `NoteEntry`（Task 2）
- Produces:
  - `type NoteExportItem = { heading: string; text: string; updatedAt: string }`
  - `buildStudyLogMarkdown(items: NoteExportItem[], dateKey: string): string` — 当日の見出し＋各メモを Markdown 化。items は呼び出し側で当日分に絞り込み済みとする（絞り込みロジックは純粋にするためTask 5でApp側が渡す）。空なら見出しと「（この日のメモはありません）」を返す。

- [ ] **Step 1: 失敗するテストを書く**

`src/lib/notes.test.ts` に追記:
```ts
import { buildStudyLogMarkdown } from "./notes";

describe("buildStudyLogMarkdown", () => {
  it("見出しと各メモをMarkdownにする", () => {
    const md = buildStudyLogMarkdown(
      [
        { heading: "抵当権（令和4年 問6）", text: "被担保債権の範囲を復習", updatedAt: "2026-07-21T05:00:00.000Z" },
        { heading: "都市計画法（令和3年12月 問15）", text: "用途地域の一覧を暗記", updatedAt: "2026-07-21T06:00:00.000Z" },
      ],
      "2026-07-21",
    );
    expect(md).toContain("# 学習ログ 2026-07-21");
    expect(md).toContain("## 抵当権（令和4年 問6）");
    expect(md).toContain("被担保債権の範囲を復習");
    expect(md).toContain("## 都市計画法（令和3年12月 問15）");
  });
  it("メモが無ければ不在メッセージを返す", () => {
    const md = buildStudyLogMarkdown([], "2026-07-21");
    expect(md).toContain("# 学習ログ 2026-07-21");
    expect(md).toContain("（この日のメモはありません）");
  });
});
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test`
Expected: FAIL（buildStudyLogMarkdown is not a function）

- [ ] **Step 3: 実装する**

`src/lib/notes.ts` に追記:
```ts
export type NoteExportItem = { heading: string; text: string; updatedAt: string };

export const buildStudyLogMarkdown = (
  items: NoteExportItem[],
  dateKey: string,
): string => {
  const header = `# 学習ログ ${dateKey}`;
  if (items.length === 0) {
    return `${header}\n\n（この日のメモはありません）\n`;
  }
  const body = items
    .map((item) => `## ${item.heading}\n\n${item.text}\n`)
    .join("\n");
  return `${header}\n\n${body}`;
};
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add src/lib/notes.ts src/lib/notes.test.ts
git commit -m "feat: 当日メモの書き出しMarkdown整形"
```

---

### Task 5: App.tsx をメモ型移行に配線する

**Files:**
- Modify: `src/App.tsx`（ProgressState型 L48-53、loadProgress L254-255、saveNote L1398-1406、currentNote L803、note_count集計 L692-693/L1554-1555/L1564）

**Interfaces:**
- Consumes: `NoteEntry`, `normalizeNotes`, `NoteExportItem`, `buildStudyLogMarkdown`（Task 2-4）
- Produces: `notes: Record<string, NoteEntry>` を使う App 状態

- [ ] **Step 1: import と型を変更**

`src/App.tsx` 冒頭の import 群に追加:
```ts
import {
  normalizeNotes,
  buildStudyLogMarkdown,
  type NoteEntry,
  type NoteExportItem,
} from "./lib/notes";
```

`ProgressState` の notes 行を変更:
```ts
  notes: Record<string, NoteEntry>;
```

- [ ] **Step 2: loadProgress の notes を正規化に差し替え**

`src/App.tsx` L254-255 の
```ts
      notes:
        parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
```
を
```ts
      notes: normalizeNotes(parsed.notes),
```
に変更。

- [ ] **Step 3: currentNote 参照を .text に変更**

L803
```ts
  const currentNote = progress.notes[currentQuestion.id] ?? "";
```
を
```ts
  const currentNote = progress.notes[currentQuestion.id]?.text ?? "";
```
に変更。

- [ ] **Step 4: saveNote が updatedAt を刻むよう変更**

saveNote（L1398付近）を:
```ts
  const saveNote = (value: string) => {
    updateProgress((previous) => ({
      ...previous,
      notes: {
        ...previous.notes,
        [currentQuestion.id]: {
          text: value,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  };
```
に変更。

- [ ] **Step 5: note_count 集計を .text 参照に変更**

L692-693 / L1554-1555 / L1564 の3箇所、`progress.notes[id]`（真偽判定）を `progress.notes[id]?.text` に変更する。例:
```ts
              (id) => progress.notes[id]?.text,
```
（3箇所すべて同様に `.text` を付ける）

- [ ] **Step 6: ビルドで型エラーが無いことを確認**

Run: `npm run build`
Expected: 型エラーなしでビルド成功

- [ ] **Step 7: コミット**

```bash
git add src/App.tsx
git commit -m "refactor: App.tsxのメモをNoteEntry型に移行（日時付与・後方互換）"
```

---

### Task 6: firebase.ts の同期をメモ型移行に配線する

**Files:**
- Modify: `src/firebase.ts`（SyncedProgress型 L239-244、mergeSyncedProgress の notes マージ L270-276）

**Interfaces:**
- Consumes: `mergeNotes`, `NoteEntry`（Task 2-3）
- Produces: notes を `Record<string, NoteEntry>` で同期する Firestore 層

- [ ] **Step 1: import と型を変更**

`src/firebase.ts` 冒頭付近に追加:
```ts
import { mergeNotes, type NoteEntry } from "./lib/notes";
```

`SyncedProgress` の notes 行（L241）を変更:
```ts
  notes?: Record<string, NoteEntry>;
```

- [ ] **Step 2: mergeSyncedProgress の notes マージを mergeNotes に差し替え**

L270-276 の
```ts
  const notes: Record<string, string> = { ...(remote.notes ?? {}) };

  for (const [id, note] of Object.entries(local.notes ?? {})) {
    if (note) {
      notes[id] = note;
    }
  }
```
を
```ts
  const notes = mergeNotes(local.notes, remote.notes);
```
に変更。

- [ ] **Step 3: ビルドで型エラーが無いことを確認**

Run: `npm run build`
Expected: 型エラーなしでビルド成功

- [ ] **Step 4: 既存テストが壊れていないことを確認**

Run: `npm test`
Expected: PASS（全テスト）

- [ ] **Step 5: コミット**

```bash
git add src/firebase.ts
git commit -m "refactor: Firestore同期のメモをNoteEntry型に移行（mergeNotes利用）"
```

---

### Task 7: 「今日の学習を書き出す」UIを追加する

**Files:**
- Modify: `src/App.tsx`（自分メモの `<label>` セクション L2264付近の近くにボタン追加、ハンドラを追加）

**Interfaces:**
- Consumes: `buildStudyLogMarkdown`, `NoteExportItem`（Task 4）、`localDateKey`（既存 L121）、`takkenQuestions`（既存）、`progress.notes`（NoteEntry型）
- Produces: なし（UI操作）

- [ ] **Step 1: 書き出しハンドラを追加**

`src/App.tsx` の saveNote の近くに追加。当日 `updatedAt` のメモだけを拾い、問題の年度・番号・カテゴリで見出しを作る:
```ts
  const exportTodayStudyLog = () => {
    const todayKey = localDateKey(new Date());
    const items: NoteExportItem[] = [];
    for (const question of takkenQuestions) {
      const entry = progress.notes[question.id];
      if (!entry || !entry.text.trim() || !entry.updatedAt) continue;
      if (localDateKey(new Date(entry.updatedAt)) !== todayKey) continue;
      items.push({
        heading: `${question.category}（${question.year} 問${question.number}）`,
        text: entry.text,
        updatedAt: entry.updatedAt,
      });
    }
    const markdown = buildStudyLogMarkdown(items, todayKey);
    void navigator.clipboard.writeText(markdown).then(
      () => window.alert(`今日の学習ログ（${items.length}件）をコピーしました。docs/study-log/${todayKey}.md に貼り付けてください。`),
      () => window.prompt("以下をコピーしてください", markdown),
    );
  };
```

- [ ] **Step 2: 自分メモセクションの下にボタンを追加**

L2264付近、自分メモの `</label>` の直後に追加:
```tsx
            <button
              className="mt-2 min-h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700"
              onClick={exportTodayStudyLog}
              type="button"
            >
              今日の学習を書き出す
            </button>
```

- [ ] **Step 3: ビルドで型エラーが無いことを確認**

Run: `npm run build`
Expected: 型エラーなしでビルド成功

- [ ] **Step 4: 開発サーバで動作確認（手動）**

Run: `npm run dev` を起動し、メモを書いて「今日の学習を書き出す」を押す。クリップボードに Markdown が入り、alert が出ることを確認。確認後サーバ停止。

- [ ] **Step 5: コミット**

```bash
git add src/App.tsx
git commit -m "feat: 今日の学習ログを書き出すボタン（当日メモをMarkdownでコピー）"
```

---

### Task 8: study-log ディレクトリの土台

**Files:**
- Create: `docs/study-log/README.md`

**Interfaces:**
- Produces: 書き出し先ディレクトリと使い方の説明

- [ ] **Step 1: README を作る**

`docs/study-log/README.md`:
```markdown
# 学習ログ置き場

アプリの「今日の学習を書き出す」でコピーした内容を、この下に `YYYY-MM-DD.md` で保存する。
このファイル群を Claude Code が git ログと一緒に読み、X用・Note用の発信素材を生成する。

- 保存形式: `2026-07-21.md`
- 中身: 問題ごとの見出し＋その日のメモ本文（アプリが自動整形）
```

- [ ] **Step 2: コミット**

```bash
git add docs/study-log/README.md
git commit -m "docs: 学習ログ置き場（study-log/）の土台"
```

---

### Task 9: 発信スキルを AI-HQ に作る（B）

**Files:**
- Create: `/Users/changju1109/.claude/skills/study-log-broadcast/SKILL.md`（※既存スキルの置き場に合わせる。無ければ AI-HQ/skills/ 等、リポジトリのスキル慣例に従う）

**Interfaces:**
- Consumes: 対象リポジトリの `git log`、`docs/study-log/YYYY-MM-DD.md`、AI-HQ正史（brand-intelligence・署名経済・発信ログ）
- Produces: `AI-HQ/outputs/broadcast/YYYY-MM-DD-x.md`、`AI-HQ/outputs/broadcast/YYYY-MM-DD-note.md`、`AI-HQ/outputs/broadcast/broadcast-log.md` 追記

- [ ] **Step 1: スキルの置き場所を確認**

Run: `ls /Users/changju1109/.claude/skills/ | head` と `ls /Users/changju1109/AICompany/AI-HQ/ | grep -i skill`
Expected: 既存スキルの置き方（SKILL.md 形式か）を確認し、それに合わせる。

- [ ] **Step 2: SKILL.md を書く**

内容の骨子（実際の文面はスキル慣例に合わせて記述）:
- 名前・説明・発動トリガー（「今日の発信素材を作って」「学習ログ発信」等）
- 入力: 対象リポジトリのパス、日付（省略時は当日）
- 手順:
  1. `git -C <repo> log --since=<date> --until=<date+1> --pretty` で当日コミットを読む
  2. `<repo>/docs/study-log/<date>.md` を読む（無ければメモ無しとして続行）
  3. `AI-HQ/brand-intelligence.md` と `AI-HQ/wiki/queries/ai-jidai-shinrai-zandaka-positioning.md` を読み、トーンを合わせる
  4. `AI-HQ/outputs/broadcast/broadcast-log.md` を読み、既発信と重複しないようにする
  5. X用素材（短い観察者投稿・複数案・"AIが運用中"明示）を `YYYY-MM-DD-x.md` に生成
  6. Note用素材（総まとめに束ねる段落）を `YYYY-MM-DD-note.md` に生成
  7. 編集長レビュアーを通す
  8. broadcast-log.md に「生成日・媒体・要旨・ステータス=未投稿」を1行追記
- 規律: 投稿はしない（coworkとCEOの領分）。建設系発信の炎上防止3型を守る。事実は情報源明記。

- [ ] **Step 3: broadcast ディレクトリの土台を作る**

`AI-HQ/outputs/broadcast/broadcast-log.md`:
```markdown
# 発信ログ（いつ・どの媒体に・何を発信したか）

| 日付 | 媒体 | 要旨 | ステータス | URL |
|---|---|---|---|---|
```

- [ ] **Step 4: スキルを実データで1回試走する**

このリポジトリの当日 git ログと（あれば）study-log を入力に、スキルを走らせて `x.md` / `note.md` が生成され broadcast-log.md に1行残ることを確認。生成物はドラフト（投稿しない）。

- [ ] **Step 5: コミット**

```bash
# .claude 側とAICompany側は別リポジトリなのでそれぞれコミット
git add AI-HQ/outputs/broadcast/broadcast-log.md
git commit -m "feat: 発信スキルの出力先（broadcast/）と発信ログ台帳"
```

---

## Self-Review

**Spec coverage:**
- A-1 メモに日時 → Task 2,5,6 ✓
- A-2 書き出し → Task 4,7,8 ✓
- A-3 テスト → Task 1-4（純粋関数をTDD）✓
- B 発信スキル → Task 9 ✓
- C 発信ログ → Task 9（broadcast-log.md）✓
- 役割分担（cowが投稿）→ スキルの規律に明記 ✓

**Placeholder scan:** Task 9 の SKILL.md 文面は「スキル慣例に合わせる」としており、Step 1 で置き場所を確認してから書く前提。ここだけ実ファイル確認が要るため探索ステップを先頭に置いた。他タスクは完全コード記載済み。

**Type consistency:** `NoteEntry`（Task2）を Task5/6/7 が一貫使用。`buildStudyLogMarkdown(items, dateKey)`（Task4）を Task7 が同シグネチャで呼ぶ。`mergeNotes`（Task3）を Task6 が使用。整合。

**依存順:** Task 1→2→3→4（純粋関数、テスト先行）→5,6（App/firebase配線）→7（UI）→8（土台）→9（スキル）。5と6はどちらもnotes型に依存するが互いに独立。7は4と5に依存。
