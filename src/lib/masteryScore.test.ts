import { describe, expect, it } from "vitest";
import { firstAttemptOutcome, predictScore } from "./masteryScore";

const ev = (q: string, ok: boolean, at: string) => ({
  q,
  c: 1,
  ok,
  u: false,
  ms: 1000,
  at,
  src: "drill" as const,
});

describe("初めて解いた時の正誤", () => {
  it("記録に firstCorrect があればそれを使う", () => {
    expect(
      firstAttemptOutcome(
        { correct: true, attempts: 5, firstCorrect: false },
        [],
      ),
    ).toBe(false);
  });

  it("1回しか解いていなければ、その結果が初回", () => {
    expect(firstAttemptOutcome({ correct: false, attempts: 1 }, [])).toBe(
      false,
    );
  });

  it("解答の記録の件数が解答回数と同じなら、最も古い記録が初回", () => {
    const events = [ev("a", true, "2026-10-02"), ev("a", false, "2026-10-01")];
    expect(firstAttemptOutcome({ correct: true, attempts: 2 }, events)).toBe(
      false,
    );
  });

  it("初回を特定できなければ null（最後の正誤は使わない）", () => {
    expect(
      firstAttemptOutcome({ correct: true, attempts: 3 }, [ev("a", true, "x")]),
    ).toBeNull();
  });
});

describe("初見換算の予測得点", () => {
  const categories = [{ category: "業法", fullMarks: 20 }];
  const questions = Array.from({ length: 10 }, (_, i) => ({
    id: `q${i}`,
    category: "業法",
  }));
  const topicOf = (id: string) => (Number(id.slice(1)) < 5 ? "A" : "B");

  it("初めて解いた時に全問正解なら、満点に近いが満点にはしない（データ量で割り引く）", () => {
    const answers = Object.fromEntries(
      questions.map((q) => [q.id, { correct: true, attempts: 1 }]),
    );
    const r = predictScore({
      questions,
      answers,
      events: [],
      topicOf,
      categories,
    });
    expect(r.total).toBeGreaterThan(15);
    expect(r.total).toBeLessThan(20);
    expect(r.low).toBeLessThan(r.total);
    expect(r.high).toBeLessThanOrEqual(20);
  });

  it("何度も解いて最後に正解していても、初回が不正解なら予測は低い", () => {
    const answers = Object.fromEntries(
      questions.map((q) => [
        q.id,
        { correct: true, attempts: 4, firstCorrect: false },
      ]),
    );
    const r = predictScore({
      questions,
      answers,
      events: [],
      topicOf,
      categories,
    });
    expect(r.total).toBeLessThan(5);
  });

  it("初回の記録が1件もない科目は予測を出さない（null）", () => {
    const r = predictScore({
      questions,
      answers: {},
      events: [],
      topicOf,
      categories,
    });
    expect(r.byCategory[0].expected).toBeNull();
    expect(r.evidenceCount).toBe(0);
  });

  it("論点の出題数で重み付けする（論点Aだけ正解なら約半分）", () => {
    const answers = Object.fromEntries(
      questions.map((q) => [
        q.id,
        { correct: topicOf(q.id) === "A", attempts: 1 },
      ]),
    );
    const r = predictScore({
      questions,
      answers,
      events: [],
      topicOf,
      categories,
    });
    expect(r.total).toBeGreaterThan(7);
    expect(r.total).toBeLessThan(13);
  });
});
