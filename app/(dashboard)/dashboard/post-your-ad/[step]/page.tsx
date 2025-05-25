"use client";
import Dashboard from "@/components/Dashboard"; // Adjust path to your Dashboard component
import { useFormStore } from "@/components/store/useFormStore";
import { useEffect } from "react";

export default function PostYourAdPage({ params }: { params: { step: string } }) {
  const { setCurrentStepIndex, steps } = useFormStore();

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
    const stepIndex = stepMap[params.step] ?? 0; // Default to step 0 if invalid
    setCurrentStepIndex(stepIndex);
  }, [params.step, setCurrentStepIndex]);

  return <Dashboard />;
}