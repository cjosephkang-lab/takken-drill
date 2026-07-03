import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 環境変数が無い（.env未設定）場合は同期機能自体を無効化し、
// 従来通りlocalStorageのみで動かす。
export const isSyncConfigured = Boolean(firebaseConfig.apiKey);

const app = isSyncConfigured ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

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
  notes?: Record<string, string>;
  dailyLog?: Record<string, { answered: number; correct: number }>;
  updatedAt: string;
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

  const notes: Record<string, string> = { ...(remote.notes ?? {}) };

  for (const [id, note] of Object.entries(local.notes ?? {})) {
    if (note) {
      notes[id] = note;
    }
  }

  const dailyLog = { ...(remote.dailyLog ?? {}) };

  for (const [key, day] of Object.entries(local.dailyLog ?? {})) {
    const remoteDay = dailyLog[key];
    if (!remoteDay || day.answered >= remoteDay.answered) {
      dailyLog[key] = day;
    }
  }

  return {
    answers,
    notes,
    dailyLog,
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
