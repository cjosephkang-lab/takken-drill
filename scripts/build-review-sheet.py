#!/usr/bin/env python3
"""間違いノートと暗記カードを1枚のHTMLにする（直前期用・スマホで読める）。

入力: Firestore の progress（解答・メモ）、docs/insights/insights.json（夜間AIの推定とメモ照合）、
      src/data/questions.ts（問題文と正解肢）、src/data/lawChanges.ts（法改正の注記）。
対象: 間違えた回数が2回以上、または直近の解答が不正解の問題。
原本主義: 正解肢の文は問題データの原文をそのまま使う。AIが言い換え・補完した文は入れない。
実行: python3 scripts/build-review-sheet.py（gcloud認証が必要）→ docs/review/<日付>.html
"""
import html
import importlib.util
import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
spec = importlib.util.spec_from_file_location("dc", ROOT / "scripts" / "daily-coach.py")
dc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dc)

SUBJECTS = ["宅建業法", "権利関係", "法令上の制限", "税・価格評定", "免除科目"]


def load_questions() -> dict:
    """questions.ts の問題オブジェクトを id → dict で読む。"""
    src = (ROOT / "src/data/questions.ts").read_text(encoding="utf-8")
    start = src.index("export const takkenQuestions")
    body = src[src.index("= [", start) + 2: src.rindex("]") + 1]
    return {q["id"]: q for q in json.loads(body)}


def split_choices(text: str) -> tuple[str, dict]:
    """問題文を「設問」と「肢1〜4」に分ける。分けられなければ肢は空。"""
    parts = re.split(r"\n\n(?=[1-4] )", text)
    stem = parts[0]
    choices = {}
    for part in parts[1:]:
        m = re.match(r"([1-4]) (.*)", part, re.S)
        if m:
            choices[int(m.group(1))] = m.group(2).strip()
    return stem, choices


def card_of(question: dict) -> dict | None:
    """「正しいもの/誤っているもの」を選ぶ問題の正解肢を、○×の一問一答にする。"""
    stem, choices = split_choices(question["questionText"])
    correct = question.get("correctChoices") or []
    if len(correct) != 1 or correct[0] not in choices or "いくつ" in stem or "組合せ" in stem:
        return None
    if "誤っているもの" in stem:
        return {"statement": choices[correct[0]], "verdict": "× 誤り（この肢が誤り）"}
    if "正しいもの" in stem:
        return {"statement": choices[correct[0]], "verdict": "○ 正しい（この肢が正しい）"}
    return None


def load_law_changes() -> dict:
    src = (ROOT / "src/data/lawChanges.ts").read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(
        r'questionId:\s*"([^"]+)",\s*status:\s*"confirmed",\s*summary:\s*"([^"]+)"', src
    ):
        out[m.group(1)] = m.group(2)
    return out


def esc(text: str) -> str:
    return html.escape(text).replace("\n", "<br>")


def main() -> None:
    progress = dc.fetch_progress()
    answers, notes = progress["answers"], progress["notes"]
    questions = load_questions()
    topic_of = dc.load_question_topics()
    topic_label = {
        m.group(1): m.group(2)
        for m in re.finditer(
            r'id: "([^"]+)", label: "([^"]+)"',
            (ROOT / "src/data/topicTags.ts").read_text(encoding="utf-8"),
        )
    }
    insights = json.loads((ROOT / "docs/insights/insights.json").read_text(encoding="utf-8"))
    diagnoses, reviews = insights.get("diagnoses", {}), insights.get("noteReviews", {})
    law = load_law_changes()

    targets = [
        qid
        for qid, rec in answers.items()
        if qid in questions and (rec.get("lapses", 0) >= 2 or not rec.get("correct"))
    ]
    rows = []
    for qid in targets:
        q = questions[qid]
        rec = answers[qid]
        note = notes.get(qid) or {}
        rows.append(
            {
                "qid": qid,
                "subject": q["category"],
                "topic": topic_label.get(topic_of.get(qid, ""), "その他"),
                "label": f'{q["year"]} 問{q["number"]}',
                "lapses": rec.get("lapses", 0),
                "last_ok": bool(rec.get("correct")),
                "note": (note.get("text") or "").strip(),
                "diag": diagnoses.get(qid),
                "review": reviews.get(qid),
                "law": law.get(qid),
                "card": card_of(q),
            }
        )
    rows.sort(key=lambda r: (SUBJECTS.index(r["subject"]), r["topic"], -r["lapses"], r["qid"]))

    now = datetime.now(dc.JST).strftime("%Y-%m-%d %H:%M")
    out = [
        "<!doctype html><html lang='ja'><head><meta charset='utf-8'>",
        "<meta name='viewport' content='width=device-width,initial-scale=1'>",
        f"<title>間違いノートと暗記カード {now[:10]}</title><style>",
        ":root{--bg:#fff;--fg:#1b1f24;--mu:#5b6570;--bd:#d5dae0;--ac:#0b5cad;--wn:#8a4b00;--wb:#fff4e0;--ng:#a3262a}",
        "@media (prefers-color-scheme:dark){:root{--bg:#14171b;--fg:#e8ebee;--mu:#9aa5b1;--bd:#333a42;--ac:#6db0ff;--wn:#ffc36b;--wb:#2b2113;--ng:#ff8a8d}}",
        "body{margin:0 auto;max-width:760px;padding:16px;background:var(--bg);color:var(--fg);font:16px/1.7 -apple-system,'Hiragino Sans',sans-serif}",
        "h1{font-size:1.3rem}h2{font-size:1.15rem;margin-top:2rem;border-bottom:2px solid var(--ac);padding-bottom:4px}h3{font-size:1rem;margin:1.4rem 0 .4rem;color:var(--ac)}",
        ".m{color:var(--mu);font-size:.85rem}.e{border:1px solid var(--bd);border-radius:8px;padding:10px 12px;margin:8px 0}",
        ".w{background:var(--wb);color:var(--wn);border-radius:6px;padding:6px 8px;margin-top:6px;font-size:.88rem}",
        "details{border:1px solid var(--bd);border-radius:8px;margin:8px 0}summary{padding:10px 12px;cursor:pointer}",
        "details>div{padding:0 12px 10px;border-top:1px dashed var(--bd)}.ng{color:var(--ng);font-weight:700}",
        "</style></head><body>",
        f"<h1>間違いノートと暗記カード</h1><p class='m'>生成 {now}（Firestore同期ぶん）／対象 {len(rows)}問（間違えた回数が2回以上、または直近の解答が不正解）。"
        "正解肢の文は問題データの原文。「推定」はAIの推測で断定ではありません。</p>",
        "<h2>1. 間違いノート</h2>",
    ]
    last = (None, None)
    for r in rows:
        if (r["subject"], r["topic"]) != last:
            if r["subject"] != last[0]:
                out.append(f"<h3>{esc(r['subject'])}</h3>")
            out.append(f"<p class='m'><b>{esc(r['topic'])}</b></p>")
            last = (r["subject"], r["topic"])
        status = "直近も不正解" if not r["last_ok"] else "直近は正解"
        out.append(f"<div class='e'><b>{esc(r['label'])}</b> <span class='m'>間違えた回数 {r['lapses']}・{status}</span>")
        if r["card"]:
            out.append(f"<div>{esc(r['card']['statement'])}<br><span class='ng'>→ {esc(r['card']['verdict'])}</span></div>")
        else:
            out.append("<div class='m'>個数・組合せ問題のため、肢の○×は省略（問題を開いて確認）</div>")
        if r["note"]:
            out.append(f"<div>自分のメモ: {esc(r['note'])}</div>")
        if r["review"] and r["review"].get("verdict") == "conflict":
            out.append(f"<div class='w'>⚠ メモが解説と食い違うと判定: {esc(r['review'].get('message',''))}</div>")
        if r["diag"]:
            out.append(f"<div class='m'>誤答の原因（推定・{esc(r['diag']['label'])}）: {esc(r['diag']['reason'])}</div>")
        if r["law"]:
            out.append(f"<div class='w'>⚠ 法改正の注記: {esc(r['law'])}</div>")
        out.append("</div>")

    out.append("<h2>2. 暗記カード（タップで答え）</h2><p class='m'>表は問題の肢の原文、裏は○×。声に出してから開く。</p>")
    for r in (x for x in rows if x["card"]):
        back = esc(r["card"]["verdict"]) + (f"<br>メモ: {esc(r['note'])}" if r["note"] else "")
        if r["law"]:
            back += "<br>⚠ 法改正あり（上のノート参照）"
        out.append(
            f"<details><summary><span class='m'>{esc(r['subject'])}・{esc(r['topic'])}</span><br>{esc(r['card']['statement'])}</summary><div>{back}</div></details>"
        )
    out.append("</body></html>")

    dest = ROOT / "docs" / "review" / f"{now[:10]}.html"
    dest.write_text("\n".join(out), encoding="utf-8")
    cards = sum(1 for r in rows if r["card"])
    print(f"書き出し: {dest}（対象{len(rows)}問・暗記カード{cards}枚・メモ付き{sum(1 for r in rows if r['note'])}問）")


if __name__ == "__main__":
    main()
