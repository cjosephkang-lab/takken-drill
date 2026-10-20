// 初見換算の予測得点（2026-10-19）。
//
// 令和8年度は、ドリルの予想点48.3点に対して本番は32点だった。予想点を「各問題の最後の1回の正誤」で
// 出していたため、同じ問題を繰り返すほど正答率が水増しされた（答えの番号を覚える）。
// そこで、各問題を初めて解いた時の正誤だけを証拠にし、論点ごとの出題数で重み付けして50問に積み上げる。
// 根拠: docs/retrospective/2026-10-19-mastery-metric-research.md（スタディングのAI実力スコアと同じ積み上げ型）。
//
//   予測 = Σ_科目 Σ_論点 w_k × p_k
//   w_k = 科目の配点 × （その科目の過去問のうち論点kの問題の割合）
//   p_k = （論点kの初回正解数 + m × 科目の初回正答率）÷（論点kの初回解答数 + m）  … 少ないデータを科目全体に寄せる
//   幅  = 本番1回のばらつき（Σ w_k p_k(1−p_k)）と推定のばらつき（Σ w_k² p_k(1−p_k)/(n_k+m)）を足した分散から、80%の範囲

import type { AnswerEvent } from "./progressExtras";

/** 少ないデータを科目全体の初回正答率に寄せる強さ（問題数に相当）。 */
export const PRIOR_WEIGHT = 3;
/** 80%の範囲を出すための標準正規分布の値。 */
const Z80 = 1.2816;

export type FirstAttemptRecord = {
  correct: boolean;
  attempts: number;
  /** 初めて解いた時の正誤（2026-10-19以降の記録に残る）。 */
  firstCorrect?: boolean;
};

/** 初めて解いた時の正誤。特定できなければ null（最後の正誤では代用しない）。 */
export const firstAttemptOutcome = (
  record: FirstAttemptRecord,
  eventsForQuestion: AnswerEvent[],
): boolean | null => {
  if (typeof record.firstCorrect === "boolean") return record.firstCorrect;
  if (record.attempts === 1) return record.correct;
  if (
    eventsForQuestion.length > 0 &&
    eventsForQuestion.length === record.attempts
  ) {
    const first = [...eventsForQuestion].sort((a, b) =>
      a.at < b.at ? -1 : 1,
    )[0];
    return first.ok;
  }
  return null;
};

export type PredictInput = {
  questions: { id: string; category: string }[];
  answers: Record<string, FirstAttemptRecord | undefined>;
  events: AnswerEvent[];
  topicOf: (questionId: string) => string | undefined;
  categories: { category: string; fullMarks: number }[];
};

export type CategoryPrediction = {
  category: string;
  fullMarks: number;
  /** 予測点。初回の記録が1件もない科目は null。 */
  expected: number | null;
  /** 初回の記録の件数。 */
  evidence: number;
};

export type Prediction = {
  total: number;
  low: number;
  high: number;
  byCategory: CategoryPrediction[];
  evidenceCount: number;
};

const round1 = (v: number) => Math.round(v * 10) / 10;

export const predictScore = (input: PredictInput): Prediction => {
  const eventsByQuestion = new Map<string, AnswerEvent[]>();
  for (const e of input.events) {
    if (e.src === "mock") continue; // 模試は ms=0 で時刻をずらして入れているので初回の判定に使わない
    const list = eventsByQuestion.get(e.q) ?? [];
    list.push(e);
    eventsByQuestion.set(e.q, list);
  }

  let mean = 0;
  let variance = 0;
  let evidenceCount = 0;
  const byCategory: CategoryPrediction[] = [];

  for (const cat of input.categories) {
    const inCategory = input.questions.filter(
      (q) => q.category === cat.category,
    );
    const topics = new Map<
      string,
      { count: number; tried: number; ok: number }
    >();
    for (const q of inCategory) {
      const topic = input.topicOf(q.id) ?? "_";
      const t = topics.get(topic) ?? { count: 0, tried: 0, ok: 0 };
      t.count += 1;
      const record = input.answers[q.id];
      if (record) {
        const first = firstAttemptOutcome(
          record,
          eventsByQuestion.get(q.id) ?? [],
        );
        if (first !== null) {
          t.tried += 1;
          if (first) t.ok += 1;
        }
      }
      topics.set(topic, t);
    }

    const tried = [...topics.values()].reduce((s, t) => s + t.tried, 0);
    const ok = [...topics.values()].reduce((s, t) => s + t.ok, 0);
    evidenceCount += tried;
    if (tried === 0 || inCategory.length === 0) {
      byCategory.push({
        category: cat.category,
        fullMarks: cat.fullMarks,
        expected: null,
        evidence: 0,
      });
      continue;
    }
    const prior = (ok + 1) / (tried + 2);
    let catMean = 0;
    for (const t of topics.values()) {
      const w = (cat.fullMarks * t.count) / inCategory.length;
      const p = (t.ok + PRIOR_WEIGHT * prior) / (t.tried + PRIOR_WEIGHT);
      catMean += w * p;
      variance +=
        w * p * (1 - p) + (w * w * p * (1 - p)) / (t.tried + PRIOR_WEIGHT);
    }
    mean += catMean;
    byCategory.push({
      category: cat.category,
      fullMarks: cat.fullMarks,
      expected: round1(catMean),
      evidence: tried,
    });
  }

  const sd = Math.sqrt(variance);
  const full = input.categories.reduce((s, c) => s + c.fullMarks, 0);
  return {
    total: round1(mean),
    low: round1(Math.max(0, mean - Z80 * sd)),
    high: round1(Math.min(full, mean + Z80 * sd)),
    byCategory,
    evidenceCount,
  };
};
