"""ai-insights.py の純粋部分のテスト。LLM・ネットワーク・Firestore は呼ばない。

実行: python3 -m unittest scripts/test_ai_insights.py -v
      （pytest があれば python3 -m pytest scripts/test_ai_insights.py -q でも可）
"""

import importlib.util
import sys
import unittest
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))

_spec = importlib.util.spec_from_file_location("ai_insights", SCRIPTS / "ai-insights.py")
ai = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(ai)

from letos_fetch import extract_article  # noqa: E402

TOPICS = {
    "eigyo-hosho": {"id": "eigyo-hosho", "label": "営業保証金・保証協会", "category": "宅建業法"},
    "takkenshi-toroku": {"id": "takkenshi-toroku", "label": "宅建士登録・宅建士証", "category": "宅建業法"},
    "cooling-off": {"id": "cooling-off", "label": "クーリングオフ", "category": "宅建業法"},
    "sozoku": {"id": "sozoku", "label": "相続", "category": "権利関係"},
}
QUESTION_TOPICS = {
    "r6-36": "eigyo-hosho",
    "r7-35": "eigyo-hosho",
    "r4-41": "eigyo-hosho",
    "r6-43": "takkenshi-toroku",
    "r7-42": "takkenshi-toroku",
    "r6-30": "cooling-off",
    "r7-05": "sozoku",
}
QUESTION = {
    "id": "r6-36",
    "year": "令和6年度",
    "number": 36,
    "category": "宅建業法",
    "questionText": "【問 36】 営業保証金に関する次の記述のうち、誤っているものはどれか。\n\n1 主たる事務所は1,000万円である。\n\n2 公告期間は6か月以上である。\n\n3 有価証券でも供託できる。\n\n4 免許取消後は取り戻せない。",
    "correctChoices": [4],
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-36/",
}


class ExtractArticleTest(unittest.TestCase):
    def test_strips_tags_and_navigation(self):
        raw = (
            "<html><head><title>令和7年（2025年）問4｜担保物権 - ４ヶ月で宅建合格</title></head>"
            "<body><article><h1>見出し</h1><p>本文<b>太字</b>です。</p>"
            "<script>var x=1;</script><p>令和7年（2025年）：宅建試験・過去問</p>"
            "<p>問１</p></article></body></html>"
        )
        title, text = extract_article(raw)
        self.assertEqual(title, "令和7年（2025年）問4｜担保物権")
        self.assertEqual(text, "見出し\n本文太字です。")
        self.assertNotIn("問１", text)

    def test_missing_article_returns_empty_body(self):
        title, text = extract_article("<html><title>t</title><body>x</body></html>")
        self.assertEqual(title, "t")
        self.assertEqual(text, "")


class ExtractJsonTest(unittest.TestCase):
    def test_picks_first_brace_to_last_brace(self):
        text = 'はい。```json\n{"results": [{"a": 1}]}\n```\n以上'
        self.assertEqual(ai.extract_json(text), {"results": [{"a": 1}]})

    def test_raises_when_no_json(self):
        with self.assertRaises(ValueError):
            ai.extract_json("JSONはありません")


class WrapTest(unittest.TestCase):
    def test_wraps_nested_arrays_maps_and_scalars(self):
        wrapped = ai.wrap({
            "s": "x", "n": 3, "f": 1.5, "b": True, "none": None,
            "list": ["a", {"k": [1]}],
        })
        fields = wrapped["mapValue"]["fields"]
        self.assertEqual(fields["s"], {"stringValue": "x"})
        self.assertEqual(fields["n"], {"integerValue": "3"})
        self.assertEqual(fields["f"], {"doubleValue": 1.5})
        self.assertEqual(fields["b"], {"booleanValue": True})
        self.assertEqual(fields["none"], {"nullValue": None})
        values = fields["list"]["arrayValue"]["values"]
        self.assertEqual(values[0], {"stringValue": "a"})
        inner = values[1]["mapValue"]["fields"]["k"]["arrayValue"]["values"]
        self.assertEqual(inner, [{"integerValue": "1"}])

    def test_bool_is_not_treated_as_int(self):
        self.assertEqual(ai.wrap(False), {"booleanValue": False})

    def test_unwrap_roundtrip_with_arrays(self):
        original = {"events": [{"q": "r7-01", "ok": False, "ms": 1200}], "t": "x"}
        self.assertEqual(ai.unwrap_value(ai.wrap(original)), original)


class WrongEventsTest(unittest.TestCase):
    def test_falls_back_to_answers_when_no_events(self):
        progress = {
            "answers": {
                "r6-36": {"selected": 2, "correct": False, "answeredAt": "2026-09-08T10:00:00.000Z", "unsure": True, "lapses": 2},
                "r7-05": {"selected": 1, "correct": True, "answeredAt": "2026-09-08T10:01:00.000Z"},
            },
            "events": [],
        }
        wrong = ai.collect_wrong_events(progress)
        self.assertEqual(list(wrong), ["r6-36"])
        event = wrong["r6-36"]
        self.assertEqual(event["c"], 2)
        self.assertTrue(event["u"])
        self.assertIsNone(event["ms"])
        self.assertEqual(event["at"], "2026-09-08T10:00:00.000Z")

    def test_uses_latest_wrong_event_per_question(self):
        progress = {
            "answers": {"r6-36": {"selected": 3, "correct": False, "answeredAt": "2026-09-09T00:00:00.000Z"}},
            "events": [
                {"q": "r6-36", "c": 1, "ok": False, "u": False, "ms": 9000, "at": "2026-09-07T00:00:00.000Z", "src": "drill"},
                {"q": "r6-36", "c": 3, "ok": False, "u": False, "ms": 20000, "at": "2026-09-09T00:00:00.000Z", "src": "drill"},
                {"q": "r6-36", "c": 4, "ok": True, "u": False, "ms": 5000, "at": "2026-09-09T01:00:00.000Z", "src": "drill"},
            ],
        }
        wrong = ai.collect_wrong_events(progress)
        self.assertEqual(wrong["r6-36"]["c"], 3)
        self.assertEqual(wrong["r6-36"]["ms"], 20000)

    def test_answers_without_events_are_added_to_union(self):
        progress = {
            "answers": {
                "r6-36": {"selected": 3, "correct": False, "answeredAt": "2026-09-09T00:00:00.000Z"},
                "r7-05": {"selected": 2, "correct": False, "answeredAt": "2026-09-01T00:00:00.000Z"},
            },
            "events": [
                {"q": "r6-36", "c": 3, "ok": False, "u": False, "ms": 20000, "at": "2026-09-09T00:00:00.000Z", "src": "drill"},
            ],
        }
        wrong = ai.collect_wrong_events(progress)
        self.assertEqual(set(wrong), {"r6-36", "r7-05"})


class IncrementalTest(unittest.TestCase):
    def test_pending_only_newer_stamps(self):
        latest = {"a": "2026-09-09T00:00:00Z", "b": "2026-09-08T00:00:00Z", "c": "2026-09-09T00:00:00Z"}
        done = {"a": "2026-09-09T00:00:00Z", "b": "2026-09-07T00:00:00Z"}
        self.assertEqual(sorted(ai.pending_keys(latest, done)), ["b", "c"])

    def test_pending_notes_reads_updated_at(self):
        notes = {
            "r6-36": {"text": "公告は6か月", "updatedAt": "2026-09-09T00:00:00Z"},
            "r7-05": {"text": "古い", "updatedAt": "2026-09-01T00:00:00Z"},
            "r6-30": "文字列だけのメモ",
            "r7-42": {"text": "   ", "updatedAt": "2026-09-09T00:00:00Z"},
        }
        state = {"notesReviewedAt": {"r7-05": "2026-09-01T00:00:00Z"}}
        pending = ai.pending_notes(notes, state)
        self.assertEqual(sorted(pending), ["r6-30", "r6-36"])
        self.assertEqual(pending["r6-30"]["text"], "文字列だけのメモ")


class HintTest(unittest.TestCase):
    def test_fast_answer_hints_guess_or_misread(self):
        hints = ai.hint_for({"ms": 8000, "c": 3}, QUESTION)
        self.assertTrue(any("15秒未満" in h for h in hints))

    def test_numeric_choice_hints_number(self):
        hints = ai.hint_for({"ms": 40000, "c": 1}, QUESTION)
        self.assertTrue(any("数字" in h for h in hints))

    def test_no_hint_when_slow_and_no_digits(self):
        self.assertEqual(ai.hint_for({"ms": 40000, "c": 4}, QUESTION), [])

    def test_choice_text(self):
        self.assertEqual(ai.choice_text(QUESTION["questionText"], 2), "公告期間は6か月以上である。")
        self.assertEqual(ai.choice_text(QUESTION["questionText"], 9), "")


class DiagnosisPromptTest(unittest.TestCase):
    def test_prompt_contains_required_instructions_and_items(self):
        items = [{
            "questionId": "r6-36",
            "question": QUESTION,
            "event": {"c": 2, "ms": 8000, "u": True, "at": "2026-09-09T00:00:00Z"},
            "note": "取戻しは5年",
            "lapses": 2,
        }]
        prompt = ai.build_diagnosis_prompt(items, TOPICS)
        for needle in ("JSONだけ", "20文字以内", "r6-36", "選んだ肢: 2", "正解の肢: 4",
                       "自信なし印: あり", "取戻しは5年", "過去の誤答回数: 2",
                       "eigyo-hosho", "15秒未満", "unclear"):
            self.assertIn(needle, prompt)

    def test_parse_validates_types_and_topics(self):
        data = {"results": [
            {"questionId": "r6-36", "type": "confusion", "reason": "免許の5年と混同。", "confidence": "mid", "confusedWithTopic": "takkenshi-toroku"},
            {"questionId": "r7-05", "type": "bogus", "reason": "x", "confidence": "high"},
            {"questionId": "unknown", "type": "guess", "reason": "x", "confidence": "low"},
            {"questionId": "r6-30", "type": "knowledge", "reason": "y", "confidence": "weird", "confusedWithTopic": "nope"},
        ]}
        parsed = ai.parse_diagnosis_results(data, {"r6-36", "r7-05", "r6-30"}, TOPICS)
        self.assertEqual(set(parsed), {"r6-36", "r6-30"})
        self.assertEqual(parsed["r6-36"]["confusedWithTopic"], "takkenshi-toroku")
        self.assertEqual(parsed["r6-36"]["label"], "論点混同")
        self.assertEqual(parsed["r6-30"]["confidence"], "low")
        self.assertNotIn("confusedWithTopic", parsed["r6-30"])


class PatternsTest(unittest.TestCase):
    def test_counts_by_type_with_advice_and_source(self):
        diagnoses = {
            "a": {"type": "number"}, "b": {"type": "number"}, "c": {"type": "misread"},
        }
        patterns = ai.build_patterns(diagnoses)
        by_type = {p["type"]: p for p in patterns}
        self.assertEqual(by_type["number"]["count"], 2)
        self.assertEqual(by_type["misread"]["count"], 1)
        self.assertEqual(patterns[0]["type"], "number")
        self.assertIn("http", by_type["number"]["advice"])
        self.assertNotIn("knowledge", by_type)


class ConfusionPairsTest(unittest.TestCase):
    ANSWERS = {
        "r6-36": {"lapses": 3, "correct": False},
        "r7-35": {"lapses": 1, "correct": True},
        "r4-41": {"lapses": 0, "correct": True},
        "r6-43": {"lapses": 2, "correct": False},
        "r7-42": {"lapses": 1, "correct": True},
        "r6-30": {"lapses": 1, "correct": False},
        "r7-05": {"lapses": 5, "correct": False},
    }

    def test_confusion_diagnosis_ranks_first_and_interleaves(self):
        diagnoses = {"r6-36": {"type": "confusion", "confusedWithTopic": "takkenshi-toroku"}}
        pairs = ai.build_confusion_pairs(
            diagnoses, self.ANSWERS, QUESTION_TOPICS, TOPICS, {}, "2026-09-09T00:00:00+09:00"
        )
        self.assertTrue(pairs)
        top = pairs[0]
        self.assertEqual(top["id"], "eigyo-hosho__takkenshi-toroku")
        self.assertEqual(top["topicA"], "eigyo-hosho")
        self.assertEqual(top["labelB"], "宅建士登録・宅建士証")
        # A,B,A,B の順。各論点は lapses の多い順。
        self.assertEqual(top["questionIds"], ["r6-36", "r6-43", "r7-35", "r7-42"])
        self.assertIn("混同", top["reason"])
        self.assertEqual(top["createdAt"], "2026-09-09T00:00:00+09:00")

    def test_cooccurrence_only_within_same_category_and_max_five(self):
        pairs = ai.build_confusion_pairs({}, self.ANSWERS, QUESTION_TOPICS, TOPICS, {}, "2026-09-09T00:00:00+09:00")
        ids = [p["id"] for p in pairs]
        # 宅建業法の3論点から3ペア。相続（権利関係）は同じ科目の相手が無いので入らない。
        self.assertEqual(len(ids), 3)
        self.assertTrue(all("sozoku" not in i for i in ids))
        self.assertLessEqual(len(pairs), ai.MAX_PAIRS)

    def test_existing_created_at_is_kept(self):
        existing = {"eigyo-hosho__takkenshi-toroku": "2026-09-01T00:00:00+09:00"}
        pairs = ai.build_confusion_pairs({}, self.ANSWERS, QUESTION_TOPICS, TOPICS, existing, "2026-09-09T00:00:00+09:00")
        by_id = {p["id"]: p for p in pairs}
        self.assertEqual(by_id["eigyo-hosho__takkenshi-toroku"]["createdAt"], "2026-09-01T00:00:00+09:00")

    def test_retest_counts_only_after_next_day_and_excludes_pair_mode(self):
        pair = {"questionIds": ["r6-36", "r6-43"], "createdAt": "2026-09-01T10:00:00+09:00"}
        events = [
            {"q": "r6-36", "ok": True, "at": "2026-09-01T05:00:00Z", "src": "drill"},   # 同日 → 数えない
            {"q": "r6-36", "ok": True, "at": "2026-09-01T16:00:00Z", "src": "drill"},   # JST 9/2 01:00 → 数える
            {"q": "r6-43", "ok": False, "at": "2026-09-03T00:00:00Z", "src": "drill"},
            {"q": "r6-43", "ok": True, "at": "2026-09-03T00:00:00Z", "src": "pair"},    # 比較モード → 除外
            {"q": "r7-05", "ok": True, "at": "2026-09-03T00:00:00Z", "src": "drill"},   # 対象外
        ]
        self.assertEqual(ai.count_retest(pair, events), {"answered": 2, "correct": 1})


class NoteReviewTest(unittest.TestCase):
    def test_note_prompt_and_parse(self):
        items = [{"questionId": "r6-36", "question": QUESTION, "text": "取戻しは5年",
                  "article": {"title": "令和6年 問36", "text": "公告は6か月以上。"}}]
        prompt = ai.build_note_prompt(items)
        for needle in ("JSONだけ", "20文字以内", "unclear", "取戻しは5年", "公告は6か月以上"):
            self.assertIn(needle, prompt)
        parsed = ai.parse_verdicts(
            {"results": [{"questionId": "r6-36", "verdict": "conflict", "message": "5年ではなく6か月。"},
                         {"questionId": "r6-36", "verdict": "nope", "message": "x"}]},
            {"r6-36"}, ai.NOTE_VERDICTS,
        )
        self.assertEqual(parsed["r6-36"]["verdict"], "conflict")

    def test_merge_note_facts_downgrades_ok_on_warning(self):
        findings = [{"level": "warn", "topic": "営業保証金の取戻し・公告",
                     "message": "「5年」が出てくるが、この論点の数字は 6か月・10年。", "source": "https://x"}]
        verdict, message = ai.merge_note_facts("ok", "解説と一致。", findings)
        self.assertEqual(verdict, "unclear")
        self.assertIn("数字照合", message)
        self.assertIn("5年", message)

    def test_merge_note_facts_keeps_conflict(self):
        verdict, message = ai.merge_note_facts("conflict", "違う。", [])
        self.assertEqual((verdict, message), ("conflict", "違う。"))


class LawChangeTest(unittest.TestCase):
    def test_merge_candidates_keeps_human_decisions(self):
        existing = [
            {"questionId": "r6-36", "status": "confirmed", "reason": "人が確認済み"},
            {"questionId": "r7-05", "status": "candidate", "reason": "古い候補"},
        ]
        new = [
            {"questionId": "r6-36", "reason": "また候補"},
            {"questionId": "r6-30", "reason": "新しい候補"},
        ]
        labels = {"r6-36": {"year": "令和6年度", "number": 36}, "r6-30": {"year": "令和6年度", "number": 30}}
        merged = ai.merge_law_candidates(existing, new, labels, "2026-09-09")
        by_id = {c["questionId"]: c for c in merged}
        self.assertEqual(by_id["r6-36"]["status"], "confirmed")
        self.assertEqual(by_id["r6-36"]["reason"], "人が確認済み")
        self.assertEqual(by_id["r6-30"]["status"], "candidate")
        self.assertEqual(by_id["r6-30"]["year"], "令和6年度")
        self.assertNotIn("r7-05", by_id)  # 今回挙がらなかった旧候補は落とす


class ChunksTest(unittest.TestCase):
    def test_chunks_of_ten(self):
        self.assertEqual([len(c) for c in ai.chunks(list(range(23)), 10)], [10, 10, 3])
        self.assertEqual(list(ai.chunks([], 10)), [])


if __name__ == "__main__":
    unittest.main()
