"use client";
import Button from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import useEditStore from "../store/useEditStore";
import useFormStore, { FormData } from "../store/useFormStore";
import useUploadMediaStore, { resetMediaStates} from "../store/useUploadMediaStore";
import FormProgressBar from "./FormProgressBar";
import styles from "./FormWrapper.module.scss";

type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

// Custom hook for client-side rendering check
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};

// Function to determine button text
const getButtonText = (
  isEditMode: boolean,
  isLastStep: boolean,
  currentStepIndex: number
) => {
  const topText = isEditMode
    ? "Accept Changes"
    : isLastStep
    ? "Publish My Listing"
    : currentStepIndex === 8
    ? "Review Your Listing"
    : "Proceed";
  const bottomText = currentStepIndex === 8 ? "Publish Immediately" : "Back";
  return { topText, bottomText };
};



export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  const router = useRouter();
  const { isEditMode, setIsEditMode } = useEditStore();
  const { setMediaAction } = useUploadMediaStore();
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
  const { trigger, handleSubmit } = useFormContext<FormData>();
  const isClient = useIsClient();

  if (!isClient) return null;
  

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data:", data);
    // Add actual submission logic here (e.g., API call)
  };

  const handleNext = async () => {
    await next(trigger, handleSubmit, onSubmit);
    setMediaAction("none"); // Reset media state
  };

  const backTransitions: Record<number, number> = {
    8: 10, // When the current step is 8, going "back" takes you to step 10.
    9: 7,  // When the current step is 9, going "back" takes you to step 7.
  };
  
  const handleBack = () => {
    const targetStep = backTransitions[currentStepIndex] ?? currentStepIndex - 1;
    goTo(Math.max(0, targetStep)); // Ensure we don't go below 0. If less than 0, it will be 0.
    resetMediaStates(); // Reset media state
  };

  const { topText, bottomText } = getButtonText(isEditMode, isLastStep, currentStepIndex);

  const nextStep = () => {
    if (isEditMode) {
      setMediaAction("none");
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
          <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren={topText}
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
                buttonChildren={bottomText}
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
  

  

 



  