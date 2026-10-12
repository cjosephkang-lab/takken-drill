// 免除科目「統計」（問48）の直前暗記シート。
//
// 過去問の統計は数字が毎年入れ替わるため、解いても今年の得点にならない。
// ここには2026年度試験で使われそうな最新の公表値だけを置く。
// 数値はすべて官公庁の原資料（PDF・報道発表）から転記し、AIの推測は入れていない。
// 各項目の source に原資料のURLと公表日を付けている（2026-10-12 確認）。
//
// どの年の資料が出るかの目安: 令和7年度試験の問48は、令和5年度法人企業統計・
// 令和6年計の着工統計・令和7年地価公示・令和7年版土地白書を使っていた
// （https://takken-success.info/2025kakomon/r07-48/）。今年はそれぞれ1年ずつ新しくなる。

export type StatFigure = {
  label: string;
  value: string;
};

export type StatItem = {
  id: string;
  title: string;
  // 試験でまず問われる「増えた／減った・何年連続」を1文で
  headline: string;
  figures: StatFigure[];
  // ひっかけになりやすい点
  traps: string[];
  source: { name: string; published: string; url: string };
};

export const STATISTICS_EXAM_YEAR = 2026;

export const statistics: StatItem[] = [
  {
    id: "chika-koji",
    title: "地価公示（令和8年）",
    headline:
      "全国・三大都市圏・地方圏のどれも、全用途平均・住宅地・商業地のすべてが5年連続で上昇",
    figures: [
      { label: "全国 全用途平均", value: "+2.8%" },
      { label: "全国 住宅地", value: "+2.1%" },
      { label: "全国 商業地", value: "+4.3%" },
      { label: "三大都市圏 全用途平均", value: "+4.6%" },
      { label: "三大都市圏 住宅地", value: "+3.5%" },
      { label: "三大都市圏 商業地", value: "+7.8%" },
      { label: "地方圏 全用途平均", value: "+1.2%" },
      { label: "地方圏 住宅地", value: "+0.9%" },
      { label: "地方圏 商業地", value: "+1.6%" },
    ],
    traps: [
      "「地方圏は下落」「地方圏の住宅地は横ばい」は誤り。地方圏も5年連続上昇",
      "上昇幅: 全国は全用途平均・商業地が拡大、住宅地は前年と同じ",
      "上昇幅: 三大都市圏はすべて拡大。地方圏は全用途平均・住宅地が縮小、商業地は前年と同じ",
    ],
    source: {
      name: "国土交通省「令和8年地価公示」",
      published: "2026年3月17日",
      url: "https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo04_hh_000001_00074.html",
    },
  },
  {
    id: "chakko",
    title: "新設住宅着工戸数（令和7年）",
    headline:
      "総戸数は約74万戸で3年連続の減少。持家・貸家・分譲住宅のすべてが減少",
    figures: [
      { label: "総戸数", value: "740,667戸（6.5%減・3年連続減）" },
      { label: "持家", value: "201,285戸（7.7%減・4年連続減）" },
      { label: "貸家", value: "324,991戸（5.0%減・3年連続減）" },
      { label: "分譲住宅", value: "208,169戸（7.6%減・3年連続減）" },
      { label: "床面積", value: "56,885千㎡（6.6%減・4年連続減）" },
    ],
    traps: [
      "持家と床面積だけが「4年連続」。総戸数・貸家・分譲住宅は「3年連続」",
      "地価や企業の売上は上がっているが、着工だけは減っている（建築コストの上昇・職人不足が背景）",
    ],
    source: {
      name: "国土交通省「建築着工統計調査報告（令和7年計）」",
      published: "2026年1月30日",
      url: "https://www.mlit.go.jp/report/press/content/kencha25.pdf",
    },
  },
  {
    id: "hojin-kigyo",
    title: "法人企業統計 不動産業（令和6年度）",
    headline: "売上高・営業利益・経常利益のすべてが2年連続で増加",
    figures: [
      { label: "売上高", value: "58兆8,245億円（4.2%増）" },
      { label: "営業利益", value: "7兆1,742億円（12.9%増）" },
      { label: "経常利益", value: "7兆9,796億円（8.7%増）" },
    ],
    traps: [
      "「減少」「横ばい」は誤り。令和5年度も3つとも増えている（2年連続増）",
      "目安: 売上は約59兆円、利益は約7〜8兆円",
    ],
    source: {
      name: "財務省「年次別法人企業統計調査（令和6年度）」",
      published: "2025年9月1日",
      url: "https://www.mof.go.jp/pri/reference/ssc/results/r6.pdf",
    },
  },
  {
    id: "tochi-torihiki",
    title: "土地取引件数（令和8年版 土地白書）",
    headline:
      "令和7年の土地の売買による所有権移転登記は約130万件で、ほぼ横ばい",
    figures: [
      { label: "令和7年", value: "約130万件（ほぼ横ばい）" },
      {
        label: "参考: 令和6年（令和7年版白書）",
        value: "約132万件（ほぼ横ばい）",
      },
    ],
    traps: [
      "「200万件を超え、大きく増加」は誤り（令和7年度試験で実際に出たひっかけ）",
    ],
    source: {
      name: "国土交通省「令和8年版 土地白書」",
      published: "2026年7月10日 閣議決定",
      url: "https://www.mlit.go.jp/report/press/content/002010600.pdf",
    },
  },
  {
    id: "kokudo",
    title: "宅地の面積（令和8年版 土地白書）",
    headline: "宅地は約199万ha。国土約3,780万haのうち約5%にすぎない",
    figures: [
      { label: "国土面積", value: "約3,780万ha" },
      { label: "森林", value: "約2,501万ha（最も多い）" },
      { label: "農地", value: "約430万ha" },
      { label: "宅地（住宅地・工業用地など）", value: "約199万ha" },
      { label: "道路", value: "約141万ha" },
    ],
    traps: [
      "森林と農地で国土の約8割。宅地は農地の半分以下",
      "数値は令和5年時点",
    ],
    source: {
      name: "国土交通省「令和8年版 土地白書」第1部 第3節",
      published: "2026年7月10日 閣議決定",
      url: "https://www.mlit.go.jp/report/press/content/002010600.pdf",
    },
  },
  {
    id: "gyosha",
    title: "宅建業者数",
    headline: "令和6年度末で132,291業者。11年連続の増加",
    figures: [
      {
        label: "令和6年度末（2025年3月末）",
        value: "132,291業者（11年連続増）",
      },
      { label: "内訳", value: "大臣免許 3,158 ／ 知事免許 129,133" },
      {
        label: "参考: 令和7年度末（2026年10月2日公表）",
        value: "133,727業者（12年連続増）",
      },
    ],
    traps: [
      "本試験の問題は10月の新しい発表より前に作られるため、出るなら「約13.2万・11年連続増」の可能性が高い。どちらでも「増加」は変わらない",
    ],
    source: {
      name: "国土交通省「宅地建物取引業法の施行状況調査（令和6年度）」",
      published: "2025年10月3日",
      url: "https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo16_hh_000001_00105.html",
    },
  },
  {
    id: "akiya",
    title: "空き家（令和5年 住宅・土地統計調査）",
    headline:
      "空き家は900万2千戸で過去最多。空き家率13.8%も過去最高（約7戸に1戸）",
    figures: [
      { label: "空き家数", value: "900万2千戸（過去最多）" },
      { label: "空き家率", value: "13.8%（過去最高）" },
      { label: "総住宅数", value: "6,504万7千戸（過去最多）" },
    ],
    traps: [],
    source: {
      name: "総務省統計局「令和5年住宅・土地統計調査」",
      published: "2024年9月25日（確報）",
      url: "https://www.stat.go.jp/info/guide/asu/pdf/2025asu_3-2.pdf",
    },
  },
];
