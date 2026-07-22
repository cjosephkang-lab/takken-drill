import { useEffect, useMemo, useRef, useState } from "react";
import type { User } from "firebase/auth";
import {
  takkenExams,
  takkenQuestions,
  type TakkenQuestion,
} from "./data/questions";
import { passLine, studyOrder, studyOrderByCategory } from "./data/studyGuide";
import { formatQuestionText } from "./lib/formatQuestionText";
import {
  buildStudyLogMarkdown,
  localDateKey,
  mergeNotes,
  normalizeNotes,
  selectTodayNotes,
  type NoteEntry,
  type NoteExportItem,
} from "./lib/notes";
import {
  countUnreadableCorrectChoices,
  hasUnreadableCorrectChoice,
} from "./lib/unreadableChoices";
import { MockExam, type MockRun } from "./MockExam";
import { CheatSheet } from "./CheatSheet";
import {
  fetchCoaching,
  fetchSyncedProgress,
  isSyncConfigured,
  observeWebVitals,
  pushSyncedProgress,
  setMetricUserProperties,
  signInWithGoogle,
  signOutUser,
  trackMetric,
  watchAuthUser,
  type MetricParams,
  type Coaching,
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

/** Daily study volume used by streak, calendar, and today's work. */
type DayLog = {
  answered: number;
  correct: number;
};

type ProgressState = {
  answers: Record<string, AnswerRecord>;
  notes: Record<string, NoteEntry>;
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
/** 初回ガイドを見たかどうか。一度閉じたら二度と出さない。 */
const GUIDE_SEEN_KEY = "takken-drill.guideSeen.v1";
const ALL = "all";
const UNANSWERED = "unanswered";
const WRONG = "wrong";
const DUE = "due";
const DAILY_TARGET = 10;
/** この回数連続で正解したら「習得済み」とみなす。 */
const MASTER_STREAK = 3;
/** 宅建試験は例年10月の第3日曜。2026年は10月18日。 */
const DEFAULT_EXAM_DATE = "2026-10-18";
/** Maximum daily target to avoid overloading the learner. */
const MISSION_CAP = 50;

const metricErrorName = (error: unknown) => {
  if (error && typeof error === "object" && "code" in error) {
    return String((error as { code: unknown }).code);
  }

  if (error instanceof Error) {
    return error.name;
  }

  return "unknown";
};

const viewportBucket = () => {
  if (typeof window === "undefined") return "unknown";
  if (window.innerWidth < 640) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

const daysUntil = (dateValue: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${dateValue}T00:00:00`);
  return Math.ceil((date.getTime() - today.getTime()) / 86400000);
};

const dateFromLocalKey = (key: string) => new Date(`${key}T00:00:00`);

const noteLengthBucket = (length: number) => {
  if (length === 0) return "empty";
  if (length <= 50) return "1_50";
  if (length <= 200) return "51_200";
  if (length <= 1000) return "201_1000";
  return "1001_plus";
};

const elapsedSeconds = (startedAt: string) =>
  Math.max(0, Math.round((Date.now() - new Date(startedAt).getTime()) / 1000));

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

// Add one study event to the daily log used by streaks, calendar, and today's work.
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
      // 旧 string 形式のメモは normalizeNotes が {text, updatedAt:""} に移行する。
      notes: normalizeNotes(parsed.notes),
      currentId,
      dailyLog:
        parsed.dailyLog && typeof parsed.dailyLog === "object"
          ? parsed.dailyLog
          : seedDailyLog(answers),
    };
  } catch (error) {
    console.error("Failed to load progress.", error);
    trackMetric("client_storage_error", {
      operation: "load_progress",
      error_code: metricErrorName(error),
    });
    return fallback;
  }
};

const saveProgress = (progress: ProgressState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress.", error);
    trackMetric("client_storage_error", {
      operation: "save_progress",
      error_code: metricErrorName(error),
    });
  }
};

// 端末間マージ: 問題ごとに answeredAt が新しい方を採用する。
// メモは updatedAt が新しい方を採用する（旧 string 形式も両対応。純粋関数はテスト済み）。
const mergeProgress = (
  local: ProgressState,
  remote: {
    answers: Record<string, AnswerRecord>;
    notes: Record<string, NoteEntry | string>;
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

  const notes: Record<string, NoteEntry> = mergeNotes(
    local.notes,
    remote.notes,
  );

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
    // 成績ボードは初期表示（年度別・分野別の達成状況を最初から見せて進捗を実感させる）。
    boardOpen: true,
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
    trackMetric("client_storage_error", {
      operation: "load_settings",
      error_code: metricErrorName(error),
    });
    return fallback;
  }
};

const saveSettings = (settings: UiSettings) => {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings.", error);
    trackMetric("client_storage_error", {
      operation: "save_settings",
      error_code: metricErrorName(error),
    });
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
    trackMetric("client_storage_error", {
      operation: "load_mock",
      error_code: metricErrorName(error),
    });
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
    trackMetric("client_storage_error", {
      operation: "save_mock",
      error_code: metricErrorName(error),
    });
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
  placement: "top" | "bottom";
  revealCorrect?: boolean;
  onAnswer: (choice: number, placement: "top" | "bottom") => void;
};

function ChoiceButtons({
  question,
  answer,
  placement,
  revealCorrect = false,
  onAnswer,
}: ChoiceButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((choice) => {
        const selected = answer?.selected === choice;
        const correct = question.correctChoices.includes(choice);
        const answered = Boolean(answer) || revealCorrect;

        return (
          <button
            className={`min-h-14 rounded-lg border text-xl font-bold transition ${
              answered && correct
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : answered && selected
                  ? "border-rose-500 bg-rose-50 text-rose-700"
                  : "border-slate-300 bg-white text-slate-900 shadow-sm"
            }`}
            key={choice}
            onClick={() => onAnswer(choice, placement)}
            disabled={revealCorrect}
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
  // Guided study mode prioritizes due reviews and unanswered questions in exam strategy order.
  const [studyMode, setStudyMode] = useState(initialSettings.studyMode);
  const [boardOpen, setBoardOpen] = useState(initialSettings.boardOpen);
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [coachingChecked, setCoachingChecked] = useState(false);
  // コーチのチェックは、その日の画面内で確認するためだけの一時状態。
  const [checkedCoachingTasks, setCheckedCoachingTasks] = useState<
    Record<number, boolean>
  >({});
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [questionPickerOpen, setQuestionPickerOpen] = useState(
    initialSettings.questionPickerOpen,
  );
  const [examDate, setExamDate] = useState(initialSettings.examDate);
  // 「今日の学習を書き出す」を押した後の一時フィードバック（数秒表示）。
  const [studyLogStatus, setStudyLogStatus] = useState("");
  // この起動中に解いた問題の回答。過去の回答は画面に出さないので、
  // 再訪時は毎回「思い出して解く」テスト形式になる（想起練習）。
  const [sessionAnswers, setSessionAnswers] = useState<
    Record<string, AnswerRecord>
  >({});
  // 正答を先に確認した問題は学習記録に残さない。画面を移動するまでの表示専用状態。
  const [revealedQuestionId, setRevealedQuestionId] = useState<string | null>(
    null,
  );
  // 「前へ」で直前に見ていた問題へ確実に戻すための閲覧履歴。
  // studyMode の「次へ」は復習/未回答へジャンプするため、表示順＝配列順ではない。
  // 実際に表示した問題IDを積んでおき、「前へ」はこの履歴を1つ戻る（配列の前隣ではない）。
  // セッション内 state（リロードで消えてよい。進捗記録には影響しない）。
  const [history, setHistory] = useState<string[]>(() => [progress.currentId]);
  const [historyPos, setHistoryPos] = useState(0);
  const feedbackRef = useRef<HTMLElement | null>(null);
  // 「次へ」で問題本体（カード）の先頭まで自動スクロールするための参照。
  const questionRef = useRef<HTMLElement | null>(null);
  const questionPickerRef = useRef<HTMLElement | null>(null);
  const forceCloudReplaceRef = useRef(false);
  const lastSyncPushMetricAtRef = useRef(0);
  const questionEnteredAtRef = useRef(Date.now());
  const trackedNoteValuesRef = useRef<Record<string, string>>({});
  const sessionStartedAtRef = useRef(Date.now());
  const sessionStartAnsweredRef = useRef(Object.keys(progress.answers).length);
  const latestSessionSnapshotRef = useRef({
    boardOpen: initialSettings.boardOpen,
    mockActive: false,
    totalAnswered: Object.keys(progress.answers).length,
  });
  const appOpenTrackedRef = useRef(false);

  // 模試モード。進行中はlocalStorageに保存され、リロードしても再開できる。
  const [mockRun, setMockRun] = useState<MockRun | null>(() => loadMockRun());
  const [mockPicker, setMockPicker] = useState(false);

  // 初回だけ出す使い方ガイド。閉じたらlocalStorageに記録して二度と出さない。
  const [showGuide, setShowGuide] = useState(() => {
    try {
      return window.localStorage.getItem(GUIDE_SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const dismissGuide = () => {
    trackMetric("guide_dismiss", {
      answered_count: Object.keys(progress.answers).length,
    });
    setShowGuide(false);
    try {
      window.localStorage.setItem(GUIDE_SEEN_KEY, "1");
    } catch (error) {
      console.error("Failed to save guide flag.", error);
      trackMetric("client_storage_error", {
        operation: "save_guide",
        error_code: metricErrorName(error),
      });
    }
  };

  // Firebase同期（ログイン時のみ）。未ログインは従来通りlocalStorageのみで動く。
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(isSyncConfigured);
  const [syncState, setSyncState] = useState<
    "idle" | "syncing" | "synced" | "error"
  >("idle");
  const [syncReady, setSyncReady] = useState(false);

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
      setSyncReady(false);
      setCoaching(null);
      setCoachingChecked(false);
      setCheckedCoachingTasks({});

      if (!user) {
        trackMetric("auth_state", {
          signed_in: false,
        });
        setSyncState("idle");
        return;
      }

      trackMetric("auth_state", {
        signed_in: true,
      });
      fetchCoaching(user.uid)
        .then((remote) => {
          setCoaching(remote);
          setCoachingChecked(true);
        })
        .catch((error) => {
          console.error("Failed to fetch coaching.", error);
          setCoachingChecked(true);
        });
      setSyncState("syncing");
      fetchSyncedProgress(user.uid)
        .then((remote) => {
          trackMetric("sync_pull_success", {
            remote_answer_count:
              remote && remote.answers ? Object.keys(remote.answers).length : 0,
            remote_exists: Boolean(remote),
          });

          if (!remote) {
            setSyncReady(true);
            setSyncState("synced");
            return;
          }

          setProgress((local) => {
            const merged = mergeProgress(local, {
              answers: (remote.answers ?? {}) as Record<string, AnswerRecord>,
              notes: remote.notes ?? {},
              dailyLog: remote.dailyLog ?? {},
            });
            saveProgress(merged);
            return merged;
          });
          setSyncReady(true);
          setSyncState("synced");
        })
        .catch((error) => {
          console.error("Failed to fetch synced progress.", error);
          trackMetric("sync_pull_error", {
            error_code: metricErrorName(error),
          });
          setSyncReady(false);
          setSyncState("error");
        });
    });

    return unsubscribe;
  }, []);

  // ログイン中は、回答・メモが変わるたびにFirestoreへ反映する。
  useEffect(() => {
    if (!authUser || !syncReady) {
      return;
    }

    setSyncState("syncing");
    const writeMode = forceCloudReplaceRef.current ? "replace" : "merge";
    pushSyncedProgress(
      authUser.uid,
      {
        answers: progress.answers,
        notes: progress.notes,
        dailyLog: progress.dailyLog,
        updatedAt: new Date().toISOString(),
      },
      writeMode,
    )
      .then(() => {
        const now = Date.now();
        if (
          writeMode === "replace" ||
          now - lastSyncPushMetricAtRef.current > 30000
        ) {
          lastSyncPushMetricAtRef.current = now;
          trackMetric("sync_push_success", {
            answer_count: Object.keys(progress.answers).length,
            mode: writeMode,
            note_count: Object.keys(progress.notes).filter(
              (id) => progress.notes[id]?.text,
            ).length,
          });
        }
        forceCloudReplaceRef.current = false;
        setSyncState("synced");
      })
      .catch((error) => {
        console.error("Failed to push synced progress.", error);
        trackMetric("sync_push_error", {
          error_code: metricErrorName(error),
          mode: writeMode,
        });
        setSyncState("error");
      });
  }, [
    authUser,
    progress.answers,
    progress.notes,
    progress.dailyLog,
    syncReady,
  ]);

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
  // 年度または分野を絞っているときは、末尾で先頭へ戻さず完了を伝える。
  // 全問題を通しで解いている場合は、従来どおり「次へ」で循環できる。
  const isAtEndOfSelectedSet =
    !studyMode &&
    filteredQuestions.length > 0 &&
    currentIndex === filteredQuestions.length - 1 &&
    (examFilter !== ALL || categoryFilter !== ALL) &&
    filteredQuestions.every((question) =>
      question.id === currentQuestion.id
        ? Boolean(sessionAnswers[question.id])
        : Boolean(progress.answers[question.id]),
    );

  // 履歴の末尾を「実際に表示している問題」に追従させる。
  // currentId が現在のフィルタに含まれないと currentQuestion は filteredQuestions[0] へ
  // フォールバックするため、history[historyPos]（= progress.currentId ベース）とずれる。
  // このずれを放置すると「前へ」で画面に出ていない問題へ飛ぶ。表示が確定するたびに
  // 履歴末尾を実表示IDへ補正し、履歴の真実源を「実際に見た問題」に一本化する。
  useEffect(() => {
    if (mockRun) return;
    if (history[historyPos] === currentQuestion.id) return;

    setHistory((prev) => {
      const next = prev.slice(0, historyPos + 1);
      next[historyPos] = currentQuestion.id;
      return next;
    });
  }, [currentQuestion.id, history, historyPos, mockRun]);

  const storedAnswer = progress.answers[currentQuestion.id];
  const currentAnswer = sessionAnswers[currentQuestion.id];
  const answerRevealed = revealedQuestionId === currentQuestion.id;
  const currentNote = progress.notes[currentQuestion.id]?.text ?? "";
  const totalAnswered = Object.keys(progress.answers).length;
  const totalCorrect = Object.values(progress.answers).filter(
    (answer) => answer.correct,
  ).length;
  const totalMastered = Object.values(progress.answers).filter(
    (answer) => answer.streak >= MASTER_STREAK,
  ).length;
  // 「3回連続正解」だけでなく、次の復習期限をまだ迎えていないことも満たす問題。
  // 過去に覚えた問題数と、今この時点で定着確認できている問題数を分けて表示する。
  const retainedMastered = Object.values(progress.answers).filter(
    (answer) => answer.streak >= MASTER_STREAK && !isDueRecord(answer),
  ).length;
  const dueCount = takkenQuestions.filter((question) =>
    isDueRecord(progress.answers[question.id]),
  ).length;
  const unansweredCount = takkenQuestions.filter(
    (question) => !progress.answers[question.id],
  ).length;
  const wrongCount = takkenQuestions.filter(
    (question) => progress.answers[question.id]?.correct === false,
  ).length;
  const reviewQueue = useMemo(() => {
    return [...takkenQuestions]
      .filter((question) => {
        const answer = progress.answers[question.id];
        return isDueRecord(answer);
      })
      .sort((a, b) => {
        const aDue = isDueRecord(progress.answers[a.id]) ? 1 : 0;
        const bDue = isDueRecord(progress.answers[b.id]) ? 1 : 0;

        if (aDue !== bDue) {
          return bDue - aDue;
        }

        return (
          studyOrderByCategory(a.category) - studyOrderByCategory(b.category)
        );
      });
  }, [progress.answers]);
  const reviewCount = reviewQueue.length;
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
  // 1問は「初回回答 + 追加2回の連続正解での習得」の3単位として扱う。
  // 最後の14日は新規消化ではなく、間隔反復と本試験形式の確認に確保する。
  const daysToExam = useMemo(() => {
    return daysUntil(examDate);
  }, [examDate]);
  const reviewReserveDays = 14;
  const daysToMasteryDeadline = Math.max(0, daysToExam - reviewReserveDays);
  const totalWorkload = takkenQuestions.length * MASTER_STREAK;
  const completedWorkload = Object.values(progress.answers).reduce(
    (total, answer) =>
      total + 1 + Math.max(0, Math.min(answer.streak - 1, MASTER_STREAK - 1)),
    0,
  );
  const remainingEvents = totalWorkload - completedWorkload;
  const paceNeeded =
    daysToMasteryDeadline > 0
      ? Math.ceil(remainingEvents / daysToMasteryDeadline)
      : remainingEvents;

  // 実際に学習を始めた日を基準に、今日までに終えているべき量を算出する。
  // 固定の開始日を要求しないので、途中から使い始めても実態に即した基準線になる。
  const studyStartedOn = useMemo(
    () =>
      Object.keys(progress.dailyLog)
        .filter((key) => (progress.dailyLog[key]?.answered ?? 0) > 0)
        .sort()[0] ?? null,
    [progress.dailyLog],
  );
  const paceStatus = useMemo(() => {
    if (!studyStartedOn) return null;

    const startedAt = dateFromLocalKey(studyStartedOn);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const elapsedDays = Math.max(
      0,
      Math.floor((today.getTime() - startedAt.getTime()) / 86400000),
    );
    const planDays = elapsedDays + daysToMasteryDeadline;
    const expectedWorkload =
      planDays > 0
        ? Math.round((totalWorkload * elapsedDays) / planDays)
        : totalWorkload;
    const completionPercent = Math.round(
      (completedWorkload / totalWorkload) * 100,
    );
    const expectedPercent = Math.round(
      (expectedWorkload / totalWorkload) * 100,
    );

    return {
      completionPercent,
      expectedPercent,
      difference: completionPercent - expectedPercent,
    };
  }, [completedWorkload, daysToMasteryDeadline, studyStartedOn, totalWorkload]);

  // Today's work uses the larger of the countdown pace and the minimum target, capped at 50.
  const missionTarget = Math.min(
    MISSION_CAP,
    Math.max(DAILY_TARGET, paceNeeded),
  );
  const missionDone = todayAnswered >= missionTarget;
  const missionRemaining = Math.max(0, missionTarget - todayAnswered);
  const missionReviewPart = Math.min(dueCount, missionRemaining);
  const missionNewPart = Math.min(
    unansweredCount,
    Math.max(0, missionRemaining - missionReviewPart),
  );
  const missionAvailablePart = missionReviewPart + missionNewPart;
  const missionShortfallPart = missionRemaining - missionAvailablePart;
  const missionPercent = Math.min(
    100,
    Math.round((todayAnswered / missionTarget) * 100),
  );
  const isGuidedMission = studyMode && statusFilter === ALL;
  const guidedMissionComplete =
    isGuidedMission &&
    (missionDone || (dueCount === 0 && unansweredCount === 0));
  const guidedQuestionKind = isDueRecord(storedAnswer)
    ? "復習期限"
    : !storedAnswer
      ? "新しい問題"
      : "今日解いた問題";

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

  // 年度別の達成状況ダッシュボード: 「どの年度をどこまでやったか」の実感を出す。
  // 解いた問題数・正答数・習得済み数を年度ごとに集計し、全問習得で「クリア」バッジを出す。
  const examStats = useMemo(() => {
    return takkenExams.map((exam) => {
      const inExam = takkenQuestions.filter((q) => q.examId === exam.id);
      const answered = inExam.filter((q) => progress.answers[q.id]);
      const correct = answered.filter((q) => progress.answers[q.id]?.correct);
      const mastered = inExam.filter(
        (q) => (progress.answers[q.id]?.streak ?? 0) >= MASTER_STREAK,
      );
      const total = inExam.length;

      return {
        id: exam.id,
        year: exam.year,
        totalCount: total,
        answeredCount: answered.length,
        correctCount: correct.length,
        masteredCount: mastered.length,
        ratePercent: answered.length
          ? Math.round((correct.length / answered.length) * 100)
          : 0,
        // 全問に一度は解答した＝ひと通り演習した年度。
        completed: total > 0 && answered.length === total,
        // 全問を習得済み（3回連続正解）にした＝クリアした年度。
        cleared: total > 0 && mastered.length === total,
      };
    });
  }, [progress.answers]);

  useEffect(() => {
    return observeWebVitals();
  }, []);

  useEffect(() => {
    setMetricUserProperties({
      has_progress: totalAnswered > 0 ? "yes" : "no",
      mock_active: mockRun ? "yes" : "no",
      storage_mode: authUser ? "cloud" : "local",
      sync_ready: syncReady ? "yes" : "no",
      viewport: viewportBucket(),
    });
  }, [authUser, mockRun, syncReady, totalAnswered]);

  useEffect(() => {
    latestSessionSnapshotRef.current = {
      boardOpen,
      mockActive: Boolean(mockRun),
      totalAnswered,
    };
  }, [boardOpen, mockRun, totalAnswered]);

  useEffect(() => {
    if (appOpenTrackedRef.current) return;
    appOpenTrackedRef.current = true;

    trackMetric("app_open", {
      answered_count: totalAnswered,
      days_to_exam: daysToExam,
      due_count: dueCount,
      guide_visible: showGuide,
      mastered_count: totalMastered,
      mock_active: Boolean(mockRun),
      streak_days: streakDays,
      sync_configured: isSyncConfigured,
      total_questions: takkenQuestions.length,
      viewport: viewportBucket(),
    });
  }, [
    daysToExam,
    dueCount,
    mockRun,
    showGuide,
    streakDays,
    totalAnswered,
    totalMastered,
  ]);

  useEffect(() => {
    let reported = false;

    const reportSessionEnd = () => {
      if (reported) return;
      reported = true;

      const latest = latestSessionSnapshotRef.current;
      trackMetric("session_end", {
        answer_delta: Math.max(
          0,
          latest.totalAnswered - sessionStartAnsweredRef.current,
        ),
        board_open: latest.boardOpen,
        duration_sec: Math.round(
          (Date.now() - sessionStartedAtRef.current) / 1000,
        ),
        mock_active: latest.mockActive,
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reportSessionEnd();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", reportSessionEnd);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", reportSessionEnd);
      reportSessionEnd();
    };
  }, []);

  useEffect(() => {
    if (mockRun) return;

    const previousAnswer = progress.answers[currentQuestion.id];
    questionEnteredAtRef.current = Date.now();

    trackMetric("question_view", {
      category: currentQuestion.category,
      exam_id: currentQuestion.examId,
      filtered_count: filteredQuestions.length,
      has_previous_answer: Boolean(previousAnswer),
      is_due: isDueRecord(previousAnswer),
      question_index: Math.max(currentIndex + 1, 0),
      question_number: currentQuestion.number,
      study_mode: studyMode ? "guided" : "manual",
    });
  }, [
    currentIndex,
    currentQuestion.category,
    currentQuestion.examId,
    currentQuestion.id,
    currentQuestion.number,
    filteredQuestions.length,
    mockRun,
    studyMode,
  ]);

  const questionMetricParams = (
    question: TakkenQuestion = currentQuestion,
  ): MetricParams => {
    const answer = progress.answers[question.id];

    return {
      category: question.category,
      exam_id: question.examId,
      has_previous_answer: Boolean(answer),
      is_due: isDueRecord(answer),
      question_number: question.number,
      study_mode: studyMode ? "guided" : "manual",
    };
  };

  const requestGoogleSignIn = (source: "header" | "mission_card") => {
    trackMetric("auth_sign_in_start", {
      source,
    });

    signInWithGoogle()
      .then(() => {
        trackMetric("auth_sign_in_success", {
          source,
        });
      })
      .catch((error) => {
        console.error("Failed to sign in with Google.", error);
        trackMetric("auth_sign_in_error", {
          error_code: metricErrorName(error),
          source,
        });
      });
  };

  const requestSignOut = () => {
    trackMetric("auth_sign_out", {
      answered_count: totalAnswered,
    });

    signOutUser().catch((error) => {
      console.error("Failed to sign out.", error);
      trackMetric("auth_sign_out_error", {
        error_code: metricErrorName(error),
      });
    });
  };

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
    // 履歴への積み方。
    // "push": 新しい遷移（次へ・フィルタジャンプ・ミッション開始）。現在位置以降を切って末尾に積む。
    // "none": 履歴内の移動（前へ／履歴上の次へ）。履歴は goPrev/goNext 側で更新済みなので触らない。
    historyMode: "push" | "none" = "push",
  ) => {
    updateProgress((previous) => ({ ...previous, currentId: questionId }));

    if (historyMode === "push") {
      // 現在位置より後（前へで戻った後の「先」の履歴）を切り捨て、末尾に積む。
      const trimmed = history.slice(0, historyPos + 1);
      // 同じ問題を連続で積まない（フィルタ再選択で先頭が変わらない場合など）。
      if (trimmed[trimmed.length - 1] !== questionId) {
        const next = [...trimmed, questionId];
        setHistory(next);
        setHistoryPos(next.length - 1);
      }
    }

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

  // フィルタ（年度・分野・状態）を変えた直後に、その絞り込みに合う先頭問題へ移動する。
  // currentId が前の絞り込みの問題IDのまま残ると、その組み合わせに問題が無い時に
  // 別の絞り込みへフォールバックして「解答が出ない／別の問題に飛ぶ」ように見えるため。
  const jumpToFirstMatch = (
    nextExam: string,
    nextCategory: string,
    nextStatus: string,
  ) => {
    const first = takkenQuestions.find((question) => {
      const record = progress.answers[question.id];
      if (nextExam !== ALL && question.examId !== nextExam) return false;
      if (nextCategory !== ALL && question.category !== nextCategory)
        return false;
      if (nextStatus === UNANSWERED && record) return false;
      if (nextStatus === WRONG && (!record || record.correct)) return false;
      if (nextStatus === DUE && !isDueRecord(record)) return false;
      return true;
    });
    if (first) goToQuestion(first.id);
  };

  // Start today's work with filters cleared, then pick the first due review or unanswered question.
  const startMission = () => {
    trackMetric("study_mission_start", {
      answered_count: totalAnswered,
      due_count: dueCount,
      mission_done: missionDone,
      mission_remaining: missionRemaining,
      mission_target: missionTarget,
      streak_days: streakDays,
      today_answered: todayAnswered,
    });

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
      pool.find((q) => !progress.answers[q.id]);

    if (first) {
      goToQuestion(first.id, "question");
    }
  };

  const startReview = () => {
    if (!dueCount) {
      trackMetric("study_review_empty", {
        due_count: dueCount,
        wrong_count: wrongCount,
      });
      startMission();
      return;
    }

    trackMetric("study_review_start", {
      due_count: dueCount,
      review_count: reviewCount,
      wrong_count: wrongCount,
    });

    setExamFilter(ALL);
    setCategoryFilter(ALL);
    setStatusFilter(DUE);
    setStudyMode(true);
    goToQuestion(reviewQueue[0].id, "question");
  };

  const openQuestionPicker = () => {
    trackMetric("question_picker_open", {
      filtered_count: filteredQuestions.length,
    });
    setQuestionPickerOpen(true);
    window.requestAnimationFrame(() => {
      questionPickerRef.current?.scrollIntoView({ block: "start" });
    });
  };

  const answerQuestion = (choice: number, placement: "top" | "bottom") => {
    // この起動中に一度解いた問題は上書きしない
    // （正解を見た後にタップし直して成績が濁るのを防ぐ）。
    if (sessionAnswers[currentQuestion.id]) {
      trackMetric("question_reanswer_blocked", {
        placement,
        ...questionMetricParams(),
      });
      return;
    }

    const previousAnswer = progress.answers[currentQuestion.id];
    const correct = currentQuestion.correctChoices.includes(choice);
    const record = buildAnswerRecord(
      previousAnswer,
      choice,
      correct,
      new Date().toISOString(),
    );

    trackMetric("question_answer", {
      attempt: record.attempts,
      correct,
      lapses: record.lapses,
      placement,
      time_to_answer_sec: Math.round(
        (Date.now() - questionEnteredAtRef.current) / 1000,
      ),
      ...questionMetricParams(),
    });

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

  const revealAnswer = () => {
    if (hasUnreadableCorrectChoice(currentQuestion) || currentAnswer) return;

    trackMetric("question_answer_reveal", {
      time_to_reveal_sec: Math.round(
        (Date.now() - questionEnteredAtRef.current) / 1000,
      ),
      ...questionMetricParams(),
    });
    setRevealedQuestionId(currentQuestion.id);

    window.setTimeout(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const saveNote = (value: string) => {
    // 保存時に更新日時を刻む（端末間マージで新しい方を採るため）。
    // 空メモは updatedAt を空にして、他端末の実メモを時刻比較で潰さないようにする。
    const entry: NoteEntry = {
      text: value,
      updatedAt: value ? new Date().toISOString() : "",
    };
    updateProgress((previous) => ({
      ...previous,
      notes: {
        ...previous.notes,
        [currentQuestion.id]: entry,
      },
    }));
  };

  // 「今日の学習を書き出す」: 当日メモを Markdown にして、クリップボードとファイルの両方で渡す。
  // 姜さんはこれを docs/study-log/YYYY-MM-DD.md に保存する（この一手間だけ手動）。
  const exportTodayStudyLog = async () => {
    const dateKey = localDateKey(new Date());
    const todays = selectTodayNotes(progress.notes, dateKey, (iso) =>
      localDateKey(new Date(iso)),
    );
    const items: NoteExportItem[] = todays.map((note) => {
      const question = takkenQuestions.find((q) => q.id === note.id);
      // 見出しは「分野（和暦 問番号）」。問題が見つからない場合は id をそのまま使う。
      const heading = question
        ? `${question.category}（${question.label.split(" / ")[1] ?? question.label} 問${question.number}）`
        : note.id;
      return { heading, text: note.text, updatedAt: note.updatedAt };
    });
    const markdown = buildStudyLogMarkdown(items, dateKey, todayLog);

    trackMetric("study_log_export", {
      note_count: items.length,
      answered_count: todayLog.answered,
      ...questionMetricParams(),
    });

    // ファイルは常にダウンロードし、クリップボードは対応環境でのみコピーする。
    try {
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `takken-drill-studylog-${dateKey}.md`;
      anchor.click();
      // click 直後の同期 revoke はダウンロード開始前に URL を無効化しうるので、次tickまで遅らせる。
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (error) {
      console.error("Failed to download study log.", error);
    }

    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(markdown);
        copied = true;
      }
    } catch (error) {
      console.error("Failed to copy study log.", error);
    }

    const label =
      items.length === 0 && todayLog.answered === 0
        ? "今日はまだ学習していません"
        : copied
          ? `メモ${items.length}件・実績${todayLog.answered}問をコピー＆保存しました`
          : `メモ${items.length}件・実績${todayLog.answered}問をファイルに保存しました`;
    setStudyLogStatus(label);
    window.setTimeout(() => setStudyLogStatus(""), 4000);
  };

  const trackNoteBlur = () => {
    if (trackedNoteValuesRef.current[currentQuestion.id] === currentNote) {
      return;
    }

    trackedNoteValuesRef.current[currentQuestion.id] = currentNote;
    trackMetric("note_save", {
      has_note: currentNote.trim().length > 0,
      length_bucket: noteLengthBucket(currentNote.length),
      ...questionMetricParams(),
    });
  };

  const goNext = (source: "bottom_nav" | "feedback" = "bottom_nav") => {
    // 「前へ」で履歴を戻っている最中なら、まず履歴の次へ進む（元いた場所へ戻す）。
    // 末尾まで戻り切っている場合だけ、下の通常ロジックで新しい問題を選ぶ。
    if (historyPos < history.length - 1) {
      const nextPos = historyPos + 1;
      const nextId = history[nextPos];
      setHistoryPos(nextPos);
      trackMetric("question_navigate", {
        direction: "next",
        source,
        target_reason: "history",
        ...questionMetricParams(),
      });
      goToQuestion(nextId, "question", "none");
      return;
    }

    if (!filteredQuestions.length) {
      trackMetric("question_navigate_empty", {
        direction: "next",
        source,
      });
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
        trackMetric("question_navigate", {
          direction: "next",
          source,
          target_reason: "due",
          ...questionMetricParams(),
        });
        goToQuestion(due.id, "question");
        return;
      }

      const unanswered = filteredQuestions.find(
        (q) => q.id !== currentQuestion.id && !progress.answers[q.id],
      );
      if (unanswered) {
        trackMetric("question_navigate", {
          direction: "next",
          source,
          target_reason: "unanswered",
          ...questionMetricParams(),
        });
        goToQuestion(unanswered.id, "question");
        return;
      }

      // 自動学習では、復習期限と未回答を終えたら終了する。
      // 既回答問題を循環させず、年度・分野の個別演習で必要な問題だけ選べるようにする。
      trackMetric("guided_study_complete", {
        due_count: dueCount,
        unanswered_count: unansweredCount,
        ...questionMetricParams(),
      });
      return;
    }

    const nextQuestion =
      filteredQuestions[
        (Math.max(currentIndex, 0) + 1) % filteredQuestions.length
      ];
    trackMetric("question_navigate", {
      direction: "next",
      source,
      target_reason: "sequential",
      ...questionMetricParams(),
    });
    goToQuestion(nextQuestion.id, "question");
  };

  const goPrev = (source: "bottom_nav" = "bottom_nav") => {
    // 「前へ」は閲覧履歴を1つ戻る。studyMode の「次へ」がジャンプしても、
    // 直前に見ていた問題へ確実に戻れる（配列の前隣ではない）。
    if (historyPos <= 0) {
      trackMetric("question_navigate_empty", {
        direction: "prev",
        source,
      });
      return;
    }

    const prevPos = historyPos - 1;
    const prevId = history[prevPos];
    setHistoryPos(prevPos);
    trackMetric("question_navigate", {
      direction: "prev",
      source,
      target_reason: "history",
      ...questionMetricParams(),
    });
    goToQuestion(prevId, "question", "none");
  };

  const toggleBoard = () => {
    const nextOpen = !boardOpen;
    trackMetric("score_board_toggle", {
      answered_count: totalAnswered,
      open: nextOpen,
      projected_total: projectedTotal,
    });
    setBoardOpen(nextOpen);
  };

  const updateExamDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }

    trackMetric("exam_date_change", {
      days_to_exam_after: daysUntil(value),
      days_to_exam_before: daysToExam,
    });
    setExamDate(value);
  };

  const resetProgress = () => {
    const shouldReset = window.confirm(
      "回答履歴とメモを消します。よろしいですか？",
    );

    if (!shouldReset) {
      trackMetric("progress_reset_cancel", {
        answered_count: totalAnswered,
        note_count: Object.keys(progress.notes).filter(
          (id) => progress.notes[id]?.text,
        ).length,
      });
      return;
    }

    trackMetric("progress_reset", {
      answered_count: totalAnswered,
      mastered_count: totalMastered,
      note_count: Object.keys(progress.notes).filter(
        (id) => progress.notes[id]?.text,
      ).length,
    });

    const next: ProgressState = {
      answers: {},
      notes: {},
      currentId: takkenQuestions[0]?.id ?? "",
      dailyLog: {},
    };
    forceCloudReplaceRef.current = true;
    setProgress(next);
    setSessionAnswers({});
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const openMockPicker = () => {
    trackMetric("mock_picker_open", {
      eligible_exam_count: takkenExams.filter(
        (exam) => exam.extractedCount === exam.questionCount,
      ).length,
    });
    setMockPicker(true);
  };

  const closeMockPicker = (source: "backdrop" | "cancel") => {
    trackMetric("mock_picker_close", {
      source,
    });
    setMockPicker(false);
  };

  const startMock = (examId: string) => {
    const run: MockRun = {
      examId,
      startedAt: new Date().toISOString(),
      answers: {},
    };
    trackMetric("mock_start", {
      exam_id: examId,
    });
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
    if (mockRun) {
      trackMetric("mock_abort", {
        answered_count: Object.keys(mockRun.answers).length,
        elapsed_sec: elapsedSeconds(mockRun.startedAt),
        exam_id: mockRun.examId,
      });
    }
    setMockRun(null);
    saveMockRun(null);
  };

  // 模試の採点結果を学習記録へ反映する。回答した各問を通常ドリルと同じ
  // 間隔反復レコードとして記録し、日次ログにも加算する。
  const commitMock = (run: MockRun) => {
    const answeredAt = new Date().toISOString();
    const questionById = new Map(takkenQuestions.map((q) => [q.id, q]));
    const runAnswers = Object.entries(run.answers);
    const mockCorrectCount = runAnswers.filter(([qid, choice]) => {
      const question = questionById.get(qid);
      return (
        question &&
        (question.isAllCorrect || question.correctChoices.includes(choice))
      );
    }).length;

    updateProgress((prev) => {
      const answers = { ...prev.answers };
      let count = 0;
      let correctCount = 0;

      for (const [qid, choice] of runAnswers) {
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

    trackMetric("mock_commit", {
      answered_count: Object.keys(run.answers).length,
      elapsed_sec: elapsedSeconds(run.startedAt),
      exam_id: run.examId,
      score: mockCorrectCount,
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
      ? "すべての年度"
      : (takkenExams.find((exam) => exam.id === examFilter)?.year ??
        "すべての年度");
  const categoryFilterLabel =
    categoryFilter === ALL ? "すべての分野" : categoryFilter;
  const statusFilterLabel =
    statusFilter === UNANSWERED
      ? "まだ解いていない"
      : statusFilter === WRONG
        ? "間違えた問題"
        : statusFilter === DUE
          ? "復習する問題"
          : "すべての問題";
  const filterSummary = `${examFilterLabel} / ${categoryFilterLabel} / ${statusFilterLabel}`;
  const historySaveTitle = authUser
    ? syncState === "error"
      ? "Google保存でエラーが出ています"
      : "履歴はGoogleに保存中"
    : "履歴はこの端末に保存中";
  const historySaveDetail = authUser
    ? syncState === "error"
      ? "通信状態を確認すると、次に解いた時にもう一度保存します。"
      : "スマホ・PCでも同じ学習履歴を使えます。"
    : isSyncConfigured
      ? "Googleで保存するとスマホ・PCに引き継げます。"
      : "別のスマホ・PCでは履歴を引き継げません。";
  const coachingGeneratedAt = coaching ? new Date(coaching.generatedAt) : null;
  const coachingGeneratedLabel =
    coachingGeneratedAt && !Number.isNaN(coachingGeneratedAt.getTime())
      ? `${coachingGeneratedAt.getMonth() + 1}月${coachingGeneratedAt.getDate()}日 生成`
      : "生成日不明";
  const coachingIsStale = Boolean(
    coachingGeneratedAt &&
    !Number.isNaN(coachingGeneratedAt.getTime()) &&
    Date.now() - coachingGeneratedAt.getTime() >= 3 * 86400000,
  );
  const coachingVerdictStyle =
    coaching?.verdict === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : coaching?.verdict === "yellow"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-rose-200 bg-rose-50 text-rose-800";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-normal text-slate-950">
              宅建過去問ドリル
            </h1>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              <span className="font-bold text-sky-700">連続{streakDays}日</span>
              <span className="mx-1.5 text-slate-300">·</span>
              復習{dueCount}問<span className="mx-1.5 text-slate-300">·</span>
              試験まで{daysToExam > 0 ? `あと${daysToExam}日` : "—"}
            </p>
          </div>

          {isSyncConfigured ? (
            <div className="flex shrink-0 flex-col items-end gap-1 text-right text-xs text-slate-500">
              {authUser ? (
                <>
                  <span>
                    Googleに保存中
                    {syncState === "syncing" ? "…" : ""}
                    {syncState === "error" ? "（エラー）" : ""}
                  </span>
                  <button
                    className="min-h-8 rounded-md border border-slate-300 bg-white px-2 text-xs font-bold text-slate-700"
                    onClick={requestSignOut}
                    type="button"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <button
                  className="min-h-8 rounded-md border border-sky-200 bg-sky-50 px-2 text-xs font-bold text-sky-700"
                  disabled={authLoading}
                  onClick={() => requestGoogleSignIn("header")}
                  type="button"
                >
                  Googleで保存
                </button>
              )}
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-5">
        <section
          className={`mb-4 rounded-lg border p-4 shadow-sm ${
            missionDone
              ? "border-emerald-200 bg-emerald-50"
              : "border-sky-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-sky-700">今日やる</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">
                {missionDone ? "今日の目標達成" : `今日の${missionTarget}問`}
              </h2>
            </div>
            <span
              className={`text-sm font-bold ${
                missionDone ? "text-emerald-700" : "text-sky-700"
              }`}
            >
              {todayAnswered}/{missionTarget}問
            </span>
          </div>

          <div className="mt-4 h-2 rounded-full bg-slate-200">
            <div
              className={`h-2 rounded-full ${
                missionDone ? "bg-emerald-500" : "bg-sky-600"
              }`}
              style={{ width: `${missionPercent}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-bold text-slate-950">{missionRemaining}</p>
              <p className="text-slate-500">目標まで</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-bold text-slate-950">{missionReviewPart}</p>
              <p className="text-slate-500">復習</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-bold text-slate-950">{missionNewPart}</p>
              <p className="text-slate-500">新しい問題</p>
            </div>
          </div>

          {missionDone ? (
            <p className="mt-2 text-sm leading-6 text-emerald-800">
              今日の分は完了！ 今日{todayAnswered}問・正答率{todayAccuracy}
              %。{streakDays}日連続。余力があればもう少し進めましょう。
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-slate-700">
              自動出題は{missionAvailablePart}問（復習{missionReviewPart}
              ・新しい問題
              {missionNewPart}）。
              {missionShortfallPart > 0
                ? `目標まであと${missionShortfallPart}問は、復習期限の到来を待つか、年度・分野を指定して取り組めます。`
                : ""}
              {daysToExam > 0
                ? `1日${missionTarget}問ペースで試験14日前までに全問習得を目指せます。`
                : "試験日を設定すると逆算ペースが表示されます。"}
            </p>
          )}
          <p className="mt-2 rounded-lg bg-sky-50 px-3 py-2 text-xs leading-5 text-sky-800">
            自動出題は「復習期限の問題」→「まだ解いていない問題」の順です。解いたばかりの問題は次回の復習期限まで出ません。
          </p>
          <button
            className={`mt-3 min-h-12 w-full rounded-lg font-bold ${
              missionDone
                ? "border border-slate-300 bg-white text-slate-900"
                : "bg-sky-700 text-white"
            }`}
            onClick={
              missionDone || missionAvailablePart === 0
                ? openQuestionPicker
                : startMission
            }
            type="button"
          >
            {missionDone
              ? "年度・分野を選んで追加で解く"
              : missionAvailablePart === 0
                ? "年度・分野を選んで解く"
                : todayAnswered > 0
                  ? "今日の続きへ"
                  : `今日の自動出題${missionAvailablePart}問を始める`}
          </button>

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 text-xs text-slate-700 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-slate-950">{historySaveTitle}</p>
              <p className="mt-0.5 leading-5 text-slate-500">
                {historySaveDetail}
              </p>
            </div>
            {isSyncConfigured && !authUser ? (
              <button
                className="min-h-9 shrink-0 rounded-md border border-sky-200 bg-sky-50 px-3 text-xs font-bold text-sky-700"
                disabled={authLoading}
                onClick={() => requestGoogleSignIn("mission_card")}
                type="button"
              >
                Googleで保存する
              </button>
            ) : null}
          </div>
        </section>

        <section className="mb-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-base font-bold text-slate-950">ほかの学習</h2>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                普段は上の「今日の◯問」だけでOK。目的がある時だけ使います。
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              className="min-h-20 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-center sm:min-h-24 sm:p-3 sm:text-left"
              onClick={startReview}
              type="button"
            >
              <span className="text-sm font-bold text-emerald-800">復習</span>
              <span className="mt-1 block text-lg font-bold text-slate-950 sm:text-xl">
                {reviewCount > 0 ? `${reviewCount}問` : "なし"}
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-slate-600 sm:block">
                {dueCount > 0
                  ? "今日もう一度やる問題"
                  : wrongCount > 0
                    ? "間違えた問題を解き直す"
                    : "間違えた問題が出たらここへ"}
              </span>
            </button>

            <button
              className="min-h-20 rounded-lg border border-amber-200 bg-amber-50 p-2 text-center sm:min-h-24 sm:p-3 sm:text-left"
              onClick={openMockPicker}
              type="button"
            >
              <span className="text-sm font-bold text-amber-800">模試</span>
              <span className="mt-1 block text-lg font-bold text-slate-950 sm:text-xl">
                50問
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-slate-600 sm:block">
                月1回・直前期に本番形式で確認
              </span>
            </button>

            <button
              className="min-h-20 rounded-lg border border-slate-200 bg-slate-50 p-2 text-center sm:min-h-24 sm:p-3 sm:text-left"
              onClick={openQuestionPicker}
              type="button"
            >
              <span className="text-sm font-bold text-slate-800">
                年度・分野
              </span>
              <span className="mt-1 block text-lg font-bold text-slate-950 sm:text-xl">
                選ぶ
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-slate-600 sm:block">
                苦手分野や年度を指定して解く
              </span>
            </button>

            <button
              className="min-h-20 rounded-lg border border-sky-200 bg-sky-50 p-2 text-center sm:min-h-24 sm:p-3 sm:text-left"
              onClick={() => setCheatSheetOpen(true)}
              type="button"
            >
              <span className="text-sm font-bold text-sky-800">
                チートシート
              </span>
              <span className="mt-1 block text-lg font-bold text-slate-950 sm:text-xl">
                弱点順
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-slate-600 sm:block">
                優先して学ぶ論点を見る
              </span>
            </button>
          </div>
        </section>

        <section className="mb-4 rounded-lg border border-slate-200 bg-white shadow-sm">
          <button
            aria-expanded={coachingOpen}
            className="flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left"
            onClick={() => setCoachingOpen((open) => !open)}
            type="button"
          >
            <span className="text-base font-bold text-slate-950">コーチ</span>
            <span className="text-right text-sm text-slate-500">
              {coaching ? coaching.verdictLine : "今日の学習アドバイス"}
              <span className="ml-2 text-slate-400">
                {coachingOpen ? "▲" : "▼"}
              </span>
            </span>
          </button>

          {coachingOpen ? (
            <div className="border-t border-slate-200 p-3">
              {!authUser || (coachingChecked && !coaching) ? (
                <p className="rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-600">
                  まだアドバイスがありません
                </p>
              ) : coaching ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-bold ${coachingVerdictStyle}`}
                    >
                      {coaching.verdictLine}
                    </span>
                    <span className="text-xs text-slate-500">
                      {coachingGeneratedLabel}
                    </span>
                  </div>
                  {coachingIsStale ? (
                    <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
                      更新されていません
                    </p>
                  ) : null}
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {coaching.headline}
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {coaching.advice}
                  </p>

                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <p className="text-sm font-bold text-slate-950">
                      今日必ずやること
                    </p>
                    <ul className="mt-2 space-y-2">
                      {coaching.todayMustDo.map((task, index) => (
                        <li key={`${task.label}-${index}`}>
                          <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-slate-50 p-3">
                            <input
                              checked={checkedCoachingTasks[index] ?? false}
                              className="mt-0.5 h-4 w-4 accent-sky-700"
                              onChange={() => {
                                setCheckedCoachingTasks((previous) => ({
                                  ...previous,
                                  [index]: !previous[index],
                                }));
                              }}
                              type="checkbox"
                            />
                            <span>
                              <span className="block text-sm font-bold text-slate-900">
                                {task.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-5 text-slate-600">
                                {task.detail}
                              </span>
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-600">
                  アドバイスを読み込んでいます…
                </p>
              )}
            </div>
          ) : null}
        </section>

        {questionPickerOpen ? (
          <section
            ref={questionPickerRef}
            className="mb-4 rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <button
              aria-expanded={questionPickerOpen}
              className="flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left"
              onClick={() => {
                trackMetric("question_picker_close", {
                  filtered_count: filteredQuestions.length,
                });
                setQuestionPickerOpen(false);
              }}
              type="button"
            >
              <span className="text-base font-bold text-slate-950">
                年度・分野を選ぶ
              </span>
              <span className="text-right text-sm text-slate-500">
                {filterSummary}
                <span className="ml-2 text-slate-400">▲</span>
              </span>
            </button>

            <div className="border-t border-slate-200 p-3">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <select
                  className="min-h-11 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900"
                  onChange={(event) => {
                    const nextExam = event.target.value;
                    setStudyMode(false);
                    trackMetric("filter_change", {
                      filter_type: "exam",
                      value: nextExam,
                    });
                    setExamFilter(nextExam);
                    setTimeout(() => {
                      jumpToFirstMatch(nextExam, categoryFilter, statusFilter);
                    }, 0);
                  }}
                  value={examFilter}
                >
                  <option value={ALL}>すべての年度</option>
                  {takkenExams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.year}
                    </option>
                  ))}
                </select>

                <select
                  className="min-h-11 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900"
                  onChange={(event) => {
                    const nextCategory = event.target.value;
                    setStudyMode(false);
                    trackMetric("filter_change", {
                      filter_type: "category",
                      value: nextCategory,
                    });
                    setCategoryFilter(nextCategory);
                    setTimeout(() => {
                      jumpToFirstMatch(examFilter, nextCategory, statusFilter);
                    }, 0);
                  }}
                  value={categoryFilter}
                >
                  <option value={ALL}>すべての分野</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  className="min-h-11 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900"
                  onChange={(event) => {
                    const nextStatus = event.target.value;
                    setStudyMode(false);
                    trackMetric("filter_change", {
                      filter_type: "status",
                      value: nextStatus,
                    });
                    setStatusFilter(nextStatus);
                    setTimeout(() => {
                      jumpToFirstMatch(examFilter, categoryFilter, nextStatus);
                    }, 0);
                  }}
                  value={statusFilter}
                >
                  <option value={ALL}>すべての問題</option>
                  <option value={UNANSWERED}>まだ解いていない</option>
                  <option value={WRONG}>間違えた問題</option>
                  <option value={DUE}>復習する問題</option>
                </select>
              </div>
            </div>
          </section>
        ) : null}

        <section
          ref={questionRef}
          className="scroll-mt-3 rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-white p-4">
            {isGuidedMission ? (
              <div className="mb-3 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900">
                <p className="font-bold">
                  今日の{missionTarget}問 · {todayAnswered}/{missionTarget}問
                </p>
                <p className="mt-0.5 text-xs leading-5">
                  この問題：{guidedQuestionKind}
                  {guidedQuestionKind === "復習期限"
                    ? "。忘れかけた頃の確認です。"
                    : guidedQuestionKind === "新しい問題"
                      ? "。初めて取り組む問題です。"
                      : "。この問題への解答は完了しています。"}
                </p>
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-sm font-bold text-sky-700">
                {currentQuestion.year}
              </span>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-sm font-bold text-amber-700">
                問{currentQuestion.number}
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-bold text-slate-700">
                {currentQuestion.category}
              </span>
              {hasUnreadableCorrectChoice(currentQuestion) ? (
                <span className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm font-bold text-rose-700">
                  正解の選択肢が判読不能
                </span>
              ) : null}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500">
              <span>
                {filteredQuestions.length ? currentIndex + 1 : 0}問目 / 全
                {filteredQuestions.length}問
              </span>
              <a
                className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 font-bold text-sky-700"
                href={currentQuestion.sourceUrl}
                onClick={() => {
                  trackMetric("official_pdf_open", questionMetricParams());
                }}
                rel="noreferrer"
                target="_blank"
              >
                公式PDF
              </a>
            </div>
            {storedAnswer && !currentAnswer ? (
              <p className="mt-2 text-sm text-slate-600">
                挑戦{storedAnswer.attempts + 1}回目・前回
                {storedAnswer.correct ? "正解" : "不正解"}
                {isDueRecord(storedAnswer) ? "・復習のタイミングです" : ""}
                。答えは見えないので、思い出して解き直しましょう。
              </p>
            ) : null}
          </div>

          <div className="space-y-5 p-4">
            {!currentAnswer ? (
              <p className="text-sm font-medium text-slate-500">
                問題文を読んで、正解だと思う番号をタップしてください。
              </p>
            ) : null}

            <ChoiceButtons
              answer={currentAnswer}
              onAnswer={answerQuestion}
              placement="top"
              question={currentQuestion}
              revealCorrect={answerRevealed}
            />

            {!currentAnswer &&
            !answerRevealed &&
            !hasUnreadableCorrectChoice(currentQuestion) ? (
              <button
                className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700"
                onClick={revealAnswer}
                type="button"
              >
                回答せずに正解・解説を見る
              </button>
            ) : null}

            {hasUnreadableCorrectChoice(currentQuestion) ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-800">
                この問題は公式PDFがスキャン画像で、正解の選択肢がOCRで読み取れませんでした。原本にない文章は補っていないため、正解を選ぶことができません。
                <a
                  className="font-bold underline"
                  href={currentQuestion.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  公式PDF
                </a>
                で原本をご確認ください。
              </p>
            ) : null}

            <div className="whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-4 text-base leading-7 text-slate-950">
              {formatQuestionText(currentQuestion.questionText)}
            </div>

            <ChoiceButtons
              answer={currentAnswer}
              onAnswer={answerQuestion}
              placement="bottom"
              question={currentQuestion}
              revealCorrect={answerRevealed}
            />

            {currentAnswer || answerRevealed ? (
              <section
                ref={feedbackRef}
                className={`rounded-lg border p-4 ${
                  currentAnswer?.correct || answerRevealed
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-rose-200 bg-rose-50"
                }`}
              >
                <p className="text-base font-bold">
                  {answerRevealed
                    ? "正解・解説を確認中"
                    : currentAnswer?.correct
                      ? "正解"
                      : "不正解"}
                </p>
                <p className="mt-1 text-base leading-7 text-slate-950">
                  {resultText(currentQuestion)}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {answerRevealed
                    ? "回答していないため、学習履歴・正答率には記録されていません。"
                    : currentAnswer?.correct
                      ? currentAnswer.streak >= MASTER_STREAK
                        ? `身につきました。${reviewIntervalDays(currentAnswer.streak)}日後に復習します。`
                        : `あと${MASTER_STREAK - currentAnswer.streak}回正解で身につきます。`
                      : "復習リストに追加しました。"}
                </p>
                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-sm font-bold text-sky-700">公式の答え</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {currentQuestion.officialExplanation}
                  </p>
                  <a
                    className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-bold text-sky-700"
                    href={currentQuestion.externalExplanationUrl}
                    onClick={() => {
                      trackMetric("explanation_open", questionMetricParams());
                    }}
                    rel="noreferrer"
                    target="_blank"
                  >
                    解答解説を見る
                  </a>
                </div>
                {guidedMissionComplete ? (
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-3">
                    <p className="text-base font-bold text-emerald-800">
                      今日の自動学習はここまでです
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      復習期限と未回答の問題を優先して出題しました。追加で解く場合は、年度・分野を指定して選べます。
                    </p>
                    <button
                      className="mt-3 min-h-12 w-full rounded-lg bg-sky-700 px-4 text-base font-bold text-white"
                      onClick={openQuestionPicker}
                      type="button"
                    >
                      年度・分野を選ぶ
                    </button>
                  </div>
                ) : isAtEndOfSelectedSet ? (
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-3">
                    <p className="text-base font-bold text-emerald-800">
                      {currentQuestion.year}・{currentQuestion.category}
                      はここまでです
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      おつかれさまでした。次は年度・分野を選んで続けましょう。
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <button
                        className="min-h-12 rounded-lg bg-sky-700 px-4 text-base font-bold text-white"
                        onClick={openQuestionPicker}
                        type="button"
                      >
                        次の問題を選ぶ
                      </button>
                      <button
                        className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base font-bold text-slate-700"
                        onClick={() => goNext("feedback")}
                        type="button"
                      >
                        もう一度解く
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="mt-3 min-h-12 w-full rounded-lg bg-sky-700 px-4 text-base font-bold text-white"
                    onClick={() => goNext("feedback")}
                    type="button"
                  >
                    次へ
                  </button>
                )}
              </section>
            ) : null}

            <label className="block">
              <span className="text-base font-bold text-slate-900">
                自分メモ
              </span>
              <textarea
                className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 bg-white p-3 text-base leading-7 text-slate-900 outline-none focus:border-sky-500"
                onChange={(event) => saveNote(event.target.value)}
                onBlur={trackNoteBlur}
                placeholder="条文、間違えた理由、覚えることを自分用に書く"
                value={currentNote}
              />
            </label>

            <div className="mt-3">
              <button
                className="min-h-11 w-full rounded-lg border border-sky-200 bg-sky-50 px-3 text-sm font-bold text-sky-700"
                onClick={exportTodayStudyLog}
                type="button"
              >
                今日の学習を書き出す
              </button>
              {studyLogStatus ? (
                <p className="mt-2 text-center text-xs font-bold text-slate-600">
                  {studyLogStatus}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white shadow-sm">
          <button
            aria-expanded={boardOpen}
            className="flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left"
            onClick={toggleBoard}
            type="button"
          >
            <span className="text-base font-bold text-slate-950">
              成績を見る
            </span>
            <span className="text-right text-sm text-slate-500">
              学習状況 {totalAnswered}/{takkenQuestions.length}・予想{" "}
              {projectedTotal}/{passLine.fullMarks}点
              {projectedTotal >= passLine.safe
                ? "・合格目安クリア"
                : `・あと${gapToSafe}点`}
              <span className="ml-2 text-slate-400">
                {boardOpen ? "▲" : "▼"}
              </span>
            </span>
          </button>

          {boardOpen ? (
            <div className="border-t border-slate-200 p-3">
              <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-sky-700">
                      ペースメーカー
                    </p>
                    <h3 className="mt-0.5 text-base font-bold text-slate-950">
                      {paceStatus
                        ? paceStatus.difference >= 0
                          ? `予定より${paceStatus.difference}ポイント前倒し`
                          : `予定より${Math.abs(paceStatus.difference)}ポイント遅れ`
                        : "最初の1問を解くとペースを測れます"}
                    </h3>
                  </div>
                  {paceStatus ? (
                    <span className="shrink-0 text-sm font-bold text-sky-700">
                      {paceStatus.completionPercent}%
                    </span>
                  ) : null}
                </div>
                {paceStatus ? (
                  <>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-sky-100">
                      <div
                        className="h-full rounded-full bg-sky-600"
                        style={{
                          width: `${Math.min(100, paceStatus.completionPercent)}%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      進捗{paceStatus.completionPercent}%（今日の目安
                      {paceStatus.expectedPercent}
                      %）。習得完了は試験14日前までに設定しています。
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    初回回答と追加2回の連続正解を各1単位として、試験14日前までの進捗目安を表示します。
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">
                    {totalAnswered}/{takkenQuestions.length}
                  </p>
                  <p className="text-slate-500">解いた問題</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">
                    {retainedMastered}/{takkenQuestions.length}
                  </p>
                  <p className="text-slate-500">定着確認済み</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="font-bold text-slate-950">{todayAnswered}</p>
                  <p className="text-slate-500">今日</p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                正答率を本番1回（50問）に置き換えた予想点です（累計正答率
                {accuracy}%）。合格ラインは過去10年で
                33〜38点（平均35.5点）。まずは {passLine.safe}点を目指します。
                「定着確認済み」は、3回連続正解し、次回復習の期限内にある問題です。
              </p>
              <div
                className={`mt-2 rounded-lg border px-3 py-2 text-sm font-bold ${
                  projectedTotal >= passLine.safe
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {projectedTotal >= passLine.safe
                  ? `合格目安クリア。予想${projectedTotal}点で合格ラインを越えています。`
                  : `目標の${passLine.safe}点まであと ${gapToSafe} 点。`}
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold text-slate-700">
                  年度別の達成状況
                </p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  各年度50問。全問を3回連続で正解すると「クリア」です。
                </p>
                <div className="mt-2 space-y-2">
                  {examStats.map((exam) => {
                    const masterPercent = Math.round(
                      (exam.masteredCount / exam.totalCount) * 100,
                    );

                    return (
                      <div
                        className="rounded-lg bg-slate-50 px-3 py-2"
                        key={exam.id}
                      >
                        <div className="flex items-center justify-between gap-2 text-sm">
                          <span className="flex items-center gap-2 font-bold text-slate-950">
                            {exam.year}
                            {exam.cleared ? (
                              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-700">
                                クリア
                              </span>
                            ) : exam.completed ? (
                              <span className="rounded-md border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-xs font-bold text-sky-700">
                                ひと通り完了
                              </span>
                            ) : null}
                          </span>
                          <span className="text-slate-700">
                            習得 {exam.masteredCount}/{exam.totalCount}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-slate-200">
                          <div
                            className={`h-1.5 rounded-full ${
                              exam.cleared ? "bg-emerald-500" : "bg-sky-600"
                            }`}
                            style={{ width: `${masterPercent}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {exam.answeredCount > 0
                            ? `解いた問題${exam.answeredCount}/${exam.totalCount}問・正答率${exam.ratePercent}%`
                            : "まだ解いていません"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-4 text-xs font-bold text-slate-700">
                分野別の達成状況
              </p>
              <div className="mt-2 space-y-2">
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
                      className="rounded-lg bg-slate-50 px-3 py-2"
                      key={cat.category}
                      title={cat.rationale}
                    >
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="font-bold text-slate-950">
                          {cat.order}. {cat.category}
                        </span>
                        <span
                          className={
                            reached ? "text-emerald-700" : "text-slate-700"
                          }
                        >
                          予想 {cat.projectedScore ?? "—"}/{cat.fullMarks}点
                          <span className="text-slate-500">
                            （目標{cat.targetScore}）
                          </span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-slate-200">
                        <div
                          className={`h-1.5 rounded-full ${
                            reached ? "bg-emerald-500" : "bg-sky-600"
                          }`}
                          style={{ width: `${barPercent}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {cat.answeredCount > 0
                          ? `正答率${cat.ratePercent}%・身についた問題${cat.masteredCount}/${cat.totalCount}問・解いた問題${cat.answeredCount}/${cat.totalCount}問`
                          : "まだ解いていません"}
                        {" — "}
                        {cat.rationale}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold text-slate-700">
                  学習カレンダー（過去12週・{streakDays}日連続）
                </p>
                <div className="mt-2 grid grid-flow-col grid-rows-7 justify-start gap-1">
                  {calendarDays.map((day) => (
                    <div
                      className={`h-3 w-3 rounded-sm ${
                        day.count === 0
                          ? "bg-slate-200"
                          : day.count < 5
                            ? "bg-sky-200"
                            : day.count < 10
                              ? "bg-sky-500"
                              : "bg-sky-700"
                      }`}
                      key={day.key}
                      title={`${day.key}: ${day.count}問`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2">
                <label className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-bold text-slate-950">試験日</span>
                  <input
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900"
                    onChange={(event) => {
                      updateExamDate(event.target.value);
                    }}
                    type="date"
                    value={examDate}
                  />
                </label>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {daysToExam > 0
                    ? `あと${daysToExam}日。試験14日前までの残り${daysToMasteryDeadline}日で、未回答は3回・未習得は残りの連続正解回数を解く見込みです。必要ペースは1日${paceNeeded}問です。`
                    : "試験日が過ぎています。次回の試験日を設定してください。"}
                </p>
              </div>

              <button
                className="mt-3 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700"
                onClick={resetProgress}
                type="button"
              >
                履歴を消す
              </button>
            </div>
          ) : null}
        </section>

        <details className="mt-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <summary className="cursor-pointer text-base font-bold text-slate-950">
            入っている過去問
          </summary>
          <div className="mt-3 space-y-2">
            {takkenExams.map((exam) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm"
                key={exam.id}
              >
                <span>{exam.label}</span>
                <span className="text-slate-500">
                  {exam.extractedCount}/50 問
                </span>
              </div>
            ))}
          </div>
        </details>
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 px-4 pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-3xl grid-cols-[1fr_2fr] gap-2">
          <button
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base font-bold text-slate-700"
            onClick={() => goPrev("bottom_nav")}
            type="button"
          >
            前へ
          </button>
          <button
            className="min-h-12 rounded-lg bg-sky-700 px-4 text-base font-bold text-white"
            onClick={() => goNext("bottom_nav")}
            type="button"
          >
            次へ
          </button>
        </div>
      </nav>

      {showGuide ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/60 px-4 pb-4 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
              はじめての方へ
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-950">
              宅建の過去問を、毎日少しずつ。
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              直近5回分の公式過去問を収録。まずは「今日やる」をこなすだけで、
              試験日から逆算して合格ラインに届く設計です。
            </p>

            <ol className="mt-4 space-y-3">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  1
                </span>
                <p className="text-sm leading-6 text-slate-700">
                  <span className="font-bold text-slate-950">
                    「今日の◯問を始める」
                  </span>
                  を押すと、解くべき問題が自動で並びます。
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  2
                </span>
                <p className="text-sm leading-6 text-slate-700">
                  問題を読んで、
                  <span className="font-bold text-slate-950">
                    正解だと思う番号をタップ
                  </span>
                  。すぐに正誤と解説が出ます。
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  3
                </span>
                <p className="text-sm leading-6 text-slate-700">
                  間違えた問題は
                  <span className="font-bold text-slate-950">
                    忘れた頃に自動で再出題
                  </span>
                  。復習、模試、年度・分野の指定は必要な時だけでOK。
                </p>
              </li>
            </ol>

            <button
              className="mt-5 min-h-12 w-full rounded-lg bg-sky-700 text-base font-bold text-white"
              onClick={dismissGuide}
              type="button"
            >
              はじめる
            </button>
          </div>
        </div>
      ) : null}

      {cheatSheetOpen && (
        <CheatSheet
          answers={progress.answers}
          onClose={() => setCheatSheetOpen(false)}
        />
      )}

      {mockPicker ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/60 px-6"
          onClick={() => closeMockPicker("backdrop")}
        >
          <div
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-base font-bold text-slate-950">模試を開始</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              本番同様の50問・2時間。途中の正解・不正解は表示されず、採点後にまとめて学習履歴に残ります。50問そろっている年度だけ選べます。
            </p>
            {takkenExams
              .filter((exam) => exam.extractedCount === exam.questionCount)
              .map((exam) => {
                const unreadable = countUnreadableCorrectChoices(
                  takkenQuestions,
                  exam.id,
                );
                return (
                  <button
                    className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900"
                    key={exam.id}
                    onClick={() => startMock(exam.id)}
                    type="button"
                  >
                    {exam.year}（{exam.questionCount}問）
                    {unreadable ? (
                      <span className="mt-0.5 block text-xs font-normal text-rose-700">
                        うち{unreadable}
                        問は正解の選択肢がOCRで判読できず、正解を選べません
                      </span>
                    ) : null}
                  </button>
                );
              })}
            <button
              className="mt-3 min-h-10 w-full text-xs text-slate-500"
              onClick={() => closeMockPicker("cancel")}
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
