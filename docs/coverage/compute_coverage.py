"""網羅率の計算。

定義:
- 単位は選択肢（個数・組合せ問題はア〜エの記述）。各選択肢は1つの「規則クラスター」に属する。
- 試験 E の「直前 N 年の網羅率」= E の選択肢のうち、同じクラスターが「E より前に実施され、かつ実施年が E の年−N 以上」の試験に出ていた割合。
  例: R8（2026年）の直前5年 = 2021年10月・12月、2022〜2025年の6回。
- 「ドリルの5年分」= 令和3年12月・令和4〜7年（2021-12, 2022〜2025）。今年のドリルに実際に入れていた5回。
入力: tags/*.jsonl（分野・正誤）、clusters/*.jsonl（id→cluster）
"""
import json, glob, collections

EXAMS = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
         "2020-10", "2020-12", "2021-10", "2021-12", "2022", "2023", "2024", "2025", "R8"]
YEAR = {e: (2026 if e == "R8" else int(e[:4])) for e in EXAMS}
POS = {e: i for i, e in enumerate(EXAMS)}
DRILL5 = {"2021-12", "2022", "2023", "2024", "2025"}

tag = {}
for f in glob.glob("tags/*.jsonl"):
    for line in open(f, encoding="utf-8"):
        if line.strip():
            d = json.loads(line)
            d["id"] = f'{d["exam"]}-{int(d["q"]):02d}-{d["item"]}'
            tag[d["id"]] = d
clu = {}
for f in glob.glob("clusters/*.jsonl"):
    for line in open(f, encoding="utf-8"):
        if line.strip():
            d = json.loads(line)
            clu[d["id"]] = d["cluster"]
missing = set(tag) - set(clu)
print(f"選択肢 {len(tag)} / クラスター付き {len(clu)} / 欠け {len(missing)} / クラスター数 {len(set(clu.values()))}")

seen = collections.defaultdict(set)  # cluster -> exams
for i, c in clu.items():
    if i in tag:
        seen[c].add(tag[i]["exam"])

def covered(i, window_exams):
    return bool(seen[clu[i]] & window_exams)

def window(e, n):
    return {x for x in EXAMS if POS[x] < POS[e] and YEAR[x] >= YEAR[e] - n}

def rate(ids, w):
    ids = [i for i in ids if i in clu]
    return sum(covered(i, w) for i in ids) / len(ids) if ids else float("nan"), len(ids)

by_exam = collections.defaultdict(list)
for i, d in tag.items():
    by_exam[d["exam"]].append(i)

print("\n## 試験ごとの網羅率（選択肢単位）")
print("試験 | 直前5年 | 直前10年 | 直前15年 | 過去全部（2011〜）")
for e in EXAMS[1:]:
    cells = []
    for n in (5, 10, 15):
        full = YEAR[e] - n >= 2011
        r, _ = rate(by_exam[e], window(e, n))
        cells.append(f"{r:.0%}" + ("" if full else "*"))
    r, _ = rate(by_exam[e], {x for x in EXAMS if POS[x] < POS[e]})
    print(f"{e} | " + " | ".join(cells) + f" | {r:.0%}")
print("（* はデータが2011年より前に届かないため、窓が欠けている）")

print("\n## R8 の分野別")
FIELDS = ["権利関係", "法令上の制限", "税・価格評定", "宅建業法", "免除科目"]
print("分野 | ドリルの5年分 | 直前5年 | 直前10年 | 直前15年 | 選択肢数")
for f in FIELDS:
    ids = [i for i in by_exam["R8"] if tag[i]["field"] == f]
    cols = [rate(ids, DRILL5)[0]] + [rate(ids, window("R8", n))[0] for n in (5, 10, 15)]
    print(f"{f} | " + " | ".join(f"{c:.0%}" for c in cols) + f" | {len(ids)}")
ids = by_exam["R8"]
cols = [rate(ids, DRILL5)[0]] + [rate(ids, window("R8", n))[0] for n in (5, 10, 15)]
print("合計 | " + " | ".join(f"{c:.0%}" for c in cols) + f" | {len(ids)}")

print("\n## 分野別の平均（直前10年の窓が揃う 2021-10〜R8 の平均）")
targets = [e for e in EXAMS if YEAR[e] - 10 >= 2011]
for f in FIELDS:
    rs = [rate([i for i in by_exam[e] if tag[i]["field"] == f], window(e, n))[0] for e in targets for n in (5,)]
    r10 = [rate([i for i in by_exam[e] if tag[i]["field"] == f], window(e, 10))[0] for e in targets]
    print(f"{f}: 直前5年 {sum(rs)/len(rs):.0%} / 直前10年 {sum(r10)/len(r10):.0%}（{len(targets)}回の平均）")

print("\n## 本人が落とした R8 の問題: 選択肢ごとの初出年と窓")
WRONG = [4, 7, 8, 9, 12, 15, 17, 18, 20, 23, 28, 30, 32, 33, 41, 42, 43, 48]
for q in WRONG:
    parts = []
    for i in sorted(x for x in by_exam["R8"] if tag[x]["q"] == q):
        ex = sorted(seen[clu[i]] - {"R8"}, key=POS.get)
        last = ex[-1] if ex else "初出"
        mark = "D" if seen[clu[i]] & DRILL5 else ("5" if covered(i, window("R8", 5)) else ("10" if covered(i, window("R8", 10)) else ("15" if covered(i, window("R8", 15)) else "×")))
        parts.append(f'{tag[i]["item"]}:{mark}({last})')
    print(f"問{q}: " + " ".join(parts))
print("（D=ドリルの5年分にあった / 5・10・15=直前N年で初めて覆える / ×=過去15年に出ていない。括弧内は最後に出た試験）")

print("\n## R8 問題単位（4択=正解肢、個数・組合せ=全記述が出ていたか）")
ANS = {1:3,2:2,3:3,4:3,5:4,6:1,7:4,8:4,9:1,10:3,11:1,12:4,13:4,14:1,15:2,16:4,17:4,18:3,19:1,20:2,21:4,22:2,23:2,24:3,25:2,26:1,27:3,28:3,29:2,30:2,31:1,32:4,33:4,34:2,35:3,36:2,37:1,38:2,39:1,40:2,41:2,42:3,43:2,44:4,45:2,46:2,47:1,48:1,49:3,50:3}
def level(ids):
    for name, w in (("D", DRILL5), ("5年", window("R8", 5)), ("10年", window("R8", 10)), ("15年", window("R8", 15))):
        if all(covered(i, w) for i in ids): return name
    return "初出"
res = {}
for q in range(1, 51):
    items = [i for i in by_exam["R8"] if tag[i]["q"] == q]
    kana = [i for i in items if tag[i]["item"] in "アイウエオ"]
    key = kana if kana else [i for i in items if tag[i]["item"] == str(ANS[q])]
    res[q] = level(key) if key else "?"
cnt = collections.Counter(res.values())
cum = 0
for name in ("D", "5年", "10年", "15年", "初出"):
    cum += cnt[name]; print(f"{name}: {cnt[name]}問（累計 {cum}問）")
print("本人が落とした18問:", {q: res[q] for q in WRONG})
print("本人が正解した32問:", collections.Counter(res[q] for q in range(1, 51) if q not in WRONG))
print("落とした18問の内訳:", collections.Counter(res[q] for q in WRONG))
