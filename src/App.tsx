import { useMemo, useRef, useState } from "react";
import {
  takkenExams,
  takkenQuestions,
  type TakkenQuestion,
} from "./data/questions";
import { passLine, studyOrder, studyOrderByCategory } from "./data/studyGuide";

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
const DAILY_TARGET = 10;

const localDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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
      answers:
        parsed.answers && typeof parsed.answers === "object"
          ? parsed.answers
          : {},
      notes:
        parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
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
  // 学習導線（おすすめ順）モード: 合格者の鉄則順に未回答→間違いを優先出題する。
  const [studyMode, setStudyMode] = useState(false);
  const feedbackRef = useRef<HTMLElement | null>(null);
  // 「次へ」で問題本体（カード）の先頭まで自動スクロールするための参照。
  const questionRef = useRef<HTMLElement | null>(null);

  const categories = useMemo(() => {
    return Array.from(
      new Set(takkenQuestions.map((question) => question.category)),
    );
  }, []);

  const filteredQuestions = useMemo(() => {
    const filtered = takkenQuestions.filter((question) => {
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

    if (!studyMode) {
      return filtered;
    }

    // 学習導線モード: 合格者の鉄則順（科目）に並べる。
    // 並び順は回答状況に依存させず安定させ、「次へ」で宅建業法→権利関係→…と
    // 科目ごとに通しで演習できるようにする（弱点の進捗はボードで可視化）。
    return [...filtered].sort((a, b) => {
      const orderDiff =
        studyOrderByCategory(a.category) - studyOrderByCategory(b.category);
      if (orderDiff !== 0) return orderDiff;

      // 同科目内は年度（新しい順）→ 問番号で安定ソート。
      if (a.examId !== b.examId) return a.examId < b.examId ? 1 : -1;
      return a.number - b.number;
    });
  }, [categoryFilter, examFilter, progress.answers, statusFilter, studyMode]);

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
  const totalCorrect = Object.values(progress.answers).filter(
    (answer) => answer.correct,
  ).length;
  const totalWrong = Object.values(progress.answers).filter(
    (answer) => !answer.correct,
  ).length;
  const todayKey = localDateKey(new Date());
  const todayAnswered = Object.values(progress.answers).filter(
    (answer) => localDateKey(new Date(answer.answeredAt)) === todayKey,
  ).length;
  const accuracy = totalAnswered
    ? Math.round((totalCorrect / totalAnswered) * 100)
    : 0;
  const completion = Math.round((totalAnswered / takkenQuestions.length) * 100);

  // 科目別の得点ダッシュボード: 各科目の正答率を出し、1回分の試験(満点)に
  // 換算した「想定得点」を出して、目標点・合格ラインまであと何点かを可視化する。
  const categoryStats = useMemo(() => {
    return studyOrder.map((cat) => {
      const inCategory = takkenQuestions.filter(
        (q) => q.category === cat.category,
      );
      const answered = inCategory.filter((q) => progress.answers[q.id]);
      const correct = answered.filter((q) => progress.answers[q.id]?.correct);
      const rate = answered.length ? correct.length / answered.length : 0;
      // 正答率を本番1回分の満点に換算した想定得点。
      const projected = Math.round(rate * cat.fullMarks);

      return {
        ...cat,
        answeredCount: answered.length,
        totalCount: inCategory.length,
        ratePercent: Math.round(rate * 100),
        projectedScore: answered.length ? projected : null,
      };
    });
  }, [progress.answers]);

  // 全科目の想定得点合計（未着手の科目は0点扱い）と、合格ラインまでの差。
  const projectedTotal = categoryStats.reduce(
    (sum, c) => sum + (c.projectedScore ?? 0),
    0,
  );
  const gapToSafe = passLine.safe - projectedTotal;

  const updateProgress = (
    updater: (previous: ProgressState) => ProgressState,
  ) => {
    setProgress((previous) => {
      const next = updater(previous);
      saveProgress(next);
      return next;
    });
  };

  const goToQuestion = (
    questionId: string,
    scrollTarget: "top" | "question" = "top",
  ) => {
    updateProgress((previous) => ({ ...previous, currentId: questionId }));

    if (scrollTarget === "question") {
      // 「次へ」: 問題本体（カード）の先頭まで戻す。ヘッダーやボードが縦に長いため
      // ページ最上部(top:0)に戻すだけでは問題が画面外に残ってしまう。
      //
      // 重要: behavior は "smooth" にしない。解答時(answerQuestion)に発火した
      // フィードバック欄への smooth スクロールが進行中だと、後発の smooth スクロールと
      // 競合して上に戻らないことがある（特に下側の選択肢で解答した場合は移動距離が
      // 大きく顕著）。即時スクロール(既定の "auto")なら進行中の smooth を確実に上書きする。
      // 状態更新→再描画後の正しい座標へ飛ぶため requestAnimationFrame で実行。
      window.requestAnimationFrame(() => {
        questionRef.current?.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  const findFirstQuestion = (status: string) => {
    return takkenQuestions.find((question) => {
      const record = progress.answers[question.id];

      if (examFilter !== ALL && question.examId !== examFilter) {
        return false;
      }

      if (categoryFilter !== ALL && question.category !== categoryFilter) {
        return false;
      }

      if (status === UNANSWERED) {
        return !record;
      }

      if (status === WRONG) {
        return Boolean(record && !record.correct);
      }

      return true;
    });
  };

  const applyStatusShortcut = (status: string) => {
    setStatusFilter(status);
    const first = findFirstQuestion(status);

    if (first) {
      goToQuestion(first.id);
    }
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

    window.setTimeout(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
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
      filteredQuestions[
        (Math.max(currentIndex, 0) + 1) % filteredQuestions.length
      ];
    goToQuestion(nextQuestion.id, "question");
  };

  const goRandom = () => {
    const pool = filteredQuestions.length ? filteredQuestions : takkenQuestions;
    const randomQuestion = pool[Math.floor(Math.random() * pool.length)];

    if (randomQuestion) {
      goToQuestion(randomQuestion.id);
    }
  };

  const resetProgress = () => {
    const shouldReset = window.confirm(
      "回答履歴とメモを初期化します。よろしいですか？",
    );

    if (!shouldReset) {
      return;
    }

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
      <header className="border-b border-white/10 bg-[#0F1117] px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-cyan-200">
                今日 {Math.min(todayAnswered, DAILY_TARGET)}/{DAILY_TARGET} /
                正答率 {accuracy}%
              </p>
              <h1 className="text-xl font-bold tracking-normal text-white">
                宅建過去問ドリル
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-pressed={studyMode}
                className={`min-h-11 rounded-lg border px-3 text-sm font-bold transition ${
                  studyMode
                    ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                    : "border-white/15 bg-slate-900 text-white"
                }`}
                onClick={() => {
                  const next = !studyMode;
                  setStudyMode(next);
                  // 学習導線ONにしたら、おすすめ順の先頭（業法の未回答）から始める。
                  if (next) {
                    setTimeout(() => {
                      const firstByOrder = [...takkenQuestions]
                        .filter((q) =>
                          examFilter === ALL ? true : q.examId === examFilter,
                        )
                        .sort(
                          (a, b) =>
                            studyOrderByCategory(a.category) -
                            studyOrderByCategory(b.category),
                        )
                        .find((q) => !progress.answers[q.id]);
                      if (firstByOrder) goToQuestion(firstByOrder.id);
                    }, 0);
                  }
                }}
                type="button"
              >
                おすすめ順
              </button>
              <button
                className="min-h-11 rounded-lg border border-white/15 bg-slate-900 px-3 text-sm font-bold text-white"
                onClick={goRandom}
                type="button"
              >
                ランダム
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <select
              className="min-h-11 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm text-white"
              onChange={(event) => {
                setExamFilter(event.target.value);
                setTimeout(() => {
                  const first = takkenQuestions.find((question) =>
                    event.target.value === ALL
                      ? true
                      : question.examId === event.target.value,
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

          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-cyan-300"
              style={{ width: `${completion}%` }}
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              className="min-h-10 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm font-bold text-white"
              onClick={() => applyStatusShortcut(UNANSWERED)}
              type="button"
            >
              未回答
            </button>
            <button
              className="min-h-10 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm font-bold text-white"
              onClick={() => applyStatusShortcut(WRONG)}
              type="button"
            >
              間違い {totalWrong}
            </button>
            <button
              className="min-h-10 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm font-bold text-white"
              onClick={() => applyStatusShortcut(ALL)}
              type="button"
            >
              全問
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-10 pt-5">
        <section className="mb-4 rounded-lg border border-white/10 bg-slate-950 p-3">
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-lg bg-slate-900 p-2">
              <p className="font-bold text-white">{totalAnswered}/250</p>
              <p className="text-slate-400">回答済み</p>
            </div>
            <div className="rounded-lg bg-slate-900 p-2">
              <p className="font-bold text-white">{completion}%</p>
              <p className="text-slate-400">進捗</p>
            </div>
            <div className="rounded-lg bg-slate-900 p-2">
              <p className="font-bold text-white">{todayAnswered}</p>
              <p className="text-slate-400">今日</p>
            </div>
          </div>
        </section>

        <section className="mb-4 rounded-lg border border-white/10 bg-slate-950 p-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-white">合格作戦ボード</h2>
            <span className="text-sm text-slate-400">
              想定 {projectedTotal}/{passLine.fullMarks}点
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            正答率を本番1回（50問）に換算した想定得点です。合格ラインは過去10年で
            33〜38点（平均35.5点）。安全圏 {passLine.safe}点を狙います。
          </p>
          <div
            className={`mt-2 rounded-lg border px-3 py-2 text-sm font-bold ${
              projectedTotal >= passLine.safe
                ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
                : "border-amber-200/30 bg-amber-200/10 text-amber-100"
            }`}
          >
            {projectedTotal >= passLine.safe
              ? `安全圏到達。想定${projectedTotal}点で合格ラインを越えています。`
              : `安全圏（${passLine.safe}点）まであと ${gapToSafe} 点。`}
          </div>

          <div className="mt-3 space-y-2">
            {categoryStats.map((cat) => {
              const reached =
                cat.projectedScore !== null &&
                cat.projectedScore >= cat.targetScore;
              const barPercent = Math.min(
                100,
                Math.round(((cat.projectedScore ?? 0) / cat.targetScore) * 100),
              );

              return (
                <div
                  className="rounded-lg bg-slate-900 px-3 py-2"
                  key={cat.category}
                  title={cat.rationale}
                >
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-bold text-white">
                      {cat.order}. {cat.category}
                    </span>
                    <span
                      className={
                        reached ? "text-emerald-200" : "text-slate-300"
                      }
                    >
                      想定 {cat.projectedScore ?? "—"}/{cat.fullMarks}点
                      <span className="text-slate-500">
                        （目標{cat.targetScore}）
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-slate-800">
                    <div
                      className={`h-1.5 rounded-full ${
                        reached ? "bg-emerald-300" : "bg-cyan-300"
                      }`}
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {cat.answeredCount > 0
                      ? `正答率${cat.ratePercent}%・${cat.answeredCount}/${cat.totalCount}問演習`
                      : "未着手"}
                    {" — "}
                    {cat.rationale}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          ref={questionRef}
          className="scroll-mt-3 rounded-lg border border-white/10 bg-slate-950 shadow-2xl shadow-black/20"
        >
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
                ref={feedbackRef}
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
                  <p className="text-sm font-bold text-cyan-100">
                    解答解説（公式根拠）
                  </p>
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
                    <div className="mt-3 rounded-lg border border-amber-200/20 bg-amber-200/10 p-3">
                      <p className="text-sm font-bold text-amber-100">
                        AI補足メモ
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        {currentQuestion.aiExplanation}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      詳細な法律理由は、公開されている外部解説ページで確認できます。本文は転載せず、出典ページに直接リンクしています。
                    </p>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <a
                    className="flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-slate-900 px-3 text-center text-sm font-bold text-cyan-100"
                    href={currentQuestion.externalExplanationUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    外部詳細
                  </a>
                  <button
                    className="min-h-12 rounded-lg bg-white px-4 text-base font-bold text-slate-950"
                    onClick={goNext}
                    type="button"
                  >
                    次へ
                  </button>
                </div>
              </section>
            ) : null}

            <label className="block">
              <span className="text-base font-bold text-slate-100">
                自分メモ
              </span>
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
