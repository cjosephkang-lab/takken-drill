// 自信ありで間違えた問題（覚え違い）の、時間を空けた再テスト（2026-10-19）。
//
// 自信満々の誤答は、正解を見るとその場では直りやすいが、1週間後には元の誤答に戻りやすい
// （Butler, Fazio & Marsh 2011, PMID 21989771）。そこで、自信ありで間違えた時刻を解答記録に残し、
// 間違えた直後に正解しても消さず、7日以上空けて自信ありで正解できたときに初めて消す。
// 令和8年度の本試験で落とした18問のうち約10問がこの型だった（docs/retrospective）。

export const CONFIDENT_RETEST_DAYS = 7;
const DAY_MS = 86400000;

/** 解答1回ぶんを反映した後の confidentWrongAt。 */
export const nextConfidentWrongAt = (
  previous: string | undefined,
  correct: boolean,
  unsure: boolean,
  answeredAt: string,
): string | undefined => {
  if (!correct) return unsure ? previous : answeredAt;
  if (!previous || unsure) return previous;
  const elapsed = Date.parse(answeredAt) - Date.parse(previous);
  return elapsed >= CONFIDENT_RETEST_DAYS * DAY_MS ? undefined : previous;
};

/** 間違えてから7日以上たち、再テストの時期に来ているか。 */
export const isConfidentRetestDue = (
  record: { confidentWrongAt?: string } | undefined,
  now: Date = new Date(),
): boolean => {
  if (!record?.confidentWrongAt) return false;
  return (
    now.getTime() - Date.parse(record.confidentWrongAt) >=
    CONFIDENT_RETEST_DAYS * DAY_MS
  );
};
