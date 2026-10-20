import { describe, expect, it } from "vitest";
import {
  CONFIDENT_RETEST_DAYS,
  isConfidentRetestDue,
  nextConfidentWrongAt,
} from "./confidentWrong";

const day = (n: number) => new Date(Date.UTC(2026, 9, 1 + n)).toISOString();

describe("自信ありの誤答の再テスト", () => {
  it("自信ありで間違えたら、その時刻を記録する", () => {
    expect(nextConfidentWrongAt(undefined, false, false, day(0))).toBe(day(0));
  });

  it("自信なしで間違えたときは記録しない（覚え違いではないため）", () => {
    expect(
      nextConfidentWrongAt(undefined, false, true, day(0)),
    ).toBeUndefined();
  });

  it("間違えた直後に正解しても、記録は消さない（1週間後に元の誤答に戻りやすい）", () => {
    expect(nextConfidentWrongAt(day(0), true, false, day(1))).toBe(day(0));
  });

  it(`${CONFIDENT_RETEST_DAYS}日以上空けて自信ありで正解したら、記録を消す`, () => {
    expect(
      nextConfidentWrongAt(day(0), true, false, day(CONFIDENT_RETEST_DAYS)),
    ).toBeUndefined();
  });

  it("空けて正解しても、自信なしなら記録を残す", () => {
    expect(
      nextConfidentWrongAt(day(0), true, true, day(CONFIDENT_RETEST_DAYS)),
    ).toBe(day(0));
  });

  it("また自信ありで間違えたら、記録をその時刻に更新する", () => {
    expect(nextConfidentWrongAt(day(0), false, false, day(3))).toBe(day(3));
  });

  it(`再テストの期限は、間違えてから${CONFIDENT_RETEST_DAYS}日後`, () => {
    expect(
      isConfidentRetestDue({ confidentWrongAt: day(0) }, new Date(day(6))),
    ).toBe(false);
    expect(
      isConfidentRetestDue({ confidentWrongAt: day(0) }, new Date(day(7))),
    ).toBe(true);
    expect(isConfidentRetestDue({}, new Date(day(7)))).toBe(false);
  });
});
