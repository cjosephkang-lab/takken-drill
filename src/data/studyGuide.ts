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

// ---- 時期に応じた出題ペーシング（2026-08-04 CEO要望） ----
//
// 「絶対に落とせない宅建業法・権利関係を今日の出題の主軸にし、
//  暗記中心の法令・税・免除は記憶の鮮度が保てる直前期に詰め込む」ための
// 科目重み。新規問題の出題順だけを制御し、間隔反復（復習優先）には触れない。
//
// 出典（時期配分のセオリー）:
// - 伊藤塾「宅建の勉強スケジュールの組み方」
//   https://column.itojuku.co.jp/takken/method/benkyou-sukejuuru/
//   （序盤は権利関係・宅建業法から。法令・税は序盤「まだ手をつけなくてもいい」）
// - 伊藤塾「勉強する順番」（既存出典）: 税その他は深追いしない捨て問戦略
//
// 切替45日は出典値ではなく逆算の設計値: 暗記3科目80問の初回一巡12〜16日
// ＋習得までの間隔反復 +2日・+7日 ＋最終14日の復習予備（reviewReserveDays）。
// 詳細: docs/superpowers/specs/2026-08-04-priority-pacing-design.md

export type PacingPhase = {
  key: "foundation" | "cram";
  // 「今日やる」カードに出す1行説明（ペーシングが黙って動くと故障に見えるため）
  label: string;
  // 科目→新規出題の重み。0は「最後尾へ回す」（除外はしない＝出題は止めない）
  weights: Record<string, number>;
};

// 暗記科目の詰め込みを開始する残日数の閾値
export const CRAM_START_DAYS = 45;

export const pacingPhases: PacingPhase[] = [
  {
    key: "foundation",
    label: "いまは宅建業法・権利関係を固める時期",
    // 出題数比（業法20:権利14/回）と目標配点（18:10）の双方に整合する3:2
    weights: {
      宅建業法: 3,
      権利関係: 2,
      法令上の制限: 0,
      "税・価格評定": 0,
      免除科目: 0,
    },
  },
  {
    key: "cram",
    label: "直前期：法令・税・免除科目を詰め込む時期",
    // 順調なら業法・権利の新規は残っておらず実効的に法令3:税1:免除2の詰め込み。
    // 着手が遅れた場合でも業法+権利が新規枠の7/13を保つ安全弁（4:3）。
    weights: {
      宅建業法: 4,
      権利関係: 3,
      法令上の制限: 3,
      "税・価格評定": 1,
      免除科目: 2,
    },
  },
];
