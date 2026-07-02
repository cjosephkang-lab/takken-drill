import { useEffect, useMemo, useState } from "react";
import type { TakkenExam, TakkenQuestion } from "./data/questions";
import { passLine, studyOrder } from "./data/studyGuide";
import { formatQuestionText } from "./lib/formatQuestionText";

// 進行中の模試。localStorageに保存してリロードしても再開できるようにする。
export type MockRun = {
  examId: string;
  startedAt: string;
  answers: Record<string, number>;
};

/** 本番と同じ2時間。 */
const MOCK_MINUTES = 120;

const formatRemaining = (ms: number) => {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

type Props = {
  exam: TakkenExam;
  /** 当該年度の全問（問番号順）。 */
  questions: TakkenQuestion[];
  run: MockRun;
  onChange: (run: MockRun) => void;
  /** 採点結果を確認し、学習記録へ反映して終了。 */
  onCommit: (run: MockRun) => void;
  /** 記録に反映せず破棄して終了。 */
  onAbort: () => void;
};

export function MockExam({
  exam,
  questions,
  run,
  onChange,
  onCommit,
  onAbort,
}: Props) {
  const [index, setIndex] = useState(() => {
    const firstUnanswered = questions.findIndex((q) => !run.answers[q.id]);
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [showResult, setShowResult] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const deadline = new Date(run.startedAt).getTime() + MOCK_MINUTES * 60 * 1000;
  const remaining = Math.max(0, deadline - now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  // 時間切れになったら自動で採点画面へ。
  const timeUp = remaining === 0;
  useEffect(() => {
    if (timeUp) {
      setShowResult(true);
    }
  }, [timeUp]);

  const question = questions[index];
  const answeredCount = Object.keys(run.answers).length;
  const selected = run.answers[question.id];

  const select = (choice: number) => {
    onChange({
      ...run,
      answers: { ...run.answers, [question.id]: choice },
    });
    // ひと呼吸おいて次の問題へ自動前進（本番のマークシートのテンポ感）。
    window.setTimeout(() => {
      setIndex((i) => Math.min(i + 1, questions.length - 1));
      window.scrollTo({ top: 0 });
    }, 150);
  };

  const isCorrect = (q: TakkenQuestion) => {
    if (q.isAllCorrect) return true; // 全員正解扱いの問題は得点になる
    const answer = run.answers[q.id];
    return answer !== undefined && q.correctChoices.includes(answer);
  };

  const score = useMemo(
    () => questions.filter((q) => isCorrect(q)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, run.answers],
  );

  const categoryRows = useMemo(() => {
    return studyOrder.map((cat) => {
      const inCategory = questions.filter((q) => q.category === cat.category);
      const correct = inCategory.filter((q) => isCorrect(q)).length;
      return {
        category: cat.category,
        targetScore: cat.targetScore,
        total: inCategory.length,
        correct,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, run.answers]);

  if (showResult) {
    const passed = score >= passLine.safe;
    const passedMin = score >= passLine.min;

    return (
      <div className="min-h-screen bg-[#0F1117] px-4 py-6 text-slate-100">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-xl font-bold text-white">
            模試結果（{exam.year}）
          </h1>

          <div
            className={`mt-4 rounded-lg border p-4 text-center ${
              passed
                ? "border-emerald-300/40 bg-emerald-300/10"
                : passedMin
                  ? "border-amber-200/30 bg-amber-200/10"
                  : "border-rose-300/40 bg-rose-300/10"
            }`}
          >
            <p className="text-4xl font-bold text-white">
              {score}
              <span className="text-xl text-slate-300">
                /{questions.length}点
              </span>
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {passed
                ? `安全圏（${passLine.safe}点）を超えています。本番でも合格圏です。`
                : passedMin
                  ? `過去10年の合格ライン（${passLine.min}〜${passLine.max}点）の範囲内。安全圏${passLine.safe}点まであと${passLine.safe - score}点。`
                  : `合格ライン（最低${passLine.min}点）まであと${passLine.min - score}点。弱点科目を復習しましょう。`}
            </p>
            {timeUp ? (
              <p className="mt-1 text-xs text-slate-400">
                （制限時間 {MOCK_MINUTES}分 が経過したため自動採点）
              </p>
            ) : null}
          </div>

          <div className="mt-4 space-y-2">
            {categoryRows.map((row) => {
              const reached = row.correct >= row.targetScore;
              return (
                <div
                  className="flex items-center justify-between gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm"
                  key={row.category}
                >
                  <span className="font-bold text-white">{row.category}</span>
                  <span
                    className={reached ? "text-emerald-200" : "text-rose-200"}
                  >
                    {row.correct}/{row.total}点
                    <span className="text-slate-500">
                      （目標{row.targetScore}）
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            「終了」を押すと、回答した{answeredCount}
            問が学習記録（間隔反復・正答率・今日のミッション）に反映されます。
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              className="min-h-12 rounded-lg border border-white/15 bg-slate-900 px-4 text-sm font-bold text-white"
              onClick={() => setShowResult(false)}
              disabled={timeUp}
              type="button"
            >
              {timeUp ? "時間切れ" : "問題に戻る"}
            </button>
            <button
              className="min-h-12 rounded-lg bg-white px-4 text-base font-bold text-slate-950"
              onClick={() => onCommit(run)}
              type="button"
            >
              終了（記録に反映）
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] pb-28 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0F1117] px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-amber-200">
              模試 {exam.year} ・ 残り {formatRemaining(remaining)}
            </p>
            <p className="text-xs text-slate-400">
              回答 {answeredCount}/{questions.length}問
              ・正誤は採点まで表示されません
            </p>
          </div>
          <button
            className="min-h-10 rounded-lg border border-white/15 bg-slate-900 px-3 text-xs font-bold text-slate-300"
            onClick={() => {
              if (
                window.confirm(
                  "模試を中断して破棄します（学習記録には反映されません）。よろしいですか？",
                )
              ) {
                onAbort();
              }
            }}
            type="button"
          >
            中断
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-4">
        <section className="rounded-lg border border-white/10 bg-slate-950 p-4">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="rounded-md border border-amber-200/30 bg-amber-200/10 px-2.5 py-1 font-bold text-amber-100">
              問{question.number}
            </span>
            <span className="text-slate-400">
              {index + 1}/{questions.length}
            </span>
          </div>

          <div className="mt-3 whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-[#111827] p-4 text-base leading-7 text-slate-100">
            {formatQuestionText(question.questionText)}
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((choice) => (
              <button
                className={`min-h-14 rounded-lg border text-xl font-bold transition ${
                  selected === choice
                    ? "border-amber-200 bg-amber-200/20 text-amber-100"
                    : "border-white/10 bg-slate-900 text-white"
                }`}
                key={choice}
                onClick={() => select(choice)}
                type="button"
              >
                {choice}
              </button>
            ))}
          </div>
        </section>

        <button
          className="mt-4 min-h-12 w-full rounded-lg border border-amber-200/30 bg-amber-200/10 px-4 text-sm font-bold text-amber-100"
          onClick={() => {
            const unanswered = questions.length - answeredCount;
            if (
              unanswered === 0 ||
              window.confirm(`未回答が${unanswered}問あります。採点しますか？`)
            ) {
              setShowResult(true);
            }
          }}
          type="button"
        >
          採点する
        </button>
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#0F1117]/95 px-4 pt-2 backdrop-blur"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-3xl grid-cols-[1fr_2fr] gap-2">
          <button
            className="min-h-12 rounded-lg border border-white/15 bg-slate-900 px-4 text-base font-bold text-white"
            onClick={() => {
              setIndex((i) => Math.max(i - 1, 0));
              window.scrollTo({ top: 0 });
            }}
            type="button"
          >
            前へ
          </button>
          <button
            className="min-h-12 rounded-lg bg-white px-4 text-base font-bold text-slate-950"
            onClick={() => {
              setIndex((i) => Math.min(i + 1, questions.length - 1));
              window.scrollTo({ top: 0 });
            }}
            type="button"
          >
            次へ
          </button>
        </div>
      </nav>
    </div>
  );
}
