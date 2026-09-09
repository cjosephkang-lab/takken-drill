import { describe, expect, it } from "vitest";
import { takkenQuestions } from "../data/questions";
import { buildChoiceQueue, countChoiceProgress } from "./choiceQueue";
import { choiceStatementsOf } from "./choiceStatements";

const covered = takkenQuestions.filter((q) => choiceStatementsOf(q));
const wrongQ = covered[0];
const unsureQ = covered[1];
const freshQ = covered[2];

describe("肢別○×の出題順", () => {
  it("間違えた問題の肢 → 自信なしの肢 → 未着手の順", () => {
    const queue = buildChoiceQueue(
      [freshQ, unsureQ, wrongQ],
      {
        [wrongQ.id]: { correct: false, lapses: 2 },
        [unsureQ.id]: { correct: true, lapses: 0, unsure: true },
      },
      {},
    );
    expect(queue).toHaveLength(12);
    expect(queue.slice(0, 4).every((s) => s.questionId === wrongQ.id)).toBe(
      true,
    );
    expect(queue.slice(4, 8).every((s) => s.questionId === unsureQ.id)).toBe(
      true,
    );
    expect(queue.slice(8).every((s) => s.questionId === freshQ.id)).toBe(true);
  });

  it("同じ優先度では問題をまたいで混ぜる", () => {
    const sample = covered.slice(0, 6);
    const queue = buildChoiceQueue(sample, {}, {});
    // 先頭4肢が全部同じ問題、という並びにはならない。
    const first = queue.slice(0, 4).map((s) => s.questionId);
    expect(new Set(first).size).toBeGreaterThan(1);
  });

  it("○×で外した肢は未着手より先、正解済みの肢は最後", () => {
    const statements = choiceStatementsOf(freshQ)!;
    const queue = buildChoiceQueue(
      [freshQ],
      {},
      {
        [statements[0].key]: {
          ok: false,
          attempts: 1,
          lapses: 1,
          answeredAt: "x",
        },
        [statements[1].key]: {
          ok: true,
          attempts: 1,
          lapses: 0,
          answeredAt: "x",
        },
      },
    );
    expect(queue[0].key).toBe(statements[0].key);
    expect(queue[3].key).toBe(statements[1].key);
  });

  it("科目で絞れる", () => {
    const queue = buildChoiceQueue(
      takkenQuestions,
      {},
      {},
      { category: "宅建業法" },
    );
    expect(queue.length).toBeGreaterThan(0);
    expect(queue.every((s) => s.questionId.length > 0)).toBe(true);
    const ids = new Set(queue.map((s) => s.questionId));
    for (const id of ids) {
      expect(takkenQuestions.find((q) => q.id === id)?.category).toBe(
        "宅建業法",
      );
    }
  });

  it("進捗の集計", () => {
    const statements = choiceStatementsOf(freshQ)!;
    expect(
      countChoiceProgress([freshQ], {
        [statements[0].key]: {
          ok: false,
          attempts: 1,
          lapses: 1,
          answeredAt: "x",
        },
      }),
    ).toEqual({ total: 4, answered: 1, wrong: 1 });
  });
});
