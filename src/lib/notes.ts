export const notesModuleReady = true;

// 端末ローカルの日付キー（YYYY-MM-DD）。getFullYear/Month/Date はローカルTZで解釈される。
// updatedAt(UTC ISO) を当日判定する時は new Date(iso) を渡してローカル日付に写す。
export const localDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export type NoteEntry = { text: string; updatedAt: string };

export const normalizeNote = (raw: unknown): NoteEntry => {
  if (typeof raw === "string") {
    return { text: raw, updatedAt: "" };
  }
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    const text = typeof obj.text === "string" ? obj.text : "";
    const updatedAt = typeof obj.updatedAt === "string" ? obj.updatedAt : "";
    return { text, updatedAt };
  }
  return { text: "", updatedAt: "" };
};

export const normalizeNotes = (raw: unknown): Record<string, NoteEntry> => {
  if (!raw || typeof raw !== "object") return {};
  const result: Record<string, NoteEntry> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    result[id] = normalizeNote(value);
  }
  return result;
};

export const mergeNotes = (
  local: unknown,
  remote: unknown,
): Record<string, NoteEntry> => {
  const localNotes = normalizeNotes(local);
  const remoteNotes = normalizeNotes(remote);
  const merged: Record<string, NoteEntry> = { ...remoteNotes };

  for (const [id, localEntry] of Object.entries(localNotes)) {
    const remoteEntry = merged[id];
    if (!remoteEntry) {
      merged[id] = localEntry;
      continue;
    }
    // updatedAt(ISO文字列)は辞書順=時系列順。新しい方を採る。
    // 空文字の updatedAt（旧データ移行分・削除した空メモ）は必ず時刻ありに負けるため、
    // 削除は端末間で伝播しない（他端末の実メモを消さない安全側の設計。削除同期はスコープ外）。
    if (localEntry.updatedAt > remoteEntry.updatedAt) {
      merged[id] = localEntry;
    } else if (
      localEntry.updatedAt === remoteEntry.updatedAt &&
      !remoteEntry.text &&
      localEntry.text
    ) {
      // updatedAt が同値（旧データ同士など）なら、非空テキストを優先する。
      merged[id] = localEntry;
    }
  }

  return merged;
};

export type NoteExportItem = {
  heading: string;
  text: string;
  updatedAt: string;
};

export type DailyAnswerSummary = { answered: number; correct: number };

export const buildStudyLogMarkdown = (
  items: NoteExportItem[],
  dateKey: string,
  summary?: DailyAnswerSummary,
): string => {
  const header = `# 学習ログ ${dateKey}`;
  const summarySection =
    summary && summary.answered > 0
      ? `## 今日の実績\n\n解いた問題: ${summary.answered}問（正解 ${summary.correct} / 不正解 ${summary.answered - summary.correct}）\n`
      : "";

  if (items.length === 0) {
    const notesSection = "（この日のメモはありません）\n";
    return summarySection
      ? `${header}\n\n${summarySection}\n${notesSection}`
      : `${header}\n\n${notesSection}`;
  }

  const notesBody = items
    .map((item) => `## ${item.heading}\n\n${item.text}\n`)
    .join("\n");
  return summarySection
    ? `${header}\n\n${summarySection}\n${notesBody}`
    : `${header}\n\n${notesBody}`;
};

export type TodayNote = {
  id: string;
  text: string;
  updatedAt: string;
};

// 当日 updatedAt のメモ（本文あり）を id つきで古い順に返す。
// updatedAt は UTC の ISO 文字列なので、ローカル日付キーへの変換関数を注入して比較する。
export const selectTodayNotes = (
  notes: Record<string, NoteEntry>,
  dateKey: string,
  toDateKey: (iso: string) => string,
): TodayNote[] => {
  return Object.entries(notes)
    .filter(
      ([, entry]) =>
        entry.text && entry.updatedAt && toDateKey(entry.updatedAt) === dateKey,
    )
    .map(([id, entry]) => ({
      id,
      text: entry.text,
      updatedAt: entry.updatedAt,
    }))
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
};
