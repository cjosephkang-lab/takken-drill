import { describe, expect, it } from "vitest";
import { mockMinutes, scaleTarget, toFullScale } from "./mockScale";

describe("50問そろわない模試の換算", () => {
  it("制限時間は問題数に比例させ、50問なら本番と同じ120分", () => {
    expect(mockMinutes(50)).toBe(120);
    expect(mockMinutes(47)).toBe(113);
    expect(mockMinutes(36)).toBe(86);
  });

  it("得点は50問満点に換算する（小数第1位まで）", () => {
    expect(toFullScale(32, 50)).toBe(32);
    expect(toFullScale(30, 47)).toBe(31.9);
    expect(toFullScale(0, 40)).toBe(0);
  });

  it("科目の目標点は、その科目の出題数に比例させる", () => {
    expect(scaleTarget(18, 20, 20)).toBe(18);
    expect(scaleTarget(18, 17, 20)).toBe(15.3);
    expect(scaleTarget(4, 0, 5)).toBe(0);
  });
});
