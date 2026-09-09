import { describe, expect, it } from "vitest";
import { takkenQuestions } from "../data/questions";
import {
  classifyStem,
  choiceStatementsOf,
  splitChoices,
} from "./choiceStatements";

const base = {
  id: "t-01",
  examId: "t",
  year: "テスト",
  label: "テスト",
  number: 1,
  category: "宅建業法",
  sourceUrl: "",
  externalExplanationName: "",
  externalExplanationUrl: "",
  correctChoices: [2],
  isAllCorrect: false,
  officialExplanation: "",
};

describe("選択肢の分割", () => {
  it("「1 …」「2 …」の行で4肢に分ける", () => {
    const text =
      "【問 1】 次の記述のうち、正しいものはどれか。\n\n1 甲\n\n2 乙\n乙の続き\n\n3 丙\n\n4 丁";
    expect(splitChoices(text)).toEqual({
      stem: "【問 1】 次の記述のうち、正しいものはどれか。",
      choices: ["甲", "乙\n乙の続き", "丙", "丁"],
    });
  });

  it("全角空白の区切りも受け付ける", () => {
    const text = "設問\n\n1　甲\n\n2　乙\n\n3　丙\n\n4　丁";
    expect(splitChoices(text)?.choices).toEqual(["甲", "乙", "丙", "丁"]);
  });

  it("4肢そろわなければ null", () => {
    expect(splitChoices("設問\n\n1 甲\n\n2 乙")).toBeNull();
  });
});

describe("設問型の判定", () => {
  it("「正しいものはどれか」は正解肢だけが真", () => {
    expect(classifyStem("次の記述のうち、正しいものはどれか。")).toBe(
      "pick-true",
    );
  });
  it("「違反しないものはどれか」も正解肢だけが真（違反しない＝正しい）", () => {
    expect(classifyStem("法の規定に違反しないものはどれか。")).toBe(
      "pick-true",
    );
  });
  it("「誤っているものはどれか」は正解肢だけが偽", () => {
    expect(classifyStem("民法の規定によれば、誤っているものはどれか。")).toBe(
      "pick-false",
    );
  });
  it("「違反するものはどれか」「最も不適当なものはどれか」「規定されていないものはどれか」も正解肢だけが偽", () => {
    expect(classifyStem("同法に違反するものはどれか。")).toBe("pick-false");
    expect(classifyStem("最も不適当なものはどれか。")).toBe("pick-false");
    expect(classifyStem("民法の条文として規定されていないものはどれか。")).toBe(
      "pick-false",
    );
  });
  it("「いくつあるか」「組合せ」は肢の真偽を導けない", () => {
    expect(classifyStem("正しいものはいくつあるか。")).toBeNull();
    expect(classifyStem("正しいものの組合せはどれか。")).toBeNull();
    expect(classifyStem("正しいものの組み合わせはどれか。")).toBeNull();
  });
  it("「違反しない」と「誤っている」が両方あれば判定しない", () => {
    expect(classifyStem("誤っているものは正しいものはどれか。")).toBeNull();
  });
});

describe("各肢の真偽", () => {
  it("正しいもの型: 正解肢=○、他=×", () => {
    const q = {
      ...base,
      questionText:
        "設問、正しいものはどれか。\n\n1 甲\n\n2 乙\n\n3 丙\n\n4 丁",
    };
    expect(choiceStatementsOf(q)?.map((s) => s.isTrue)).toEqual([
      false,
      true,
      false,
      false,
    ]);
  });

  it("誤っているもの型: 正解肢=×、他=○", () => {
    const q = {
      ...base,
      questionText:
        "設問、誤っているものはどれか。\n\n1 甲\n\n2 乙\n\n3 丙\n\n4 丁",
    };
    expect(choiceStatementsOf(q)?.map((s) => s.isTrue)).toEqual([
      true,
      false,
      true,
      true,
    ]);
  });

  it("複数正解・全員正解・いくつあるか型は対象外", () => {
    const multi = {
      ...base,
      correctChoices: [1, 2],
      questionText:
        "設問、正しいものはどれか。\n\n1 甲\n\n2 乙\n\n3 丙\n\n4 丁",
    };
    const all = {
      ...base,
      isAllCorrect: true,
      questionText:
        "設問、正しいものはどれか。\n\n1 甲\n\n2 乙\n\n3 丙\n\n4 丁",
    };
    const count = {
      ...base,
      questionText:
        "設問、正しいものはいくつあるか。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    };
    expect(choiceStatementsOf(multi)).toBeNull();
    expect(choiceStatementsOf(all)).toBeNull();
    expect(choiceStatementsOf(count)).toBeNull();
  });

  it("肢の本文には設問と肢番号を含めない", () => {
    const q = {
      ...base,
      questionText:
        "設問、正しいものはどれか。\n\n1 甲\n\n2 乙\n\n3 丙\n\n4 丁",
    };
    const statements = choiceStatementsOf(q);
    expect(statements?.[0]).toMatchObject({
      questionId: "t-01",
      choice: 1,
      key: "t-01#1",
      text: "甲",
      stem: "設問、正しいものはどれか。",
    });
  });
});

describe("実データでの検証", () => {
  it("250問すべてで4肢に分割できる", () => {
    for (const q of takkenQuestions) {
      expect(splitChoices(q.questionText), q.id).not.toBeNull();
    }
  });

  it("対象になる問題が200問以上あり、対象外は「いくつ」「組合せ」「複数正解」などに限られる", () => {
    const covered = takkenQuestions.filter((q) => choiceStatementsOf(q));
    expect(covered.length).toBeGreaterThanOrEqual(200);
    const excluded = takkenQuestions.filter((q) => !choiceStatementsOf(q));
    for (const q of excluded) {
      const stem = splitChoices(q.questionText)?.stem ?? "";
      const known =
        /いくつ|組合せ|組み合わせ/.test(stem) ||
        q.correctChoices.length !== 1 ||
        q.isAllCorrect ||
        classifyStem(stem) === null;
      expect(known, `${q.id}: ${stem.slice(-60)}`).toBe(true);
    }
  });
});
