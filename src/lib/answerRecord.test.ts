import { describe, expect, it } from "vitest";

// buildAnswerRecord は App.tsx の中にあるため、同じ仕様をここで固定する。
// 「自信なしの正解は連続正解に数えない」が壊れると、まぐれ当たりが
// 習得済みに積み上がり、予想点が実力より高く出てしまう。

const MASTER_STREAK = 3;

/** App.tsx の buildAnswerRecord と同じ streak の決め方。 */
const nextStreak = (
  previousStreak: number,
  correct: boolean,
  unsure: boolean,
): number => (correct && !unsure ? previousStreak + 1 : 0);

describe("自信なしで答えた時の連続正解", () => {
  it("自信ありで正解すると連続正解が伸びる", () => {
    expect(nextStreak(2, true, false)).toBe(3);
  });

  it("自信なしで正解しても連続正解は伸びない", () => {
    expect(nextStreak(2, true, true)).toBe(0);
  });

  it("自信なしの正解を3回続けても習得済みにならない", () => {
    let streak = 0;
    for (let i = 0; i < 3; i += 1) {
      streak = nextStreak(streak, true, true);
    }
    expect(streak).toBeLessThan(MASTER_STREAK);
  });

  it("自信ありの正解を3回続けると習得済みになる", () => {
    let streak = 0;
    for (let i = 0; i < 3; i += 1) {
      streak = nextStreak(streak, true, false);
    }
    expect(streak).toBeGreaterThanOrEqual(MASTER_STREAK);
  });

  it("不正解なら自信の有無にかかわらず0に戻る", () => {
    expect(nextStreak(5, false, false)).toBe(0);
    expect(nextStreak(5, false, true)).toBe(0);
  });
});
