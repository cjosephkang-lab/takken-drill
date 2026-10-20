# R8 各問について、直前追加の項目（mapping.py）・ドリル5年分（drill_cov.json）・10/12〜10/17に解いた過去問（studied_vs_r8.json）
# のどれが「決め手の肢」を覆っていたかを数え、正答率を比べる。
import json, sys
sys.path.insert(0,'.')
from mapping import MAP
REPO='/Users/changju1109/AICompany/takken-drill'
score={q['no']:q for q in json.load(open(f'{REPO}/docs/retrospective/r8-self-scoring.json'))['questions']}
tags=[json.loads(l) for l in open(f'{REPO}/docs/coverage/tags/R8.jsonl')]
drill=json.load(open('drill_cov.json'))
items={o['id']:o for o in json.load(open('items.json'))}
def added(iid):
    if iid.startswith('fixed:') or iid.startswith('stats:'): return '2026-10-12'
    return items[iid]['added'].split()[1]
studied=json.load(open('studied_vs_r8.json'))
recent={}  # R8 option -> drill question re-solved 10/12-10/17 with same rule cluster
for r in studied:
    for q8,it8,o in r['rule_hits']:
        recent.setdefault(f'R8-{q8:02d}-{it8}',[]).append(r['id'])
qs={}
for t in tags:
    qs.setdefault(t['q'],[]).append(t)
rows=[]
for q in range(1,51):
    opts=qs[q]; ans=score[q]['ucan'] or score[q]['agaroot']
    kumi = opts[0]['item'] in 'アイウエ'
    if kumi: dec=[t['item'] for t in opts]           # 個数・組合せ: 全肢が決め手
    else: dec=[str(score[q]['agaroot'])]              # 4択: 正解の肢
    def oid(it): return f'R8-{q:02d}-{it}'
    nd=[it for it in dec if any(r=='直接' for _,r in MAP.get(oid(it),[]))]
    dd=[it for it in dec if drill[oid(it)]['drill']]
    rd=[it for it in dec if oid(it) in recent]
    others=[t['item'] for t in opts if t['item'] not in dec]
    elim=[it for it in others if any(r=='直接' for _,r in MAP.get(oid(it),[]))]
    adj=[it for it in [t['item'] for t in opts] if MAP.get(oid(it)) and not any(r=='直接' for _,r in MAP[oid(it)])]
    dates=sorted({added(i) for t in opts for i,r in MAP.get(oid(t['item']),[]) if r=='直接'})
    rows.append(dict(q=q,correct=score[q]['correct'],kumi=kumi,dec=dec,new_dec=nd,drill_dec=dd,recent_dec=rd,elim=elim,adj=adj,dates=dates,mine=score[q]['mine'],ans=score[q]['agaroot']))
json.dump(rows,open('per_question.json','w'),ensure_ascii=False,indent=1)
def share(a,b): return len(a)/len(b)
# カテゴリ: N=決め手の肢を直前追加の項目が直接覆う（個数・組合せは半分以上）, E=4択で決め手は無いが他の肢2つ以上を直接覆う（消去）, D=直前項目なし・ドリルにあり, Z=どちらもなし
for r in rows:
    if share(r['new_dec'],r['dec'])>=0.5: c='N'
    elif not r['kumi'] and len(r['elim'])>=2: c='E'
    elif share(r['drill_dec'],r['dec'])>=0.5: c='D'
    else: c='Z'
    r['cat']=c
from collections import defaultdict
agg=defaultdict(lambda:[0,0])
for r in rows: agg[r['cat']][0]+=r['correct']; agg[r['cat']][1]+=1
print('カテゴリ別 正解/問数:')
for c in 'NEDZ': print(f"  {c}: {agg[c][0]}/{agg[c][1]} = {agg[c][0]/agg[c][1]:.2f}" if agg[c][1] else f'  {c}: 0')
for r in rows:
    print(f"問{r['q']:2d} {'○' if r['correct'] else '×'} 本人{r['mine']}/正解{r['ans']} cat={r['cat']} 決め手{r['dec']} 直前直接{r['new_dec']} ドリル{r['drill_dec']} 10/12-17再演習{r['recent_dec']} 消去用{r['elim']} 隣接のみ{r['adj']} 追加日{r['dates']}")
json.dump(rows,open('per_question.json','w'),ensure_ascii=False,indent=1)
