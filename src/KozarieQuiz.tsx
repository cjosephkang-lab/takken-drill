import { useMemo, useState } from "react";
import {
  kozarieQuestions,
  kozarieVideos,
  type KozarieQuestion,
} from "./data/kozarieQuiz";

type Props = {
  onClose: () => void;
};

const STORAGE_KEY = "takken-kozarie-learned";

const loadLearned = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
};

const saveLearned = (learned: Set<string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...learned]));
  } catch {
    // 保存できなくても、この画面を開いている間は使える
  }
};

const toSeconds = (t: string) =>
  t.split(":").reduce((sum, part) => sum * 60 + Number(part), 0);

const videoUrl = (item: KozarieQuestion) =>
  `https://www.youtube.com/watch?v=${item.video}&t=${toSeconds(item.t)}s`;

const videoTitle = (id: string) =>
  kozarieVideos.find((video) => video.id === id)?.label ?? id;

// こざりえ先生の一問一答動画を○×で1問ずつ解く。公式過去問の出題フローとは混ぜない。
export function KozarieQuiz({ onClose }: Props) {
  const [video, setVideo] = useState<string>("");
  const [mode, setMode] = useState<"quiz" | "list">("quiz");
  const [learned, setLearned] = useState<Set<string>>(loadLearned);
  const [queue, setQueue] = useState<KozarieQuestion[] | null>(null);
  const [picked, setPicked] = useState<boolean | null>(null);

  const items = useMemo(
    () => kozarieQuestions.filter((item) => !video || item.video === video),
    [video],
  );
  const remaining = items.filter((item) => !learned.has(item.id));

  const startQuiz = () => {
    setQueue([...remaining].sort(() => Math.random() - 0.5));
    setPicked(null);
  };

  const next = () => {
    if (!queue || picked === null) return;
    const [current, ...rest] = queue;
    if (picked === current.a) {
      const nextLearned = new Set(learned).add(current.id);
      setLearned(nextLearned);
      saveLearned(nextLearned);
      setQueue(rest);
    } else {
      // 間違えた問題は後ろに回して、もう一度出す
      setQueue([...rest, current]);
    }
    setPicked(null);
  };

  // この範囲の正解済みを消して、全問をもう一周する。
  const startNewLap = () => {
    const nextLearned = new Set(learned);
    items.forEach((item) => nextLearned.delete(item.id));
    setLearned(nextLearned);
    saveLearned(nextLearned);
    setQueue([...items].sort(() => Math.random() - 0.5));
    setPicked(null);
  };

  const current = queue?.[0];

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-4 pb-4 sm:items-center">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">
            こざりえ 一問一答
          </h2>
          <button
            className="rounded-full px-3 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"
            type="button"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          YouTubeの一問一答動画と2026年改正点の動画から作った○×問題。問題文は動画の解説から組み立て直したもので、本試験の原文ではない。
        </p>

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
              すべての動画（{kozarieQuestions.length}問）
            </option>
            {kozarieVideos.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}（
                {kozarieQuestions.filter((q) => q.video === item.id).length}問）
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
                  </p>
                  <ItemNotes item={item} />
                </li>
              ))}
            </ol>
          ) : !queue ? (
            <div className="rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-700">
              <p>
                この範囲は {items.length}問。正解済み{" "}
                {items.length - remaining.length}問 ／ 残り {remaining.length}
                問。
              </p>
              {remaining.length > 0 && (
                <button
                  className="mt-3 min-h-12 w-full rounded-lg bg-slate-900 px-3 text-sm font-bold text-white"
                  type="button"
                  onClick={startQuiz}
                >
                  残り{remaining.length}問を解く
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
                  onClick={startNewLap}
                >
                  全{items.length}問をもう一周する
                </button>
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
                      onClick={() => setPicked(choice)}
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
                  <ItemNotes item={current} />
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
                onClick={startNewLap}
              >
                全{items.length}問をもう一周する
              </button>
              <button
                className="mt-2 block min-h-10 w-full rounded-lg border border-emerald-300 bg-white text-sm"
                type="button"
                onClick={() => setQueue(null)}
              >
                戻る（動画を選び直す）
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemNotes({ item }: { item: KozarieQuestion }) {
  return (
    <>
      <p className="mt-2 text-sm leading-6 text-slate-700">{item.why}</p>
      {item.note && (
        <p className="mt-2 rounded bg-amber-50 p-2 text-xs leading-5 text-amber-900 [overflow-wrap:anywhere]">
          注意: {item.note}
        </p>
      )}
      <p className="mt-1 text-xs leading-5 text-slate-400 [overflow-wrap:anywhere]">
        出典:{" "}
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
      </p>
    </>
  );
}
