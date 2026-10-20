import json,sys,re
kw=re.compile(r'計画|方針|目標|推奨|勧め|やること|予想点|安全圏|模試|過去問|何周|権利関係|宅建業法|合格|時間|ペース|温存|総復習|5年|十分|足り')
for f in sys.argv[1:]:
    for line in open(f):
        try:o=json.loads(line)
        except:continue
        t=o.get('timestamp','')
        if t>'2026-10-18T04:00': continue
        typ=o.get('type')
        if typ not in('user','assistant'):continue
        if o.get('isSidechain'): continue
        c=o.get('message',{}).get('content')
        texts=[]
        if isinstance(c,str):texts=[c]
        elif isinstance(c,list):
            texts=[x.get('text','') for x in c if x.get('type')=='text']
        for tx in texts:
            if not tx.strip() or tx.startswith('<browser_instruction') or tx.startswith('<system') or tx.startswith('<command') or tx.startswith('<local-command'): continue
            if typ=='user' and len(tx)>3000: tx=tx[:3000]
            if typ=='assistant' and not kw.search(tx): continue
            print(f'##### {f[:8]} {t[:16]} {typ.upper()}\n{tx}\n')
