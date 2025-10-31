import React from "react";
import Button from "./Buttons";
import styles from "./Step.module.scss";

type StepProps<T> = {
  step: { title: string; content: React.ReactNode };
  onNext: () => void;
  onBack: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  lastStepButtonText?: string;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
};

export default function Step<T>({
  step,
  onNext,
  onBack,
  nextButtonText = "Proceed",
  backButtonText = "Back",
  lastStepButtonText = "Submit",
  isFirstStep,
  isLastStep,
  hideBackButton = false,
  hideNextButton = false,
}: StepProps<T>) {
  return (
    <div className={styles.container}>
      <h2>{step.title && step.title}</h2>
      <div className={styles.content}>{step.content && step.content}</div>
      <div className={styles.buttons}>
        {!isLastStep && !hideNextButton && (
          <Button
            className={styles.proceedButton}
            buttonChildren={isLastStep ? lastStepButtonText : nextButtonText}
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
        {!isFirstStep && !hideBackButton && (
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
  );
}
