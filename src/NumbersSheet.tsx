import { useMemo, useState } from "react";
import { fixedSlotNumbers, type NumberItem } from "./data/fixedSlotNumbers";

type Props = {
  onClose: () => void;
};

const STORAGE_KEY = "takken-numbers-learned";

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

const itemKey = (item: NumberItem) => `${item.slot}:${item.q}`;

const slots = [...new Set(fixedSlotNumbers.map((item) => item.slot))];

// 毎年同じ番号で出る枠（問11〜24）の数字だけを、1問ずつ思い出して確かめる。
export function NumbersSheet({ onClose }: Props) {
  const [slot, setSlot] = useState<string>("");
  const [mode, setMode] = useState<"quiz" | "list">("quiz");
  const [learned, setLearned] = useState<Set<string>>(loadLearned);
  const [queue, setQueue] = useState<NumberItem[] | null>(null);
  const [shown, setShown] = useState(false);

  const items = useMemo(
    () => fixedSlotNumbers.filter((item) => !slot || item.slot === slot),
    [slot],
  );
  const remaining = items.filter((item) => !learned.has(itemKey(item)));

  const startQuiz = () => {
    setQueue([...remaining].sort(() => Math.random() - 0.5));
    setShown(false);
  };

  const answer = (ok: boolean) => {
    if (!queue) return;
    const [current, ...rest] = queue;
    if (ok) {
      const next = new Set(learned).add(itemKey(current));
      setLearned(next);
      saveLearned(next);
      setQueue(rest);
    } else {
      // 「まだ」は後ろに回して、もう一度出す
      setQueue([...rest, current]);
    }
    setShown(false);
  };

  const resetLearned = () => {
    const next = new Set(learned);
    items.forEach((item) => next.delete(itemKey(item)));
    setLearned(next);
    saveLearned(next);
    setQueue(null);
  };

  const current = queue?.[0];

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-4 pb-4 sm:items-center">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">数字（問11〜24）</h2>
          <button
            className="rounded-full px-3 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"
            type="button"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          毎年同じ番号で出る枠の数字だけを集めた。知らない肢が出ても、知っている数字の肢で正誤を確定できれば消去法で解ける。
        </p>

        <div className="mt-3 flex gap-2">
          <select
            className="min-h-11 w-0 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900"
            value={slot}
            onChange={(event) => {
              setSlot(event.target.value);
              setQueue(null);
            }}
          >
            <option value="">すべての枠（{fixedSlotNumbers.length}問）</option>
            {slots.map((name) => (
              <option key={name} value={name}>
                {name}
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
                  key={itemKey(item)}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <p className="text-xs font-bold text-slate-500">
                    {item.slot}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{item.q}</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    {item.a}
                  </p>
                  <ItemNotes item={item} />
                </li>
              ))}
            </ol>
          ) : !queue ? (
            <div className="rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-700">
              <p>
                この範囲は {items.length}問。覚えた{" "}
                {items.length - remaining.length}問 ／ 残り {remaining.length}
                問。
              </p>
              <button
                className="mt-3 min-h-12 w-full rounded-lg bg-slate-900 px-3 text-sm font-bold text-white disabled:opacity-40"
                disabled={remaining.length === 0}
                type="button"
                onClick={startQuiz}
              >
                残り{remaining.length}問を解く
              </button>
              {items.length - remaining.length > 0 && (
                <button
                  className="mt-2 min-h-10 w-full text-xs text-slate-500"
                  type="button"
                  onClick={resetLearned}
                >
                  この範囲の「覚えた」を消して最初からやり直す
                </button>
              )}
            </div>
          ) : current ? (
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-500">
                {current.slot} ・ 残り{queue.length}問
              </p>
              <p className="mt-2 text-base font-bold leading-7 text-slate-950">
                {current.q}
              </p>
              {shown ? (
                <>
                  <p className="mt-3 rounded bg-amber-50 p-3 text-base font-bold text-amber-900">
                    {current.a}
                  </p>
                  <ItemNotes item={current} />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      className="min-h-12 rounded-lg border border-rose-300 bg-rose-50 text-sm font-bold text-rose-800"
                      type="button"
                      onClick={() => answer(false)}
                    >
                      まだ（後でもう一度）
                    </button>
                    <button
                      className="min-h-12 rounded-lg border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-800"
                      type="button"
                      onClick={() => answer(true)}
                    >
                      覚えた
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="mt-4 min-h-12 w-full rounded-lg bg-slate-900 text-sm font-bold text-white"
                  type="button"
                  onClick={() => setShown(true)}
                >
                  頭の中で答えてから、答えを見る
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900">
              この範囲はすべて「覚えた」になった。前日と当日の朝に「一覧で見る」で見直す。
              <button
                className="mt-3 block min-h-10 w-full rounded-lg border border-emerald-300 bg-white text-sm"
                type="button"
                onClick={() => setQueue(null)}
              >
                戻る
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemNotes({ item }: { item: NumberItem }) {
  return (
    <>
      {item.trap && (
        <p className="mt-2 rounded bg-rose-50 p-2 text-xs leading-5 text-rose-900">
          注意: {item.trap}
        </p>
      )}
      {item.note && (
        <p className="mt-1 text-xs leading-5 text-amber-800 [overflow-wrap:anywhere]">{item.note}</p>
      )}
      <p className="mt-1 text-xs leading-5 text-slate-400">
        根拠:{" "}
        <a
          className="underline"
          href={item.url}
          rel="noreferrer"
          target="_blank"
        >
          {item.law}
        </a>
      </p>
    </>
  );
}
