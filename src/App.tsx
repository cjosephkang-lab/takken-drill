import { useEffect, useMemo, useRef, useState } from "react";
import type { User } from "firebase/auth";
import {
  takkenExams,
  takkenQuestions,
  type TakkenQuestion,
} from "./data/questions";
import { passLine, studyOrder, studyOrderByCategory } from "./data/studyGuide";
import { formatQuestionText } from "./lib/formatQuestionText";
import { MockExam, type MockRun } from "./MockExam";
import {
  fetchSyncedProgress,
  isSyncConfigured,
  pushSyncedProgress,
  signInWithGoogle,
  signOutUser,
  watchAuthUser,
} from "./firebase";

type AnswerRecord = {
  selected: number;
  correct: boolean;
  answeredAt: string;
  /** 連続正解数。間違えると0に戻る。MASTER_STREAK以上で「習得済み」扱い。 */
  streak: number;
  /** 累計挑戦回数。 */
  attempts: number;
  /** 累計不正解回数。 */
  lapses: number;
  /** 次に復習すべき日時（間隔反復）。この日時を過ぎると「復習期限」に入る。 */
  nextReviewAt: string;
};

/** 1日ごとの学習量。ストリーク・カレンダー・今日のミッションの進捗に使う。 */
type DayLog = {
  answered: number;
  correct: number;
};

type ProgressState = {
  answers: Record<string, AnswerRecord>;
  notes: Record<string, string>;
  currentId: string;
  dailyLog: Record<string, DayLog>;
};

type UiSettings = {
  examFilter: string;
  categoryFilter: string;
  statusFilter: string;
  studyMode: boolean;
  boardOpen: boolean;
  questionPickerOpen: boolean;
  /** 本試験の日付（YYYY-MM-DD）。逆算ペースとカウントダウンに使う。 */
  examDate: string;
};

const STORAGE_KEY = "takken-drill.progress.v1";
const SETTINGS_KEY = "takken-drill.settings.v1";
const ALL = "all";
const UNANSWERED = "unanswered";
const WRONG = "wrong";
const DUE = "due";
const DAILY_TARGET = 10;
/** この回数連続で正解したら「習得済み」とみなす。 */
const MASTER_STREAK = 2;
/** 宅建試験は例年10月の第3日曜。2026年は10月18日。 */
const DEFAULT_EXAM_DATE = "2026-10-18";
/** 1日のミッション問題数の上限（詰め込みすぎ防止）。 */
const MISSION_CAP = 50;

const localDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 間隔反復の復習間隔。間違えたら翌日、正解を重ねるほど間隔を広げて、
// 忘れかけた頃に再出題する。
const reviewIntervalDays = (streak: number) => {
  if (streak <= 0) return 1;
  if (streak === 1) return 2;
  if (streak === 2) return 7;
  if (streak === 3) return 14;
  return 30;
};

const addDays = (iso: string, days: number) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// 旧形式（間隔反復フィールドなし）の回答レコードを読み込み時に補完する。
const normalizeAnswer = (record: AnswerRecord): AnswerRecord => {
  if (typeof record.streak === "number" && record.nextReviewAt) {
    return record;
  }

  const streak = record.correct ? 1 : 0;

  return {
    ...record,
    streak,
    attempts: 1,
    lapses: record.correct ? 0 : 1,
    nextReviewAt: addDays(record.answeredAt, reviewIntervalDays(streak)),
  };
};

const isDueRecord = (record?: AnswerRecord) =>
  Boolean(record && record.nextReviewAt <= new Date().toISOString());

// 通常ドリルと模試の両方で使う、回答1件ぶんの間隔反復レコード更新。
const buildAnswerRecord = (
  previous: AnswerRecord | undefined,
  selected: number,
  correct: boolean,
  answeredAt: string,
): AnswerRecord => {
  const streak = correct ? (previous?.streak ?? 0) + 1 : 0;

  return {
    selected,
    correct,
    answeredAt,
    streak,
    attempts: (previous?.attempts ?? 0) + 1,
    lapses: (previous?.lapses ?? 0) + (correct ? 0 : 1),
    nextReviewAt: addDays(answeredAt, reviewIntervalDays(streak)),
  };
};

// 日次ログに回答を加算する（今日のミッション・ストリーク・カレンダーの元データ）。
const addToDailyLog = (
  log: Record<string, DayLog>,
  count: number,
  correctCount: number,
): Record<string, DayLog> => {
  const key = localDateKey(new Date());
  const day = log[key] ?? { answered: 0, correct: 0 };

  return {
    ...log,
    [key]: {
      answered: day.answered + count,
      correct: day.correct + correctCount,
    },
  };
};

// 旧形式（dailyLogなし）からの移行: 手元にある最新回答の日時から近似的に日次ログを再構成する。
const seedDailyLog = (
  answers: Record<string, AnswerRecord>,
): Record<string, DayLog> => {
  const log: Record<string, DayLog> = {};

  for (const record of Object.values(answers)) {
    const key = localDateKey(new Date(record.answeredAt));
    const day = log[key] ?? { answered: 0, correct: 0 };
    day.answered += 1;
    if (record.correct) day.correct += 1;
    log[key] = day;
  }

  return log;
};

const loadProgress = (): ProgressState => {
  const fallback: ProgressState = {
    answers: {},
    notes: {},
    currentId: takkenQuestions[0]?.id ?? "",
    dailyLog: {},
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

    const rawAnswers =
      parsed.answers && typeof parsed.answers === "object"
        ? parsed.answers
        : {};
    const answers: Record<string, AnswerRecord> = {};

    for (const [id, record] of Object.entries(rawAnswers)) {
      answers[id] = normalizeAnswer(record);
    }

    return {
      answers,
      notes:
        parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
      currentId,
      dailyLog:
        parsed.dailyLog && typeof parsed.dailyLog === "object"
          ? parsed.dailyLog
          : seedDailyLog(answers),
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

// 端末間マージ: 問題ごとに answeredAt が新しい方を採用する。
// メモは空でない方を優先し、両方にあればローカル優先（直前の入力を失わないため）。
const mergeProgress = (
  local: ProgressState,
  remote: {
    answers: Record<string, AnswerRecord>;
    notes: Record<string, string>;
    dailyLog: Record<string, DayLog>;
  },
): ProgressState => {
  const answers: Record<string, AnswerRecord> = { ...remote.answers };

  for (const [id, record] of Object.entries(local.answers)) {
    const remoteRecord = answers[id];
    if (!remoteRecord || record.answeredAt >= remoteRecord.answeredAt) {
      answers[id] = record;
    }
  }

  const notes: Record<string, string> = { ...remote.notes };

  for (const [id, note] of Object.entries(local.notes)) {
    if (note) {
      notes[id] = note;
    }
  }

  // 日次ログは日付ごとに大きい方を採用（同じ端末の履歴が二重計上されるのを防ぐ）。
  const dailyLog: Record<string, DayLog> = { ...remote.dailyLog };

  for (const [key, day] of Object.entries(local.dailyLog)) {
    const remoteDay = dailyLog[key];
    if (!remoteDay || day.answered >= remoteDay.answered) {
      dailyLog[key] = day;
    }
  }

  return { ...local, answers, notes, dailyLog };
};

const allCategories = Array.from(
  new Set(takkenQuestions.map((question) => question.category)),
);
const validExamIds = new Set(takkenExams.map((exam) => exam.id));

const loadSettings = (): UiSettings => {
  const fallback: UiSettings = {
    examFilter: ALL,
    categoryFilter: ALL,
    statusFilter: ALL,
    studyMode: false,
    boardOpen: false,
    questionPickerOpen: false,
    examDate: DEFAULT_EXAM_DATE,
  };

  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as Partial<UiSettings>;

    return {
      examFilter:
        typeof parsed.examFilter === "string" &&
        (parsed.examFilter === ALL || validExamIds.has(parsed.examFilter))
          ? parsed.examFilter
          : ALL,
      categoryFilter:
        typeof parsed.categoryFilter === "string" &&
        (parsed.categoryFilter === ALL ||
          allCategories.includes(parsed.categoryFilter))
          ? parsed.categoryFilter
          : ALL,
      statusFilter:
        parsed.statusFilter === UNANSWERED ||
        parsed.statusFilter === WRONG ||
        parsed.statusFilter === DUE
          ? parsed.statusFilter
          : ALL,
      studyMode: parsed.studyMode === true,
      boardOpen: parsed.boardOpen === true,
      questionPickerOpen: parsed.questionPickerOpen === true,
      examDate:
        typeof parsed.examDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(parsed.examDate)
          ? parsed.examDate
          : DEFAULT_EXAM_DATE,
    };
  } catch (error) {
    console.error("Failed to load settings.", error);
    return fallback;
  }
};

const saveSettings = (settings: UiSettings) => {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings.", error);
  }
};

const initialSettings = loadSettings();

const MOCK_KEY = "takken-drill.mock.v1";

const loadMockRun = (): MockRun | null => {
  try {
    const raw = window.localStorage.getItem(MOCK_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<MockRun>;
    if (
      typeof parsed.examId !== "string" ||
      typeof parsed.startedAt !== "string" ||
      !parsed.answers ||
      typeof parsed.answers !== "object"
    ) {
      return null;
    }
    return parsed as MockRun;
  } catch (error) {
    console.error("Failed to load mock run.", error);
    return null;
  }
};

const saveMockRun = (run: MockRun | null) => {
  try {
    if (run) {
      window.localStorage.setItem(MOCK_KEY, JSON.stringify(run));
    } else {
      window.localStorage.removeItem(MOCK_KEY);
    }
  } catch (error) {
    console.error("Failed to save mock run.", error);
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
  const [examFilter, setExamFilter] = useState(initialSettings.examFilter);
  const [categoryFilter, setCategoryFilter] = useState(
    initialSettings.categoryFilter,
  );
  const [statusFilter, setStatusFilter] = useState(
    initialSettings.statusFilter,
  );
  // 学習導線（おすすめ順）モード: 合格者の鉄則順に復習期限→未回答を優先出題する。
  const [studyMode, setStudyMode] = useState(initialSettings.studyMode);
  const [boardOpen, setBoardOpen] = useState(initialSettings.boardOpen);
  const [questionPickerOpen, setQuestionPickerOpen] = useState(
    initialSettings.questionPickerOpen,
  );
  const [examDate, setExamDate] = useState(initialSettings.examDate);
  // この起動中に解いた問題の回答。過去の回答は画面に出さないので、
  // 再訪時は毎回「思い出して解く」テスト形式になる（想起練習）。
  const [sessionAnswers, setSessionAnswers] = useState<
    Record<string, AnswerRecord>
  >({});
  const feedbackRef = useRef<HTMLElement | null>(null);
  // 「次へ」で問題本体（カード）の先頭まで自動スクロールするための参照。
  const questionRef = useRef<HTMLElement | null>(null);

  // 模試モード。進行中はlocalStorageに保存され、リロードしても再開できる。
  const [mockRun, setMockRun] = useState<MockRun | null>(() => loadMockRun());
  const [mockPicker, setMockPicker] = useState(false);

  // Firebase同期（ログイン時のみ）。未ログインは従来通りlocalStorageのみで動く。
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(isSyncConfigured);
  const [syncState, setSyncState] = useState<
    "idle" | "syncing" | "synced" | "error"
  >("idle");

  useEffect(() => {
    saveSettings({
      examFilter,
      categoryFilter,
      statusFilter,
      studyMode,
      boardOpen,
      questionPickerOpen,
      examDate,
    });
  }, [
    boardOpen,
    categoryFilter,
    examDate,
    examFilter,
    questionPickerOpen,
    statusFilter,
    studyMode,
  ]);

  // ログイン状態を監視し、ログインしたらリモートの記録とローカルをマージして取り込む。
  useEffect(() => {
    const unsubscribe = watchAuthUser((user) => {
      setAuthUser(user);
      setAuthLoading(false);

      if (!user) {
        return;
      }

      setSyncState("syncing");
      fetchSyncedProgress(user.uid)
        .then((remote) => {
          if (!remote) {
            setSyncState("synced");
            return;
          }

          setProgress((local) => {
            const merged = mergeProgress(local, {
              answers: remote.answers as Record<string, AnswerRecord>,
              notes: remote.notes,
              dailyLog: remote.dailyLog ?? {},
            });
            saveProgress(merged);
            return merged;
          });
          setSyncState("synced");
        })
        .catch((error) => {
          console.error("Failed to fetch synced progress.", error);
          setSyncState("error");
        });
    });

    return unsubscribe;
  }, []);

  // ログイン中は、回答・メモが変わるたびにFirestoreへ反映する。
  useEffect(() => {
    if (!authUser) {
      return;
    }

    setSyncState("syncing");
    pushSyncedProgress(authUser.uid, {
      answers: progress.answers,
      notes: progress.notes,
      dailyLog: progress.dailyLog,
      updatedAt: new Date().toISOString(),
    })
      .then(() => setSyncState("synced"))
      .catch((error) => {
        console.error("Failed to push synced progress.", error);
        setSyncState("error");
      });
  }, [authUser, progress.answers, progress.notes, progress.dailyLog]);

  const categories = allCategories;

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

      if (statusFilter === DUE && !isDueRecord(record)) {
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
  const storedAnswer = progress.answers[currentQuestion.id];
  const currentAnswer = sessionAnswers[currentQuestion.id];
  const currentNote = progress.notes[currentQuestion.id] ?? "";
  const totalAnswered = Object.keys(progress.answers).length;
  const totalCorrect = Object.values(progress.answers).filter(
    (answer) => answer.correct,
  ).length;
  const totalMastered = Object.values(progress.answers).filter(
    (answer) => answer.streak >= MASTER_STREAK,
  ).length;
  const dueCount = takkenQuestions.filter((question) =>
    isDueRecord(progress.answers[question.id]),
  ).length;
  const todayKey = localDateKey(new Date());
  const todayLog = progress.dailyLog[todayKey] ?? { answered: 0, correct: 0 };
  const todayAnswered = todayLog.answered;
  const todayAccuracy = todayLog.answered
    ? Math.round((todayLog.correct / todayLog.answered) * 100)
    : 0;
  const accuracy = totalAnswered
    ? Math.round((totalCorrect / totalAnswered) * 100)
    : 0;

  // 連続学習日数（ストリーク）。今日まだ解いていなければ昨日までの連続を表示する
  // （その日のうちに解けば途切れない）。
  const streakDays = useMemo(() => {
    const cursor = new Date();
    if (!(progress.dailyLog[localDateKey(cursor)]?.answered ?? 0)) {
      cursor.setDate(cursor.getDate() - 1);
    }

    let days = 0;
    while ((progress.dailyLog[localDateKey(cursor)]?.answered ?? 0) > 0) {
      days += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return days;
  }, [progress.dailyLog]);

  // 試験日カウントダウンと逆算ペース。
  // 「未回答は2回・回答済みで未習得は1回解く必要がある」という近似で
  // 残りの回答回数を見積もり、残り日数で割って1日あたりの必要問題数を出す。
  const daysToExam = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(`${examDate}T00:00:00`);
    return Math.ceil((exam.getTime() - today.getTime()) / 86400000);
  }, [examDate]);
  const remainingEvents =
    (takkenQuestions.length - totalAnswered) * 2 +
    (totalAnswered - totalMastered);
  const paceNeeded =
    daysToExam > 0 ? Math.ceil(remainingEvents / daysToExam) : remainingEvents;

  // 今日のミッション: 逆算ペースと最低ノルマ（10問）の大きい方。上限50問。
  const missionTarget = Math.min(
    MISSION_CAP,
    Math.max(DAILY_TARGET, paceNeeded),
  );
  const missionDone = todayAnswered >= missionTarget;
  const missionRemaining = Math.max(0, missionTarget - todayAnswered);
  const missionReviewPart = Math.min(dueCount, missionRemaining);
  const missionNewPart = missionRemaining - missionReviewPart;
  const missionPercent = Math.min(
    100,
    Math.round((todayAnswered / missionTarget) * 100),
  );

  // 学習カレンダー: 直近12週（今日を含む週まで、日曜始まり）。
  const calendarDays = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 83);
    start.setDate(start.getDate() - start.getDay()); // 直前の日曜まで戻す

    const days: { key: string; count: number }[] = [];
    const cursor = new Date(start);
    const endKey = localDateKey(new Date());

    while (true) {
      const key = localDateKey(cursor);
      days.push({ key, count: progress.dailyLog[key]?.answered ?? 0 });
      if (key === endKey) break;
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }, [progress.dailyLog]);

  // 科目別の得点ダッシュボード: 各科目の正答率を出し、1回分の試験(満点)に
  // 換算した「想定得点」を出して、目標点・合格ラインまであと何点かを可視化する。
  const categoryStats = useMemo(() => {
    return studyOrder.map((cat) => {
      const inCategory = takkenQuestions.filter(
        (q) => q.category === cat.category,
      );
      const answered = inCategory.filter((q) => progress.answers[q.id]);
      const correct = answered.filter((q) => progress.answers[q.id]?.correct);
      const mastered = inCategory.filter(
        (q) => (progress.answers[q.id]?.streak ?? 0) >= MASTER_STREAK,
      );
      const rate = answered.length ? correct.length / answered.length : 0;
      // 正答率を本番1回分の満点に換算した想定得点。
      const projected = Math.round(rate * cat.fullMarks);

      return {
        ...cat,
        answeredCount: answered.length,
        masteredCount: mastered.length,
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

  // 今日のミッション開始: フィルタを解除しておすすめ順モードに入り、
  // 復習期限 → 未回答（合格者の鉄則順）の先頭から1タップで学習を始める。
  const startMission = () => {
    setExamFilter(ALL);
    setCategoryFilter(ALL);
    setStatusFilter(ALL);
    setStudyMode(true);

    const pool = [...takkenQuestions].sort(
      (a, b) =>
        studyOrderByCategory(a.category) - studyOrderByCategory(b.category),
    );
    const first =
      pool.find((q) => isDueRecord(progress.answers[q.id])) ??
      pool.find((q) => !progress.answers[q.id]) ??
      pool[0];

    if (first) {
      goToQuestion(first.id, "question");
    }
  };

  const answerQuestion = (choice: number) => {
    // この起動中に一度解いた問題は上書きしない
    // （正解を見た後にタップし直して成績が濁るのを防ぐ）。
    if (sessionAnswers[currentQuestion.id]) {
      return;
    }

    const correct = currentQuestion.correctChoices.includes(choice);
    const record = buildAnswerRecord(
      progress.answers[currentQuestion.id],
      choice,
      correct,
      new Date().toISOString(),
    );

    setSessionAnswers((prev) => ({ ...prev, [currentQuestion.id]: record }));
    updateProgress((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: record,
      },
      dailyLog: addToDailyLog(prev.dailyLog, 1, correct ? 1 : 0),
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

    if (studyMode) {
      // 学習効率優先: 復習期限が来ている問題 → 未回答の問題の順で出題する。
      // filteredQuestions は既におすすめ科目順に並んでいる。
      const due = filteredQuestions.find(
        (q) =>
          q.id !== currentQuestion.id && isDueRecord(progress.answers[q.id]),
      );
      if (due) {
        goToQuestion(due.id, "question");
        return;
      }

      const unanswered = filteredQuestions.find(
        (q) => q.id !== currentQuestion.id && !progress.answers[q.id],
      );
      if (unanswered) {
        goToQuestion(unanswered.id, "question");
        return;
      }
    }

    const nextQuestion =
      filteredQuestions[
        (Math.max(currentIndex, 0) + 1) % filteredQuestions.length
      ];
    goToQuestion(nextQuestion.id, "question");
  };

  const goPrev = () => {
    if (!filteredQuestions.length) {
      return;
    }

    const prevQuestion =
      filteredQuestions[
        (Math.max(currentIndex, 0) - 1 + filteredQuestions.length) %
          filteredQuestions.length
      ];
    goToQuestion(prevQuestion.id, "question");
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
      dailyLog: {},
    };
    setProgress(next);
    setSessionAnswers({});
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const startMock = (examId: string) => {
    const run: MockRun = {
      examId,
      startedAt: new Date().toISOString(),
      answers: {},
    };
    setMockRun(run);
    saveMockRun(run);
    setMockPicker(false);
    window.scrollTo({ top: 0 });
  };

  const changeMock = (run: MockRun) => {
    setMockRun(run);
    saveMockRun(run);
  };

  const abortMock = () => {
    setMockRun(null);
    saveMockRun(null);
  };

  // 模試の採点結果を学習記録へ反映する。回答した各問を通常ドリルと同じ
  // 間隔反復レコードとして記録し、日次ログにも加算する。
  const commitMock = (run: MockRun) => {
    const answeredAt = new Date().toISOString();
    const questionById = new Map(takkenQuestions.map((q) => [q.id, q]));

    updateProgress((prev) => {
      const answers = { ...prev.answers };
      let count = 0;
      let correctCount = 0;

      for (const [qid, choice] of Object.entries(run.answers)) {
        const question = questionById.get(qid);
        if (!question) continue;

        const correct =
          question.isAllCorrect || question.correctChoices.includes(choice);
        answers[qid] = buildAnswerRecord(
          answers[qid],
          choice,
          correct,
          answeredAt,
        );
        count += 1;
        if (correct) correctCount += 1;
      }

      return {
        ...prev,
        answers,
        dailyLog: addToDailyLog(prev.dailyLog, count, correctCount),
      };
    });

    setMockRun(null);
    saveMockRun(null);
    window.scrollTo({ top: 0 });
  };

  // 模試モード中は模試画面だけを表示する（リロードしても再開される）。
  const mockExam = mockRun
    ? takkenExams.find((exam) => exam.id === mockRun.examId)
    : undefined;
  if (mockRun && mockExam) {
    const mockQuestions = takkenQuestions
      .filter((question) => question.examId === mockRun.examId)
      .sort((a, b) => a.number - b.number);

    return (
      <MockExam
        exam={mockExam}
        onAbort={abortMock}
        onChange={changeMock}
        onCommit={commitMock}
        questions={mockQuestions}
        run={mockRun}
      />
    );
  }

  const examFilterLabel =
    examFilter === ALL
      ? "全年度"
      : (takkenExams.find((exam) => exam.id === examFilter)?.year ?? "全年度");
  const categoryFilterLabel =
    categoryFilter === ALL ? "全分野" : categoryFilter;
  const statusFilterLabel =
    statusFilter === UNANSWERED
      ? "未回答"
      : statusFilter === WRONG
        ? "間違い"
        : statusFilter === DUE
          ? "復習期限"
          : "全状態";
  const filterSummary = `${examFilterLabel} / ${categoryFilterLabel} / ${statusFilterLabel}`;

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100">
      <header className="border-b border-white/10 bg-[#0F1117] px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-cyan-200">
              連続 {streakDays}日 / 復習 {dueCount} / 試験まで
              {daysToExam > 0 ? `${daysToExam}日` : "—"}
            </p>
            <h1 className="text-xl font-bold tracking-normal text-white">
              宅建過去問ドリル
            </h1>
          </div>

          {isSyncConfigured ? (
            <div className="flex shrink-0 flex-col items-end gap-1 text-right text-xs text-slate-400">
              {authUser ? (
                <>
                  <span>
                    同期中
                    {syncState === "syncing" ? "…" : ""}
                    {syncState === "error" ? "（エラー）" : ""}
                  </span>
                  <button
                    className="min-h-8 rounded-md border border-white/15 px-2 text-xs font-bold text-slate-300"
                    onClick={() => signOutUser()}
                    type="button"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <button
                  className="min-h-8 rounded-md border border-cyan-200/30 bg-cyan-200/10 px-2 text-xs font-bold text-cyan-100"
                  disabled={authLoading}
                  onClick={() => signInWithGoogle()}
                  type="button"
                >
                  Google同期
                </button>
              )}
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-5">
        <section
          className={`mb-4 rounded-lg border p-4 ${
            missionDone
              ? "border-emerald-300/30 bg-emerald-300/5"
              : "border-cyan-300/25 bg-slate-950"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-cyan-200">
                今日の学習
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                {missionDone ? "今日の目標達成" : `今日の${missionTarget}問`}
              </h2>
            </div>
            <span
              className={`text-sm font-bold ${
                missionDone ? "text-emerald-200" : "text-cyan-200"
              }`}
            >
              {todayAnswered}/{missionTarget}問
            </span>
          </div>

          <div className="mt-4 h-2 rounded-full bg-slate-800">
            <div
              className={`h-2 rounded-full ${
                missionDone ? "bg-emerald-300" : "bg-cyan-300"
              }`}
              style={{ width: `${missionPercent}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-lg bg-slate-900 p-2">
              <p className="font-bold text-white">{missionRemaining}</p>
              <p className="text-slate-400">残り</p>
            </div>
            <div className="rounded-lg bg-slate-900 p-2">
              <p className="font-bold text-white">{missionReviewPart}</p>
              <p className="text-slate-400">復習</p>
            </div>
            <div className="rounded-lg bg-slate-900 p-2">
              <p className="font-bold text-white">{missionNewPart}</p>
              <p className="text-slate-400">新規</p>
            </div>
          </div>

          {missionDone ? (
            <p className="mt-2 text-sm leading-6 text-emerald-100">
              ミッション完了！ 今日{todayAnswered}問・正答率{todayAccuracy}
              %。{streakDays}日連続。余力があればもう少し進めましょう。
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-slate-300">
              残り{missionRemaining}問（復習{missionReviewPart}・新規
              {missionNewPart}）。
              {daysToExam > 0
                ? `1日${missionTarget}問ペースで試験日までに全問習得できます。`
                : "試験日を設定すると逆算ペースが表示されます。"}
            </p>
          )}
          <button
            className={`mt-3 min-h-12 w-full rounded-lg font-bold ${
              missionDone
                ? "border border-white/15 bg-slate-900 text-white"
                : "bg-cyan-300 text-slate-950"
            }`}
            onClick={startMission}
            type="button"
          >
            {missionDone
              ? "さらに解く"
              : todayAnswered > 0
                ? "今日の続きへ"
                : `今日の${missionTarget}問を始める`}
          </button>
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
            {storedAnswer && !currentAnswer ? (
              <p className="mt-2 text-sm text-slate-400">
                挑戦{storedAnswer.attempts + 1}回目・前回
                {storedAnswer.correct ? "正解" : "不正解"}
                {isDueRecord(storedAnswer) ? "・復習期限です" : ""}
                。答えは見えないので、思い出して解き直しましょう。
              </p>
            ) : null}
          </div>

          <div className="space-y-5 p-4">
            <ChoiceButtons
              answer={currentAnswer}
              onAnswer={answerQuestion}
              question={currentQuestion}
            />

            <div className="whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-[#111827] p-4 text-base leading-7 text-slate-100">
              {formatQuestionText(currentQuestion.questionText)}
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
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {currentAnswer.correct
                    ? currentAnswer.streak >= MASTER_STREAK
                      ? `習得済み。${reviewIntervalDays(currentAnswer.streak)}日後に復習します。`
                      : `あと${MASTER_STREAK - currentAnswer.streak}回正解で習得です。`
                    : "復習リストに追加しました。"}
                </p>
                <div className="mt-3 rounded-lg border border-white/10 bg-[#0F1117] p-3">
                  <p className="text-sm font-bold text-cyan-100">
                    公式根拠
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
                    解答解説を見る
                  </a>
                </div>
                <button
                  className="mt-3 min-h-12 w-full rounded-lg bg-white px-4 text-base font-bold text-slate-950"
                  onClick={goNext}
                  type="button"
                >
                  次へ
                </button>
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

          </div>
        </section>

        <section className="mt-5 rounded-lg border border-white/10 bg-slate-950 p-3">
          <button
            className="min-h-12 w-full rounded-lg border border-amber-200/30 bg-amber-200/10 px-3 text-sm font-bold text-amber-100"
            onClick={() => setMockPicker(true)}
            type="button"
          >
            模試を始める
          </button>
        </section>

        <section className="mt-3 rounded-lg border border-white/10 bg-slate-950">
          <button
            aria-expanded={questionPickerOpen}
            className="flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left"
            onClick={() => setQuestionPickerOpen(!questionPickerOpen)}
            type="button"
          >
            <span className="text-base font-bold text-white">問題を選ぶ</span>
            <span className="text-right text-sm text-slate-400">
              {filterSummary}
              <span className="ml-2 text-slate-500">
                {questionPickerOpen ? "▲" : "▼"}
              </span>
            </span>
          </button>

          {questionPickerOpen ? (
            <div className="border-t border-white/10 p-3">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <select
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-900 px-2 text-sm text-white"
                  onChange={(event) => {
                    setStudyMode(false);
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
                  onChange={(event) => {
                    setStudyMode(false);
                    setCategoryFilter(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setStudyMode(false);
                    setStatusFilter(event.target.value);
                  }}
                  value={statusFilter}
                >
                  <option value={ALL}>全状態</option>
                  <option value={UNANSWERED}>未回答</option>
                  <option value={WRONG}>間違い</option>
                  <option value={DUE}>復習期限</option>
                </select>
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-3 rounded-lg border border-white/10 bg-slate-950">
          <button
            aria-expanded={boardOpen}
            className="flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left"
            onClick={() => setBoardOpen(!boardOpen)}
            type="button"
          >
            <span className="text-base font-bold text-white">成績を見る</span>
            <span className="text-right text-sm text-slate-400">
              進捗 {totalAnswered}/{takkenQuestions.length}・想定{" "}
              {projectedTotal}/{passLine.fullMarks}点
              {projectedTotal >= passLine.safe
                ? "・安全圏"
                : `・あと${gapToSafe}点`}
              <span className="ml-2 text-slate-500">
                {boardOpen ? "▲" : "▼"}
              </span>
            </span>
          </button>

          {boardOpen ? (
            <div className="border-t border-white/10 p-3">
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-slate-900 p-2">
                  <p className="font-bold text-white">
                    {totalAnswered}/{takkenQuestions.length}
                  </p>
                  <p className="text-slate-400">回答済み</p>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <p className="font-bold text-white">{totalMastered}</p>
                  <p className="text-slate-400">習得済み</p>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <p className="font-bold text-white">{todayAnswered}</p>
                  <p className="text-slate-400">今日</p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                正答率を本番1回（50問）に換算した想定得点です（累計正答率
                {accuracy}%）。合格ラインは過去10年で
                33〜38点（平均35.5点）。安全圏 {passLine.safe}点を狙います。
                「習得済み」は2連続正解した問題です。
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
                    Math.round(
                      ((cat.projectedScore ?? 0) / cat.targetScore) * 100,
                    ),
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
                          ? `正答率${cat.ratePercent}%・習得${cat.masteredCount}/${cat.totalCount}問・${cat.answeredCount}/${cat.totalCount}問演習`
                          : "未着手"}
                        {" — "}
                        {cat.rationale}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold text-slate-300">
                  学習カレンダー（過去12週・{streakDays}日連続）
                </p>
                <div className="mt-2 grid grid-flow-col grid-rows-7 justify-start gap-1">
                  {calendarDays.map((day) => (
                    <div
                      className={`h-3 w-3 rounded-sm ${
                        day.count === 0
                          ? "bg-slate-800"
                          : day.count < 5
                            ? "bg-cyan-900"
                            : day.count < 10
                              ? "bg-cyan-600"
                              : "bg-cyan-300"
                      }`}
                      key={day.key}
                      title={`${day.key}: ${day.count}問`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-900 px-3 py-2">
                <label className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-bold text-white">試験日</span>
                  <input
                    className="rounded-md border border-white/15 bg-[#0F1117] px-2 py-1 text-sm text-white"
                    onChange={(event) => {
                      if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.value)) {
                        setExamDate(event.target.value);
                      }
                    }}
                    type="date"
                    value={examDate}
                  />
                </label>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {daysToExam > 0
                    ? `あと${daysToExam}日。未回答×2回＋未習得×1回の見積もりで、1日${paceNeeded}問ペースなら全問習得が間に合います。`
                    : "試験日が過ぎています。次回の試験日を設定してください。"}
                </p>
              </div>

              <button
                className="mt-3 min-h-11 w-full rounded-lg border border-white/15 bg-slate-900 px-3 text-sm font-bold text-slate-200"
                onClick={resetProgress}
                type="button"
              >
                履歴を初期化
              </button>
            </div>
          ) : null}
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

      <nav
        className="fixed inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#0F1117]/95 px-4 pt-2 backdrop-blur"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-3xl grid-cols-[1fr_2fr] gap-2">
          <button
            className="min-h-12 rounded-lg border border-white/15 bg-slate-900 px-4 text-base font-bold text-white"
            onClick={goPrev}
            type="button"
          >
            前へ
          </button>
          <button
            className="min-h-12 rounded-lg bg-white px-4 text-base font-bold text-slate-950"
            onClick={goNext}
            type="button"
          >
            次へ
          </button>
        </div>
      </nav>

      {mockPicker ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-6"
          onClick={() => setMockPicker(false)}
        >
          <div
            className="w-full max-w-sm rounded-lg border border-white/10 bg-slate-950 p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-base font-bold text-white">模試を開始</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              本番同様の50問・2時間。途中の正誤は表示されず、採点後にまとめて学習記録へ反映されます。全問抽出できている年度のみ選べます。
            </p>
            {takkenExams
              .filter((exam) => exam.extractedCount === exam.questionCount)
              .map((exam) => (
                <button
                  className="mt-2 min-h-12 w-full rounded-lg border border-white/15 bg-slate-900 px-3 text-sm font-bold text-white"
                  key={exam.id}
                  onClick={() => startMock(exam.id)}
                  type="button"
                >
                  {exam.year}（{exam.questionCount}問）
                </button>
              ))}
            <button
              className="mt-3 min-h-10 w-full text-xs text-slate-400"
              onClick={() => setMockPicker(false)}
              type="button"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
