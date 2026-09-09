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

export const lawChanges: LawChange[] = [];

export const confirmedLawChange = (questionId: string): LawChange | undefined =>
  lawChanges.find(
    (change) =>
      change.questionId === questionId && change.status === "confirmed",
  );
