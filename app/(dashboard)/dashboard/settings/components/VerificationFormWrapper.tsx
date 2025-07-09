"use client";

import Button from "@/components/Buttons";
import styles from "./VerificationFormWrapper.module.scss";
import { useRouter } from "next/navigation";
import FormProgressBar from "@/app/(dashboard)/dashboard/post-your-ad/components/FormProgressBar";
import useVerificationStore from "../store/useVerificationStore";
import { useEffect, useState } from "react";
import Form from "next/form";

type VerificationFormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

const VerificationFormWrapper = ({
  title,
  children,
}: VerificationFormWrapperProps) => {
  const router = useRouter();
  const {
    message,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    steps,
  } = useVerificationStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const topButtonText = "Proceed";
  const bottomButtonText = "Back";

  const nextStep = () => {
    if (isLastStep) {
      router.push("/dashboard/post-your-ad/home");
      return;
    }

    return next();
  };

  const myAction = () => {
    console.log();
  };

  return (
    <div className={styles.container}>
      <Form action={myAction} className={styles.form}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.children} style={{ overflowY: "clip" }}>
          {children}
        </div>
        <nav className={styles.buttons}>
          {!isLastStep && (
            <Button
              className={styles.proceedButton}
              buttonChildren={topButtonText}
              buttonType={"primary"}
              buttonSize="large"
              name="proceed-btn"
              type="button"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={nextStep}
            />
          )}

          {!isFirstStep && (
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
              onClick={() => back()}
            />
          )}
        </nav>
      </Form>
      <div className={styles.progressBar}>
        <FormProgressBar
          totalSteps={steps.length}
          currentStepIndex={currentStepIndex}
        />
      </div>
    </div>
  );
};

export default VerificationFormWrapper;
