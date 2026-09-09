import { describe, expect, it } from "vitest";
import {
  EVENT_LIMIT,
  appendEvent,
  isConfidentWrong,
  mergeChoiceRecords,
  mergeEvents,
  normalizeChoiceRecords,
  normalizeEvents,
  updateChoiceRecord,
  type AnswerEvent,
} from "./progressExtras";

const event = (at: string, extra: Partial<AnswerEvent> = {}): AnswerEvent => ({
  q: "r7-01",
  c: 2,
  ok: false,
  u: false,
  ms: 12000,
  at,
  src: "drill",
  ...extra,
});

describe("回答イベントの同期", () => {
  it("at をキーに和集合を取り、時刻順に並べる", () => {
    const local = [
      event("2026-09-09T01:00:00Z"),
      event("2026-09-09T03:00:00Z"),
    ];
    const remote = [
      event("2026-09-09T02:00:00Z"),
      event("2026-09-09T03:00:00Z"),
    ];
    expect(mergeEvents(local, remote).map((e) => e.at)).toEqual([
      "2026-09-09T01:00:00Z",
      "2026-09-09T02:00:00Z",
      "2026-09-09T03:00:00Z",
    ]);
  });

  it("上限を超えたら古いものから落とす", () => {
    const many = Array.from({ length: EVENT_LIMIT + 5 }, (_, i) =>
      event(
        `2026-01-01T00:00:${String(i % 60).padStart(2, "0")}.${String(i).padStart(4, "0")}Z`,
      ),
    );
    const merged = mergeEvents(many, []);
    expect(merged).toHaveLength(EVENT_LIMIT);
    expect(merged[0].at > many[0].at).toBe(true);
  });

  it("appendEvent は末尾に足して上限を守る", () => {
    const list = appendEvent([], event("2026-09-09T01:00:00Z"));
    expect(list).toHaveLength(1);
  });

  it("壊れたデータは読み飛ばす", () => {
    expect(
      normalizeEvents([event("2026-09-09T01:00:00Z"), { q: 1 }, null, "x"]),
    ).toHaveLength(1);
    expect(normalizeEvents(undefined)).toEqual([]);
  });
});

describe("肢別○×の記録", () => {
  it("初回の記録と2回目の更新", () => {
    const first = updateChoiceRecord(undefined, true, "2026-09-09T01:00:00Z");
    expect(first).toEqual({
      ok: true,
      attempts: 1,
      lapses: 0,
      answeredAt: "2026-09-09T01:00:00Z",
    });
    const second = updateChoiceRecord(first, false, "2026-09-10T01:00:00Z");
    expect(second).toEqual({
      ok: false,
      attempts: 2,
      lapses: 1,
      answeredAt: "2026-09-10T01:00:00Z",
    });
  });

  it("端末間マージは answeredAt が新しい方を採る", () => {
    const local = {
      "r7-01#1": {
        ok: true,
        attempts: 2,
        lapses: 0,
        answeredAt: "2026-09-10T00:00:00Z",
      },
    };
    const remote = {
      "r7-01#1": {
        ok: false,
        attempts: 1,
        lapses: 1,
        answeredAt: "2026-09-09T00:00:00Z",
      },
      "r7-01#2": {
        ok: false,
        attempts: 1,
        lapses: 1,
        answeredAt: "2026-09-09T00:00:00Z",
      },
    };
    const merged = mergeChoiceRecords(local, remote);
    expect(merged["r7-01#1"].attempts).toBe(2);
    expect(merged["r7-01#2"].attempts).toBe(1);
  });

  it("壊れたデータは読み飛ばす", () => {
    expect(
      normalizeChoiceRecords({
        ok: { ok: true, attempts: 1, lapses: 0, answeredAt: "x" },
        bad: { ok: "yes" },
      }),
    ).toEqual({
      ok: { ok: true, attempts: 1, lapses: 0, answeredAt: "x" },
    });
  });
});

describe("自信があったのに間違えた", () => {
  it("自信なし印なしの不正解だけが該当する", () => {
    expect(isConfidentWrong({ correct: false, unsure: false })).toBe(true);
    expect(isConfidentWrong({ correct: false, unsure: true })).toBe(false);
    expect(isConfidentWrong({ correct: true, unsure: false })).toBe(false);
    expect(isConfidentWrong(undefined)).toBe(false);
  });
});
