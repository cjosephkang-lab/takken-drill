import { useMemo, useState, type ReactNode } from "react";
import {
  kozarieQuestions,
  kozarieVideos,
  type KozarieQuestion,
} from "./data/kozarieQuiz";
import { weakSpotGroups, weakSpotQuestions } from "./data/weakSpotQuiz";
import { cramGroups, cramQuestions } from "./data/cramQuiz";
import type { ChoiceRecord } from "./lib/progressExtras";
import { oxRecordKey } from "./lib/studyRecords";

type Props = {
  onClose: () => void;
  /** 同期される解答記録（キーは oxRecordKey）。 */
  records: Record<string, ChoiceRecord>;
  onRecord: (key: string, ok: boolean) => void;
};

/** ○×クイズの1グループ（動画、または弱点の仮説）。 */
export type OxGroup = {
  id: string;
  label: string;
  /** 仮説の中身と根拠。解説の下に出す。 */
  detail?: string;
};

type OxQuizProps = Props & {
  title: string;
  description: string;
  questions: KozarieQuestion[];
  groups: OxGroup[];
  /** 選択欄の「すべての○○」。 */
  groupNoun: string;
  source: (item: KozarieQuestion) => ReactNode;
};

const toSeconds = (t: string) =>
  t.split(":").reduce((sum, part) => sum * 60 + Number(part), 0);

const videoUrl = (item: KozarieQuestion) =>
  `https://www.youtube.com/watch?v=${item.video}&t=${toSeconds(item.t)}s`;

const videoTitle = (id: string) =>
  kozarieVideos.find((video) => video.id === id)?.label ?? id;

// こざりえ先生の一問一答動画を○×で1問ずつ解く。公式過去問の出題フローとは混ぜない。
export function KozarieQuiz(props: Props) {
  return (
    <OxQuiz
      description="YouTubeの一問一答動画と2026年改正点の動画から作った○×問題。問題文は動画の解説から組み立て直したもので、本試験の原文ではない。"
      groupNoun="動画"
      groups={kozarieVideos}
      {...props}
      questions={kozarieQuestions}
      source={(item) => (
        <>
          <a
            className="underline"
            href={videoUrl(item)}
            rel="noreferrer"
            target="_blank"
          >
            {videoTitle(item.video)} {item.t}
          </a>
          {item.sourceUrl && (
            <>
              {" ／ "}
              <a
                className="underline"
                href={item.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                一次情報
              </a>
            </>
          )}
        </>
      )}
      title="こざりえ 一問一答"
    />
  );
}

// 回答記録から立てた弱点の仮説ごとに、その知識を別の角度から問う○×。AIが作り、条文で確認したもの。
export function WeakSpotQuiz(props: Props) {
  return (
    <OxQuiz
      description="今の回答記録（何度も間違えた・解き直し待ち・確認待ち）と誤答の原因分析から、欠けているかもしれない知識を仮説にして、別の角度から問う○×。AIが作成し、条文（2026年4月1日時点）で確認した。"
      groupNoun="仮説"
      groups={weakSpotGroups}
      {...props}
      questions={weakSpotQuestions}
      source={(item) =>
        item.sourceUrl ? (
          <a
            className="underline"
            href={item.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            条文
          </a>
        ) : null
      }
      title="弱点の仮説 ○×"
    />
  );
}

// 直前の詰め込み用（盛土・区分所有・借地借家の数字）。「一覧で見る」がチートシートになる。
export function CramQuiz(props: Props) {
  return (
    <OxQuiz
      {...props}
      description="盛土規制法の高さ・区分所有法の決議・借地借家法の期間を○×で詰め込む。数字は2026年4月1日時点の条文で確認済み。「一覧で見る」でチートシートとして読める。"
      groupNoun="分野"
      groups={cramGroups}
      questions={cramQuestions}
      source={(item) =>
        item.sourceUrl ? (
          <a
            className="underline"
            href={item.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            条文
          </a>
        ) : null
      }
      title="直前詰め込み ○×"
    />
  );
}

function OxQuiz({
  onClose,
  records,
  onRecord,
  title,
  description,
  questions,
  groups,
  groupNoun,
  source,
}: OxQuizProps) {
  const [video, setVideo] = useState<string>("");
  const [mode, setMode] = useState<"quiz" | "list">("quiz");
  const [queue, setQueue] = useState<KozarieQuestion[] | null>(null);
  const [picked, setPicked] = useState<boolean | null>(null);

  const recordOf = (item: KozarieQuestion) => records[oxRecordKey(item.id)];
  const items = useMemo(
    () => questions.filter((item) => !video || item.video === video),
    [questions, video],
  );
  // 最後に解いた時に正解していれば「正解済み」。記録は端末をまたいで同期される。
  const remaining = items.filter((item) => !recordOf(item)?.ok);
  // 一度でも外したことがある問題。欠けている知識の手がかり。
  const missed = items.filter((item) => (recordOf(item)?.lapses ?? 0) > 0);

  const shuffle = (list: KozarieQuestion[]) =>
    [...list].sort(() => Math.random() - 0.5);

  const startWith = (list: KozarieQuestion[]) => {
    setQueue(shuffle(list));
    setPicked(null);
  };

  const pick = (choice: boolean) => {
    if (!queue || picked !== null) return;
    setPicked(choice);
    onRecord(oxRecordKey(queue[0].id), choice === queue[0].a);
  };

  const next = () => {
    if (!queue || picked === null) return;
    const [current, ...rest] = queue;
    // 間違えた問題は後ろに回して、もう一度出す
    setQueue(picked === current.a ? rest : [...rest, current]);
    setPicked(null);
  };

  // 仮説（動画）ごとの成績。外した問題が多い順。
  const groupStats = groups
    .map((group) => {
      const inGroup = questions.filter((q) => q.video === group.id);
      return {
        group,
        total: inGroup.length,
        answered: inGroup.filter((q) => recordOf(q)).length,
        missed: inGroup.filter((q) => (recordOf(q)?.lapses ?? 0) > 0).length,
      };
    })
    .filter((stat) => stat.answered > 0)
    .sort((a, b) => b.missed - a.missed);

  const current = queue?.[0];

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-4 pb-4 sm:items-center">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          <button
            className="rounded-full px-3 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"
            type="button"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-3 flex gap-2">
          <select
            className="min-h-11 w-0 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900"
            value={video}
            onChange={(event) => {
              setVideo(event.target.value);
              setQueue(null);
            }}
          >
            <option value="">
              すべての{groupNoun}（{questions.length}問）
            </option>
            {groups.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}（
                {questions.filter((q) => q.video === item.id).length}問）
              </option>
            ))}
          </select>
          <button
            className="min-h-11 shrink-0 rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-800"
            type="button"
            onClick={() => {
              setMode(mode === "quiz" ? "list" : "quiz");
              setQueue(null);
            }}
          >
            {mode === "quiz" ? "一覧で見る" : "問題にする"}
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          {mode === "list" ? (
            <ol className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <p className="text-xs font-bold text-slate-500">
                    {item.topic}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{item.q}</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    {item.a ? "○" : "×"}
                    {(recordOf(item)?.lapses ?? 0) > 0 && (
                      <span className="ml-2 rounded bg-rose-50 px-1.5 py-0.5 text-xs text-rose-800">
                        外した {recordOf(item)!.lapses}回
                      </span>
                    )}
                  </p>
                  <ItemNotes groups={groups} item={item} source={source} />
                </li>
              ))}
            </ol>
          ) : !queue ? (
            <div className="rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-700">
              <p>
                この範囲は {items.length}問。正解済み{" "}
                {items.length - remaining.length}問 ／ 残り {remaining.length}
                問。外したことがある問題 {missed.length}問。
              </p>
              {remaining.length > 0 && (
                <button
                  className="mt-3 min-h-12 w-full rounded-lg bg-slate-900 px-3 text-sm font-bold text-white"
                  type="button"
                  onClick={() => startWith(remaining)}
                >
                  残り{remaining.length}問を解く
                </button>
              )}
              {missed.length > 0 && (
                <button
                  className="mt-2 min-h-12 w-full rounded-lg border border-rose-300 bg-rose-50 px-3 text-sm font-bold text-rose-800"
                  type="button"
                  onClick={() => startWith(missed)}
                >
                  外したことがある{missed.length}問だけ解く
                </button>
              )}
              {items.length - remaining.length > 0 && (
                <button
                  className={`mt-2 min-h-12 w-full rounded-lg px-3 text-sm font-bold ${
                    remaining.length === 0
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 bg-white text-slate-800"
                  }`}
                  type="button"
                  onClick={() => startWith(items)}
                >
                  全{items.length}問をもう一周する
                </button>
              )}
              {!video && groupStats.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-500">
                    {groupNoun}ごとの成績（外した問題が多い順）
                  </p>
                  <ul className="mt-1 space-y-1">
                    {groupStats.map((stat) => (
                      <li
                        key={stat.group.id}
                        className="flex justify-between gap-2 text-xs"
                      >
                        <span className="text-slate-700">
                          {stat.group.label}
                        </span>
                        <span
                          className={`shrink-0 font-bold ${
                            stat.missed >= 2
                              ? "text-rose-700"
                              : stat.missed === 1
                                ? "text-amber-700"
                                : "text-emerald-700"
                          }`}
                        >
                          外した {stat.missed} ／ 解いた {stat.answered}
                          {stat.answered < stat.total
                            ? `（全${stat.total}）`
                            : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : current ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-500">
                {current.topic} ・ 残り{queue.length}問
              </p>
              <p className="mt-2 text-base font-bold leading-7 text-slate-950">
                {current.q}
              </p>
              {picked === null ? (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[true, false].map((choice) => (
                    <button
                      key={String(choice)}
                      className="min-h-14 rounded-lg border border-slate-300 bg-white text-2xl font-bold text-slate-900"
                      type="button"
                      onClick={() => pick(choice)}
                    >
                      {choice ? "○" : "×"}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <p
                    className={`mt-3 rounded p-3 text-base font-bold ${
                      picked === current.a
                        ? "bg-emerald-50 text-emerald-900"
                        : "bg-rose-50 text-rose-900"
                    }`}
                  >
                    {picked === current.a ? "正解" : "不正解"}　答えは
                    {current.a ? "○" : "×"}
                  </p>
                  <ItemNotes groups={groups} item={current} source={source} />
                  <button
                    className="mt-4 min-h-12 w-full rounded-lg bg-slate-900 text-sm font-bold text-white"
                    type="button"
                    onClick={next}
                  >
                    {picked === current.a
                      ? "次へ"
                      : "次へ（この問題は後でもう一度）"}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900">
              この範囲はすべて正解した。
              <button
                className="mt-3 block min-h-12 w-full rounded-lg bg-emerald-700 text-sm text-white"
                type="button"
                onClick={() => startWith(items)}
              >
                全{items.length}問をもう一周する
              </button>
              <button
                className="mt-2 block min-h-10 w-full rounded-lg border border-emerald-300 bg-white text-sm"
                type="button"
                onClick={() => setQueue(null)}
              >
                戻る（{groupNoun}を選び直す）
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemNotes({
  item,
  groups,
  source,
}: {
  item: KozarieQuestion;
  groups: OxGroup[];
  source: (item: KozarieQuestion) => ReactNode;
}) {
  const detail = groups.find((group) => group.id === item.video)?.detail;
  return (
    <>
      <p className="mt-2 text-sm leading-6 text-slate-700">{item.why}</p>
      {item.note && (
        <p className="mt-2 rounded bg-amber-50 p-2 text-xs leading-5 text-amber-900 [overflow-wrap:anywhere]">
          注意: {item.note}
        </p>
      )}
      {detail && (
        <p className="mt-2 rounded bg-sky-50 p-2 text-xs leading-5 text-sky-900">
          仮説: {detail}
        </p>
      )}
      <p className="mt-1 text-xs leading-5 text-slate-400 [overflow-wrap:anywhere]">
        出典: {source(item)}
      </p>
    </>
  );
}
