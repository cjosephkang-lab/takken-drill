import { useMemo } from "react";
import {
  computeCheatSheet,
  type AnswerLapseInput,
  type CheatSheetRow,
} from "./lib/cheatsheet";

type Props = {
  answers: AnswerLapseInput;
  onClose: () => void;
};

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

const accuracyLabel = (row: CheatSheetRow) => {
  if (row.accuracy === null) return "未着手";
  return `正答率${formatPercent(row.accuracy)}（ミス${row.lapses}回）`;
};

export function CheatSheet({ answers, onClose }: Props) {
  const rows = useMemo(() => computeCheatSheet(answers), [answers]);

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-4 pb-4 sm:items-center">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">チートシート</h2>
          <button
            className="rounded-full px-3 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"
            type="button"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          優先度＝あなたの弱点 × 出題の多さ × 科目の得点効率
          で並べています。上から順につぶすと当日の得点が伸びやすくなります。
        </p>
        <p className="mt-1 text-xs text-slate-400">
          学習を進めるとここが更新されます。
        </p>
        <ol className="mt-4 flex-1 space-y-2 overflow-y-auto">
          {rows.map((row) => (
            <li
              key={row.topicId}
              className={
                "rounded-lg border p-3" +
                (row.rank <= 10
                  ? " border-sky-200 bg-sky-50"
                  : " border-slate-200 bg-white") +
                (row.untouched ? " opacity-70" : "")
              }
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {row.rank}
                  </span>
                  <span className="text-sm font-bold text-slate-950">
                    {row.label}
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                  {row.category}
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-sky-700">
                {row.reasonLabel}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                あなた: {accuracyLabel(row)} ／ 過去{row.questionCount}問 出題
                ／ 得点効率
                {formatPercent(row.categoryWeight)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
