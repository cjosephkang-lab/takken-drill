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
