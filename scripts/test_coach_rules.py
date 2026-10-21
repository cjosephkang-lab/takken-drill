"""coach_rules の初見換算の予測得点のテスト。ネットワークは使わない。"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import coach_rules  # noqa: E402


class Test初見換算の予測(unittest.TestCase):
    def setUp(self):
        self.categories = {f"q{i}": "宅建業法" for i in range(10)}
        self.topics = {f"q{i}": ("A" if i < 5 else "B") for i in range(10)}
        self.marks = {"宅建業法": 20}

    def test_何度も解いて最後に正解でも初回が不正解なら予測は低い(self):
        answers = {q: {"correct": True, "attempts": 4, "firstCorrect": False} for q in self.categories}
        r = coach_rules.predict_first_attempt(answers, self.categories, self.topics, self.marks)
        self.assertLess(r["mean"], 5)

    def test_初回が特定できない記録は数えない(self):
        answers = {q: {"correct": True, "attempts": 3} for q in self.categories}
        r = coach_rules.predict_first_attempt(answers, self.categories, self.topics, self.marks)
        self.assertEqual(r["evidence"], 0)
        self.assertIsNone(r["by_category"]["宅建業法"])

    def test_解答履歴が全回そろっていれば最初の回を初回とする(self):
        # 2026-10-21: コーチが解答履歴を読まず、1回しか解いていない問題（正解に偏る）だけで44点と出した。
        answers = {q: {"correct": True, "attempts": 3} for q in self.categories}
        events = [
            {"q": q, "at": f"2026-10-0{n}T00:00:00Z", "ok": n > 1, "src": "drill"}
            for q in self.categories for n in (1, 2, 3)
        ]
        r = coach_rules.predict_first_attempt(answers, self.categories, self.topics, self.marks, events)
        self.assertEqual(r["evidence"], 10)
        self.assertLess(r["mean"], 5)

    def test_解答履歴が欠けている問題は初回とみなさない(self):
        answers = {q: {"correct": True, "attempts": 3} for q in self.categories}
        events = [{"q": q, "at": "2026-10-02T00:00:00Z", "ok": True, "src": "drill"} for q in self.categories]
        r = coach_rules.predict_first_attempt(answers, self.categories, self.topics, self.marks, events)
        self.assertEqual(r["evidence"], 0)

    def test_初回全問正解でも満点にはせず範囲の下限は中心より低い(self):
        answers = {q: {"correct": True, "attempts": 1} for q in self.categories}
        r = coach_rules.predict_first_attempt(answers, self.categories, self.topics, self.marks)
        self.assertGreater(r["mean"], 15)
        self.assertLess(r["mean"], 20)
        self.assertLess(r["low"], r["mean"])

    def test_安全圏は範囲の下限で判定する(self):
        verdict, _ = coach_rules.verdict_for(40, 100, low=30)
        self.assertNotEqual(verdict, "green")
        verdict, _ = coach_rules.verdict_for(40, 100, low=38.5)
        self.assertEqual(verdict, "green")


if __name__ == "__main__":
    unittest.main()
