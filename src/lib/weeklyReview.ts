// 週1回の復習の対象（2026-10-19）。
//
// 建設業経理士の勉強を優先する期間（2026年11月〜2027年3月）、宅建は週1回30分だけ回して知識を保つ。
// 出すのは次のどちらか:
//   - 本番（令和8年度）で落とした論点の過去問のうち、まだ定着していないもの
//     （未回答、最後に間違えた、または3回続けて自信ありで正解していない）
//   - 2回以上間違えて、まだ定着していない問題（src/lib/repeatedWrong.ts と同じ判定）
import type { TakkenQuestion } from "../data/questions";
import { questionTopics } from "../data/topicTags";
import { droppedTopicIds } from "../data/droppedTopics";
import type { ChoiceRecord } from "./progressExtras";
import { isUnsettledRepeatedWrong } from "./repeatedWrong";

/** この回数続けて自信ありで正解したら、落とした論点でも週1回の復習から外す。 */
export const WEEKLY_SETTLED_STREAK = 3;

export type WeeklyReviewAnswer = {
  correct: boolean;
  streak?: number;
  lapses: number;
  answeredAt?: string;
};

export const isWeeklyReviewTarget = (
  question: TakkenQuestion,
  answer: WeeklyReviewAnswer | undefined,
  choiceRecords: Record<string, ChoiceRecord>,
): boolean => {
  if (isUnsettledRepeatedWrong(question, answer, choiceRecords)) return true;
  if (!droppedTopicIds.has(questionTopics[question.id])) return false;
  if (!answer) return true;
  if (!answer.correct) return true;
  return (answer.streak ?? 0) < WEEKLY_SETTLED_STREAK;
};
