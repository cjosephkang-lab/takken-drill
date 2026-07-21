# AIコーチのアドバイスページ — 設計書

作成日: 2026-07-21

## 目的

学習者（アプリ利用者本人）が「今のペースで本試験に間に合うか」を一目で判断でき、
「今日必ずやること」まで具体的に示される画面を作る。内容は Claude Code（私）が
Firestore の進捗を読んで生成し、Firestore の専用ドキュメントに書き込む。アプリは
それを読んで表示するだけで、アプリ側に AI 呼び出しも API キーも持たない。

## スコープの前提（今回の決定事項）

- **自分専用**。対象は自分の uid ひとつだけ。他ユーザーへの公開はしない。
- **AI 生成は Claude Code が外部から手動で行う**。アプリからの Claude API 呼び出し・
  Cloud Functions・API キーの埋め込みはしない（将来 cron 化する余地は残すが今回は対象外）。
- アプリの役割は「書かれたアドバイスを読んで表示する」ことに徹する。

## 全体像（データの流れ）

```
Claude Code → Firestore progress/{uid} を読む
            → 間に合うか判定＋アドバイス＋今日やることを生成
            → Firestore coaching/{uid} に書き込む（ADC / Admin 権限で）
アプリ      → coaching/{uid} を購読 → 「コーチ」ページに表示
```

## データモデル: `coaching/{uid}`

```ts
type Coaching = {
  generatedAt: string;   // ISO8601。いつ生成したか。古さ表示に使う
  examDate: string;      // 判定に使った試験日（YYYY-MM-DD）
  verdict: "green" | "yellow" | "red";  // 間に合うかの信号
  verdictLine: string;   // 信号の一言説明
  headline: string;      // その日の要点1行
  advice: string;        // 現状分析と方針（3〜5行、改行込みプレーンテキスト）
  todayMustDo: Array<{
    label: string;       // 今日やること（チェック可能な粒度の見出し）
    detail: string;      // 補足（対象の問題IDや狙いなど）
  }>;
};
```

- アプリ側では `todayMustDo` のチェック状態は保持しない（表示専用。日々更新されるため）。
  将来チェックを永続化したくなったら別ドキュメントに切る。

## 判定ロジック（green / yellow / red）

judge に使う材料は既存の `src/data/studyGuide.ts`（合格ライン・科目別満点・目標点）と
進捗から出す想定合計、試験日までの残り日数。

- **想定合計**: 各科目 `round(正答率 × 満点)` の合計（既存 `categoryStats` と同じ式）。
- **残り必要ペース**: 未回答は2回・回答済み未習得は1回解く必要がある近似で残回答回数を見積もり、
  残り日数で割って1日あたり必要問題数を出す（既存の逆算ペースと同じ考え方）。

色の基準（設計時点の暫定。生成のたびに Claude Code が数値を添えて説明する）:

| 色 | 意味 | 目安 |
|----|------|------|
| green | 順調 | 想定合計が安全圏38点付近、または必要ペースが無理なく回っている |
| yellow | 巻き返し可能圏 | 想定が合格ライン(33点)を下回るが、残り日数×現実的ペースで届く |
| red | 危険 | 残り日数で必要ペースが非現実的、または未着手科目が多く時間切れ濃厚 |

判定は Claude Code が生成時に数値根拠付きで `verdictLine` に書く。アプリは色と文を表示するだけ。

## コンポーネント（3つ）

### 1. `src/firebase.ts` に読み書き2関数を追加
- `fetchCoaching(uid): Promise<Coaching | null>` — 既存 `fetchSyncedProgress` と同型。
- `subscribeCoaching(uid, cb)` — もしくは fetch のみで可。まず fetch のみで実装し、
  リアルタイム購読は不要なら足さない（YAGNI）。
- 書き込み関数はアプリには置かない（Claude Code が REST/Admin で書くため）。

### 2. `src/App.tsx` に「コーチ」ページ
- 既存の導線（今日やる／ほかの学習／成績を見る）と並ぶ入口を1つ増やす。
- 表示要素:
  - 信号色バッジ＋ `verdictLine`
  - `headline`
  - `advice`（本文）
  - `todayMustDo` のチェックリスト（label＋detail。チェックは非永続で見た目だけ）
  - `generatedAt` を「◯月◯日 生成」と表示。数日古ければ「更新されていません」と注意を出す。
- 未ログイン時 / データ未生成時のからの状態: 「まだアドバイスがありません」を出す。

### 3. `firestore.rules` に `coaching/{uid}` を追加
- 本人のみ read 可能。
  ```
  match /coaching/{uid} {
    allow read: if request.auth != null && request.auth.uid == uid;
  }
  ```
- write はルール上許可しない（Claude Code は ADC の Admin 権限でルールをバイパスして書く）。

## スコープ外（やらないこと）

- Cloud Functions・API キー・アプリからの AI 呼び出し
- 他ユーザーへの公開
- 自動毎日更新（まず手動生成。回ると分かってから cron 化を検討）
- `todayMustDo` チェック状態の永続化

## オープン: 生成の運用

初回は Claude Code が手動で `coaching/{uid}` を書き込む。毎日更新は当面手動。
運用が固まったら launchd / cron で日次自動生成に載せるかを別途判断する（今回の実装対象外）。
