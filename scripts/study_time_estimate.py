"""試験日までに確保すべき学習時間の見積もり（2026-10-04）。

Firestoreの events（解答ごとの所要ms）から1問あたりの実測時間を出し、残りの作業量に掛ける。
仮定: 誤答の解説読み 0.9分/問・模試2回(120分+復習60分)・区分所有法と統計の確認45分・各問は通算4回解く（棚田式）。
実行: python3 scripts/study_time_estimate.py（gcloud認証が必要）
"""
import importlib.util,sys,json,statistics as st,collections,urllib.request
from pathlib import Path
R=Path('/Users/changju1109/AICompany/takken-drill');sys.path.insert(0,str(R/'scripts'))
sp=importlib.util.spec_from_file_location('dc',R/'scripts/daily-coach.py');dc=importlib.util.module_from_spec(sp);sp.loader.exec_module(dc)
req=urllib.request.Request(dc.FIRESTORE_URL,headers={"Authorization":f"Bearer {dc.access_token()}"})
d=json.load(urllib.request.urlopen(req,timeout=30))['documents'][0]
ev=[dc.unwrap(v) for v in d['fields']['events']['arrayValue'].get('values',[])]
cat=dc.load_question_categories()
by=collections.defaultdict(list)
for e in ev:
    ms=e.get('ms'); 
    if not ms or ms>600000 or e.get('src')!='drill': continue   # 10分超は放置とみなして除外
    by[cat.get(e['q'],'?')].append(ms/60000)
allv=[x for v in by.values() for x in v]
print('events',len(ev),'used',len(allv))
for c,v in by.items(): print(c,len(v),'median分',round(st.median(v),2),'mean分',round(st.mean(v),2))
print('ALL median',round(st.median(allv),2),'mean',round(st.mean(allv),2))

# ---- 残り学習時間の算出 ----
from datetime import date
p=dc.fetch_progress();a=p['answers']
MIN_PER_ANSWER=round(st.mean(allv),2)          # 実測平均(分/問・解答時間のみ)
EXPL=0.9                                        # 誤答の解説読み(誤答30%×3分)=0.9分/問 ←仮定
NEW=50; NEW_MIN_PER_Q=MIN_PER_ANSWER+EXPL
rem_attempts_touched=sum(max(0,4-v.get('attempts',0)) for v in a.values())   # 棚田式:通算4回
rem_attempts_new=NEW*3                           # 新規は初回後あと3回
review_min=(rem_attempts_touched+rem_attempts_new)*MIN_PER_ANSWER
wrong2=39; wrong_rep_min=wrong2*3*MIN_PER_ANSWER # 誤答39問を追加3周(上と一部重複→安全側)
new_min=NEW*NEW_MIN_PER_Q
mock_min=2*(120+60)                              # 本番形式2回(120分+復習60分)
check_min=45                                     # 区分所有法改正+統計の最新値(仮定)
total=new_min+review_min+wrong_rep_min+mock_min+check_min
today=date(2026,10,4);exam=date(2026,10,18)
days=(exam-today).days                           # 14 (10/4..10/17)
print('MIN_PER_ANSWER',MIN_PER_ANSWER,'NEW_MIN_PER_Q',round(NEW_MIN_PER_Q,2))
print('新規',NEW,'×',round(NEW_MIN_PER_Q,2),'=',round(new_min),'分')
print('間隔復習 残り解答',rem_attempts_touched,'+',rem_attempts_new,'=',rem_attempts_touched+rem_attempts_new,'回 ×',MIN_PER_ANSWER,'=',round(review_min),'分')
print('誤答39問×3周×',MIN_PER_ANSWER,'=',round(wrong_rep_min),'分')
print('模試2回 =',mock_min,'分; 確認',check_min,'分')
print('合計',round(total),'分 =',round(total/60,1),'時間; 日数',days,'; 1日あたり',round(total/days),'分 =',round(total/days/60,1),'時間')
today_h=4*60
print('今日4時間(240分)を引いた残り',round(total-today_h),'分 /',days-1,'日 =',round((total-today_h)/(days-1)),'分/日')
