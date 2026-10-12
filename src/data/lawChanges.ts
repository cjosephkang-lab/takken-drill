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
  // 押印廃止・盛土規制法は上の既存注記と同じ改正。夜間バッチの候補のうち、問題文に旧規定が残っていることを確認できたものを追加。
  {
    questionId: "r3_12-26",
    status: "confirmed",
    summary:
      "選択肢4の「記名押印」は出題当時の規定。令和4年5月18日施行の改正で宅建士の押印は廃止され、現行法では37条書面は宅建士の「記名」のみで足りる。",
    effectiveDate: "2022-05-18",
    sourceUrl:
      "https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo16_hh_000001_00036.html",
  },
  {
    questionId: "r3_12-19",
    status: "confirmed",
    summary:
      "問題文の「宅地造成等規制法」は出題当時の法律名。令和5年5月26日施行で「宅地造成及び特定盛土等規制法（盛土規制法）」に抜本改正され、区域名も「宅地造成等工事規制区域」等に変わった。本試験は現行法で出題される。",
    effectiveDate: "2023-05-26",
    sourceUrl: "https://www.mlit.go.jp/toshi/web/morido.html",
  },
  {
    questionId: "r4-19",
    status: "confirmed",
    summary:
      "問題文の「宅地造成等規制法」は出題当時の法律名。令和5年5月26日施行で「宅地造成及び特定盛土等規制法（盛土規制法）」に抜本改正され、区域名も「宅地造成等工事規制区域」等に変わった。本試験は現行法で出題される。",
    effectiveDate: "2023-05-26",
    sourceUrl: "https://www.mlit.go.jp/toshi/web/morido.html",
  },
  // 区分所有法改正（令和7年法律第47号）。令和8年4月1日施行。決議の母数が「全区分所有者」から「集会に出席した区分所有者」（書面・代理人による議決権行使を含む）に変わった。
  // 一次情報: 法務省「改正の概要(2)」の決議の多数決要件の対照表と新47条。2026-10-04 確認。
  {
    questionId: "r4-13",
    status: "confirmed",
    summary:
      "選択肢3（管理者の選任を各過半数）と選択肢4（管理組合法人の設立を各4分の3以上）は、出題当時の「区分所有者及び議決権の全員」を母数とする規律。令和8年4月1日施行の改正で、母数は集会に出席した区分所有者及びその議決権（書面・代理人による行使を含む）に変わり、特別決議には出席の定足数（各過半数）も必要になった。正解（選択肢1）は変わらないが、この2肢は現行法では不正確。",
    effectiveDate: "2026-04-01",
    sourceUrl: "https://www.moj.go.jp/MINJI/minji07_00375.html",
  },
  // 不動産取得税の免税点の引上げ（令和8年法律第2号・地方税法73条の15の2）。令和8年4月1日以後の取得に適用。
  // 一次情報: e-Gov法令API で地方税法の 2026-03-31 版と 2026-04-01 版の条文を比較。2026-10-12 確認。
  {
    questionId: "r6-24",
    status: "confirmed",
    summary:
      "正解の選択肢2（免税点 土地10万円・家屋の建築23万円・その他12万円）は出題当時の金額。令和8年4月1日以後の取得から、土地16万円・家屋の建築66万円・その他34万円に引き上げられた。今年の試験では新しい金額で判断する。",
    effectiveDate: "2026-04-01",
    sourceUrl: "https://laws.e-gov.go.jp/law/325AC0000000226",
  },
];

export const confirmedLawChange = (questionId: string): LawChange | undefined =>
  lawChanges.find(
    (change) =>
      change.questionId === questionId && change.status === "confirmed",
  );
