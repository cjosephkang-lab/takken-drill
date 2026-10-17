import { describe, expect, it } from "vitest";
import { takkenQuestions } from "../data/questions";
import { splitChoices } from "./choiceStatements";
import { shuffledChoiceOrder, shuffledQuestionText } from "./choiceShuffle";

const shufflable = takkenQuestions.filter((q) =>
  shuffledChoiceOrder(q, "2026-10-17"),
);

describe("4択の肢の並び替え", () => {
  it("単一正解の問題の大半を並び替えられる", () => {
    const single = takkenQuestions.filter(
      (q) => !q.isAllCorrect && q.correctChoices.length === 1,
    );
    expect(shufflable.length).toBeGreaterThan(single.length * 0.9);
  });

  it("どの問題でも正解の肢は元と違う位置に来て、1〜4を1回ずつ使う", () => {
    for (const q of shufflable) {
      const order = shuffledChoiceOrder(q, "2026-10-17")!;
      expect([...order].sort()).toEqual([1, 2, 3, 4]);
      const correct = q.correctChoices[0];
      expect(order.indexOf(correct) + 1).not.toBe(correct);
    }
  });

  it("同じ日・同じ問題なら同じ並び", () => {
    const q = shufflable[0];
    expect(shuffledChoiceOrder(q, "2026-10-17")).toEqual(
      shuffledChoiceOrder(q, "2026-10-17"),
    );
  });

  it("並び替えた問題文の肢は、元の肢の本文をそのまま使う", () => {
    for (const q of shufflable) {
      const order = shuffledChoiceOrder(q, "2026-10-17")!;
      const original = splitChoices(q.questionText)!;
      const shown = splitChoices(shuffledQuestionText(q, order))!;
      expect(shown.stem).toBe(original.stem);
      order.forEach((originalNumber, index) => {
        expect(shown.choices[index]).toBe(original.choices[originalNumber - 1]);
      });
    }
  });
});
