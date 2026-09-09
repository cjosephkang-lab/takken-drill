"""questions.ts の読み取りのテスト。ネットワーク・Firestore は呼ばない。

実行: python3 -m unittest scripts/test_question_loading.py -v

questions.ts はファイル冒頭に試験メタデータの配列を持ち、そこにも "id"
（"r7" など）がある。re.S で改行をまたぐ正規表現をファイル全体にかけると
その "r7" が直後の r7-01 の "category" と結びつき、本物の r7-01 が落ちる。
2026-09-09 に科目別集計が1問ずれているのを見つけて直した。再発防止のため
件数と実データを固定する。
"""

import importlib.util
import unittest
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent

_spec = importlib.util.spec_from_file_location("daily_coach", SCRIPTS / "daily-coach.py")
coach = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(coach)

# src/data/questions.ts の収録数。問題を足したらここも変える。
TOTAL_QUESTIONS = 250


class TestLoadQuestionCategories(unittest.TestCase):
    def setUp(self):
        self.categories = coach.load_question_categories()

    def test_全問読める(self):
        self.assertEqual(len(self.categories), TOTAL_QUESTIONS)

    def test_配列の先頭の問題が落ちない(self):
        # r7-01 は takkenQuestions の先頭。直前のメタデータ配列の影響を最も受ける。
        self.assertIn("r7-01", self.categories)
        self.assertEqual(self.categories["r7-01"], "権利関係")

    def test_試験メタデータが混入しない(self):
        # "r7"・"r6" は試験そのもののIDで、問題のIDではない。
        for meta_id in ("r7", "r6", "r5", "r4", "r3_12"):
            self.assertNotIn(meta_id, self.categories)

    def test_科目の内訳(self):
        from collections import Counter

        tally = Counter(self.categories.values())
        self.assertEqual(
            dict(tally),
            {
                "権利関係": 70,
                "宅建業法": 100,
                "法令上の制限": 40,
                "税・価格評定": 15,
                "免除科目": 25,
            },
        )


class TestLoadQuestionLabels(unittest.TestCase):
    def setUp(self):
        self.labels = coach.load_question_labels()

    def test_全問読める(self):
        self.assertEqual(len(self.labels), TOTAL_QUESTIONS)

    def test_配列の先頭の問題が落ちない(self):
        self.assertEqual(self.labels.get("r7-01"), {"year": "令和7年度", "number": 1})

    def test_試験メタデータが混入しない(self):
        for meta_id in ("r7", "r6", "r5", "r4", "r3_12"):
            self.assertNotIn(meta_id, self.labels)


if __name__ == "__main__":
    unittest.main()
