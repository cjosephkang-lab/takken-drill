// 直前の詰め込み用○×（盛土規制法・区分所有法・借地借家法の数字）。
//
// 数字は数字シート（fixedSlotNumbers.ts、e-Gov の2026-04-01時点の条文で確認済み）と同じもの。
// 区分所有法の招集通知は、2026-10-17 に e-Gov で「規約で伸長できる（短縮は不可）」を確認した。
// 統計は 2026-10-18 に国交省・財務省の公表PDF（各問の sourceUrl）で数字を確認した。
// AIが○×の形にしたもので、公式過去問の出題フローには混ぜない。「一覧で見る」がチートシートになる。

import type { OxGroup } from "../KozarieQuiz";
import type { KozarieQuestion } from "./kozarieQuiz";

export const cramGroups: OxGroup[] = [
  {
    "id": "nokori",
    "label": "まだ確認していない論点（瑕疵担保履行法・建蔽率・仮換地・共有・譲渡所得）"
  },
  {
    "id": "tokei",
    "label": "統計（2026年試験向け）"
  },
  {
    "id": "chizei",
    "label": "不動産取得税と固定資産税"
  },
  {
    "id": "sozoku",
    "label": "法定相続分と代襲"
  },
  {
    "id": "morido",
    "label": "盛土規制法の数字"
  },
  {
    "id": "kubun",
    "label": "区分所有法の決議（2026年改正後）"
  },
  {
    "id": "shakuchi",
    "label": "借地借家法の数字"
  }
];

export const cramQuestions: KozarieQuestion[] = [
  {
    "id": "cr-nokori-1",
    "video": "nokori",
    "t": "",
    "topic": "住宅瑕疵担保履行法",
    "q": "宅建業者が自ら売主として、宅建業者である買主に新築住宅を販売する場合、資力確保措置（保証金の供託または保険契約の締結）を講じなければならない。",
    "a": false,
    "why": "買主が宅建業者なら不要。対象は「業者が自ら売主・買主が業者でない・新築住宅」の3つがそろった時だけ。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/419AC0000000066"
  },
  {
    "id": "cr-nokori-2",
    "video": "nokori",
    "t": "",
    "topic": "住宅瑕疵担保履行法",
    "q": "資力確保措置の状況の届出は、毎年3月31日の基準日から3週間以内に、免許を受けた国土交通大臣または都道府県知事にしなければならない。",
    "a": true,
    "why": "基準日は毎年3月31日。届出先は免許権者（国交大臣または知事）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/419AC0000000066"
  },
  {
    "id": "cr-nokori-3",
    "video": "nokori",
    "t": "",
    "topic": "住宅瑕疵担保履行法",
    "q": "供託と届出をしなかった宅建業者は、基準日の翌日から起算して50日を経過した日以後、新たに自ら売主となる新築住宅の売買契約を締結してはならない。",
    "a": true,
    "why": "50日を過ぎると新規の契約ができない（13条）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/419AC0000000066"
  },
  {
    "id": "cr-nokori-4",
    "video": "nokori",
    "t": "",
    "topic": "住宅瑕疵担保履行法",
    "q": "住宅販売瑕疵担保保証金の供託は、宅建業者の主たる事務所の最寄りの供託所にしなければならない。",
    "a": true,
    "why": "営業保証金と同じく主たる事務所の最寄りの供託所（11条6項）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/419AC0000000066"
  },
  {
    "id": "cr-nokori-5",
    "video": "nokori",
    "t": "",
    "topic": "住宅瑕疵担保履行法",
    "q": "保証金の額を算定する際、床面積の合計が55㎡以下の新築住宅は、2戸をもって1戸と数える。",
    "a": true,
    "why": "55㎡以下は2戸で1戸（11条3項・施行令）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/419AC0000000066"
  },
  {
    "id": "cr-nokori-6",
    "video": "nokori",
    "t": "",
    "topic": "建蔽率",
    "q": "都市計画で定められた建蔽率が10分の8の地域で、防火地域内にある耐火建築物等については、建蔽率の制限は適用されない。",
    "a": true,
    "why": "8/10の地域×防火地域×耐火建築物等＝制限なし（53条6項）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000201#Mp-At_53"
  },
  {
    "id": "cr-nokori-7",
    "video": "nokori",
    "t": "",
    "topic": "建蔽率",
    "q": "準防火地域内にある準耐火建築物等は、建蔽率の緩和（10分の1加算）を受けることができない。",
    "a": false,
    "why": "準防火地域内の耐火建築物等・準耐火建築物等も＋1/10を受けられる（53条3項）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000201#Mp-At_53"
  },
  {
    "id": "cr-nokori-8",
    "video": "nokori",
    "t": "",
    "topic": "建蔽率",
    "q": "特定行政庁が指定する角地内にあり、かつ防火地域内の耐火建築物等である場合、建蔽率は10分の2加算される。",
    "a": true,
    "why": "角地＋1/10と防火の＋1/10を合わせて＋2/10。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000201#Mp-At_53"
  },
  {
    "id": "cr-nokori-9",
    "video": "nokori",
    "t": "",
    "topic": "仮換地",
    "q": "仮換地が指定された場合、従前の宅地の所有者は、換地処分の公告があるまで、仮換地を使用・収益することができる。",
    "a": true,
    "why": "使うのは仮換地（99条1項）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/329AC0000000119"
  },
  {
    "id": "cr-nokori-10",
    "video": "nokori",
    "t": "",
    "topic": "仮換地",
    "q": "仮換地が指定されると、従前の宅地の所有者は、従前の宅地を売却したり、抵当権を設定したりすることができなくなる。",
    "a": false,
    "why": "売る・抵当権を設定するのは従前の宅地のまま。できなくなるのは従前の宅地の使用・収益。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/329AC0000000119"
  },
  {
    "id": "cr-nokori-11",
    "video": "nokori",
    "t": "",
    "topic": "仮換地",
    "q": "換地処分の公告があった場合、換地計画で定められた換地は、公告があった日の翌日から従前の宅地とみなされ、保留地は翌日に施行者が取得する。",
    "a": true,
    "why": "換地も保留地も清算金の確定も「翌日」（104条）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/329AC0000000119"
  },
  {
    "id": "cr-nokori-12",
    "video": "nokori",
    "t": "",
    "topic": "共有",
    "q": "共有物の保存行為は、各共有者が単独ですることができる。",
    "a": true,
    "why": "保存は単独、管理は持分価格の過半数、変更は全員（軽微な変更は過半数）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_251"
  },
  {
    "id": "cr-nokori-13",
    "video": "nokori",
    "t": "",
    "topic": "共有",
    "q": "共有物に変更を加える行為は、その形状または効用の著しい変更を伴わないものであっても、共有者全員の同意が必要である。",
    "a": false,
    "why": "形状・効用の著しい変更を伴わない軽微な変更は、持分価格の過半数で決められる（251条1項・252条）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_251"
  },
  {
    "id": "cr-nokori-14",
    "video": "nokori",
    "t": "",
    "topic": "譲渡所得",
    "q": "居住用財産を譲渡した場合の3,000万円特別控除は、その居住用財産の所有期間が10年を超えていなければ適用を受けられない。",
    "a": false,
    "why": "3,000万円控除は所有期間を問わない。10年超が要るのは軽減税率の特例。両方を併用できる。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/332AC0000000026#Mp-At_35"
  },
  {
    "id": "cr-nokori-15",
    "video": "nokori",
    "t": "",
    "topic": "譲渡所得",
    "q": "居住用財産を配偶者に譲渡した場合でも、3,000万円特別控除の適用を受けることができる。",
    "a": false,
    "why": "配偶者・直系血族・生計を一にする親族など特別な関係の人への譲渡は対象外。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/332AC0000000026#Mp-At_35"
  },
  {
    "id": "cr-sozoku-1",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "1億2,000万円の財産を残してAが死亡。配偶者はなく、子B・C・Dがいる。Bは相続を放棄し、Cは欠格で相続人になれない。Bの子E、Cの子Fがいる場合、法定相続分はDが6,000万円、Fが6,000万円である。",
    "a": true,
    "why": "放棄したBの子Eは代襲しない。欠格のCの子Fは代襲する。相続人はDとFで各1/2＝6,000万円。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_887"
  },
  {
    "id": "cr-sozoku-2",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "相続を放棄した子に子（被相続人の孫）がいる場合、その孫が代襲して相続人となる。",
    "a": false,
    "why": "放棄した者は初めから相続人でなかったものとみなされるので、代襲は起きない。代襲の原因は死亡・欠格・廃除の3つだけ。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_939"
  },
  {
    "id": "cr-sozoku-3",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "被相続人の子が廃除されて相続権を失った場合、その子の子が代襲して相続人となる。",
    "a": true,
    "why": "代襲の原因は、相続開始以前の死亡・欠格・廃除。放棄は入らない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_887"
  },
  {
    "id": "cr-sozoku-4",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "配偶者と子2人が相続人の場合、子の法定相続分はそれぞれ4分の1である。",
    "a": true,
    "why": "配偶者1/2、子全体で1/2を2人で分けて各1/4。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_900"
  },
  {
    "id": "cr-sozoku-5",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "配偶者と被相続人の父母が相続人の場合、父母の法定相続分はそれぞれ3分の1である。",
    "a": false,
    "why": "配偶者2/3、直系尊属全体で1/3。父母2人なら各1/6。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_900"
  },
  {
    "id": "cr-sozoku-6",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "配偶者と兄弟姉妹2人が相続人の場合、兄弟姉妹の法定相続分はそれぞれ8分の1である。",
    "a": true,
    "why": "配偶者3/4、兄弟姉妹全体で1/4を2人で分けて各1/8。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_900"
  },
  {
    "id": "cr-sozoku-7",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "被相続人に子がいる場合でも、父母が生きていれば、父母も配偶者・子とともに相続人となる。",
    "a": false,
    "why": "子（第1順位）がいれば、直系尊属（第2順位）と兄弟姉妹（第3順位）は相続人にならない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_889"
  },
  {
    "id": "cr-sozoku-8",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "子が全員相続を放棄し、配偶者と被相続人の母がいる場合、母が相続人となり、法定相続分は配偶者3分の2、母3分の1である。",
    "a": true,
    "why": "子が全員放棄すると、初めから子がいなかった扱いになり、第2順位の直系尊属に移る。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_939"
  },
  {
    "id": "cr-sozoku-9",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "配偶者がなく、相続人が父母の双方を同じくする兄Aと、父のみを同じくする弟Bの場合、Bの法定相続分は2分の1である。",
    "a": false,
    "why": "父母の一方だけが同じ兄弟姉妹（半血）は、双方が同じ兄弟姉妹（全血）の1/2。A:B＝2:1なので、Aが2/3、Bが1/3。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_900"
  },
  {
    "id": "cr-sozoku-10",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "嫡出でない子の法定相続分は、嫡出である子の2分の1である。",
    "a": false,
    "why": "平成25年の改正で同じになった。現行の900条4号に区別はない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_900"
  },
  {
    "id": "cr-sozoku-11",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "兄弟姉妹が相続人となるべき場合に、その兄弟姉妹の子（おい・めい）も相続開始以前に死亡していたときは、おい・めいの子が再代襲して相続人となる。",
    "a": false,
    "why": "兄弟姉妹の代襲は、おい・めいの1代まで（889条2項は887条2項だけを準用し、再代襲の3項は準用しない）。子の系統は孫・ひ孫と再代襲が続く。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_889"
  },
  {
    "id": "cr-sozoku-12",
    "video": "sozoku",
    "t": "",
    "topic": "法定相続分と代襲",
    "q": "配偶者はなく、子Bと子Cがいる。BはAより先に死亡しており、Bには子E・Fがいる。この場合の法定相続分は、Cが2分の1、EとFがそれぞれ4分の1である。",
    "a": true,
    "why": "Bの取り分1/2をEとFが代襲して分ける（各1/4）。代襲者は親の取り分を引き継ぐだけで、頭数で割り直さない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/129AC0000000089#Mp-At_887"
  },
  {
    "id": "cr-chizei-1",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "不動産取得税では、新築住宅を取得した場合、課税標準となるべき価格から1戸につき1,200万円を控除する。",
    "a": true,
    "why": "1,200万円の控除は不動産取得税（買ったときに1回だけの税）。認定長期優良住宅は1,300万円。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-2",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "固定資産税の新築住宅の特例は、課税標準となるべき価格から1,200万円を控除するものである。",
    "a": false,
    "why": "1,200万円の控除は不動産取得税。固定資産税は、床面積120㎡までの部分の「税額」を3年度分（中高層耐火建築物は5年度分）2分の1に減額する。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-3",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "新築住宅に対する固定資産税の減額は、床面積120㎡までの部分の税額を、3年度分（中高層耐火建築物は5年度分）2分の1に減額するものである。",
    "a": true,
    "why": "毎年かかる固定資産税だから「年度」が出てくる。年数が出てきたら固定資産税。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-4",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "新築住宅を取得した場合の不動産取得税は、3年度分に限り税額が2分の1に減額される。",
    "a": false,
    "why": "不動産取得税は取得したときに1回だけかかる税なので「3年度分」はない。新築住宅は課税標準から1,200万円を控除する。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-5",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "新築住宅に対する固定資産税の減額は、床面積が120㎡を超える住宅には適用されない。",
    "a": false,
    "why": "120㎡を超える住宅も対象。減額されるのは120㎡までの部分だけ。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-6",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "宅地評価土地を取得した場合、不動産取得税の課税標準は価格の2分の1とされる。",
    "a": true,
    "why": "取得税の土地は「1/2」（令和9年3月31日までの取得）。固定資産税の住宅用地の1/6・1/3と混同しない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-7",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "住宅用地に対する固定資産税の課税標準は、200㎡以下の部分（小規模住宅用地）について価格の3分の1とされる。",
    "a": false,
    "why": "200㎡以下の部分は6分の1、200㎡を超える部分は3分の1。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-8",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "住宅用地に対する固定資産税の課税標準の特例で、200㎡を超える部分は価格の3分の1とされる。",
    "a": true,
    "why": "小規模住宅用地（200㎡以下）は1/6、それを超える部分は1/3。200㎡は住戸1戸あたり。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-9",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "不動産取得税の標準税率は、住宅と土地の取得については3%である。",
    "a": true,
    "why": "本則は4%、住宅・土地は3%（令和9年3月31日までの取得）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-10",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "固定資産税の標準税率は3%である。",
    "a": false,
    "why": "固定資産税の標準税率は1.4%。3%は不動産取得税の住宅・土地の税率。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-11",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "固定資産税の免税点は、土地30万円未満、家屋20万円未満である。",
    "a": true,
    "why": "固定資産税は土地30万・家屋20万。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-12",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "2026年度試験では、不動産取得税の免税点は土地10万円未満である。",
    "a": false,
    "why": "令和8年度改正で、令和8年4月1日以後の取得は土地16万円未満・家屋の建築66万円未満・その他の家屋34万円未満に引き上げられた（旧: 10万・23万・12万）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-chizei-13",
    "video": "chizei",
    "t": "",
    "topic": "不動産取得税と固定資産税",
    "q": "固定資産税の納税義務者は、賦課期日である1月1日時点で登記簿等に所有者として登記・登録されている者である。",
    "a": true,
    "why": "年の途中で売っても、1月1日の所有者がその年度分を納める（日割りの精算は当事者間の約束）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/325AC0000000226"
  },
  {
    "id": "cr-tokei-1",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示（令和8年1月1日時点）では、全国平均で全用途平均・住宅地・商業地のいずれも5年連続で上昇した。",
    "a": true,
    "why": "全国平均は全用途平均+2.8%・住宅地+2.1%・商業地+4.3%。3用途とも5年連続の上昇。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-2",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示では、全国平均の住宅地は前年より上昇幅が拡大した。",
    "a": false,
    "why": "住宅地は+2.1%で前年と同じ上昇幅。上昇幅が拡大したのは全用途平均（2.7→2.8%）と商業地（3.9→4.3%）。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-3",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示では、全国平均の商業地は前年より上昇幅が縮小した。",
    "a": false,
    "why": "商業地は3.9%→4.3%で上昇幅が拡大した。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-4",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示では、三大都市圏平均で全用途平均・住宅地・商業地のいずれも上昇幅が拡大した。",
    "a": true,
    "why": "三大都市圏は3用途とも5年連続上昇・上昇幅拡大。ただし圏域別では名古屋圏だけ縮小。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-5",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示では、名古屋圏は全用途平均・住宅地・商業地のいずれも上昇幅が拡大した。",
    "a": false,
    "why": "名古屋圏はいずれも上昇幅が縮小（全用途2.8→2.3%）。拡大したのは東京圏と大阪圏。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-6",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示では、地方圏の全用途平均・住宅地・商業地はいずれも5年連続で上昇した。",
    "a": true,
    "why": "地方圏も3用途とも5年連続上昇。ただし全用途平均・住宅地は上昇幅が縮小、商業地は前年と同じ。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-7",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年地価公示では、地方四市（札幌・仙台・広島・福岡）は全用途平均・住宅地・商業地のいずれも上昇幅が拡大した。",
    "a": false,
    "why": "地方四市はいずれも上昇幅が縮小（全用途5.8→4.5%）。上昇は続いている。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/totikensangyo/content/001985434.pdf"
  },
  {
    "id": "cr-tokei-8",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "建築着工統計（令和7年計）によると、令和7年の新設住宅着工戸数は約74万戸で、3年連続の減少となった。",
    "a": true,
    "why": "740,667戸、前年比6.5%減、3年連続の減少。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/kencha25.pdf"
  },
  {
    "id": "cr-tokei-9",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "建築着工統計（令和7年計）によると、令和7年の新設住宅着工戸数は前年比で増加した。",
    "a": false,
    "why": "前年比6.5%減。持家・貸家・分譲住宅のすべてが減った。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/kencha25.pdf"
  },
  {
    "id": "cr-tokei-10",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和7年の新設住宅着工のうち、貸家は持家や分譲住宅と異なり前年比で増加した。",
    "a": false,
    "why": "貸家も324,991戸・前年比5.0%減（3年連続の減少）。持家7.7%減、分譲住宅7.6%減。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/kencha25.pdf"
  },
  {
    "id": "cr-tokei-11",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和7年の新設住宅着工のうち、持家は4年連続の減少となった。",
    "a": true,
    "why": "持家は201,285戸・前年比7.7%減・4年連続の減少。貸家と分譲住宅は3年連続の減少。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/kencha25.pdf"
  },
  {
    "id": "cr-tokei-12",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和7年の新設住宅着工のうち、分譲住宅のマンションは前年比で増加した。",
    "a": false,
    "why": "マンションは89,888戸・前年比12.2%減。分譲一戸建も115,935戸・4.3%減。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/kencha25.pdf"
  },
  {
    "id": "cr-tokei-13",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和7年の新設住宅着工床面積は、前年比で減少し、4年連続の減少となった。",
    "a": true,
    "why": "56,885千㎡・前年比6.6%減・4年連続の減少（戸数は3年連続、床面積は4年連続）。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/kencha25.pdf"
  },
  {
    "id": "cr-tokei-14",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "法人企業統計（令和6年度）によると、不動産業の売上高は前年度比で増加した。",
    "a": true,
    "why": "不動産業の売上高は588,245億円（約58.8兆円）・前年度比4.2%増。前年度（+22.0%）に続き2年連続の増収。",
    "note": "",
    "sourceUrl": "https://www.mof.go.jp/pri/reference/ssc/results/r6.pdf"
  },
  {
    "id": "cr-tokei-15",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "法人企業統計（令和6年度）によると、不動産業の経常利益は前年度比で減少した。",
    "a": false,
    "why": "経常利益は79,796億円（約8.0兆円）・前年度比8.7%増。2年連続の増益。",
    "note": "",
    "sourceUrl": "https://www.mof.go.jp/pri/reference/ssc/results/r6.pdf"
  },
  {
    "id": "cr-tokei-16",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和8年版土地白書によると、令和7年の土地の売買による所有権移転登記の件数は全国で約130万件で、ほぼ横ばいで推移している。",
    "a": true,
    "why": "白書本文どおり「約130万件・ほぼ横ばい」。出典は法務省「登記統計月報」。",
    "note": "",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/002010600.pdf"
  },
  {
    "id": "cr-tokei-17",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "令和6年度末（令和7年3月末）の宅地建物取引業者数は約13万業者で、11年連続で増加した。",
    "a": true,
    "why": "132,291業者（大臣3,158・知事129,133）、前年度比1.3%増・11年連続の増加。",
    "note": "令和8年10月2日公表の令和7年度末は133,727業者・12年連続の増加。試験問題の作成時期から、出るなら令和6年度末の数字の可能性が高い。",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/001913739.pdf"
  },
  {
    "id": "cr-tokei-18",
    "video": "tokei",
    "t": "",
    "topic": "統計（2026年試験向け）",
    "q": "宅地建物取引業者数は、近年は減少が続いている。",
    "a": false,
    "why": "増加が続いている。令和6年度末132,291業者（11年連続増加）。",
    "note": "令和8年10月2日公表の令和7年度末は133,727業者・12年連続の増加。試験問題の作成時期から、出るなら令和6年度末の数字の可能性が高い。",
    "sourceUrl": "https://www.mlit.go.jp/report/press/content/001913739.pdf"
  },
  {
    "id": "cr-morido-1",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "盛土をして高さ1mを超える崖が生じるものは、宅地造成等に当たる。",
    "a": true,
    "why": "盛土で崖ができる場合は、崖の高さ1m超。盛土の崖だけ1mで、あとは2m。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_2"
  },
  {
    "id": "cr-morido-2",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "切土をして高さ1.5mの崖が生じるものは、宅地造成等に当たる。",
    "a": false,
    "why": "切土で崖ができる場合は、崖の高さ2m超。1.5mは当たらない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_2"
  },
  {
    "id": "cr-morido-3",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "盛土と切土を同時に行い、合わせて高さ2mを超える崖が生じるものは、宅地造成等に当たる。",
    "a": true,
    "why": "切盛同時は、合わせて崖の高さ2m超。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_2"
  },
  {
    "id": "cr-morido-4",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "崖を生じない盛土は、盛土の高さにかかわらず宅地造成等に当たらない。",
    "a": false,
    "why": "崖を生じない盛土でも、盛土の高さが2mを超えれば宅地造成等に当たる（改正で新設）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_2"
  },
  {
    "id": "cr-morido-5",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "崖の高さの基準に当たらない盛土・切土でも、面積が500㎡を超えれば宅地造成等に当たる。",
    "a": true,
    "why": "面積は500㎡超。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_2"
  },
  {
    "id": "cr-morido-6",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "一定期間後に除却する土石の一時的な堆積は、規模にかかわらず盛土規制法の規制の対象外である。",
    "a": false,
    "why": "高さ2m超、または面積500㎡超の土石の堆積は規制の対象（改正で新設）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_2"
  },
  {
    "id": "cr-morido-7",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "宅地造成等工事規制区域内で宅地造成等に関する工事を行う場合、工事主は工事着手前に都道府県知事の許可を受けなければならない。",
    "a": true,
    "why": "許可を受けるのは工事主、時期は着手前。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_12"
  },
  {
    "id": "cr-morido-8",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "特定盛土等規制区域内で特定盛土等に関する工事を行う場合、原則として工事着手の30日前までに都道府県知事に届け出なければならない。",
    "a": true,
    "why": "特定盛土等規制区域は原則届出（30日前）。規模が大きいものは許可が必要。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_27"
  },
  {
    "id": "cr-morido-9",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "特定盛土等規制区域内で、許可が必要になる切土の規模は、崖の高さ2m超である。",
    "a": false,
    "why": "特定盛土等規制区域で許可が要るのは、盛土で崖2m超、切土で崖5m超、切盛同時で崖5m超、盛土の高さ5m超、面積3,000㎡超。切土は5m超。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_30"
  },
  {
    "id": "cr-morido-10",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "宅地造成等に関する工事の完了検査は、工事完了の日から4日以内に申請しなければならない。",
    "a": true,
    "why": "完了検査・中間検査とも4日以内。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_17"
  },
  {
    "id": "cr-morido-11",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "宅地造成等工事規制区域の指定の際に、その区域内で宅地造成等に関する工事を行っている工事主は、指定の日から21日以内に都道府県知事に届け出なければならない。",
    "a": true,
    "why": "指定時に工事中なら21日以内に届出。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_21"
  },
  {
    "id": "cr-morido-12",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "高さ2mを超える擁壁を除却する工事は、工事に着手する日の14日前までに都道府県知事に届け出なければならない。",
    "a": true,
    "why": "擁壁等の除却は着手の14日前まで。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_21"
  },
  {
    "id": "cr-morido-13",
    "video": "morido",
    "t": "",
    "topic": "盛土規制法の数字",
    "q": "宅地造成等工事規制区域内で公共施設用地を宅地に転用した者は、転用した日から21日以内に都道府県知事に届け出なければならない。",
    "a": false,
    "why": "転用は14日以内。21日は区域指定時に工事中の場合。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/336AC0000000191#Mp-At_21"
  },
  {
    "id": "cr-kubun-1",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "集会の普通決議は、規約に別段の定めがない限り、出席した区分所有者及びその議決権の各過半数で決する。",
    "a": true,
    "why": "改正で「出席した」区分所有者で数えるようになった。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_39"
  },
  {
    "id": "cr-kubun-2",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "集会の普通決議は、規約に別段の定めがない限り、区分所有者全員及び議決権の各過半数で決する。",
    "a": false,
    "why": "全員基準は改正前。今は出席者の各過半数。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_39"
  },
  {
    "id": "cr-kubun-3",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "共用部分の重大変更（形状又は効用の著しい変更を伴うもの）は、区分所有者の過半数で議決権の過半数を有する者が出席し、出席者及びその議決権の各3/4以上で決する。",
    "a": true,
    "why": "重大変更は「過半数出席・出席者の各3/4」。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_17"
  },
  {
    "id": "cr-kubun-4",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "規約の設定・変更・廃止は、区分所有者及び議決権の各4/5以上で決する。",
    "a": false,
    "why": "規約の設定・変更・廃止は、過半数出席で出席者の各3/4以上。4/5は建替え。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_31"
  },
  {
    "id": "cr-kubun-5",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "バリアフリー化のための共用部分の変更は、区分所有者の過半数で議決権の過半数を有する者が出席し、出席者及びその議決権の各2/3以上で決する。",
    "a": true,
    "why": "バリアフリー化と、設置・保存の瑕疵を除去するための変更は2/3（改正で新設）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_17"
  },
  {
    "id": "cr-kubun-6",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "建物価格の1/2を超える部分が滅失した場合の復旧決議は、出席者及びその議決権の各3/4以上で決する。",
    "a": false,
    "why": "大規模滅失の復旧は、過半数出席で出席者の各2/3以上（改正で3/4から変更）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_61"
  },
  {
    "id": "cr-kubun-7",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "建替え決議は、集会に出席した区分所有者及びその議決権の各4/5以上で決する。",
    "a": false,
    "why": "建替えだけは出席者ではなく、区分所有者全体と議決権の各4/5以上。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_62"
  },
  {
    "id": "cr-kubun-8",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "建物が地震に対する安全性の基準に適合していない場合、建替え決議は区分所有者及び議決権の各3/4以上で決することができる。",
    "a": true,
    "why": "耐震性不足・火災安全性不足・外壁等の剥落のおそれ・給排水管等の腐食・バリアフリー不適合のいずれかなら、全体の各3/4以上。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_62"
  },
  {
    "id": "cr-kubun-9",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "集会の招集通知は、会日より少なくとも1週間前に発しなければならないが、この期間は規約で短縮することができる。",
    "a": false,
    "why": "改正で、規約で「伸長」はできるが短縮はできなくなった。通知には議案の要領も示す。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_35"
  },
  {
    "id": "cr-kubun-10",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "建替え決議を目的とする集会の招集通知は会日の少なくとも2か月前に発し、説明会は会日の少なくとも1か月前までに開かなければならない。",
    "a": true,
    "why": "建替えは通知2か月前・説明会1か月前。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_62"
  },
  {
    "id": "cr-kubun-11",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "区分所有者の1/5以上で議決権の1/5以上を有する者は、管理者に対し集会の招集を請求することができる。",
    "a": true,
    "why": "招集請求は各1/5以上（規約で減らせる）。管理者は少なくとも毎年1回招集する。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_34"
  },
  {
    "id": "cr-kubun-12",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "集会を開かずに書面又は電磁的方法による決議をするには、区分所有者全員の承諾が必要である。",
    "a": true,
    "why": "書面決議は全員の承諾。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_45"
  },
  {
    "id": "cr-kubun-13",
    "video": "kubun",
    "t": "",
    "topic": "区分所有法の決議（2026年改正後）",
    "q": "義務違反者の区分所有権の競売を請求するための集会の決議は、出席者の各過半数で足りる。",
    "a": false,
    "why": "使用禁止請求・競売請求・引渡し請求は、過半数出席で出席者の各3/4以上。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/337AC0000000069#Mp-At_59"
  },
  {
    "id": "cr-shakuchi-1",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "建物所有目的の借地権で存続期間を20年と定めた場合、存続期間は20年となる。",
    "a": false,
    "why": "30年より短い定めは借地権者に不利なので無効で、30年になる。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_3"
  },
  {
    "id": "cr-shakuchi-2",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "借地権の存続期間を定めなかった場合、存続期間は30年となる。",
    "a": true,
    "why": "定めがなければ30年。30年より長く定めればその期間。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_3"
  },
  {
    "id": "cr-shakuchi-3",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "借地契約を更新した場合、最初の更新後の期間は20年、2回目以降は10年となる。",
    "a": true,
    "why": "1回目20年、2回目以降10年（起算点は更新の日）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_4"
  },
  {
    "id": "cr-shakuchi-4",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "存続期間満了前に建物が滅失し、借地権設定者の承諾を得て残存期間を超えて存続する建物を再築した場合、借地権は承諾日か築造日のいずれか早い日から20年存続する。",
    "a": true,
    "why": "早い日から20年（残存期間のほうが長ければその期間）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_7"
  },
  {
    "id": "cr-shakuchi-5",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "借地権者が残存期間を超えて存続する建物を築造する旨を通知し、借地権設定者が2か月以内に異議を述べなかったときは、承諾があったものとみなされる。",
    "a": true,
    "why": "2か月以内に異議がなければみなし承諾。ただし契約の更新後の通知には適用されない。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_7"
  },
  {
    "id": "cr-shakuchi-6",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "借地上の登記された建物が滅失した場合、必要な事項を土地上に掲示すれば、滅失の日から2年間は借地権を第三者に対抗できる。",
    "a": true,
    "why": "掲示で対抗力を維持できるのは滅失から2年。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_10"
  },
  {
    "id": "cr-shakuchi-7",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "一般定期借地権は、存続期間を50年以上とし、公正証書によって契約しなければならない。",
    "a": false,
    "why": "一般定期借地権は50年以上で、公正証書に限らず書面（電磁的記録も可）でよい。公正証書に限られるのは事業用定期借地権。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_22"
  },
  {
    "id": "cr-shakuchi-8",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "事業用定期借地権は、存続期間を10年以上50年未満とし、公正証書によって契約しなければならない。",
    "a": true,
    "why": "事業用定期借地権は10年以上50年未満・公正証書に限る。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_23"
  },
  {
    "id": "cr-shakuchi-9",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "事業用定期借地権は、賃貸マンションなど居住の用に供する建物の所有を目的として設定することもできる。",
    "a": false,
    "why": "専ら事業の用に供する建物に限られ、居住用の建物は除かれる。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_23"
  },
  {
    "id": "cr-shakuchi-10",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "建物譲渡特約付借地権は、借地権の設定後30年以上を経過した日に建物を借地権設定者に譲渡する旨の特約を定めるものである。",
    "a": true,
    "why": "30年以上経過した日。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_24"
  },
  {
    "id": "cr-shakuchi-11",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "期間を1年未満とする普通の建物賃貸借は、期間の定めがない建物賃貸借とみなされる。",
    "a": true,
    "why": "普通借家で1年未満は期間の定めなしとみなす。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_29"
  },
  {
    "id": "cr-shakuchi-12",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "定期建物賃貸借で期間を6か月と定めた場合、期間の定めがない建物賃貸借とみなされる。",
    "a": false,
    "why": "定期建物賃貸借には1年未満の規定は適用されず、6か月でも定められる。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_38"
  },
  {
    "id": "cr-shakuchi-13",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "建物の賃貸借の存続期間は、50年を超えることができない。",
    "a": false,
    "why": "建物の賃貸借に上限はない（民法の50年上限は適用しない）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_29"
  },
  {
    "id": "cr-shakuchi-14",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "期間の定めのある建物賃貸借で更新しない旨の通知をするには、期間満了の1年前から6か月前までの間にしなければならない。",
    "a": true,
    "why": "1年前から6か月前まで。通知しないと同一条件で更新され、期間の定めがないものになる。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_26"
  },
  {
    "id": "cr-shakuchi-15",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "建物の賃貸人が正当事由のある解約の申入れをした場合、建物の賃貸借は申入れの日から3か月を経過すると終了する。",
    "a": false,
    "why": "賃貸人からの解約申入れは6か月。3か月は期間の定めがない場合の賃借人からの申入れ（民法）。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_27"
  },
  {
    "id": "cr-shakuchi-16",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "期間1年以上の定期建物賃貸借では、賃貸人は期間満了の1年前から6か月前までの間に、賃借人に期間満了で終了する旨を通知しなければ、終了を対抗できない。",
    "a": true,
    "why": "通知期間を過ぎて通知した場合は、通知の日から6か月後に終了を対抗できる。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_38"
  },
  {
    "id": "cr-shakuchi-17",
    "video": "shakuchi",
    "t": "",
    "topic": "借地借家法の数字",
    "q": "床面積200㎡未満の居住用建物の定期建物賃貸借では、転勤などやむを得ない事情があれば、賃借人は解約を申し入れることができ、申入れの日から1か月で終了する。",
    "a": true,
    "why": "200㎡未満・やむを得ない事情・1か月。",
    "note": "",
    "sourceUrl": "https://laws.e-gov.go.jp/law/403AC0000000090#Mp-At_38"
  }
];
