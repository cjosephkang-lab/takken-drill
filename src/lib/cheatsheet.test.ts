import { describe, expect, it } from "vitest";
import { computeCheatSheet } from "./cheatsheet";

describe("computeCheatSheet", () => {
  it("ranks a frequently-tested, poorly-answered topic above a rarely-tested perfect topic", () => {
    // "宅建士登録・宅建士証" (takkenshi-toroku) appears in 7 questions across years (宅建業法, weight 18/20).
    // "地価公示法" (chika-koji) appears in 2 questions (税・価格評定, weight 2/3).
    const rows = computeCheatSheet({
      "r7-42": { attempts: 3, lapses: 2 }, // takkenshi-toroku, 66% miss
      "r7-24": { attempts: 3, lapses: 0 }, // 固定資産税 in same low-weight category, perfect
    });
    const weak = rows.find((r) => r.topicId === "takkenshi-toroku");
    const strong = rows.find((r) => r.topicId === "koteishisanzei");
    expect(weak).toBeDefined();
    expect(strong).toBeDefined();
    expect(weak!.rank).toBeLessThan(strong!.rank);
    expect(weak!.reasonLabel).toBe("苦手");
  });

  it("treats untouched topics as moderately weak, not the single strongest signal", () => {
    const rows = computeCheatSheet({});
    const untouched = rows.filter((r) => r.untouched);
    expect(untouched.length).toBe(50);
    for (const row of untouched) {
      expect(row.accuracy).toBeNull();
      expect(row.attempts).toBe(0);
    }
  });

  it("weighs category by targetScore/fullMarks so 宅建業法 outranks 税・価格評定 under equal weakness", () => {
    const rows = computeCheatSheet({});
    const gyoho = rows.find((r) => r.topicId === "hoshugaku"); // 宅建業法
    const zei = rows.find((r) => r.topicId === "inshizei"); // 税・価格評定
    expect(gyoho).toBeDefined();
    expect(zei).toBeDefined();
    expect(gyoho!.categoryWeight).toBeGreaterThan(zei!.categoryWeight);
  });

  it("computes accuracy as 1 - lapses/attempts, clamped at 0", () => {
    const rows = computeCheatSheet({
      "r7-42": { attempts: 2, lapses: 3 }, // over-lapsed edge case, should clamp to 0
    });
    const row = rows.find((r) => r.topicId === "takkenshi-toroku");
    expect(row!.accuracy).toBe(0);
  });

  it("assigns rank 1..N with no gaps, sorted by priorityScore descending", () => {
    const rows = computeCheatSheet({});
    expect(rows).toHaveLength(50);
    const ranks = rows.map((r) => r.rank);
    expect(ranks).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i - 1].priorityScore).toBeGreaterThanOrEqual(rows[i].priorityScore);
    }
  });
});
