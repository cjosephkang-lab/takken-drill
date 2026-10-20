"""規則ごとの一問一答（○×）を src/data/ruleQuiz.ts に書き出す（2026-10-20）。

入力（build/ は gitignore）:
- build/rulequiz/out/<担当>.jsonl    … AIが作った○×（2027-04-01時点の条文で作成）
- build/rulequiz/verify/<担当>.jsonl … 別のAIが1問ずつ独立に確かめた結果
検証で ok になった問だけを載せる。wrong・ambiguous・unverifiable は載せない（誤った規則を覚えさせないため）。
"""
import glob
import hashlib
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "ruleQuiz.ts"
FIELD_ORDER = ["宅建業法", "権利関係", "法令上の制限", "税・価格評定", "免除科目"]


def main():
    verdicts = {}
    for f in glob.glob(str(ROOT / "build/rulequiz/verify/*.jsonl")):
        for line in open(f, encoding="utf-8"):
            if line.strip():
                v = json.loads(line)
                verdicts[v["id"]] = v
    items, tally = [], Counter()
    for f in sorted(glob.glob(str(ROOT / "build/rulequiz/out/*.jsonl"))):
        name = Path(f).name
        for i, line in enumerate(open(f, encoding="utf-8"), start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            v = verdicts.get(f"{name}#{i}")
            verdict = v["verdict"] if v else "missing"
            tally[verdict] += 1
            if verdict != "ok":
                continue
            items.append(row)

    groups = {}
    by_group = defaultdict(list)
    for row in items:
        gid = "ru-" + hashlib.sha1(f"{row['field']}|{row['major']}".encode()).hexdigest()[:8]
        groups[gid] = (row["field"], row["major"])
        by_group[gid].append(row)
    ordered = sorted(groups, key=lambda g: (FIELD_ORDER.index(groups[g][0]), groups[g][1]))

    group_rows = [
        {"id": g, "label": f"{groups[g][0]}: {groups[g][1]}（{len(by_group[g])}問）"} for g in ordered
    ]
    question_rows = []
    for g in ordered:
        for row in by_group[g]:
            qid = "ru-" + hashlib.sha1((row["q"] + str(row["a"])).encode()).hexdigest()[:10]
            question_rows.append({
                "id": qid,
                "video": g,
                "t": "",
                "topic": f"{row['field']}: {row['major']}（{row.get('axis') or '規則'}を問う）",
                "q": row["q"],
                "a": bool(row["a"]),
                "why": row["why"],
                "note": "",
                "sourceUrl": row.get("sourceUrl", ""),
            })
    ids = [q["id"] for q in question_rows]
    assert len(ids) == len(set(ids)), "問題IDが重複した"

    header = (
        "// 規則ごとの一問一答（○×）。2026-10-20 生成（scripts/build_rule_quiz.py）。\n"
        "//\n"
        "// 2017〜2026年の過去問で2回以上出た規則（docs/coverage の規則クラスター）ごとに、正しい規則と、\n"
        "// 主体・数字・範囲・例外などを1か所変えた誤りの文を、AIが2027年4月1日時点の条文・一次情報で作った。\n"
        "// 別のAIが1問ずつ独立に確かめ、正しいと確認できた問だけを載せている。公式過去問の出題フローには混ぜない。\n"
        f"// 載せた問 {len(question_rows)}／作成 {sum(tally.values())}（検証の内訳 {dict(tally)}）。\n\n"
        'import type { OxGroup } from "../KozarieQuiz";\n'
        'import type { KozarieQuestion } from "./kozarieQuiz";\n\n'
    )
    body = (
        "export const ruleGroups: OxGroup[] = "
        + json.dumps(group_rows, ensure_ascii=False, indent=2)
        + ";\n\nexport const ruleQuestions: KozarieQuestion[] = "
        + json.dumps(question_rows, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT.write_text(header + body, encoding="utf-8")
    print(f"載せた {len(question_rows)}問 / {len(group_rows)}グループ / 検証 {dict(tally)}")


if __name__ == "__main__":
    main()
