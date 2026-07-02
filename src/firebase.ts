import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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
  notes: Record<string, string>;
  updatedAt: string;
};

export const fetchSyncedProgress = async (
  uid: string,
): Promise<SyncedProgress | null> => {
  if (!db) return null;
  const snapshot = await getDoc(doc(db, "progress", uid));
  return snapshot.exists() ? (snapshot.data() as SyncedProgress) : null;
};

export const pushSyncedProgress = async (uid: string, data: SyncedProgress) => {
  if (!db) return;
  await setDoc(doc(db, "progress", uid), data);
};
