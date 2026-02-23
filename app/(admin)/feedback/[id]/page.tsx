"use client";
import FeedbackDetails from "@/components/FeedbackDetails";
import { feedbackData } from '@/data/feedbackData';

interface PageProps {
  params: { id: string };
}

const Page = ({params}: PageProps) => {
  const { id } = params;
  const feedback = feedbackData.find(item => String(item.id) === id);

  if (!feedback) {
    return <div>Feedback not found</div>;
  }

  return <FeedbackDetails {...feedback} />;
};

export default Page;