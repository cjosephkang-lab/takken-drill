// 回答イベント・肢別○×の記録・高確信誤答の判定。
// App.tsx の ProgressState に足す新しい要素の純粋関数をここに集める。
// 仕様: docs/superpowers/specs/2026-09-09-ai-learning-features-design.md

/** 1回の回答。夜間バッチ（scripts/ai-insights.py）が誤答の原因を推定する材料。 */
export type AnswerEvent = {
  /** 問題ID */
  q: string;
  /** 選んだ肢 1-4 */
  c: number;
  /** 正解か */
  ok: boolean;
  /** 自信なし印 */
  u: boolean;
  /** 問題表示から回答までのミリ秒 */
  ms: number;
  /** ISO時刻。端末間マージのキー */
  at: string;
  /** 通常ドリル / 模試 / 混同ペアの比較モード */
  src: "drill" | "mock" | "pair";
};

/** 肢別○×の記録。キーは "問題ID#肢番号"。 */
export type ChoiceRecord = {
  ok: boolean;
  attempts: number;
  lapses: number;
  answeredAt: string;
};

/** イベントは直近この件数まで持つ（1問あたり約80バイト。Firestore 1MB制限に余裕を残す）。 */
export const EVENT_LIMIT = 2000;

const isEvent = (value: unknown): value is AnswerEvent => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.q === "string" &&
    typeof v.c === "number" &&
    typeof v.ok === "boolean" &&
    typeof v.u === "boolean" &&
    typeof v.ms === "number" &&
    typeof v.at === "string" &&
    (v.src === "drill" || v.src === "mock" || v.src === "pair")
  );
};

export const normalizeEvents = (raw: unknown): AnswerEvent[] =>
  Array.isArray(raw) ? raw.filter(isEvent) : [];

const trimEvents = (events: AnswerEvent[]): AnswerEvent[] =>
  events.length > EVENT_LIMIT
    ? events.slice(events.length - EVENT_LIMIT)
    : events;

/** at で和集合を取り時刻順に並べる。同じ at は片方だけ残す。 */
export const mergeEvents = (local: unknown, remote: unknown): AnswerEvent[] => {
  const byAt = new Map<string, AnswerEvent>();
  for (const e of normalizeEvents(remote)) byAt.set(e.at, e);
  for (const e of normalizeEvents(local)) byAt.set(e.at, e);
  const merged = Array.from(byAt.values()).sort((a, b) =>
    a.at < b.at ? -1 : a.at > b.at ? 1 : 0,
  );
  return trimEvents(merged);
};

export const appendEvent = (
  events: AnswerEvent[],
  event: AnswerEvent,
): AnswerEvent[] => trimEvents([...events, event]);

const isChoiceRecord = (value: unknown): value is ChoiceRecord => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.ok === "boolean" &&
    typeof v.attempts === "number" &&
    typeof v.lapses === "number" &&
    typeof v.answeredAt === "string"
  );
};

export const normalizeChoiceRecords = (
  raw: unknown,
): Record<string, ChoiceRecord> => {
  if (!raw || typeof raw !== "object") return {};
  const result: Record<string, ChoiceRecord> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (isChoiceRecord(value)) result[key] = value;
  }
  return result;
};

export const updateChoiceRecord = (
  previous: ChoiceRecord | undefined,
  ok: boolean,
  answeredAt: string,
): ChoiceRecord => ({
  ok,
  attempts: (previous?.attempts ?? 0) + 1,
  lapses: (previous?.lapses ?? 0) + (ok ? 0 : 1),
  answeredAt,
});

/** 端末間マージ: 肢ごとに answeredAt が新しい方を採る。 */
export const mergeChoiceRecords = (
  local: unknown,
  remote: unknown,
): Record<string, ChoiceRecord> => {
  const result = normalizeChoiceRecords(remote);
  for (const [key, record] of Object.entries(normalizeChoiceRecords(local))) {
    const other = result[key];
    if (!other || record.answeredAt >= other.answeredAt) {
      result[key] = record;
    }
  }
  return result;
};

/**
 * 「自信があったのに間違えた」。自信なし印なしの不正解。
 * 4択で勘が外れたのではなく、誤った記憶で確信して外した問題なので、
 * 本番で最も失点しやすい。復習キューの先頭に出す。
 */
export const isConfidentWrong = (
  record: { correct: boolean; unsure?: boolean } | undefined,
): boolean => Boolean(record && !record.correct && !record.unsure);
