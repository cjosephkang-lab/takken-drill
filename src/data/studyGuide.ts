// 宅建合格のための「学習導線」データ。
//
// 科目を学ぶ順番・科目別の目標得点は、複数の予備校／専門サイトを横断して
// 一貫して支持されている定番セオリーに基づく。出典は各フィールドに明記。
// 推測値は使わず、出典に現れた数値の中央値・代表値を採用している。
//
// 出典（2026-06 時点）:
// - 伊藤塾「宅建の合格点」 https://column.itojuku.co.jp/takken/basic/goukakuten/
//   （合格点: 過去10年 最低33点〜最高38点・平均35.5点 / 目標配点）※3票検証で確定
// - 伊藤塾「勉強する順番」 https://column.itojuku.co.jp/takken/method/benkyou-junban/
//   （権利関係を先に着手・税その他は深追いしない＝捨て問戦略）
// - アガルート「科目構成」 https://www.agaroot.jp/takken/column/composition/
//   （学習順 権利関係→宅建業法→法令上の制限→税その他 / 科目別目標）
// - 全日埼玉「勉強の順番」 https://saitama.zennichi.or.jp/column/study-order/
//   （宅建業法から着手＝取り組みやすく早期の成功体験。権利関係は最難関）
// - 四谷学院 https://yotsuyagakuin-tsushin.com/blog_takkenshiken/kamokutensuu/
//   （宅建業法は満点狙い・権利関係は7問は死守）

export type StudyCategory = {
  // questions.ts の category 値と一致させる（カテゴリ識別子）
  category: string;
  // 学習導線での出題順（小さいほど先に学ぶ）
  order: number;
  // 1回分の試験での出題数＝この科目の満点
  fullMarks: number;
  // 合格者が狙う目標得点
  targetScore: number;
  // なぜこの順番・この目標なのか（出典に基づく短い指針）
  rationale: string;
};

// 学習順は「最大の得点源である宅建業法を最優先で固め、
// 次に時間のかかる権利関係、そのあと暗記中心の法令・税へ」という、
// 全出典が優先度として一致する流れを採用。
// （アガルート／伊藤塾は権利関係を先に置くが、いずれも宅建業法と権利関係を
//  最重要2科目とする点は共通。初学者の取り組みやすさを重視し業法を1番手に置く）
export const studyOrder: StudyCategory[] = [
  {
    category: "宅建業法",
    order: 1,
    fullMarks: 20,
    targetScore: 18, // 満点狙い。合否を左右する最大の得点源（四谷・アガルート・伊藤塾）
    rationale: "最大の得点源。20問中18点（満点狙い）を死守する。最初に固めて土台を作る。",
  },
  {
    category: "権利関係",
    order: 2,
    fullMarks: 14,
    targetScore: 10, // 14問中9〜10点（伊藤塾・itojuku 3票確定の目標配点）
    rationale: "範囲が広く最も時間がかかる最難関。深追いせず14問中10点を目標に早めに着手する。",
  },
  {
    category: "法令上の制限",
    order: 3,
    fullMarks: 8,
    targetScore: 6, // 8問中5〜6点（多数のソースが一致）
    rationale: "暗記中心で得点が安定しやすい。8問中6点を確保する。",
  },
  {
    category: "税・価格評定",
    order: 4,
    fullMarks: 3,
    targetScore: 2, // 税その他は深追いせず確実な問題を拾う（伊藤塾の捨て問戦略）
    rationale: "深追い厳禁。確実に取れる問題だけ拾い、3問中2点を目安にする。",
  },
  {
    category: "免除科目",
    order: 5,
    fullMarks: 5,
    targetScore: 4, // 5問免除科目は4点目安（アガルート）
    rationale: "出題パターンが固定的。過去問で対策すれば5問中4点は狙える。",
  },
];

// 合格ライン（伊藤塾・3票検証で確定）
// 過去10年: 最低33点 / 最高38点 / 平均35.5点。安全圏は38点。
export const passLine = {
  min: 33,
  max: 38,
  average: 35.5,
  safe: 38,
  // 目標配点の合計（18+10+6+2+4 = 40点）。平均合格点+αの安全圏を狙う設計。
  totalTarget: studyOrder.reduce((sum, c) => sum + c.targetScore, 0),
  fullMarks: studyOrder.reduce((sum, c) => sum + c.fullMarks, 0),
  source: "https://column.itojuku.co.jp/takken/basic/goukakuten/",
};

export const studyOrderByCategory = (category: string): number =>
  studyOrder.find((c) => c.category === category)?.order ?? 99;
