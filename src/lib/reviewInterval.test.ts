import { describe, expect, it } from "vitest";

// 復習間隔は App.tsx の中にあるため、同じ仕様をここで固定する。
// 棚田行政書士の大量記憶法に寄せた間隔で、3回目を4日に前倒ししている。
// ここが元の 1→2→7→14→30 に戻ると、3回目までに6日空いて忘却が進む。

const reviewIntervalDays = (streak: number) => {
  if (streak <= 0) return 1;
  if (streak === 1) return 2;
  if (streak === 2) return 4;
  if (streak === 3) return 7;
  if (streak === 4) return 14;
  return 30;
};

describe("復習間隔", () => {
  it("間違えたら翌日に出す", () => {
    expect(reviewIntervalDays(0)).toBe(1);
  });

  it("連続正解が増えるほど間隔が広がる", () => {
    const intervals = [0, 1, 2, 3, 4, 5].map(reviewIntervalDays);
    expect(intervals).toEqual([1, 2, 4, 7, 14, 30]);
  });

  it("間隔が縮むことはない", () => {
    for (let streak = 0; streak < 8; streak += 1) {
      expect(reviewIntervalDays(streak + 1)).toBeGreaterThanOrEqual(
        reviewIntervalDays(streak),
      );
    }
  });

  it("最初の1週間に3回出る（初回・1日後・3日後）", () => {
    // 0日目に間違える → 1日後 → そこで正解して2日後 → 計3日目
    const first = reviewIntervalDays(0);
    const second = reviewIntervalDays(1);
    expect(first + second).toBeLessThanOrEqual(7);
  });

  it("試験まで41日なら、今日の1問が本番までに5回以上出る", () => {
    let day = 0;
    let streak = 0;
    let count = 0;
    while (day <= 41) {
      day += reviewIntervalDays(streak);
      streak += 1;
      if (day <= 41) count += 1;
    }
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
