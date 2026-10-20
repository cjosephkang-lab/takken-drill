# 感度分析: 反実仮想の正答率を「過去15年のどこかに決め手の規則があったか」でも分け、
# 見積もりの不確かさ（標準誤差）を出す。
import json, math
rows=json.load(open('per_question.json'))
drill=json.load(open('drill_cov.json'))
for r in rows:
    ids=[f"R8-{r['q']:02d}-{it}" for it in r['dec']]
    r['old_dec']=[i for i in ids if drill[i]['older'] or drill[i]['drill']]
    r['old_share']=len(r['old_dec'])/len(ids)
def grp(f):
    rs=[r for r in rows if f(r)]; c=sum(r['correct'] for r in rs); return c,len(rs)
unc=lambda r:r['cat'] in 'DZ'
for name,f in [('直前なし・ドリルにあり(D)',lambda r:unc(r) and r['cat']=='D'),
               ('直前なし・ドリルに無いが2011-2025のどこかにあり',lambda r:unc(r) and r['cat']=='Z' and r['old_share']>=0.5),
               ('直前なし・15年分のどこにも無い',lambda r:unc(r) and r['cat']=='Z' and r['old_share']<0.5)]:
    c,n=grp(f); print(f'{name}: {c}/{n} = {c/n:.3f}')
c1,n1=grp(lambda r:unc(r) and r['cat']=='Z' and r['old_share']>=0.5)
c2,n2=grp(lambda r:unc(r) and r['cat']=='Z' and r['old_share']<0.5)
cD,nD=grp(lambda r:r['cat']=='D')
p_old=c1/n1; p_new=c2/n2; pD=cD/nD
print(f'p_old={c1}/{n1}={p_old:.3f}  p_none={c2}/{n2}={p_new:.3f}  p_D={cD}/{nD}={pD:.3f}')
cov=[r for r in rows if r['cat'] in 'NE']
bal=0; var_p=0; var_y=0; cnt={'D':0,'old':0,'none':0}
for r in cov:
    if r['drill_dec']: p,k,n='p_D',pD,nD; cnt['D']+=1
    elif r['old_share']>=0.5: p,k,n='p_old',p_old,n1; cnt['old']+=1
    else: p,k,n='p_none',p_new,n2; cnt['none']+=1
    bal+=int(r['correct'])-k
    var_y+=k*(1-k)
    print(f"  問{r['q']:2d} {'○' if r['correct'] else '×'} {p}={k:.3f} 寄与={int(r['correct'])-k:+.3f}")
# p の推定誤差（同じ p を使う問題の数 × SE）と、結果そのもののばらつき
se_p=math.sqrt((cnt['D']*math.sqrt(pD*(1-pD)/nD))**2+(cnt['old']*math.sqrt(p_old*(1-p_old)/n1))**2+(cnt['none']*math.sqrt(p_new*(1-p_new)/n2) if n2 else 0)**2)
se=math.sqrt(se_p**2+var_y)
print(f'釣り合い型（細分）= {bal:+.2f}点, 標準誤差 ≈ sqrt({se_p:.2f}^2 + {math.sqrt(var_y):.2f}^2) = {se:.2f}')
print(f'問48（判断は正しく丸の付け間違い）を除くと = {bal+(pD):+.2f}点')
