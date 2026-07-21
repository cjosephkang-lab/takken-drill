import { describe, it, expect } from "vitest";
import { localDateKey, notesModuleReady } from "./notes";
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

  // 【既知の制約・安全側の設計】メモの削除は端末間で伝播しない。
  // saveNote("") は updatedAt を空にするため、他端末の実メモ（時刻あり）に時刻比較で必ず負ける。
  // これは「他端末の実メモを消さない」ための意図的なトレードオフ。削除同期は本パイプラインのスコープ外。
  it("削除（空メモ@''）は他端末の実メモ（時刻あり）を消さず、実メモが残る", () => {
    const local = { q1: { text: "", updatedAt: "" } }; // この端末で消した
    const remote = {
      q1: { text: "残る実メモ", updatedAt: "2026-07-21T05:00:00.000Z" },
    };
    expect(mergeNotes(local, remote).q1.text).toBe("残る実メモ");
  });
});

import { buildStudyLogMarkdown } from "./notes";

describe("buildStudyLogMarkdown", () => {
  it("見出しと各メモをMarkdownにする", () => {
    const md = buildStudyLogMarkdown(
      [
        {
          heading: "抵当権（令和4年 問6）",
          text: "被担保債権の範囲を復習",
          updatedAt: "2026-07-21T05:00:00.000Z",
        },
        {
          heading: "都市計画法（令和3年12月 問15）",
          text: "用途地域の一覧を暗記",
          updatedAt: "2026-07-21T06:00:00.000Z",
        },
      ],
      "2026-07-21",
    );
    expect(md).toContain("# 学習ログ 2026-07-21");
    expect(md).toContain("## 抵当権（令和4年 問6）");
    expect(md).toContain("被担保債権の範囲を復習");
    expect(md).toContain("## 都市計画法（令和3年12月 問15）");
  });
  it("メモが無ければ不在メッセージを返す", () => {
    const md = buildStudyLogMarkdown([], "2026-07-21");
    expect(md).toContain("# 学習ログ 2026-07-21");
    expect(md).toContain("（この日のメモはありません）");
  });
});

import { selectTodayNotes } from "./notes";

describe("selectTodayNotes", () => {
  // updatedAt(UTC ISO) をローカル日付キーに写す関数を注入する（タイムゾーン非依存にするため）。
  const toDateKey = (iso: string) => iso.slice(0, 10);

  it("当日の updatedAt を持つメモだけを拾い、他日を除外する", () => {
    const notes = {
      q1: { text: "今日メモA", updatedAt: "2026-07-21T05:00:00.000Z" },
      q2: { text: "昨日メモ", updatedAt: "2026-07-20T23:00:00.000Z" },
      q3: { text: "今日メモB", updatedAt: "2026-07-21T22:00:00.000Z" },
    };
    const result = selectTodayNotes(notes, "2026-07-21", toDateKey);
    expect(result.map((item) => item.id)).toEqual(["q1", "q3"]);
  });

  it("updatedAt が古い順（昇順）に並ぶ", () => {
    const notes = {
      late: { text: "あと", updatedAt: "2026-07-21T22:00:00.000Z" },
      early: { text: "さき", updatedAt: "2026-07-21T05:00:00.000Z" },
    };
    const result = selectTodayNotes(notes, "2026-07-21", toDateKey);
    expect(result.map((item) => item.id)).toEqual(["early", "late"]);
  });

  it("本文が空のメモは書き出しに含めない", () => {
    const notes = {
      q1: { text: "", updatedAt: "2026-07-21T05:00:00.000Z" },
      q2: { text: "中身あり", updatedAt: "2026-07-21T06:00:00.000Z" },
    };
    const result = selectTodayNotes(notes, "2026-07-21", toDateKey);
    expect(result.map((item) => item.id)).toEqual(["q2"]);
  });

  it("updatedAt が空（旧データ移行分）のメモは当日扱いしない", () => {
    const notes = {
      q1: { text: "旧メモ", updatedAt: "" },
    };
    const result = selectTodayNotes(notes, "2026-07-21", toDateKey);
    expect(result).toEqual([]);
  });

  // 本番と同じ変換関数 localDateKey(new Date(iso)) を使い、UTC ISO がローカル日付に写ることを検証する。
  // slice(0,10) の UTC 切りでは JST 早朝でズレるが、この変換なら当日を正しく拾える。
  it("本番の localDateKey 変換で、ローカル日付の当日メモを正しく拾う", () => {
    const toLocalDateKey = (iso: string) => localDateKey(new Date(iso));
    // ローカルで正午のメモは、TZに関係なくその日のローカル日付になる。
    const noonLocal = new Date(2026, 6, 21, 12, 0, 0); // 2026-07-21 正午（ローカル）
    const notes = {
      q1: { text: "当日正午メモ", updatedAt: noonLocal.toISOString() },
    };
    const result = selectTodayNotes(notes, "2026-07-21", toLocalDateKey);
    expect(result.map((item) => item.id)).toEqual(["q1"]);
  });
});
