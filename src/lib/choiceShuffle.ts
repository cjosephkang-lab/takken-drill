// 4択の肢の並びを入れ替えて出す。何度も解いた問題で「この問題は3番」と番号で覚えてしまうのを防ぐ。
// 表示用の並び替えだけで、記録する選択肢番号は元の問題の番号のまま（questions.ts も改変しない）。
import type { TakkenQuestion } from "../data/questions";
import { splitChoices } from "./choiceStatements";

/** 文字列から決定的な擬似乱数列。同じ日・同じ問題なら同じ並びになる（画面を戻っても揺れない）。 */
const seededRandom = (text: string) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
};

/**
 * 表示位置（0〜3）→ 元の肢番号（1〜4）の並び。並べ替えられない問題は null。
 * 正解の肢は必ず元と違う位置に来るようにする（同じ位置だと番号の記憶で当たってしまう）。
 */
export const shuffledChoiceOrder = (
  question: TakkenQuestion,
  seed: string,
): number[] | null => {
  if (question.isAllCorrect || question.correctChoices.length !== 1)
    return null;
  if (!splitChoices(question.questionText)) return null;
  const correct = question.correctChoices[0];
  const random = seededRandom(`${seed}:${question.id}`);
  for (;;) {
    const order = [1, 2, 3, 4];
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    if (order.indexOf(correct) !== correct - 1) return order;
  }
};

/**
 * 並び替えた順で肢に1〜4を振り直した問題文。
 * 肢の見出し（「\n\n1 」など、前の空行を含む）は元の位置のまま残し、本文だけを入れ替える。
 * こうすると空行や見出しの書式が元の問題文と同じになる。
 */
export const shuffledQuestionText = (
  question: TakkenQuestion,
  order: number[],
): string => {
  const split = splitChoices(question.questionText)!;
  // 見出しごと区切る: [設問, 見出し1, 肢1, 見出し2, 肢2, ...]
  const parts = ("\n" + question.questionText).split(/(\n\s*[1-4][ 　])/);
  const heads = parts.filter((_, index) => index % 2 === 1);
  const stem = parts[0].slice(1);
  return (
    stem +
    heads
      .map((head, index) => head + split.choices[order[index] - 1])
      .join("")
  );
};
