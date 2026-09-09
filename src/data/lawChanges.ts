// 法改正フラグ。古い年度の問題で、現行法では正誤や記述が変わる箇所の注記。
//
// アプリは status が "confirmed" のものだけを問題カードに出す。
// 候補は夜間バッチ（scripts/ai-insights.py --only lawchanges）が
// docs/law-changes/candidates.json に出す。人が一次情報（e-Gov・省庁・試験機関）で
// 確認したものだけをここに書く。AIの候補をそのまま confirmed にしない。
// 問題データ（questions.ts）は改変しない。注記を添えるだけ。

export type LawChange = {
  questionId: string;
  status: "confirmed" | "candidate" | "rejected";
  /** 現行法でどう変わったか（1〜2文）。 */
  summary: string;
  /** 施行日（YYYY-MM-DD）。 */
  effectiveDate: string;
  /** 一次情報のURL。 */
  sourceUrl: string;
};

export const lawChanges: LawChange[] = [
  // 押印廃止: デジタル社会形成整備法による宅建業法改正。宅建士の押印が不要になり「記名」のみに。
  // 令和4年度試験は令和4年4月1日時点の法令で出題されたため、問題文は「記名押印」のまま。
  // 一次情報: 国交省 報道発表（令和4年5月18日施行を明記）。2026-09-09 確認。
  {
    questionId: "r4-32",
    status: "confirmed",
    summary:
      "問題文の「記名押印」は出題当時の規定。令和4年5月18日施行の改正で宅建士の押印は廃止され、現行法では37条書面は宅建士の「記名」のみで足りる。",
    effectiveDate: "2022-05-18",
    sourceUrl:
      "https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo16_hh_000001_00036.html",
  },
  {
    questionId: "r4-40",
    status: "confirmed",
    summary:
      "問題文の「記名押印」は出題当時の規定。令和4年5月18日施行の改正で宅建士の押印は廃止され、現行法では重要事項説明書（35条書面）は宅建士の「記名」のみで足りる。",
    effectiveDate: "2022-05-18",
    sourceUrl:
      "https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo16_hh_000001_00036.html",
  },
  // 盛土規制法: 宅地造成等規制法を抜本改正し「宅地造成及び特定盛土等規制法」に。令和5年5月26日施行。
  // 令和5年度試験は令和5年4月1日時点の法令で出題されたため、問題文は旧法名のまま。
  // 一次情報: 国交省 盛土規制法ページ（正式名称・旧法名・施行日を明記）。2026-09-09 確認。
  {
    questionId: "r5-19",
    status: "confirmed",
    summary:
      "問題文の「宅地造成等規制法」は出題当時の法律名。令和5年5月26日施行で「宅地造成及び特定盛土等規制法（盛土規制法）」に抜本改正され、区域名も「宅地造成等工事規制区域」等に変わった。本試験は現行法で出題される。",
    effectiveDate: "2023-05-26",
    sourceUrl: "https://www.mlit.go.jp/toshi/web/morido.html",
  },
];

export const confirmedLawChange = (questionId: string): LawChange | undefined =>
  lawChanges.find(
    (change) =>
      change.questionId === questionId && change.status === "confirmed",
  );
