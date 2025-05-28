"use client";
import { useEffect, use } from "react";
import useFormStore from "../store/useFormStore";

import { redirect } from "next/navigation";
import Dashboard from "../components/Dashboard";

export default function PostYourAdPage({ params: paramsPromise }: { params: Promise<{ step: string }> }) {
  const { setCurrentStepIndex } = useFormStore();

  // Unwrap params using React.use
  const params = use(paramsPromise);

  useEffect(() => {
    // Map URL slug to step index
    const stepMap: { [key: string]: number } = {
      "select-category": 0,
      "details": 1,
      "price": 2,
      "bank-account": 3,
      "title-description": 4,
      "upload-media": 5,
      "location": 6,
      "promote-ad": 7,
      "congratulations": 8,
      "review-submit": 9,
    };

    if (!(params.step in stepMap)) {
      redirect("/dashboard/post-your-ad/select-category");
    }
    const stepIndex = stepMap[params.step] ?? 0; // Default to step 0 if invalid
    setCurrentStepIndex(stepIndex);
  }, [params.step, setCurrentStepIndex]);

  return <Dashboard />;
}