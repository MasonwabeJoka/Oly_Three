"use client";
import React from "react";
import styles from "./Step.module.scss";
import Button from "@/components/Buttons";
import useIsSelectOpen from "../store/useIsSelectOpen";

interface StepType {
  title: string;
  content: React.ReactNode;
  path: string;
}

interface StepProps {
  step: StepType;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const Step: React.FC<StepProps> = ({
  step,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
  const { isSelectOpen } = useIsSelectOpen();

  let proceedButtonText = "";

  switch (step.path) {
    case "review-listing":
      proceedButtonText = "Review Listing";
      break;
    case "review-and-submit":
      proceedButtonText = "Publish My Listing";
      break;
    default:
      proceedButtonText = "Proceed";
      break;
  }

  let backButtonText = "";
  switch (step.path) {
    case "review-listing":
      backButtonText = "Publish Immediately";
      break;
    default:
      backButtonText = "Back";
      break;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.content}>{step.content}</div>
        {!isSelectOpen && (
          <div className={styles.buttonsContainer}>

         
          <div className={styles.buttons}>
            {!isFirstStep && (
              <Button
                className={styles.proceedButton}
                buttonChildren={proceedButtonText}
                buttonType="primary"
                buttonSize="large"
                name="proceed-btn"
                type="button"
                ariaLabel="Proceed Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={onNext}
              />
            )}
            {!isFirstStep && (
              <Button
                className={styles.backButton}
                buttonChildren={backButtonText}
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="button"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={onBack}
              />
            )}
          </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Step;
