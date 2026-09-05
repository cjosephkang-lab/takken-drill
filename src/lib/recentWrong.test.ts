import { describe, it, expect } from "vitest";
import { daysSinceLocalDate, isWithinRecentDays } from "./recentWrong";

// 判定の基準時刻。ローカルTZの2026-09-05 10:00 とする。
const now = new Date(2026, 8, 5, 10, 0, 0);

// ローカルTZの任意日時からISO文字列を作る。answeredAt はUTC ISOで保存されている。
const at = (year: number, month: number, day: number, hour = 12) =>
  new Date(year, month - 1, day, hour).toISOString();

describe("daysSinceLocalDate", () => {
  it("同じ日は0日前", () => {
    expect(daysSinceLocalDate(at(2026, 9, 5, 1), now)).toBe(0);
    expect(daysSinceLocalDate(at(2026, 9, 5, 23), now)).toBe(0);
  });

  it("前日は1日前", () => {
    expect(daysSinceLocalDate(at(2026, 9, 4, 23), now)).toBe(1);
  });

  it("月をまたいでも日数で数える", () => {
    expect(daysSinceLocalDate(at(2026, 8, 31), now)).toBe(5);
  });

  it("未来の日付は負の値になる", () => {
    expect(daysSinceLocalDate(at(2026, 9, 6), now)).toBe(-1);
  });

  it("空文字や不正な日付は null", () => {
    expect(daysSinceLocalDate("", now)).toBeNull();
    expect(daysSinceLocalDate("not-a-date", now)).toBeNull();
  });
});

// days は「今日を含む暦日数」。days=2 なら今日と昨日の2日ぶん。
describe("isWithinRecentDays", () => {
  it("days=2 は今日と昨日だけを含む", () => {
    expect(isWithinRecentDays(at(2026, 9, 5), 2, now)).toBe(true);
    expect(isWithinRecentDays(at(2026, 9, 4), 2, now)).toBe(true);
    expect(isWithinRecentDays(at(2026, 9, 3), 2, now)).toBe(false);
  });

  it("days=3 は今日から3暦日（一昨日まで）", () => {
    expect(isWithinRecentDays(at(2026, 9, 3), 3, now)).toBe(true);
    expect(isWithinRecentDays(at(2026, 9, 2), 3, now)).toBe(false);
  });

  it("days=7 は今日から7暦日（6日前まで）", () => {
    expect(isWithinRecentDays(at(2026, 8, 30), 7, now)).toBe(true);
    expect(isWithinRecentDays(at(2026, 8, 29), 7, now)).toBe(false);
  });

  it("端末時計のわずかな進みは当日扱いで拾う", () => {
    expect(isWithinRecentDays(at(2026, 9, 6), 2, now)).toBe(true);
  });

  it("1日を超えて未来の日付は壊れた値として除外する", () => {
    expect(isWithinRecentDays(at(2026, 9, 7), 2, now)).toBe(false);
    expect(isWithinRecentDays(at(2099, 1, 1), 7, now)).toBe(false);
  });

  it("日付が読めない場合は範囲外", () => {
    expect(isWithinRecentDays("", 2, now)).toBe(false);
  });
});
