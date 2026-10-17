// 過去問以外の教材（こざりえ一問一答・弱点の仮説○×・数字シート）の解答記録。
//
// 端末をまたいで残すため、肢別○×と同じ choiceRecords（Firestore に同期済みの map）に、
// 接頭辞付きのキーで入れる。肢別○×のキーは「r7-01#3」の形なので衝突しない。
// 以前はこれらの「正解済み・覚えた」をその端末の localStorage にだけ持っていた（間違えた記録は残していなかった）。
import type { ChoiceRecord } from "./progressExtras";

export const oxRecordKey = (questionId: string) => `ox:${questionId}`;

/** 数字シートの項目には id がないので、枠と問いの文から短いキーを作る。 */
export const numberRecordKey = (slotAndQuestion: string) => {
  let h = 2166136261;
  for (let i = 0; i < slotAndQuestion.length; i += 1) {
    h ^= slotAndQuestion.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `num:${(h >>> 0).toString(36)}`;
};

/** 以前 localStorage に置いていた「正解済み・覚えた」の一覧と、記録キーへの変換。 */
export const LEGACY_LEARNED_STORES = [
  { storageKey: "takken-kozarie-learned", toKey: oxRecordKey },
  { storageKey: "takken-weakspot-learned", toKey: oxRecordKey },
  { storageKey: "takken-numbers-learned", toKey: numberRecordKey },
] as const;

/**
 * localStorage に残っている「正解済み・覚えた」を、まだ記録がない項目に限って正解1回として足す。
 * 足すものがなければ null。
 */
export const legacyLearnedRecords = (
  records: Record<string, ChoiceRecord>,
  read: (storageKey: string) => string | null,
  answeredAt: string,
): Record<string, ChoiceRecord> | null => {
  const additions: Record<string, ChoiceRecord> = {};
  for (const store of LEGACY_LEARNED_STORES) {
    let ids: string[] = [];
    try {
      ids = JSON.parse(read(store.storageKey) ?? "[]") as string[];
    } catch {
      continue;
    }
    for (const id of ids) {
      const key = store.toKey(id);
      if (records[key] || additions[key]) continue;
      additions[key] = { ok: true, attempts: 1, lapses: 0, answeredAt };
    }
  }
  return Object.keys(additions).length > 0 ? additions : null;
};
