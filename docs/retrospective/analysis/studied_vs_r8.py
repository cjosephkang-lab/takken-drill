# 10/12〜10/17 に触った過去問（学習メモの更新日・誤答の記録日から確認できたもの）と、
# R8 本番の選択肢を、規則クラスター（docs/coverage/clusters）と大論点（major）で突き合わせる。
import json, glob
from datetime import datetime, timezone, timedelta
REPO='/Users/changju1109/AICompany/takken-drill'
JST=timezone(timedelta(hours=9))
def jst(t): return datetime.fromisoformat(t.replace('Z','+00:00')).astimezone(JST).strftime('%Y-%m-%d')
# --- R8
score={q['no']:q for q in json.load(open(f'{REPO}/docs/retrospective/r8-self-scoring.json'))['questions']}
tags={}
for f in glob.glob(f'{REPO}/docs/coverage/tags/*.jsonl'):
    for l in open(f):
        r=json.loads(l); tags[(r['exam'],r['q'],r['item'])]=r
clu={}
for f in glob.glob(f'{REPO}/docs/coverage/clusters/*.jsonl'):
    for l in open(f):
        r=json.loads(l); clu[r['id']]=r['cluster']
def cid(exam,q,item): return f"{exam}-{q:02d}-{item}"
# drill id -> exam label in tags
EX={'r3_12':'2021-12','r4':'2022','r5':'2023','r6':'2024','r7':'2025'}
print('exam labels in tags:',sorted({k[0] for k in tags})[:20])
# --- touched questions 10/12-10/17
ins=json.load(open(f'{REPO}/docs/insights/insights.json'))
touched={}
for k,v in ins['noteReviews'].items():
    d=jst(v['noteUpdatedAt']) if v.get('noteUpdatedAt') else ''
    if '2026-10-12'<=d<='2026-10-17': touched.setdefault(k,set()).add(('memo',d))
for k,v in ins['diagnoses'].items():
    d=jst(v['eventAt'])
    if '2026-10-12'<=d<='2026-10-17': touched.setdefault(k,set()).add(('wrong',d))
print('touched questions:',len(touched))
# R8 option index by cluster
r8_by_cluster={}
for (ex,q,it),r in tags.items():
    if ex=='R8':
        c=clu.get(cid('R8',q,it))
        if c: r8_by_cluster.setdefault(c,[]).append((q,it))
rows=[]
for k in sorted(touched):
    pre,qn=k.rsplit('-',1); ex=EX[pre]; qn=int(qn)
    opts=[(it,r) for (e,q,it),r in tags.items() if e==ex and q==qn]
    majors=sorted({r['major'] for _,r in opts})
    hits=set()
    for it,r in opts:
        c=clu.get(cid(ex,qn,it))
        for (q8,it8) in r8_by_cluster.get(c,[]): hits.add((q8,it8,it))
    r8maj=sorted({q for (e,q,it),r in tags.items() if e=='R8' and r['major'] in majors})
    rows.append(dict(id=k,when=sorted(touched[k]),majors=majors,rule_hits=sorted(hits),major_hits=r8maj))
for r in rows:
    rh=' '.join(f"R8問{q}-{i}({'○' if score[q]['correct'] else '×'})←肢{o}" for q,i,o in r['rule_hits'])
    mh=' '.join(f"{q}{'○' if score[q]['correct'] else '×'}" for q in r['major_hits'])
    print(r['id'], [w for w in r['when']], '/'.join(r['majors']), '| 規則一致:', rh or '-', '| 同じ大論点のR8:', mh or '-')
json.dump(rows,open('studied_vs_r8.json','w'),ensure_ascii=False,indent=1,default=list)
