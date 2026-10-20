# 直前（10/12〜10/18朝）に追加した○×・暗記シートの、本番得点への寄与の見積もり。
# 反実仮想: 「その項目が無かったら、その問題は 直前項目なし の問題と同じ正答率だった」と置く。
#   p_D = 直前項目なし・決め手がドリル5年分にある問題の正答率
#   p_Z = 直前項目なし・ドリルにもない問題の正答率
# 寄与(釣り合い型) = Σ_{直前項目で覆われた問題} (実際の正誤 − p_cf)    … 覆われていたのに落とした問題はマイナスに数える
# 寄与(楽観型)     = Σ_{覆われて正解した問題} (1 − p_cf)
# 寄与(保守型)     = 決め手の規則がドリルにも10/12〜17の再演習にも無く、直前項目だけが覆っていた正解問題の数 × (1 − p_Z)
import json
rows=json.load(open('per_question.json'))
def rate(cat):
    rs=[r for r in rows if r['cat']==cat]; c=sum(r['correct'] for r in rs); return c,len(rs),c/len(rs)
cD,nD,pD=rate('D'); cZ,nZ,pZ=rate('Z')
print(f'p_D = {cD}/{nD} = {pD:.3f}   p_Z = {cZ}/{nZ} = {pZ:.3f}')
cov=[r for r in rows if r['cat'] in 'NE']
bal=0; opt=0; lines=[]
for r in cov:
    pcf = pD if r['drill_dec'] else pZ
    d = int(r['correct']) - pcf
    bal += d
    if r['correct']: opt += 1-pcf
    lines.append(f"  問{r['q']:2d} cat={r['cat']} 正誤={'○' if r['correct'] else '×'} p_cf={'p_D' if r['drill_dec'] else 'p_Z'}={pcf:.3f} 寄与={int(r['correct'])}-{pcf:.3f}={d:+.3f}")
print('\n'.join(lines))
print(f'釣り合い型 合計 = {bal:+.2f}点')
print(f'楽観型 合計     = {opt:+.2f}点')
strong=[r for r in cov if r['correct'] and not r['drill_dec'] and not r['recent_dec']]
print('保守型の対象:', [r['q'] for r in strong], f'→ {len(strong)} × (1 − {pZ:.3f}) = {len(strong)*(1-pZ):.2f}点')
# 追加日別: 覆っていた項目の追加日
for day in ['2026-10-12','2026-10-17','2026-10-18']:
    qs=[r['q'] for r in cov if day in r['dates']]
    only=[r['q'] for r in cov if r['dates']==[day]]
    print(f'{day} の項目が直接覆う問題: {qs}  （この日の項目だけで覆われた問題: {only}）')
