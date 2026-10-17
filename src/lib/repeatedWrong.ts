// 「何度も間違えた問題」のうち、まだ定着していないものの判定。
//
// 通算2回以上間違えた問題でも、その後に定着したものは出さない。出し続けると答えの番号を覚えてしまい、
// 正解しても理解の確認にならないため（2026-10-17 CEO指摘）。
// 定着とみなすのは次のどちらか:
//   - 4択で2回続けて、自信ありで正解した（streak は自信なしの正解で0に戻る）
//   - 最後に4択で解いた後に、肢別○×で全部の肢を正解した（番号の暗記では解けない確認）
import type { TakkenQuestion } from "../data/questions";
import { choiceStatementsOf } from "./choiceStatements";
import type { ChoiceRecord } from "./progressExtras";

export const REPEATED_WRONG_LAPSES = 2;
export const SETTLED_STREAK = 2;

export type RepeatedWrongAnswer = {
  lapses: number;
  streak?: number;
  answeredAt?: string;
};

export const isUnsettledRepeatedWrong = (
  question: TakkenQuestion,
  answer: RepeatedWrongAnswer | undefined,
  choiceRecords: Record<string, ChoiceRecord>,
): boolean => {
  if (!answer || answer.lapses < REPEATED_WRONG_LAPSES) return false;
  if ((answer.streak ?? 0) >= SETTLED_STREAK) return false;
  const statements = choiceStatementsOf(question);
  const clearedByChoices =
    statements !== null &&
    statements.every((statement) => {
      const record = choiceRecords[statement.key];
      return (
        Boolean(record?.ok) &&
        (!answer.answeredAt ||
          Date.parse(record!.answeredAt) > Date.parse(answer.answeredAt))
      );
    });
  return !clearedByChoices;
};
