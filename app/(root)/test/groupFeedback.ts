import { Feedback, FeedbackType } from "../../../data/feedbackData";

export function groupFeedbackByType(data: Feedback[]) {
  // Initialize the accumulator with all possible FeedbackType values
  const initialAccumulator: Record<FeedbackType, Feedback[]> = {
    "All": [],
    "General": [],
    "Feature Request": [],
    "Bug Report": [],
    "Report Listing": []
  };

  return data.reduce<Record<FeedbackType, Feedback[]>>(
    (acc, item) => {
      // Only add to the specific type, not to "All"
      if (item.type !== "All") {
        acc[item.type].push(item);
      }
      return acc;
    },
    { ...initialAccumulator } // Spread to create a new object
  );
}
