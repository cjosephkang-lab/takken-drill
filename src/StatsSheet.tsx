import { useState } from "react";
import { statistics } from "./data/statistics";

type Props = {
  onClose: () => void;
};

// 統計は解くより覚えるもの。数字を隠して思い出してから、押して確かめる。
export function StatsSheet({ onClose }: Props) {
  const [hidden, setHidden] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleHidden = () => {
    setHidden((value) => !value);
    setRevealed(new Set());
  };

  const reveal = (key: string) => {
    setRevealed((current) => new Set(current).add(key));
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-4 pb-4 sm:items-center">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">統計（問48）</h2>
          <button
            className="rounded-full px-3 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"
            type="button"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          過去問の統計は数字が古いので、解くより最新の数字を覚える。まず「増えた／減った・何年連続」を押さえ、細かい数字は前日と当日の朝に見直す。
        </p>
        <button
          className={
            "mt-3 min-h-11 rounded-lg border px-3 text-sm font-bold " +
            (hidden
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-800")
          }
          type="button"
          onClick={toggleHidden}
        >
          {hidden ? "数字を全部表示する" : "数字を隠して思い出す"}
        </button>
        <ol className="mt-4 flex-1 space-y-3 overflow-y-auto">
          {statistics.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-slate-200 p-3"
            >
              <h3 className="text-sm font-bold text-slate-950">{item.title}</h3>
              <p className="mt-1 text-sm font-bold leading-6 text-amber-800">
                {item.headline}
              </p>
              <dl className="mt-2 space-y-1">
                {item.figures.map((figure) => {
                  const key = `${item.id}:${figure.label}`;
                  const masked = hidden && !revealed.has(key);
                  return (
                    <div
                      key={key}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <dt className="text-slate-600">{figure.label}</dt>
                      <dd className="text-right font-bold text-slate-950">
                        {masked ? (
                          <button
                            className="min-h-8 rounded bg-slate-200 px-3 text-xs font-bold text-slate-500"
                            type="button"
                            onClick={() => reveal(key)}
                          >
                            押して確認
                          </button>
                        ) : (
                          figure.value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              {item.traps.length > 0 && (
                <ul className="mt-2 space-y-1 rounded bg-rose-50 p-2 text-xs leading-5 text-rose-900">
                  {item.traps.map((trap) => (
                    <li key={trap}>注意: {trap}</li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs leading-5 text-slate-400">
                出典:{" "}
                <a
                  className="underline"
                  href={item.source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.source.name}
                </a>
                （{item.source.published}）
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
