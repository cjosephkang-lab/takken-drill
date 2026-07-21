export const notesModuleReady = true;

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
    if (localEntry.updatedAt > remoteEntry.updatedAt) {
      merged[id] = localEntry;
    } else if (
      localEntry.updatedAt === remoteEntry.updatedAt &&
      !remoteEntry.text &&
      localEntry.text
    ) {
      merged[id] = localEntry;
    }
  }

  return merged;
};
