import { useMemo } from "react";
import { computeCheatSheet, type AnswerLapseInput, type CheatSheetRow } from "./lib/cheatsheet";

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
    <div className="cheatsheet">
      <div className="cheatsheet-header">
        <h2>チートシート</h2>
        <button type="button" onClick={onClose}>
          閉じる
        </button>
      </div>
      <p className="cheatsheet-explainer">
        優先度＝あなたの弱点 × 出題の多さ × 科目の得点効率
        で並べています。上から順につぶすと当日の得点が伸びやすくなります。
      </p>
      <ol className="cheatsheet-list">
        {rows.map((row) => (
          <li
            key={row.topicId}
            className={
              "cheatsheet-row" +
              (row.rank <= 10 ? " cheatsheet-row--top" : "") +
              (row.untouched ? " cheatsheet-row--untouched" : "")
            }
          >
            <span className="cheatsheet-rank">{row.rank}</span>
            <span className="cheatsheet-label">{row.label}</span>
            <span className="cheatsheet-category">{row.category}</span>
            <span className="cheatsheet-reason">{row.reasonLabel}</span>
            <span className="cheatsheet-accuracy">{accuracyLabel(row)}</span>
            <span className="cheatsheet-frequency">過去{row.questionCount}問 出題</span>
            <span className="cheatsheet-weight">
              得点効率{formatPercent(row.categoryWeight)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
