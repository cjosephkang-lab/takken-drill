# 期間ごとの解答数（docs/study-log と docs/coach の日別表から再構成）
import re,glob
from datetime import date,timedelta
daily={}
for f in sorted(glob.glob('docs/study-log/2026-*.md')):
    m=re.search(r'解いた問題: (\d+)問（正解 (\d+)',open(f).read())
    if m: daily[f[-13:-3]]=(int(m.group(1)),int(m.group(2)))
for f in sorted(glob.glob('docs/coach/2026-*.md')):
    for m in re.finditer(r'^\| (2026-\d\d-\d\d) \| (\d+) \| (\d+) \|',open(f).read(),re.M):
        daily[m.group(1)]=(int(m.group(2)),int(m.group(3)))
def period(a,b,label):
    d0=date.fromisoformat(a); d1=date.fromisoformat(b); n=c=days=study=0
    d=d0
    while d<=d1:
        days+=1; k=d.isoformat()
        if k in daily: n+=daily[k][0]; c+=daily[k][1]; study+=1
        d+=timedelta(1)
    print(f"{label}: {a}〜{b} 暦日{days} 学習日{study} 解答{n} 正解{c} 1日平均={n}/{days}={n/days:.1f}問")
period('2026-06-27','2026-09-08','開始〜9/8')
period('2026-09-09','2026-09-16','9/9推奨(30問/日)直後〜旅行前')
period('2026-09-17','2026-09-24','奄美旅行(32問×3周=96回推奨)')
period('2026-09-25','2026-10-03','旅行明け〜新規締切')
period('2026-10-04','2026-10-17','直前14日')
period('2026-10-05','2026-10-16','10/4計画 通常日(1日約50分想定)')
tot=sum(v[0] for v in daily.values()); print('総解答',tot,'学習日',len(daily))
print('予想48.3 - 実得点32 =',48.3-32)
print('9/6模試(初見r4) 29点 vs 本番32 差', 32-29)
print('10/12 Claude推定 24.5〜33.3; 10/17 Claude推定 29.5〜31.5(業法16-18仮定)')
