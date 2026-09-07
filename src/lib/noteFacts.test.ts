import { describe, expect, it } from "vitest";

// scripts/note_facts.py の判定仕様をここで固定する。
// Pythonの実装と同じ規則をTypeScriptで書き、規則が壊れていないかを見る。
// 2026-09-07に「営業保証金の取戻しは5年」という誤記を手作業で見つけた。
// 同じ取り違えを自動で拾えなくなったら、このテストが落ちる。

type Fact = {
  topic: string;
  triggers: string[];
  correct: string[];
  confusable: string[];
};

const FACTS: Fact[] = [
  {
    topic: "営業保証金の取戻し・公告",
    triggers: ["取戻", "取り戻", "公告"],
    correct: ["6か月", "6ヶ月", "6カ月", "10年"],
    confusable: ["5年", "3年"],
  },
  {
    topic: "クーリングオフ",
    triggers: ["クーリングオフ"],
    correct: ["8日"],
    confusable: ["7日", "10日", "14日"],
  },
];

const check = (text: string) =>
  FACTS.filter((fact) => {
    if (!fact.triggers.some((t) => text.includes(t))) return false;
    const hasCorrect = fact.correct.some((n) => text.includes(n));
    const hasConfusable = fact.confusable.some((n) => text.includes(n));
    return hasConfusable && !hasCorrect;
  });

describe("メモの数字チェック", () => {
  it("営業保証金の取戻しを5年と書いたら拾う", () => {
    const note =
      "欠格事由に該当して免許が取り消された場合でも、5年を待たずに、" +
      "供託している営業保証金を取り戻すことができる";
    expect(check(note).map((f) => f.topic)).toContain("営業保証金の取戻し・公告");
  });

  it("正しく10年と書いてあれば拾わない", () => {
    const note = "廃業から10年経過している場合は公告を省略して取り戻せる";
    expect(check(note)).toHaveLength(0);
  });

  it("論点の語がなければ数字だけでは拾わない", () => {
    const note = "宅建士証の有効期間は5年";
    expect(check(note)).toHaveLength(0);
  });

  it("クーリングオフを7日と書いたら拾う", () => {
    expect(check("クーリングオフは告げられた日から7日以内").length).toBe(1);
  });

  it("クーリングオフ8日は拾わない", () => {
    expect(check("クーリングオフは告げられた日から8日以内")).toHaveLength(0);
  });
});
