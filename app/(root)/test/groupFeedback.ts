import { Feedback, FeedbackType } from "../../../data/feedbackData";


export function groupFeedbackByType(data: Feedback[]) {
  return data.reduce<Record<FeedbackType, Feedback[]>>(
    (acc, item) => {
      acc[item.type].push(item);
      return acc;
    },
    {
      general: [],
      "feature-request": [],
      "bug-report": [],
      "report-listing": [],
    }
  );
}
