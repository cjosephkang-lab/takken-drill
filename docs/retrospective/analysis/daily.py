import re,glob,json
daily={}
for f in sorted(glob.glob('docs/study-log/2026-*.md')):
    d=f.split('/')[-1][:-3]
    m=re.search(r'解いた問題: (\d+)問（正解 (\d+)',open(f).read())
    if m: daily[d]=(int(m.group(1)),int(m.group(2)),'log')
for f in sorted(glob.glob('docs/coach/2026-*.md')):
    for m in re.finditer(r'^\| (2026-\d\d-\d\d) \| (\d+) \| (\d+) \|',open(f).read(),re.M):
        daily[m.group(1)]=(int(m.group(2)),int(m.group(3)),'coach')
tot=0
months={}
for d in sorted(daily):
    n,c,s=daily[d]; tot+=n
    months.setdefault(d[:7],[0,0,0]); months[d[:7]][0]+=n; months[d[:7]][1]+=1
print(json.dumps(months))
print('total',tot,'days',len(daily))
# Sep 10-26 window
for d in sorted(daily):
    if '2026-09-0'<d<'2026-10-19': print(d,daily[d])
