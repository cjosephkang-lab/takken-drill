import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
  logEvent,
  setUserProperties,
  type Analytics,
} from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { mergeNotes, type NoteEntry } from "./lib/notes";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 環境変数が無い（.env未設定）場合は同期機能自体を無効化し、
// 従来通りlocalStorageのみで動かす。
export const isSyncConfigured = Boolean(firebaseConfig.apiKey);

const app = isSyncConfigured ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
let analyticsPromise: Promise<Analytics | null> | null = null;

export type MetricValue = string | number | boolean | null | undefined;
export type MetricParams = Record<string, MetricValue>;

const getOptionalAnalytics = () => {
  if (!app || typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isAnalyticsSupported()
    .then((supported) => (supported ? getAnalytics(app) : null))
    .catch((error) => {
      console.error("Failed to initialize analytics.", error);
      return null;
    });

  return analyticsPromise;
};

const cleanMetricParams = (params: MetricParams = {}) => {
  const cleaned: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (typeof value === "boolean") {
      cleaned[key] = value ? 1 : 0;
    } else if (typeof value === "string") {
      cleaned[key] = value.slice(0, 100);
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
};

export const trackMetric = (name: string, params: MetricParams = {}) => {
  void getOptionalAnalytics()
    .then((analytics) => {
      if (!analytics) return;
      logEvent(analytics, name, cleanMetricParams(params));
    })
    .catch((error) => {
      console.error("Failed to send analytics event.", error);
    });
};

export const setMetricUserProperties = (params: MetricParams) => {
  void getOptionalAnalytics()
    .then((analytics) => {
      if (!analytics) return;
      const properties: Record<string, string> = {};

      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        properties[key] = String(value).slice(0, 36);
      }

      setUserProperties(analytics, properties);
    })
    .catch((error) => {
      console.error("Failed to set analytics properties.", error);
    });
};

export const observeWebVitals = () => {
  if (
    typeof window === "undefined" ||
    typeof PerformanceObserver === "undefined"
  ) {
    return () => {};
  }

  const observers: PerformanceObserver[] = [];
  let largestContentfulPaint = 0;
  let cumulativeLayoutShift = 0;
  let worstInteraction = 0;

  const observe = (
    type: string,
    callback: (entries: PerformanceEntry[]) => void,
    options: PerformanceObserverInit = {},
  ) => {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true, ...options });
      observers.push(observer);
    } catch (error) {
      console.error(`Failed to observe ${type}.`, error);
    }
  };

  observe("paint", (entries) => {
    for (const entry of entries) {
      if (entry.name === "first-contentful-paint") {
        trackMetric("perf_fcp", {
          fcp_ms: Math.round(entry.startTime),
        });
      }
    }
  });

  observe("largest-contentful-paint", (entries) => {
    const last = entries.at(-1);
    if (last) {
      largestContentfulPaint = last.startTime;
    }
  });

  observe("layout-shift", (entries) => {
    for (const entry of entries) {
      const layoutShift = entry as PerformanceEntry & {
        hadRecentInput?: boolean;
        value?: number;
      };
      if (!layoutShift.hadRecentInput) {
        cumulativeLayoutShift += layoutShift.value ?? 0;
      }
    }
  });

  observe(
    "event",
    (entries) => {
      for (const entry of entries) {
        const eventEntry = entry as PerformanceEntry & {
          duration?: number;
          interactionId?: number;
        };
        if (eventEntry.interactionId) {
          worstInteraction = Math.max(
            worstInteraction,
            eventEntry.duration ?? 0,
          );
        }
      }
    },
    { durationThreshold: 40 } as PerformanceObserverInit,
  );

  window.setTimeout(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;

    if (!navigation) return;

    trackMetric("perf_navigation", {
      dom_complete_ms: Math.round(navigation.domComplete),
      load_ms: Math.round(navigation.loadEventEnd),
      transfer_kb: Math.round((navigation.transferSize ?? 0) / 1024),
    });
  }, 0);

  const reportSummary = () => {
    trackMetric("perf_web_vitals", {
      lcp_ms: Math.round(largestContentfulPaint),
      cls_milli: Math.round(cumulativeLayoutShift * 1000),
      inp_ms: Math.round(worstInteraction),
    });
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      reportSummary();
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    reportSummary();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    for (const observer of observers) {
      observer.disconnect();
    }
  };
};

export const watchAuthUser = (callback: (user: User | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
};

export const signInWithGoogle = async () => {
  if (!auth) return;
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const signOutUser = async () => {
  if (!auth) return;
  await signOut(auth);
};

export type SyncedProgress = {
  answers: Record<string, unknown>;
  // メモは {text, updatedAt} 形式で保存する。旧 string 形式も読込時に移行する（mergeNotes が両対応）。
  notes?: Record<string, NoteEntry | string>;
  dailyLog?: Record<string, { answered: number; correct: number }>;
  studyLogExports?: Record<string, string>;
  updatedAt: string;
};

export type Coaching = {
  generatedAt: string;
  examDate: string;
  verdict: "green" | "yellow" | "red";
  verdictLine: string;
  headline: string;
  advice: string;
  todayMustDo: { label: string; detail: string }[];
};

type SyncWriteMode = "merge" | "replace";

const answerTime = (record: unknown) => {
  if (!record || typeof record !== "object" || !("answeredAt" in record)) {
    return "";
  }

  const answeredAt = record.answeredAt;
  return typeof answeredAt === "string" ? answeredAt : "";
};

const mergeSyncedProgress = (
  local: SyncedProgress,
  remote: SyncedProgress,
): SyncedProgress => {
  const answers: Record<string, unknown> = { ...(remote.answers ?? {}) };

  for (const [id, record] of Object.entries(local.answers ?? {})) {
    const remoteRecord = answers[id];
    if (!remoteRecord || answerTime(record) >= answerTime(remoteRecord)) {
      answers[id] = record;
    }
  }

  // メモは updatedAt が新しい方を採る（旧 string 形式も両対応）。純粋関数はテスト済み。
  const notes: Record<string, NoteEntry> = mergeNotes(
    local.notes,
    remote.notes,
  );

  const dailyLog = { ...(remote.dailyLog ?? {}) };

  for (const [key, day] of Object.entries(local.dailyLog ?? {})) {
    const remoteDay = dailyLog[key];
    if (!remoteDay || day.answered >= remoteDay.answered) {
      dailyLog[key] = day;
    }
  }

  const studyLogExports = { ...(remote.studyLogExports ?? {}) };

  for (const [key, exportedAt] of Object.entries(local.studyLogExports ?? {})) {
    const remoteExportedAt = studyLogExports[key];
    if (!remoteExportedAt || exportedAt > remoteExportedAt) {
      studyLogExports[key] = exportedAt;
    }
  }

  return {
    answers,
    notes,
    dailyLog,
    studyLogExports,
    updatedAt: local.updatedAt,
  };
};

export const fetchSyncedProgress = async (
  uid: string,
): Promise<SyncedProgress | null> => {
  if (!db) return null;
  const snapshot = await getDoc(doc(db, "progress", uid));
  return snapshot.exists() ? (snapshot.data() as SyncedProgress) : null;
};

export const fetchCoaching = async (uid: string): Promise<Coaching | null> => {
  if (!db) return null;
  const snapshot = await getDoc(doc(db, "coaching", uid));
  return snapshot.exists() ? (snapshot.data() as Coaching) : null;
};

export const pushSyncedProgress = async (
  uid: string,
  data: SyncedProgress,
  mode: SyncWriteMode = "merge",
) => {
  if (!db) return;
  const ref = doc(db, "progress", uid);

  if (mode === "replace") {
    await setDoc(ref, data);
    return;
  }

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (!snapshot.exists()) {
      transaction.set(ref, data);
      return;
    }

    transaction.set(
      ref,
      mergeSyncedProgress(data, snapshot.data() as SyncedProgress),
    );
  });
};
