// 令和8年度（2026-10-18）の本試験で落とした問題の論点（topicTags の論点ID）。
// 週1回の復習モード（src/lib/weeklyReview.ts）が、この論点の過去問を出す。
// 問番号→論点の対応は docs/retrospective/2026-10-18-r8-honshiken.md の不正解18問から。
// 問48（統計）は毎年数字が変わるので入れない。問23（贈与税）は近い論点が無いので所得税等に寄せた。

export const droppedTopicsR8: { examQuestion: number; topicId: string }[] = [
  { examQuestion: 4, topicId: "sozoku" },
  { examQuestion: 7, topicId: "dairi" },
  { examQuestion: 8, topicId: "keiyaku-soron" },
  { examQuestion: 9, topicId: "teito-tampo" },
  { examQuestion: 12, topicId: "shakuya" },
  { examQuestion: 15, topicId: "toshikeikaku-naiyo" },
  { examQuestion: 17, topicId: "kenchikukijun-tantai" },
  { examQuestion: 18, topicId: "kenchikukijun-youto" },
  { examQuestion: 20, topicId: "kukaku-seiri" },
  { examQuestion: 23, topicId: "shotokuzei" },
  { examQuestion: 28, topicId: "takkenshi-toroku" },
  { examQuestion: 30, topicId: "eigyo-hosho" },
  { examQuestion: 32, topicId: "gyomu-kansei" },
  { examQuestion: 33, topicId: "sonota-meibo" },
  { examQuestion: 41, topicId: "takkengyo-menkyo" },
  { examQuestion: 42, topicId: "cooling-off" },
  { examQuestion: 43, topicId: "gyomu-kansei" },
];

export const droppedTopicIds = new Set(droppedTopicsR8.map((d) => d.topicId));
