import { describe, it, expect } from "vitest";
import { phaseForDaysToExam, sortByPacing } from "./pacing";

// テスト用の最小限の問題データ。カテゴリと並び順だけをペーシングは見る。
const q = (category: string, label: string) => ({ category, label });

const categories = (
  items: { category: string; label: string }[],
  count?: number,
) => items.slice(0, count ?? items.length).map((item) => item.category);

describe("phaseForDaysToExam", () => {
  it("残り46日以上は基礎固め期", () => {
    expect(phaseForDaysToExam(46).key).toBe("foundation");
    expect(phaseForDaysToExam(120).key).toBe("foundation");
  });
  it("残り45日以下は直前期（試験当日・超過も含む）", () => {
    expect(phaseForDaysToExam(45).key).toBe("cram");
    expect(phaseForDaysToExam(0).key).toBe("cram");
    expect(phaseForDaysToExam(-3).key).toBe("cram");
  });
});

describe("sortByPacing 基礎固め期（残り60日）", () => {
  it("宅建業法と権利関係を3:2で交互に混ぜる", () => {
    const pool = [
      ...Array.from({ length: 6 }, (_, i) => q("宅建業法", `業${i}`)),
      ...Array.from({ length: 4 }, (_, i) => q("権利関係", `権${i}`)),
    ];
    const sorted = sortByPacing(pool, 60);
    expect(categories(sorted, 5)).toEqual([
      "宅建業法",
      "権利関係",
      "宅建業法",
      "宅建業法",
      "権利関係",
    ]);
  });

  it("法令・税・免除は最後尾に科目順で回す（止めないフォールバック）", () => {
    const pool = [
      q("免除科目", "免0"),
      q("税・価格評定", "税0"),
      q("法令上の制限", "法0"),
      q("宅建業法", "業0"),
      q("権利関係", "権0"),
    ];
    const sorted = sortByPacing(pool, 60);
    expect(categories(sorted)).toEqual([
      "宅建業法",
      "権利関係",
      "法令上の制限",
      "税・価格評定",
      "免除科目",
    ]);
  });

  it("科目内の相対順（入力順）は保たれる", () => {
    const pool = [
      q("宅建業法", "業A"),
      q("権利関係", "権A"),
      q("宅建業法", "業B"),
      q("権利関係", "権B"),
    ];
    const sorted = sortByPacing(pool, 60);
    const gyo = sorted.filter((x) => x.category === "宅建業法");
    const ken = sorted.filter((x) => x.category === "権利関係");
    expect(gyo.map((x) => x.label)).toEqual(["業A", "業B"]);
    expect(ken.map((x) => x.label)).toEqual(["権A", "権B"]);
  });
});

describe("sortByPacing 直前期（残り30日）", () => {
  it("暗記3科目だけが残っていれば法令3:税1:免除2で詰め込む", () => {
    const pool = [
      ...Array.from({ length: 6 }, (_, i) => q("法令上の制限", `法${i}`)),
      ...Array.from({ length: 2 }, (_, i) => q("税・価格評定", `税${i}`)),
      ...Array.from({ length: 4 }, (_, i) => q("免除科目", `免${i}`)),
    ];
    const sorted = sortByPacing(pool, 30);
    // 重み 法3:税1:免2 → 序盤6問は 法,免,法,法,税,免 の並びになる
    expect(categories(sorted, 6)).toEqual([
      "法令上の制限",
      "免除科目",
      "法令上の制限",
      "法令上の制限",
      "税・価格評定",
      "免除科目",
    ]);
  });

  it("業法・権利が残っていても法令に埋もれない（遅く始めた人の安全弁）", () => {
    const pool = [
      q("法令上の制限", "法0"),
      q("宅建業法", "業0"),
      q("権利関係", "権0"),
    ];
    const sorted = sortByPacing(pool, 30);
    // 業法は重み4（キー1/4）で法令の重み3（キー1/3）より先に出る
    expect(sorted[0].category).toBe("宅建業法");
  });
});

describe("sortByPacing エッジケース", () => {
  it("空配列は空配列を返す", () => {
    expect(sortByPacing([], 60)).toEqual([]);
  });
  it("元配列を破壊しない", () => {
    const pool = [q("権利関係", "権0"), q("宅建業法", "業0")];
    const copy = [...pool];
    sortByPacing(pool, 60);
    expect(pool).toEqual(copy);
  });
});
