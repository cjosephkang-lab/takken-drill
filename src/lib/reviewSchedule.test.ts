import { describe, expect, it } from "vitest";

import {
  isDue,
  nextReviewAt,
  nextReviewAtForStreak,
  reviewIntervalDays,
  startOfStudyDay,
} from "./reviewSchedule";

/** JSTの壁時計をUTCのISO文字列にする。テストを日本時間で読み書きするため。 */
const jst = (text: string): string => new Date(`${text}+09:00`).toISOString();

/** UTCのISO文字列をJSTの壁時計表記に戻す。期待値を目視できる形にする。 */
const inJst = (iso: string | null): string =>
  iso === null
    ? "null"
    : new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .replace("T", " ")
        .slice(0, 16);

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

describe("学習日の境界", () => {
  it("昼に解いた問題はその日の朝4時が起点", () => {
    expect(inJst(startOfStudyDay(jst("2026-09-13 14:30")))).toBe(
      "2026-09-13 04:00",
    );
  });

  it("深夜1時に解いた問題は前日の学習日に属する", () => {
    // 就寝前の学習。日付は変わっていても体感は前日の続き。
    expect(inJst(startOfStudyDay(jst("2026-09-14 01:20")))).toBe(
      "2026-09-13 04:00",
    );
  });

  it("朝4時ちょうどは新しい学習日の始まり", () => {
    expect(inJst(startOfStudyDay(jst("2026-09-14 04:00")))).toBe(
      "2026-09-14 04:00",
    );
  });

  it("朝3時59分はまだ前日", () => {
    expect(inJst(startOfStudyDay(jst("2026-09-14 03:59")))).toBe(
      "2026-09-13 04:00",
    );
  });
});

describe("復習期限は朝4時に丸める", () => {
  it("何時に解いても期限は朝4時になる", () => {
    const morning = nextReviewAt(jst("2026-09-13 09:00"), 4);
    const night = nextReviewAt(jst("2026-09-13 22:33"), 4);
    expect(inJst(morning)).toBe("2026-09-17 04:00");
    expect(inJst(night)).toBe("2026-09-17 04:00");
    expect(morning).toBe(night);
  });

  it("夜に解いた問題が、4日後の同じ時刻まで待たされない", () => {
    // これが今回直した不具合そのもの。22:33に解いた問題の期限が
    // 4日後の22:33だと、その日の学習を終える頃に降ってくる。
    const answered = jst("2026-09-09 22:33");
    const due = nextReviewAt(answered, 4);
    const morningOfDueDay = jst("2026-09-13 08:00");
    expect(isDue(due, morningOfDueDay)).toBe(true);
  });

  it("期限日の朝4時より前には出てこない", () => {
    const due = nextReviewAt(jst("2026-09-09 22:33"), 4);
    expect(isDue(due, jst("2026-09-13 03:59"))).toBe(false);
    expect(isDue(due, jst("2026-09-13 04:00"))).toBe(true);
  });

  it("一日の途中でキューが増えない", () => {
    // 同じ日の別々の時刻に解いた問題は、すべて同じ期限に揃う。
    // 揃っていれば、朝キューが確定して日中は減る一方になる。
    const times = ["08:15", "12:40", "20:36", "22:33"];
    const dues = times.map((t) => nextReviewAt(jst(`2026-09-09 ${t}`), 4));
    expect(new Set(dues).size).toBe(1);
  });

  it("深夜に解いた問題は前日ぶんとして期限が決まる", () => {
    // 9/14 1:20 に解いたものは 9/13 の学習日。1日後の期限は 9/14 朝4時。
    const due = nextReviewAt(jst("2026-09-14 01:20"), 1);
    expect(inJst(due)).toBe("2026-09-14 04:00");
  });
});

describe("連続正解から期限を出す", () => {
  it("間違えた問題は翌朝に出る", () => {
    const due = nextReviewAtForStreak(jst("2026-09-13 22:00"), 0);
    expect(inJst(due)).toBe("2026-09-14 04:00");
  });

  it("連続正解2回なら4日後の朝", () => {
    const due = nextReviewAtForStreak(jst("2026-09-13 22:00"), 2);
    expect(inJst(due)).toBe("2026-09-17 04:00");
  });
});

describe("旧データの丸め直し（移行）", () => {
  it("時刻のまま保存された期限を、その日の朝4時へ切り下げる", () => {
    // 旧実装が 22:33 に解いて 4日後の 22:33 を期限にしていたぶん。
    const stored = jst("2026-09-13 22:33");
    expect(inJst(startOfStudyDay(stored))).toBe("2026-09-13 04:00");
  });

  it("切り下げなので復習が後ろ倒しになることはない", () => {
    const stored = jst("2026-09-13 22:33");
    const rounded = startOfStudyDay(stored);
    expect(rounded).not.toBeNull();
    expect(rounded! <= stored).toBe(true);
  });

  it("丸め済みの期限は二度目の丸めで動かない（冪等）", () => {
    const once = startOfStudyDay(jst("2026-09-13 22:33"));
    expect(once).not.toBeNull();
    expect(startOfStudyDay(once!)).toBe(once);
  });
});

describe("壊れた日時を渡されたとき", () => {
  // ここで例外を投げると loadProgress の catch が空の進捗に落ち、
  // 保存済みの学習履歴が消えたように見える。null を返して握りつぶす。
  it("丸めは例外ではなく null を返す", () => {
    for (const bad of ["", "not-a-date", "2026-13-99"]) {
      expect(startOfStudyDay(bad)).toBeNull();
    }
  });

  it("期限計算は壊れた回答日時でも有効な日時を返す", () => {
    const due = nextReviewAt("not-a-date", 1);
    expect(Number.isNaN(new Date(due).getTime())).toBe(false);
  });
});

describe("期限判定", () => {
  it("期限のない記録は対象外", () => {
    expect(isDue(undefined, jst("2026-09-13 12:00"))).toBe(false);
  });

  it("期限を過ぎていれば対象", () => {
    expect(isDue(jst("2026-09-13 04:00"), jst("2026-09-13 12:00"))).toBe(true);
  });
});
