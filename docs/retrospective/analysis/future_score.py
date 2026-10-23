"""来年の得点の試算（2026-10-23）。AIが本人の頭を再現するのではなく、仮定を明示したモデルで数える。

モデル:
- 各選択肢（個数・組合せ問題はア〜エ）を、本人がその規則を「学んでいたか」で分ける。
  学んでいた規則は確率 c_s、学んでいない規則は確率 c_u で正誤を当てる（独立と仮定）。
- 4択: 「正しいもの/誤っているもの」に当てはまると判断した肢が1つならそれを選ぶ。0個・2個以上なら、その候補（0個なら4つ全部）から無作為に選ぶ。
- 個数・組合せ: 「正しい」と判断した記述の数が、実際の数と合えば正解（誤りが打ち消し合っても正解になる）。組合せ問題も同じ規則で数える（データで個数と組合せを区別していないため）。
- 確率は、選択肢ごとの判断の全パターン（最大2^4通り）を数えて厳密に出す（2026-10-23 codex指摘で乱数をやめた）。
- 今年: 学んでいた＝その規則（クラスター）がドリルの5年分（2021-12〜2025）に出ていた。
  c_s・c_u は、令和8年度の本人の問題ごとの正誤（r8-self-scoring.json）に最もよく合う値を探して決める。
- 来年: 過去10年に2回以上出た規則（規則の一問一答の範囲）を「深く学んだ」とし、確率 c_d で当てる。
  過去10年に1回だけ出た規則は今年と同じ c_s、出ていない規則は c_u。
- 来年の試験の代わりに、令和8年度と2022〜2025年度を「直前10年を学んだ状態で初めて解く試験」として解かせる。
入力: docs/coverage/tags, docs/coverage/clusters（AIが付けた論点と束ね。人は全件を確かめていない）
"""
import glob, itertools, json, math, collections
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
COV = ROOT / "docs" / "coverage"
EXAMS = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
         "2020-10", "2020-12", "2021-10", "2021-12", "2022", "2023", "2024", "2025", "R8"]
YEAR = {e: (2026 if e == "R8" else int(e[:4])) for e in EXAMS}
POS = {e: i for i, e in enumerate(EXAMS)}
DRILL5 = {"2021-12", "2022", "2023", "2024", "2025"}

tag, clu = {}, {}
for f in glob.glob(str(COV / "tags/*.jsonl")):
    for line in open(f, encoding="utf-8"):
        if line.strip():
            d = json.loads(line); tag[f'{d["exam"]}-{int(d["q"]):02d}-{d["item"]}'] = d
for f in glob.glob(str(COV / "clusters/*.jsonl")):
    for line in open(f, encoding="utf-8"):
        if line.strip():
            d = json.loads(line); clu[d["id"]] = d["cluster"]
seen = collections.defaultdict(list)
for i, c in clu.items():
    if i in tag:
        seen[c].append(tag[i]["exam"])

def questions(exam):
    qs = collections.defaultdict(list)
    for i, d in tag.items():
        if d["exam"] == exam and i in clu:
            qs[int(d["q"])].append((d["item"], d["truth"] == "正", clu[i], d["field"]))
    out = {}
    for q, opts in qs.items():
        opts.sort()
        kumi = opts[0][0] in "アイウエ"
        if kumi:
            out[q] = dict(kumi=True, opts=opts)
        else:
            t = [o[1] for o in opts]
            if t.count(True) == 1: target = True
            elif t.count(False) == 1: target = False
            else: continue  # 正誤から答えが一意に決まらない問題は数えない
            out[q] = dict(kumi=False, opts=opts, target=target)
    return out

def count_in(cluster, exam, n):
    return sum(1 for e in seen[cluster] if POS[e] < POS[exam] and YEAR[e] >= YEAR[exam] - n)

def p_question(q, probs):
    """選択肢ごとの当たる確率 probs から、その問題に正解する確率（判断の全パターンを数える）。"""
    opts = q["opts"]
    true_count = sum(o[1] for o in opts)
    ans = None if q["kumi"] else next(k for k, o in enumerate(opts) if o[1] == q["target"])
    total = 0.0
    for pattern in itertools.product([True, False], repeat=len(opts)):  # True = その肢の正誤を当てた
        w = math.prod(p if hit else 1 - p for hit, p in zip(pattern, probs))
        judged = [o[1] if hit else not o[1] for o, hit in zip(opts, pattern)]
        if q["kumi"]:
            total += w * (sum(judged) == true_count)
        else:
            cand = [k for k, j in enumerate(judged) if j == q["target"]] or list(range(len(opts)))
            total += w * ((ans in cand) / len(cand))
    return total

def score(exam, prob_of):
    qs = questions(exam)
    return {n: p_question(q, [prob_of(o[2], exam) for o in q["opts"]]) for n, q in qs.items()}, len(qs)

# 1) 今年の c_s・c_u を令和8年度の本人の正誤に合わせる
truth = {d["no"]: d["correct"] for d in json.load(open(ROOT / "docs/retrospective/r8-self-scoring.json"))["questions"]}
def this_year(cs, cu):
    return lambda c, e: cs if any(x in DRILL5 for x in seen[c] if POS[x] < POS[e]) else cu
best = None
for cs in [x / 100 for x in range(60, 100)]:
    for cu in [x / 100 for x in range(50, 96)]:
        ps, _ = score("R8", this_year(cs, cu))
        ll = sum(math.log(max(1e-6, ps[n] if truth[n] else 1 - ps[n])) for n in ps if n in truth)
        if best is None or ll > best[0]:
            best = (ll, cs, cu, sum(ps.values()), len(ps))
_, CS, CU, fit_total, nq = best
print(f"今年に合わせた値: c_s={CS:.2f}（ドリルにあった規則）, c_u={CU:.2f}（なかった規則）。"
      f"このとき令和8年度の期待点 {fit_total:.1f}（数えた{nq}問ぶん。本人の実際の正解は {sum(truth[n] for n in questions('R8'))}問）")

# 2) 来年の仮定で、直前10年を学んだ状態として各年度を解く（50問換算 = 数えた問題数で割って50を掛ける）
def scenario(c_twice, c_once, c_new):
    """過去10年に2回以上出た規則は c_twice、1回だけは c_once、出ていない規則は c_new で当てる。"""
    def f(c, e):
        k = count_in(c, e, 10)
        return c_twice if k >= 2 else (c_once if k == 1 else c_new)
    return f
SCENARIOS = [
    ("10年分に広げるが、深さは今年と同じ", CS, CS, CU),
    ("過去10年に2回以上出た規則を0.98", 0.98, CS, CU),
    ("過去10年に出た規則すべてを0.98", 0.98, 0.98, CU),
    ("上に加えて、過去に出ていない規則も0.85", 0.98, 0.98, 0.85),
]
TESTS = ["2022", "2023", "2024", "2025", "R8"]
print("\n仮定 | " + " | ".join(TESTS))
for label, a, b, c in SCENARIOS:
    cells = []
    for e in TESTS:
        ps, n = score(e, scenario(a, b, c))
        cells.append(f"{sum(ps.values()) * 50 / n:.1f}")
    print(f"{label} | " + " | ".join(cells))
