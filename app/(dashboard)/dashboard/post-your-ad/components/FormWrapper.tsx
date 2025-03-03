"use client";
import Button from "@/components/Buttons";
import useFormStore from "../store/useFormStore";
import styles from "./FormWrapper.module.scss";
import FormProgressBar from "./FormProgressBar";
import { SubmitHandler, useFormContext } from "react-hook-form";
import useEditStore from "../store/useEditStore";
import useUploadMediaStore from "../store/useUploadMediaStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

type FormValues = {
  [key: string]: any; // Dynamic object to reflect multiple steps' data
};

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  const router = useRouter();
  const { isEditMode, setIsEditMode } = useEditStore();
  const {
    uploadPhotos,
    setUploadPhotos,
    reorderPhotos,
    setReorderPhotos,
    uploadVideos,
    setUploadVideos,
    uploadAttachments,
    setUploadAttachments,
  } = useUploadMediaStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useFormContext();

  const {
    message,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    setCurrentStepIndex,
    next,
    back,
    goTo,
    steps,
  } = useFormStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data); // This logs the form data after validation
  };

  const handleNext = () => {
    next(trigger, handleSubmit, onSubmit); // Trigger validation before proceeding
    setUploadPhotos(false);
    setReorderPhotos(false);
    setUploadVideos(false);
    setUploadAttachments(false);
  };

  const handleBack = () => {
    if (currentStepIndex === 8) {
      goTo(10);
    }

    if (currentStepIndex === 9) {
      goTo(7);
    }
    back();
    setUploadPhotos(false);
    setReorderPhotos(false);
    setUploadVideos(false);
    setUploadAttachments(false);
  };

  const topButtonText = isEditMode
    ? "Accept Changes"
    : isLastStep
    ? "Publish My Listing"
    : currentStepIndex === 8
    ? "Review Your Listing"
    : "Proceed";

  const bottomButtonText =
    currentStepIndex === 8 ? "Publish Immediately" : "Back";

  const nextStep = () => {
    if (isEditMode) {
      setUploadPhotos(false);
      setUploadVideos(false);
      setUploadAttachments(false);
      setIsEditMode(false);
      return goTo(9);
    }

    if (isLastStep) {
      router.push("/dashboard/post-your-ad/published");
      return;
    }

    return handleNext();
  };

  const previousStep =
    currentStepIndex === 8
      ? () => router.push("/dashboard/post-your-ad/published")
      : handleBack;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.children} style={{ overflowY: "clip" }}>
        {children}
      </div>
      <nav
        className={styles.buttons}
      >
        <Button
          className={styles.proceedButton}
          buttonChildren={topButtonText}
          buttonType={currentStepIndex === 5 ? "normal" : "primary"}
          buttonSize="large"
          name="proceed-btn"
          type="button"
          ariaLabel="Proceed Button"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={nextStep}
        />

        {currentStepIndex > 0 && (
          <Button
            className={styles.backButton}
            buttonChildren={bottomButtonText}
            buttonType="normal"
            buttonSize="large"
            name="back-btn"
            type="button"
            ariaLabel="Back Button"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={previousStep}
          />
        )}
      </nav>
      <div className={styles.progressBar}>
        <FormProgressBar
          totalSteps={steps.length}
          currentStepIndex={currentStepIndex}
        />
      </div>
    </div>
  );
};
