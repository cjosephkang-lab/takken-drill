# ○×のグループごとに、R8 の選択肢と「直接」対応した項目の数と、その問の正誤を数える。
import json, sys
sys.path.insert(0,'.')
from mapping import MAP
score={q['no']:q['correct'] for q in json.load(open('/Users/changju1109/AICompany/takken-drill/docs/retrospective/r8-self-scoring.json'))['questions']}
items=json.load(open('items.json'))
hit={}
for opt,lst in MAP.items():
    q=int(opt.split('-')[1])
    for iid,rel in lst:
        hit.setdefault(iid,[]).append((q,opt.split('-')[2],rel))
from collections import defaultdict
g=defaultdict(lambda:{'n':0,'direct':0,'qs':set(),'adjqs':set()})
for o in items:
    k=(o['file'].replace('.ts',''),o['group'],o['added'].split()[1])
    g[k]['n']+=1
    for q,it,rel in hit.get(o['id'],[]):
        if rel=='直接': g[k]['direct']+=1; g[k]['qs'].add(q)
        else: g[k]['adjqs'].add(q)
for k,v in sorted(g.items(),key=lambda x:(x[0][2],x[0][0],x[0][1])):
    qs=' '.join(f"{q}{'○' if score[q] else '×'}" for q in sorted(v['qs']))
    aq=' '.join(f"{q}{'○' if score[q] else '×'}" for q in sorted(v['adjqs']-v['qs']))
    print(f"{k[2]} {k[0]}/{k[1]}: {v['n']}問中 直接対応{v['direct']}項目 → R8 {qs or '-'} | 隣接のみ {aq or '-'}")
# 10/12 シート
for pre in ['fixed:','stats:']:
    qs={int(o.split('-')[1]) for o,l in MAP.items() for i,r in l if i.startswith(pre) and r=='直接'}
    print(pre, sorted(qs), [score[q] for q in sorted(qs)])
