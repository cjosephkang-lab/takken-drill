/**
 * 復習期限の計算。間隔反復のスケジュールはここが正で、App.tsx はこれを使う。
 *
 * 期限は「日数を足した時刻」ではなく「日本時間の朝4時」に丸める。
 * 丸めないと、22時に解いた問題は4日後の22時に期限入りする。解いている
 * 最中に1問ずつ降ってきて、「あと10問」が30分後に18問になった
 * （2026-09-13に実データで確認。20:36〜22:33の2時間で16問が期限入り）。
 * 丸めれば、アプリを開いた時点でその日のキューが確定し、解けば減るだけになる。
 *
 * 0時ではなく4時なのは、深夜1時に解いた問題を「もう翌日ぶん」と
 * 扱わないため。学習者の体感の一日は日付境界ではなく就寝で切れる。
 *
 * なお日次ログ（連続日数・カレンダー・学習ログ書き出し）は 0時 境界のままで、
 * ここと意図的に食い違う。あちらは「何月何日に何問解いたか」の記録であり、
 * 暦の日付で切るのが正しい。揃えると深夜0-4時の学習が前日に計上され、
 * 連続日数と書き出しがずれる（実績では回答の6.3%がこの時間帯）。
 */

/** 日本標準時のUTCからのずれ（時間）。宅建学習者は日本在住前提。 */
const JST_OFFSET_HOURS = 9;
/** 一日の始まりとみなす時刻（JST）。深夜の学習を前日ぶんとして扱う。 */
export const DAY_START_HOUR = 4;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/**
 * 次の復習までの日数。連続正解が増えるほど間隔を空ける。
 *
 * 棚田行政書士（YouTube「不動産大学」・TAC出版『棚田式』）の大量記憶法は
 * 0日→半日→1日→2日→3日→4日→5日→6日→7日と最初の1週間を毎日詰め、
 * 7日到達後に週1回へ移す。エビングハウスの忘却曲線が根拠。
 * https://takken11.com/memory/
 *
 * ただし1週間毎日は残り日数に対して重すぎる（23問解いた日の復習だけで
 * 7日間×23問が固定され、未着手に手が回らない）。3回目を7日から4日に
 * 前倒しし、忘却が進む前に1回挟む形に圧縮した。
 */
export const reviewIntervalDays = (streak: number) => {
  if (streak <= 0) return 1;
  if (streak === 1) return 2;
  if (streak === 2) return 4;
  if (streak === 3) return 7;
  if (streak === 4) return 14;
  return 30;
};

/**
 * その時刻が属する「学習日」の始まり（JST 4:00）をUTCのISO文字列で返す。
 * JST 3:59 は前日の学習日に属する。
 *
 * 壊れた日時が来たら、例外ではなく null を返す。ここで throw すると
 * loadProgress の catch が空の進捗にフォールバックし、学習履歴が
 * 丸ごと消えたように見える（保存済みの回答126件が0件になる）。
 */
export const startOfStudyDay = (iso: string): string | null => {
  const ms = new Date(iso).getTime();
  if (!Number.isFinite(ms)) return null;
  // JSTの壁時計に移してから、4時を基準に日を切る。
  const jst = ms + JST_OFFSET_HOURS * HOUR_MS;
  const dayIndex = Math.floor((jst - DAY_START_HOUR * HOUR_MS) / DAY_MS);
  const jstStart = dayIndex * DAY_MS + DAY_START_HOUR * HOUR_MS;
  return new Date(jstStart - JST_OFFSET_HOURS * HOUR_MS).toISOString();
};

/**
 * 復習期限。answeredAt の学習日から days 日後の朝4時（JST）。
 * 何時に解いても、期限日の朝にはキューへ入っている。
 *
 * answeredAt が壊れていたら今日の学習日を起点にする。捨てるより、
 * 少し早めに復習へ出す方が学習者の損にならない。
 */
export const nextReviewAt = (answeredAt: string, days: number): string => {
  const base =
    startOfStudyDay(answeredAt) ?? startOfStudyDay(new Date().toISOString());
  // 現在時刻の丸めが null になることはない（Date.now は常に有効）。
  const start = new Date(base as string).getTime();
  return new Date(start + days * DAY_MS).toISOString();
};

/** 連続正解数から復習期限を出す。回答記録を作る時はこれを使う。 */
export const nextReviewAtForStreak = (
  answeredAt: string,
  streak: number,
): string => nextReviewAt(answeredAt, reviewIntervalDays(streak));

/** 期限が来ているか。now を渡さなければ現在時刻で判定する。 */
export const isDue = (
  reviewAt: string | undefined,
  now: string = new Date().toISOString(),
): boolean => Boolean(reviewAt && reviewAt <= now);
