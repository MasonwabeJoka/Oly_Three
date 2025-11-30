"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./UrlMultiStepForm.module.scss";
import LoadingSpinner from "./LoadingSpinner";
import Step from "./Step";

import { useUrlMultiStepForm } from "@/hooks/useUrlMultiStepNavigation";
import FormProgressBar from "@/app/(dashboard)/dashboard/create-listing/components/FormProgressBar";

type StepConfig<T> = {
  title: string;
  content: React.ReactNode;
  path: string;
  fields?: (keyof T)[];
};

type UrlMultiStepFormProps<T extends Record<string, any>> = {
  steps: StepConfig<T>[];
  basePath: string;
  schema: z.ZodSchema<T>;
  onSubmit?: (data: T) => Promise<void>;
  startScreen?: React.ReactNode;
  progressBar?: boolean;
};

export default function UrlMultiStepForm<T extends Record<string, any>>({
  steps,
  basePath,
  schema,
  startScreen,
  onSubmit = async () => {},
  progressBar,
}: UrlMultiStepFormProps<T>) {
  const methods = useForm<T>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { trigger, getValues, setError, reset } = methods;

  const { currentIndex, isClient, handleNext, handleBack, isLastStep } =
    useUrlMultiStepForm<T>({
      steps,
      basePath,
      onSubmit,
      trigger: trigger as any,
      getValues,
      setError,
      reset,
    });

  if (!isClient) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  const currentStep = steps[currentIndex ?? 0];

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        {methods.formState.errors.root && (
          <p className={styles.error}>
            {methods.formState.errors.root.message}
          </p>
        )}

        {startScreen}

        <Step
          step={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          isFirstStep={currentIndex === 0}
          isLastStep={isLastStep}
        />

        {progressBar && (
          <FormProgressBar
            currentStepIndex={currentIndex ?? 0}
            totalSteps={steps.length}
          />
        )}
      </div>
    </FormProvider>
  );
}
