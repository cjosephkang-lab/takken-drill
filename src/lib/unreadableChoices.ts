// 令和4年度・令和3年度12月はスキャンPDFのOCRから問題文を復元しており、
// 原文が失われた箇所は questionText に判読不能の注記が入っている（推測で埋めない方針）。
// その注記が「正解の選択肢」の行に入っている問は、消去法でしか解けないため学習前に知らせる。
import type { TakkenQuestion } from "../data/questions";

const UNREADABLE_MARK = "OCRで判読できませんでした";

const choiceLine = (text: string, choice: number): string | null => {
  const match = text.match(new RegExp(`^${choice} (.*)$`, "m"));
  return match ? match[1] : null;
};

/** 正解の選択肢がOCRで判読できず、正解を選べない問かどうか。 */
export const hasUnreadableCorrectChoice = (question: TakkenQuestion): boolean =>
  !question.isAllCorrect &&
  question.correctChoices.some((choice) =>
    choiceLine(question.questionText, choice)?.includes(UNREADABLE_MARK),
  );

/** その年度に、正解を選べない問がいくつあるか。模試の得点への影響を伝えるために使う。 */
export const countUnreadableCorrectChoices = (
  questions: readonly TakkenQuestion[],
  examId: string,
): number =>
  questions.filter(
    (question) =>
      question.examId === examId && hasUnreadableCorrectChoice(question),
  ).length;
