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
