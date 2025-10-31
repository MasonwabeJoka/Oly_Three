"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./MultiStepForm.module.scss";
import LoadingSpinner from "./LoadingSpinner";
import Step from "./Step";
import FormProgressBar from "@/app/(dashboard)/dashboard/create-listing/components/FormProgressBar";

type StepConfig<T> = {
  title: string;
  content: React.ReactNode;
  fields?: (keyof T)[];
};

type MultiStepFormProps<T extends Record<string, any>> = {
  steps: StepConfig<T>[];
  schema: z.ZodSchema<T>;
  onSubmit?: (data: T) => Promise<void>;
  progressBar?: boolean;
};

export default function MultiStepForm<T extends Record<string, any>>({
  steps,
  schema,
  onSubmit = async () => {},
  progressBar = true,
}: MultiStepFormProps<T>) {
  const methods = useForm<T>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { trigger, getValues, setError, reset, formState } = methods;
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const goTo = (idx: number) => {
    setCurrentIdx(idx);
  };

  const handleNext = async () => {
    const fields = steps[currentIdx].fields ?? [];
    const isValid = fields.length ? await trigger(fields) : true;

    if (!isValid) return;

    if (currentIdx < steps.length - 1) {
      goTo(currentIdx + 1);
    } else {
      try {
        await onSubmit(getValues());
        // Optional: reset or redirect
      } catch (err) {
        console.error("Submit failed:", err);
        setError("root", { message: "Submission failed. Please try again." });
      }
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      goTo(currentIdx - 1);
    } else {
      reset();
    }
  };



  if (!isClient) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }



  const currentStep = steps[currentIdx];
  const isLastStep = currentIdx === steps.length - 1;
  const isFirstStep = currentIdx === 0;

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        {formState.errors.root && (
          <p className={styles.error}>
            {formState.errors.root.message}
          </p>
        )}

        <Step
          step={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
        />

        {progressBar && (
          <FormProgressBar
            currentStepIndex={currentIdx}
            totalSteps={steps.length}
          />
        )}
      </div>
    </FormProvider>
  );
}