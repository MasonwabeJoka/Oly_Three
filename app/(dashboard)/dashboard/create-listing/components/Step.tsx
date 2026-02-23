"use client";
import React, { useEffect } from "react";
import styles from "./Step.module.scss";
import Button from "@/components/Buttons";
import useIsSelectOpen from "../store/useIsSelectOpen";
import useEditStore from "../store/useEditStore";
import { useRouter, useSearchParams } from "next/navigation";

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
  const { isEditMode, setIsEditMode } = useEditStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditFromUrl = searchParams.get('edit') === 'true';
  const effectiveEditMode = isEditMode || isEditFromUrl;

  // Sync URL param with Zustand state
  useEffect(() => {
    if (isEditFromUrl && !isEditMode) {
      setIsEditMode(true);
    }
  }, [isEditFromUrl, isEditMode, setIsEditMode]);

  const handleAcceptChanges = () => {
    const pathParts = window.location.pathname.split('/');
    const site = pathParts[3];
    setIsEditMode(false);
    router.push(`/dashboard/create-listing/${site}/review-and-submit`);
  };

  let proceedButtonText = "";

  if (effectiveEditMode) {
    proceedButtonText = "Accept Changes";
  } else {
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
  }

  let backButtonText = "";
  if (effectiveEditMode) {
    backButtonText = "Cancel";
  } else {
    switch (step.path) {
      case "review-listing":
        backButtonText = "Publish Immediately";
        break;
      default:
        backButtonText = "Back";
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.content}>{step.content}</div>
      
          <div className={styles.buttonsContainer}>

         
          <div className={styles.buttons}>
            {(!isFirstStep || effectiveEditMode) && (
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
                onClick={effectiveEditMode ? handleAcceptChanges : onNext}
              />
            )}
            {(!isFirstStep || effectiveEditMode) && (
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
                onClick={effectiveEditMode ? handleAcceptChanges : onBack}
              />
            )}
          </div>
          </div>
        
        
      </div>
    </div>
  );
};

export default Step;
