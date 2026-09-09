import { useMemo, useState } from "react";
import { takkenQuestions, type TakkenQuestion } from "./data/questions";
import { formatQuestionText } from "./lib/formatQuestionText";
import {
  buildChoiceQueue,
  countChoiceProgress,
  type QueueAnswerInput,
} from "./lib/choiceQueue";
import type { ChoiceStatement } from "./lib/choiceStatements";
import type { ChoiceRecord } from "./lib/progressExtras";

type Props = {
  answers: QueueAnswerInput;
  choiceRecords: Record<string, ChoiceRecord>;
  onAnswer: (statement: ChoiceStatement, ok: boolean) => void;
  onClose: () => void;
};

const ALL = "all";
const categories = Array.from(
  new Set(takkenQuestions.map((question) => question.category)),
);
const questionById = new Map(takkenQuestions.map((q) => [q.id, q]));

/** 設問文から「【問 N】」を除いた本文。肢の上に出す前提文。 */
const stemBody = (stem: string): string => stem.replace(/^【問\s*\d+】\s*/, "");

const kindLabel = (statement: ChoiceStatement, question: TakkenQuestion) =>
  statement.kind === "pick-true"
    ? `この問は「正しいものはどれか」型。公式の正解は肢${question.correctChoices[0]}なので、肢${statement.choice}は${statement.isTrue ? "○（正しい）" : "×（誤り）"}。`
    : `この問は「誤っているものはどれか」型。公式の正解（誤っている肢）は肢${question.correctChoices[0]}なので、肢${statement.choice}は${statement.isTrue ? "○（正しい）" : "×（誤り）"}。`;

/**
 * 肢別○×モード。1問を4回の想起機会にする。
 * 各肢の真偽は公式の正解番号と設問型から導く（src/lib/choiceStatements.ts）。
 * 出題順は間違えた問題の肢から（src/lib/choiceQueue.ts）。
 */
export function ChoiceQuiz({
  answers,
  choiceRecords,
  onAnswer,
  onClose,
}: Props) {
  const [category, setCategory] = useState(ALL);
  // 並びは開いた時点で固定する。答えるたびに並び替えると、次の肢が飛ぶ。
  const [salt, setSalt] = useState(() => String(Date.now()));
  const [initialRecords, setInitialRecords] = useState(choiceRecords);
  const [initialAnswers, setInitialAnswers] = useState(answers);
  const queue = useMemo(
    () =>
      buildChoiceQueue(takkenQuestions, initialAnswers, initialRecords, {
        category: category === ALL ? undefined : category,
        salt,
      }),
    [category, initialAnswers, initialRecords, salt],
  );
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [tally, setTally] = useState({ answered: 0, correct: 0 });

  const progress = useMemo(
    () => countChoiceProgress(takkenQuestions, choiceRecords),
    [choiceRecords],
  );

  const finished = queue.length > 0 && index >= queue.length;
  const statement = finished ? undefined : queue[index];
  const question = statement ? questionById.get(statement.questionId) : null;

  // 末尾まで来たら、今の記録で並べ直して最初から（○×で外した肢が先頭に来る）。
  const restart = () => {
    setInitialRecords(choiceRecords);
    setInitialAnswers(answers);
    setSalt(String(Date.now()));
    setIndex(0);
    setPicked(null);
    setTally({ answered: 0, correct: 0 });
  };

  const answer = (value: boolean) => {
    if (!statement || picked !== null) return;
    const ok = value === statement.isTrue;
    setPicked(value);
    setTally((t) => ({
      answered: t.answered + 1,
      correct: t.correct + (ok ? 1 : 0),
    }));
    onAnswer(statement, ok);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const changeCategory = (value: string) => {
    setCategory(value);
    setIndex(0);
    setPicked(null);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-2 pb-2 sm:items-center sm:px-4 sm:pb-4">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-2xl bg-white p-4 shadow-xl sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">肢別○×</h2>
          <button
            className="rounded-full px-3 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"
            type="button"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          肢を1つずつ○×で判断します。1問が4回の想起練習になります。正誤は公式の正解番号と設問の型（正しいもの／誤っているもの）から導いています。
        </p>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
          <select
            className="min-h-9 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900"
            onChange={(event) => changeCategory(event.target.value)}
            value={category}
          >
            <option value={ALL}>すべての科目</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span>
            今回 {tally.correct}/{tally.answered} ・ 通算 {progress.answered}/
            {progress.total}肢
          </span>
        </div>

        {statement && question ? (
          <div className="mt-3 flex-1 overflow-y-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-bold text-sky-700">
                {question.year}
              </span>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
                問{question.number}
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-bold text-slate-700">
                {question.category}
              </span>
              <span className="text-xs text-slate-400">
                {index + 1} / {queue.length}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
              {formatQuestionText(stemBody(statement.stem))}
            </p>
            <div className="mt-3 rounded-lg border border-slate-300 bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">
                肢{statement.choice}
              </p>
              <p className="mt-1 whitespace-pre-line text-base leading-7 text-slate-950">
                {formatQuestionText(statement.text)}
              </p>
            </div>

            {picked === null ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="min-h-14 rounded-lg border-2 border-emerald-600 bg-white text-2xl font-bold text-emerald-700"
                  onClick={() => answer(true)}
                  type="button"
                >
                  ○
                </button>
                <button
                  className="min-h-14 rounded-lg border-2 border-rose-600 bg-white text-2xl font-bold text-rose-700"
                  onClick={() => answer(false)}
                  type="button"
                >
                  ×
                </button>
              </div>
            ) : (
              <div
                className={`mt-3 rounded-lg border p-3 ${
                  picked === statement.isTrue
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-rose-200 bg-rose-50"
                }`}
              >
                <p className="text-base font-bold">
                  {picked === statement.isTrue ? "正解" : "不正解"}：この肢は
                  {statement.isTrue ? "○" : "×"}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-700">
                  {kindLabel(statement, question)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    className="inline-flex min-h-10 items-center rounded-lg border border-sky-200 bg-sky-50 px-3 text-sm font-bold text-sky-700"
                    href={question.externalExplanationUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    解答解説を見る
                  </a>
                  <a
                    className="inline-flex min-h-10 items-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700"
                    href={question.sourceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    公式PDF
                  </a>
                </div>
                <button
                  className="mt-3 min-h-12 w-full rounded-lg bg-sky-700 px-4 text-base font-bold text-white"
                  onClick={next}
                  type="button"
                >
                  次の肢へ
                </button>
              </div>
            )}
          </div>
        ) : finished ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-base font-bold text-emerald-800">
              この並びの肢は解き終えました
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              今回 {tally.correct}/{tally.answered}
              肢。もう一度やると、いま外した肢が先頭に来ます。
            </p>
            <button
              className="mt-3 min-h-12 w-full rounded-lg bg-emerald-700 px-4 text-base font-bold text-white"
              onClick={restart}
              type="button"
            >
              外した肢からもう一度
            </button>
          </div>
        ) : (
          <p className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-600">
            この科目には肢別○×にできる問題がありません。
          </p>
        )}
      </div>
    </div>
  );
}
