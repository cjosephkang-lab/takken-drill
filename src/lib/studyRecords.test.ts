import { describe, expect, it } from "vitest";
import {
  legacyLearnedRecords,
  numberRecordKey,
  oxRecordKey,
} from "./studyRecords";

const at = "2026-10-17T12:00:00.000Z";

describe("端末にだけ残っていた正解済みの移し替え", () => {
  it("一問一答・弱点・数字の正解済みを、正解1回の記録にする", () => {
    const store: Record<string, string> = {
      "takken-kozarie-learned": JSON.stringify(["kz-a-1"]),
      "takken-weakspot-learned": JSON.stringify(["ws-b-2"]),
      "takken-numbers-learned": JSON.stringify(["問11 借地:期間"]),
    };
    const added = legacyLearnedRecords({}, (k) => store[k] ?? null, at)!;
    expect(added[oxRecordKey("kz-a-1")]).toEqual({
      ok: true,
      attempts: 1,
      lapses: 0,
      answeredAt: at,
    });
    expect(added[oxRecordKey("ws-b-2")]?.ok).toBe(true);
    expect(added[numberRecordKey("問11 借地:期間")]?.ok).toBe(true);
  });

  it("すでに記録がある項目は上書きしない", () => {
    const existing = {
      [oxRecordKey("kz-a-1")]: {
        ok: false,
        attempts: 2,
        lapses: 1,
        answeredAt: "2026-10-17T13:00:00.000Z",
      },
    };
    const store = { "takken-kozarie-learned": JSON.stringify(["kz-a-1"]) };
    expect(
      legacyLearnedRecords(existing, (k) => store[k as keyof typeof store] ?? null, at),
    ).toBeNull();
  });

  it("壊れたデータや空なら何も足さない", () => {
    expect(legacyLearnedRecords({}, () => "{壊れた", at)).toBeNull();
    expect(legacyLearnedRecords({}, () => null, at)).toBeNull();
  });

  it("数字シートのキーは同じ文から同じキーになり、ドットやスラッシュを含まない", () => {
    const key = numberRecordKey("問13 区分所有:集会の招集通知");
    expect(key).toBe(numberRecordKey("問13 区分所有:集会の招集通知"));
    expect(key).toMatch(/^num:[0-9a-z]+$/);
  });
});
