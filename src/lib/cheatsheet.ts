import { takkenQuestions } from "../data/questions";
import { studyOrder } from "../data/studyGuide";
import { topics, questionTopics, type Topic } from "../data/topicTags";

export type AnswerLapseInput = Record<string, { attempts: number; lapses: number }>;

export type CheatSheetRow = {
  topicId: string;
  label: string;
  category: string;
  rank: number;
  priorityScore: number;
  accuracy: number | null;
  lapses: number;
  attempts: number;
  questionCount: number;
  categoryWeight: number;
  reasonLabel: string;
  untouched: boolean;
};

const UNTOUCHED_WEAKNESS = 0.6;
const LOW_WEIGHT_THRESHOLD = 2 / 3;

const questionIdsByTopic = (): Record<string, string[]> => {
  const map: Record<string, string[]> = {};
  for (const q of takkenQuestions) {
    const topicId = questionTopics[q.id];
    if (!topicId) continue;
    (map[topicId] ??= []).push(q.id);
  }
  return map;
};

const categoryWeightOf = (category: string): number => {
  const entry = studyOrder.find((c) => c.category === category);
  if (!entry) {
    throw new Error(`studyOrder has no entry for category: ${category}`);
  }
  return entry.targetScore / entry.fullMarks;
};

const reasonLabelOf = (
  untouched: boolean,
  questionCount: number,
  accuracy: number | null,
  categoryWeight: number,
): string => {
  if (untouched && questionCount >= 3) return "未着手・頻出";
  if (untouched) return "未着手";
  if (accuracy !== null && accuracy < 0.5 && questionCount >= 3) return "頻出なのに苦手";
  if (accuracy !== null && accuracy < 0.5) return "苦手";
  if (categoryWeight <= LOW_WEIGHT_THRESHOLD) return "優先度低め（配点効率が低い科目）";
  return "順調";
};

export function computeCheatSheet(answers: AnswerLapseInput): CheatSheetRow[] {
  const idsByTopic = questionIdsByTopic();

  const rows = topics.map((topic: Topic, index: number) => {
    const questionIds = idsByTopic[topic.id] ?? [];
    const questionCount = questionIds.length;

    let attempts = 0;
    let lapses = 0;
    for (const qid of questionIds) {
      const a = answers[qid];
      if (!a) continue;
      attempts += a.attempts;
      lapses += a.lapses;
    }

    const untouched = attempts === 0;
    const accuracy = untouched ? null : Math.max(0, 1 - lapses / attempts);
    const weakness = untouched ? UNTOUCHED_WEAKNESS : 1 - accuracy!;
    const categoryWeight = categoryWeightOf(topic.category);
    const priorityScore = weakness * questionCount * categoryWeight;
    const reasonLabel = reasonLabelOf(untouched, questionCount, accuracy, categoryWeight);

    return {
      topicId: topic.id,
      label: topic.label,
      category: topic.category,
      rank: 0,
      priorityScore,
      accuracy,
      lapses,
      attempts,
      questionCount,
      categoryWeight,
      reasonLabel,
      untouched,
      __originalIndex: index,
    };
  });

  rows.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
    if (b.questionCount !== a.questionCount) return b.questionCount - a.questionCount;
    return a.__originalIndex - b.__originalIndex;
  });

  return rows.map((row, i) => {
    const { __originalIndex, ...rest } = row;
    return { ...rest, rank: i + 1 };
  });
}
