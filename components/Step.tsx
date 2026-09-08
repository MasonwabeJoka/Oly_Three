import React from "react";
import Button from "./Button";
import styles from "./Step.module.scss";

type StepProps<T> = {
  step: { title?: string; content: React.ReactNode };
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
  hideBackButton,
  hideNextButton,
}: StepProps<T>) {
  return (
    <div className={styles.container}>
      <h2>{step.title && step.title}</h2>
      <div className={styles.content}>{step.content && step.content}</div>
      <div className={styles.buttons}>
        {!isLastStep && !hideNextButton && (
          <Button
            className={styles.proceedButton}
            children={isLastStep ? lastStepButtonText : nextButtonText}
            buttonVariant="primary"
            buttonSize="large"


            ariaLabel="Proceed Button"


            onClick={onNext}
          />
        )}
        {!isFirstStep && !hideBackButton && (
          <Button
            className={styles.backButton}
            children={backButtonText}
            buttonVariant="normal"
            buttonSize="large"


            ariaLabel="Back Button"


            onClick={onBack}
          />
        )}
      </div>
    </div>
  );
}
