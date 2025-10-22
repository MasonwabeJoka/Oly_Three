"use client";
import { feedbackData } from "../../../../data/feedbackData";
import { groupFeedbackByType } from "../groupFeedback";

export default function FeedbackBoard() {
  const grouped = groupFeedbackByType(feedbackData);

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([type, feedbacks]) => (
        <section key={type}>
          <h2 className="text-xl font-bold capitalize mb-4">
            {type.replace("-", " ")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedbacks.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => alert(item.description)} // replace with modal or drawer
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.author ?? "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
