// 肢別○×モードの出題順。
// 優先: 間違えた問題の肢 → 自信なしで答えた問題の肢 → ○×で外した肢 → 未着手の肢 → 残り。
// 同じ優先度の中では問題をまたいで混ぜる（同じ問題の4肢を続けて出すと、
// 前の肢から答えが推測できてしまい想起練習にならない）。

import type { TakkenQuestion } from "../data/questions";
import { studyOrderByCategory } from "../data/studyGuide";
import { choiceStatementsOf, type ChoiceStatement } from "./choiceStatements";
import type { ChoiceRecord } from "./progressExtras";

export type QueueAnswerInput = Record<
  string,
  { correct: boolean; lapses: number; unsure?: boolean }
>;

/** 文字列から決定的な擬似乱数（0〜1）。同じ肢は同じ位置に来るので並びが安定する。 */
const hashUnit = (text: string, salt: string): number => {
  let h = 2166136261;
  const s = salt + text;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
};

const bucketOf = (
  answer: QueueAnswerInput[string] | undefined,
  record: ChoiceRecord | undefined,
): number => {
  if (answer && answer.lapses > 0) return 0;
  if (answer?.unsure) return 1;
  if (record && record.lapses > 0) return 2;
  if (!record) return 3;
  return 4;
};

export const buildChoiceQueue = (
  questions: TakkenQuestion[],
  answers: QueueAnswerInput,
  choiceRecords: Record<string, ChoiceRecord>,
  options: { category?: string; salt?: string } = {},
): ChoiceStatement[] => {
  const salt = options.salt ?? "";
  const items: { statement: ChoiceStatement; sortKey: number[] }[] = [];

  for (const question of questions) {
    if (options.category && question.category !== options.category) continue;
    const statements = choiceStatementsOf(question);
    if (!statements) continue;
    const answer = answers[question.id];
    for (const statement of statements) {
      const record = choiceRecords[statement.key];
      const bucket = bucketOf(answer, record);
      // 間違えた問題は間違えた回数が多い順、未着手は合格者の鉄則順（科目順）を先に。
      const secondary =
        bucket === 0
          ? -(answer?.lapses ?? 0)
          : bucket === 3
            ? studyOrderByCategory(question.category)
            : 0;
      items.push({
        statement,
        sortKey: [bucket, secondary, hashUnit(statement.key, salt)],
      });
    }
  }

  items.sort((a, b) => {
    for (let i = 0; i < a.sortKey.length; i += 1) {
      if (a.sortKey[i] !== b.sortKey[i]) return a.sortKey[i] - b.sortKey[i];
    }
    return 0;
  });

  return items.map((item) => item.statement);
};

export const countChoiceProgress = (
  questions: TakkenQuestion[],
  choiceRecords: Record<string, ChoiceRecord>,
): { total: number; answered: number; wrong: number } => {
  let total = 0;
  let answered = 0;
  let wrong = 0;
  for (const question of questions) {
    const statements = choiceStatementsOf(question);
    if (!statements) continue;
    for (const statement of statements) {
      total += 1;
      const record = choiceRecords[statement.key];
      if (record) {
        answered += 1;
        if (!record.ok) wrong += 1;
      }
    }
  }
  return { total, answered, wrong };
};
