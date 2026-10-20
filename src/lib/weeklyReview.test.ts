import { describe, expect, it } from "vitest";
import { takkenQuestions } from "../data/questions";
import { questionTopics } from "../data/topicTags";
import { droppedTopicIds } from "../data/droppedTopics";
import { isWeeklyReviewTarget } from "./weeklyReview";

const inDropped = takkenQuestions.find((q) =>
  droppedTopicIds.has(questionTopics[q.id]),
)!;
const notDropped = takkenQuestions.find(
  (q) => questionTopics[q.id] && !droppedTopicIds.has(questionTopics[q.id]),
)!;
const at = "2026-10-01T00:00:00.000Z";

describe("週1回の復習の対象", () => {
  it("本番で落とした論点の問題は、まだ解いていなければ対象", () => {
    expect(isWeeklyReviewTarget(inDropped, undefined, {})).toBe(true);
  });

  it("落とした論点でも、3回続けて自信ありで正解した問題は対象外", () => {
    expect(
      isWeeklyReviewTarget(
        inDropped,
        { correct: true, streak: 3, lapses: 1, answeredAt: at },
        {},
      ),
    ).toBe(false);
  });

  it("落とした論点で、最後に間違えた問題は対象", () => {
    expect(
      isWeeklyReviewTarget(
        inDropped,
        { correct: false, streak: 0, lapses: 1, answeredAt: at },
        {},
      ),
    ).toBe(true);
  });

  it("落とした論点でなくても、2回以上間違えて定着していない問題は対象", () => {
    expect(
      isWeeklyReviewTarget(
        notDropped,
        { correct: true, streak: 1, lapses: 2, answeredAt: at },
        {},
      ),
    ).toBe(true);
  });

  it("落とした論点でなく、繰り返しの誤りもない問題は対象外", () => {
    expect(isWeeklyReviewTarget(notDropped, undefined, {})).toBe(false);
  });
});
