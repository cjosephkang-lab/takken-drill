// 肢別○×モードの純粋関数。
// 公式の正解番号表と設問文の型（「正しいものはどれか」「誤っているものはどれか」）から、
// 各肢の真偽を導く。問題データそのものには手を加えない。
//
// 導ける型:
//   pick-true  … 正解肢だけが真（正しいもの / 違反しないもの）
//   pick-false … 正解肢だけが偽（誤っているもの / 違反するもの / 最も不適当なもの / 規定されていないもの）
// 導けない型（対象外）: いくつあるか / 組合せ / 複数正解 / 全員正解 / 上記に当てはまらない設問

import type { TakkenQuestion } from "../data/questions";

export type StemKind = "pick-true" | "pick-false";

export type ChoiceStatement = {
  /** "問題ID#肢番号"。回答記録のキー。 */
  key: string;
  questionId: string;
  choice: number;
  /** 設問文（肢の前まで）。 */
  stem: string;
  /** 肢の本文（番号を除く）。 */
  text: string;
  isTrue: boolean;
  kind: StemKind;
};

// 「\n1 」のように行頭の 1〜4 と空白（半角・全角）で肢が始まる。
// 全250問でこの分割が4肢そろうことを choiceStatements.test.ts で確認している。
const CHOICE_HEAD = /\n\s*([1-4])[ 　]/;

export const splitChoices = (
  questionText: string,
): { stem: string; choices: string[] } | null => {
  const parts = ("\n" + questionText).split(CHOICE_HEAD);
  // parts = [stem, "1", 肢1, "2", 肢2, "3", 肢3, "4", 肢4]
  const numbers = parts.filter((_, index) => index % 2 === 1);
  if (numbers.join("") !== "1234") return null;
  const bodies = parts.filter((_, index) => index > 0 && index % 2 === 0);
  return {
    stem: parts[0].trim(),
    choices: bodies.map((body) => body.trim()),
  };
};

const PICK_TRUE = /正しいもの|違反しないもの/;
const PICK_FALSE =
  /誤っているもの|違反するもの|不適当なもの|規定されていないもの/;
const NOT_DERIVABLE = /いくつ|組合せ|組み合わせ/;

export const classifyStem = (stem: string): StemKind | null => {
  if (NOT_DERIVABLE.test(stem)) return null;
  const isTrue = PICK_TRUE.test(stem);
  const isFalse = PICK_FALSE.test(stem);
  if (isTrue && !isFalse) return "pick-true";
  if (isFalse && !isTrue) return "pick-false";
  return null;
};

export const choiceStatementsOf = (
  question: TakkenQuestion,
): ChoiceStatement[] | null => {
  if (question.isAllCorrect || question.correctChoices.length !== 1) {
    return null;
  }
  const split = splitChoices(question.questionText);
  if (!split) return null;
  const kind = classifyStem(split.stem);
  if (!kind) return null;

  const correct = question.correctChoices[0];
  return split.choices.map((text, index) => {
    const choice = index + 1;
    const isCorrectChoice = choice === correct;
    return {
      key: `${question.id}#${choice}`,
      questionId: question.id,
      choice,
      stem: split.stem,
      text,
      isTrue: kind === "pick-true" ? isCorrectChoice : !isCorrectChoice,
      kind,
    };
  });
};
