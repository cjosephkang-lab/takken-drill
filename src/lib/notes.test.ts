import { describe, it, expect } from "vitest";
import { notesModuleReady } from "./notes";
import { normalizeNote, normalizeNotes } from "./notes";

describe("notes module", () => {
  it("loads", () => {
    expect(notesModuleReady).toBe(true);
  });
});

describe("normalizeNote", () => {
  it("旧string形式を text に移し updatedAt を空にする", () => {
    expect(normalizeNote("抵当権のメモ")).toEqual({
      text: "抵当権のメモ",
      updatedAt: "",
    });
  });
  it("新オブジェクト形式はそのまま保つ", () => {
    const entry = { text: "都市計画法", updatedAt: "2026-07-21T01:00:00.000Z" };
    expect(normalizeNote(entry)).toEqual(entry);
  });
  it("不正値は空エントリにする", () => {
    expect(normalizeNote(null)).toEqual({ text: "", updatedAt: "" });
    expect(normalizeNote(42)).toEqual({ text: "", updatedAt: "" });
  });
});

describe("normalizeNotes", () => {
  it("辞書内の混在形式をすべて NoteEntry にそろえる", () => {
    const raw = {
      q1: "旧メモ",
      q2: { text: "新メモ", updatedAt: "2026-07-21T00:00:00.000Z" },
    };
    expect(normalizeNotes(raw)).toEqual({
      q1: { text: "旧メモ", updatedAt: "" },
      q2: { text: "新メモ", updatedAt: "2026-07-21T00:00:00.000Z" },
    });
  });
  it("非オブジェクトは空辞書にする", () => {
    expect(normalizeNotes(undefined)).toEqual({});
  });
});

import { mergeNotes } from "./notes";

describe("mergeNotes", () => {
  it("updatedAt が新しい方を採用する", () => {
    const local = { q1: { text: "新", updatedAt: "2026-07-21T05:00:00.000Z" } };
    const remote = {
      q1: { text: "旧", updatedAt: "2026-07-20T05:00:00.000Z" },
    };
    expect(mergeNotes(local, remote).q1.text).toBe("新");
  });
  it("remote だけにあるメモは残す", () => {
    const local = {};
    const remote = {
      q2: { text: "リモート", updatedAt: "2026-07-21T00:00:00.000Z" },
    };
    expect(mergeNotes(local, remote).q2.text).toBe("リモート");
  });
  it("updatedAt が空同士なら非空テキストを優先する", () => {
    const local = { q3: { text: "", updatedAt: "" } };
    const remote = { q3: { text: "中身あり", updatedAt: "" } };
    expect(mergeNotes(local, remote).q3.text).toBe("中身あり");
  });
  it("旧string形式が混ざっても移行してマージする", () => {
    const local = { q4: "ローカル旧" };
    const remote = {};
    expect(mergeNotes(local, remote).q4).toEqual({
      text: "ローカル旧",
      updatedAt: "",
    });
  });
});
