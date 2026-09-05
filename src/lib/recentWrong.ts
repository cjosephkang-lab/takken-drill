// 「直近◯日で間違えた問題」を絞り込むための日数判定。
// 時刻差ではなくローカル日付の差で数える。「昨日間違えた」は
// 昨日の23時でも今朝の判定に入ってほしいため、24時間単位では期待とずれる。

/**
 * ローカルの年月日だけを取り出してUTC上の同じ日付に写した時刻（ミリ秒）。
 * 夏時間で1日が23時間・25時間になる日を挟んでも、暦日の差が整数で出る。
 */
const localDateAsUtc = (date: Date): number =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

/** 端末時計の進みを許容する上限（日）。これを超える未来日時は壊れた値とみなす。 */
const FUTURE_TOLERANCE_DAYS = 1;

/**
 * ISO時刻が基準日の何日前かを返す。同日は0、前日は1。
 * 未来なら負の値。日付として読めなければ null。
 */
export const daysSinceLocalDate = (
  isoDate: string,
  now: Date = new Date(),
): number | null => {
  if (!isoDate) return null;

  const target = new Date(isoDate);
  if (Number.isNaN(target.getTime())) return null;

  const diffMs = localDateAsUtc(now) - localDateAsUtc(target);

  return diffMs / 86_400_000;
};

/**
 * 今日を含む直近 days 暦日以内か。days=2 なら今日と昨日。
 * 端末時計のわずかな進みは当日扱いで拾うが、それを超える未来日時は除外する。
 */
export const isWithinRecentDays = (
  isoDate: string,
  days: number,
  now: Date = new Date(),
): boolean => {
  const elapsed = daysSinceLocalDate(isoDate, now);
  if (elapsed === null) return false;
  if (elapsed < -FUTURE_TOLERANCE_DAYS) return false;

  return elapsed <= days - 1;
};
