import { describe, expect, it } from "vitest";
import { takkenQuestions } from "../data/questions";
import { choiceStatementsOf } from "./choiceStatements";
import type { ChoiceRecord } from "./progressExtras";
import { isUnsettledRepeatedWrong } from "./repeatedWrong";

const question = takkenQuestions.find((q) => choiceStatementsOf(q))!;
const statements = choiceStatementsOf(question)!;
const lastAnswered = "2026-10-12T07:00:00.000Z";

const allChoices = (ok: boolean, answeredAt: string) =>
  Object.fromEntries(
    statements.map((s) => [
      s.key,
      { ok, attempts: 1, lapses: ok ? 0 : 1, answeredAt } as ChoiceRecord,
    ]),
  );

describe("何度も間違えた問題（未定着）の判定", () => {
  it("誤答1回の問題は対象外", () => {
    expect(
      isUnsettledRepeatedWrong(question, { lapses: 1, streak: 0 }, {}),
    ).toBe(false);
  });

  it("誤答2回で直近1回だけ正解なら未定着", () => {
    expect(
      isUnsettledRepeatedWrong(
        question,
        { lapses: 2, streak: 1, answeredAt: lastAnswered },
        {},
      ),
    ).toBe(true);
  });

  it("2回続けて正解したら定着として外す", () => {
    expect(
      isUnsettledRepeatedWrong(
        question,
        { lapses: 5, streak: 2, answeredAt: lastAnswered },
        {},
      ),
    ).toBe(false);
  });

  it("最後の4択の後に肢別で全肢正解したら定着として外す", () => {
    expect(
      isUnsettledRepeatedWrong(
        question,
        { lapses: 3, streak: 0, answeredAt: lastAnswered },
        allChoices(true, "2026-10-17T05:00:00.000Z"),
      ),
    ).toBe(false);
  });

  it("肢別の全肢正解が最後の4択より前なら、まだ未定着", () => {
    expect(
      isUnsettledRepeatedWrong(
        question,
        { lapses: 3, streak: 0, answeredAt: lastAnswered },
        allChoices(true, "2026-10-01T05:00:00.000Z"),
      ),
    ).toBe(true);
  });

  it("肢別で1肢でも外していれば未定着", () => {
    const records = allChoices(true, "2026-10-17T05:00:00.000Z");
    records[statements[0].key] = { ...records[statements[0].key], ok: false };
    expect(
      isUnsettledRepeatedWrong(
        question,
        { lapses: 3, streak: 0, answeredAt: lastAnswered },
        records,
      ),
    ).toBe(true);
  });
});
