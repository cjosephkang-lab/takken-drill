# R8 の各選択肢の規則が、10/18時点のドリル収録5年分（2021-12, 2022〜2025）に同じ規則クラスターとしてあったか。
import json, glob
REPO='/Users/changju1109/AICompany/takken-drill'
DRILL={'2021-12','2022','2023','2024','2025'}
clu={}
for f in glob.glob(f'{REPO}/docs/coverage/clusters/*.jsonl'):
    for l in open(f):
        r=json.loads(l); clu[r['id']]=r['cluster']
by_c={}
for i,c in clu.items():
    ex=i.rsplit('-',2)[0]
    by_c.setdefault(c,set()).add(ex)
out={}
for l in open(f'{REPO}/docs/coverage/tags/R8.jsonl'):
    r=json.loads(l)
    i=f"R8-{r['q']:02d}-{r['item']}"
    exs=by_c.get(clu.get(i),set())-{'R8'}
    out[i]=dict(drill=sorted(exs&DRILL), older=sorted(exs-DRILL))
    print(i, 'drill:',','.join(sorted(exs&DRILL)) or '-', '| other:', ','.join(sorted(exs-DRILL)) or '-')
json.dump(out,open('drill_cov.json','w'),ensure_ascii=False)
