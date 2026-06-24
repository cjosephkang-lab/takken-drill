import { useMemo, useState } from "react";
import { takkenExams, takkenQuestions, type TakkenQuestion } from "./data/questions";

type AnswerRecord = {
  selected: number;
  correct: boolean;
  answeredAt: string;
};

type ProgressState = {
  answers: Record<string, AnswerRecord>;
  notes: Record<string, string>;
  currentId: string;
};

const STORAGE_KEY = "takken-drill.progress.v1";
const ALL = "all";
const UNANSWERED = "unanswered";
const WRONG = "wrong";

const loadProgress = (): ProgressState => {
  const fallback: ProgressState = {
    answers: {},
    notes: {},
    currentId: takkenQuestions[0]?.id ?? "",
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const validIds = new Set(takkenQuestions.map((question) => question.id));
    const currentId =
      typeof parsed.currentId === "string" && validIds.has(parsed.currentId)
        ? parsed.currentId
        : fallback.currentId;

    return {
      answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
      notes: parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
      currentId,
    };
  } catch (error) {
    console.error("Failed to load progress.", error);
    return fallback;
  }
};

const saveProgress = (progress: ProgressState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress.", error);
  }
};

const formatChoices = (choices: number[]) => choices.join(" / ");

const resultText = (question: TakkenQuestion) => {
  if (question.isAllCorrect) {
    return "全員正解扱い";
  }

  if (question.correctChoices.length > 1) {
    return `複数正解: ${formatChoices(question.correctChoices)}`;
  }

  return `正解: ${question.correctChoices[0]}`;
};

type ChoiceButtonsProps = {
  question: TakkenQuestion;
  answer?: AnswerRecord;
  onAnswer: (choice: number) => void;
};

function ChoiceButtons({ question, answer, onAnswer }: ChoiceButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((choice) => {
        const selected = answer?.selected === choice;
        const correct = question.correctChoices.includes(choice);
        const answered = Boolean(answer);

        return (
          <button
            className={`min-h-14 rounded-lg border text-xl font-bold transition ${
              answered && correct
                ? "border-emerald-300 bg-emerald-300/20 text-emerald-100"
                : answered && selected
                  ? "border-rose-300 bg-rose-300/20 text-rose-100"
                  : "border-white/10 bg-slate-900 text-white"
            }`}
            key={choice}
            onClick={() => onAnswer(choice)}
            type="button"
          >
            {choice}
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [examFilter, setExamFilter] = useState(ALL);
  const [categoryFilter, setCategoryFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);

  const categories = useMemo(() => {
    return Array.from(new Set(takkenQuestions.map((question) => question.category)));
  }, []);

  const filteredQuestions = useMemo(() => {
    return takkenQuestions.filter((question) => {
      const record = progress.answers[question.id];

      if (examFilter !== ALL && question.examId !== examFilter) {
        return false;
      }

      if (categoryFilter !== ALL && question.category !== categoryFilter) {
        return false;
      }

      if (statusFilter === UNANSWERED && record) {
        return false;
      }

      if (statusFilter === WRONG && (!record || record.correct)) {
        return false;
      }

      return true;
    });
  }, [categoryFilter, examFilter, progress.answers, statusFilter]);

  const currentQuestion =
    filteredQuestions.find((question) => question.id === progress.currentId) ??
    filteredQuestions[0] ??
    takkenQuestions[0];
  const currentIndex = filteredQuestions.findIndex(
    (question) => question.id === currentQuestion.id,
  );
  const currentAnswer = progress.answers[currentQuestion.id];
  const currentNote = progress.notes[currentQuestion.id] ?? "";
  const totalAnswered = Object.keys(progress.answers).length;
  const totalCorrect = Object.values(progress.answers).filter((answer) => answer.correct).length;
  const accuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const updateProgress = (updater: (previous: ProgressState) => ProgressState) => {
    setProgress((previous) => {
      const next = updater(previous);
      saveProgress(next);
      return next;
    });
  };

  const goToQuestion = (questionId: string) => {
    updateProgress((previous) => ({ ...previous, currentId: questionId }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answerQuestion = (choice: number) => {
    const correct = currentQuestion.correctChoices.includes(choice);

    updateProgress((previous) => ({
      ...previous,
      answers: {
        ...previous.answers,
        [currentQuestion.id]: {
          selected: choice,
          correct,
          answeredAt: new Date().toISOString(),
        },
      },
      currentId: currentQuestion.id,
    }));
  };

  const saveNote = (value: string) => {
    updateProgress((previous) => ({
      ...previous,
      notes: {
        ...previous.notes,
        [currentQuestion.id]: value,
      },
    }));
  };

  const goNext = () => {
    if (!filteredQuestions.length) {
      return;
    }

    const nextQuestion =
      filteredQuestions[(Math.max(currentIndex, 0) + 1) % filteredQuestions.length];
    goToQuestion(nextQuestion.id);
  };

  const goRandom = () => {
    const pool = filteredQuestions.length ? filteredQuestions : takkenQuestions;
    const randomQuestion = pool[Math.floor(Math.random() * pool.length)];

    if (randomQuestion) {
      goToQuestion(randomQuestion.id);
    }
  };

  const resetProgress = () => {
    const next: ProgressState = {
      answers: {},
      notes: {},
      currentId: takkenQuestions[0]?.id ?? "",
    };
    setProgress(next);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0F1117]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-cyan-200">
                {totalAnswered}/250 回答済み / 正答率 {accuracy}%
              </p>
              <h1 className="text-xl font-bold tracking-normal text-white">
                宅建過去問ドリル
              </h1>
            </div>
            <button
              className="min-h-11 rounded-lg border border-white/15 bg-slate-900 px-3 text-sm font-bold text-white"
              onClick={goRandom}
              type="button"
            >
              ランダム
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <select
              className="min-h-11 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm text-white"
              onChange={(event) => {
                setExamFilter(event.target.value);
                setTimeout(() => {
                  const first = takkenQuestions.find((question) =>
                    event.target.value === ALL ? true : question.examId === event.target.value,
                  );
                  if (first) goToQuestion(first.id);
                }, 0);
              }}
              value={examFilter}
            >
              <option value={ALL}>全年度</option>
              {takkenExams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.year}
                </option>
              ))}
            </select>

            <select
              className="min-h-11 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm text-white"
              onChange={(event) => setCategoryFilter(event.target.value)}
              value={categoryFilter}
            >
              <option value={ALL}>全分野</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              className="min-h-11 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm text-white"
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option value={ALL}>全状態</option>
              <option value={UNANSWERED}>未回答</option>
              <option value={WRONG}>間違い</option>
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-10 pt-5">
        <section className="rounded-lg border border-white/10 bg-slate-950 shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-sm font-bold text-cyan-100">
                {currentQuestion.year}
              </span>
              <span className="rounded-md border border-amber-200/30 bg-amber-200/10 px-2.5 py-1 text-sm font-bold text-amber-100">
                問{currentQuestion.number}
              </span>
              <span className="rounded-md border border-white/10 bg-[#0F1117] px-2.5 py-1 text-sm font-bold text-slate-200">
                {currentQuestion.category}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-400">
              <span>
                表示 {filteredQuestions.length ? currentIndex + 1 : 0}/
                {filteredQuestions.length}
              </span>
              <a
                className="min-h-11 rounded-lg border border-white/15 px-3 py-2 font-bold text-cyan-100"
                href={currentQuestion.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                公式PDF
              </a>
            </div>
          </div>

          <div className="space-y-5 p-4">
            <ChoiceButtons
              answer={currentAnswer}
              onAnswer={answerQuestion}
              question={currentQuestion}
            />

            <div className="whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-[#111827] p-4 text-base leading-7 text-slate-100">
              {currentQuestion.questionText}
            </div>

            <ChoiceButtons
              answer={currentAnswer}
              onAnswer={answerQuestion}
              question={currentQuestion}
            />

            {currentAnswer ? (
              <section
                className={`rounded-lg border p-4 ${
                  currentAnswer.correct
                    ? "border-emerald-300/40 bg-emerald-300/10"
                    : "border-rose-300/40 bg-rose-300/10"
                }`}
              >
                <p className="text-base font-bold">
                  {currentAnswer.correct ? "正解" : "不正解"}
                </p>
                <p className="mt-1 text-base leading-7 text-slate-100">
                  {resultText(currentQuestion)}
                </p>
                <div className="mt-3 rounded-lg border border-white/10 bg-[#0F1117] p-3">
                  <p className="text-sm font-bold text-cyan-100">解答解説（公式根拠）</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {currentQuestion.officialExplanation}
                  </p>
                  <a
                    className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-3 py-2 text-sm font-bold text-cyan-100"
                    href={currentQuestion.externalExplanationUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    詳細解説を開く（{currentQuestion.externalExplanationName}）
                  </a>
                  {currentQuestion.aiExplanation ? (
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {currentQuestion.aiExplanation}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      詳細な法律理由は、公開されている外部解説ページで確認できます。本文は転載せず、出典ページに直接リンクしています。
                    </p>
                  )}
                </div>
              </section>
            ) : null}

            <label className="block">
              <span className="text-base font-bold text-slate-100">自分メモ</span>
              <textarea
                className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-[#0F1117] p-3 text-base leading-7 text-white outline-none focus:border-cyan-200"
                onChange={(event) => saveNote(event.target.value)}
                placeholder="条文、間違えた理由、覚えることを自分用に書く"
                value={currentNote}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="min-h-12 rounded-lg border border-white/15 bg-slate-900 px-4 text-base font-bold text-white"
                onClick={resetProgress}
                type="button"
              >
                初期化
              </button>
              <button
                className="min-h-12 rounded-lg bg-white px-4 text-base font-bold text-slate-950"
                onClick={goNext}
                type="button"
              >
                次へ
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-lg border border-white/10 bg-slate-950 p-4">
          <h2 className="text-base font-bold text-white">収録データ</h2>
          <div className="mt-3 space-y-2">
            {takkenExams.map((exam) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg bg-slate-900 px-3 py-2 text-sm"
                key={exam.id}
              >
                <span>{exam.label}</span>
                <span className="text-slate-400">
                  {exam.extractedCount}/50 抽出
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
