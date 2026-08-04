// 時期に応じた出題ペーシング。
//
// 試験日までの残日数からフェーズ（基礎固め期／直前期）を決め、
// 未回答問題を科目重み付きラウンドロビンで1本の出題順に混ぜる。
// 乱数を使わない決定的な並びで、同じ入力なら常に同じ順序になる。
// 重みの根拠と出典は src/data/studyGuide.ts と設計書
// docs/superpowers/specs/2026-08-04-priority-pacing-design.md を参照。

import {
  CRAM_START_DAYS,
  pacingPhases,
  studyOrderByCategory,
  type PacingPhase,
} from "../data/studyGuide";

export const phaseForDaysToExam = (daysToExam: number): PacingPhase =>
  daysToExam > CRAM_START_DAYS ? pacingPhases[0] : pacingPhases[1];

// 未回答問題列をペーシング順に並べ替える。
// キー = (科目内順位 + 1) ÷ 科目の重み。キー昇順で、重み0はキー∞＝最後尾。
// 同キーは科目順（studyOrder）→入力順で安定タイブレークするため、
// 科目内の相対順（呼び出し側の年度・問番号順）はそのまま保たれる。
export const sortByPacing = <T extends { category: string }>(
  questions: readonly T[],
  daysToExam: number,
): T[] => {
  const { weights } = phaseForDaysToExam(daysToExam);
  const seenInCategory: Record<string, number> = {};

  return questions
    .map((question, index) => {
      const rank = (seenInCategory[question.category] =
        (seenInCategory[question.category] ?? 0) + 1);
      const weight = weights[question.category] ?? 0;
      return {
        question,
        index,
        key: weight > 0 ? rank / weight : Number.POSITIVE_INFINITY,
      };
    })
    .sort((a, b) => {
      if (a.key !== b.key) return a.key - b.key;
      const orderDiff =
        studyOrderByCategory(a.question.category) -
        studyOrderByCategory(b.question.category);
      if (orderDiff !== 0) return orderDiff;
      return a.index - b.index;
    })
    .map((entry) => entry.question);
};
