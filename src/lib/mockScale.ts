// 50問そろわない模試の換算（2026-10-19）。
// 法改正で今の法律と正誤が変わる問題は載せないため、年度によっては模試が50問より少なくなる。
// 本番の時間配分と合格ラインで比べられるよう、時間・得点・科目目標を問題数に比例させる。

const FULL_QUESTIONS = 50;
const FULL_MINUTES = 120;

const round1 = (value: number) => Math.round(value * 10) / 10;

/** 制限時間（分）。50問で120分の本番と同じペースにする。 */
export const mockMinutes = (questionCount: number): number =>
  Math.round((FULL_MINUTES * questionCount) / FULL_QUESTIONS);

/** 得点を50問満点に換算する。 */
export const toFullScale = (score: number, questionCount: number): number =>
  questionCount === 0 ? 0 : round1((score * FULL_QUESTIONS) / questionCount);

/** 科目の目標点を、その模試での出題数に比例させる。 */
export const scaleTarget = (
  targetScore: number,
  questionsInCategory: number,
  fullMarks: number,
): number => round1((targetScore * questionsInCategory) / fullMarks);
