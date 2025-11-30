"use client";

import Button from "@/components/Buttons";
import styles from "./PaymentFormWrapper.module.scss";
import { useRouter } from "next/navigation";
import FormProgressBar from "@/app/(dashboard)/dashboard/create-listing/components/FormProgressBar";
import usePaymentProcessingStore from "../payment/store/usePaymentProcessingStore";
import { useEffect, useState } from "react";
import usePaymentModalStore from "@/app/(dashboard)/dashboard/create-listing/store/usePaymentModalStore";
// import useMessageStore from "@/features/messages/store/useMessageStore";

type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export const PaymentFormWrapper = ({ title, children }: FormWrapperProps) => {
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();
  const { setChats } = useMessageStore();
  const router = useRouter();
  const {
    message,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    steps,
  } = usePaymentProcessingStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const topButtonText =
    currentStepIndex === 0
      ? "Continue To Payment"
      : currentStepIndex === 1
        ? "Finish Payment"
        : currentStepIndex === 2
          ? "Okay"
          : "Proceed";

  const bottomButtonText = currentStepIndex === 0 ? "Contact Seller" : "Cancel";

  const nextStep = () => {
    if (isLastStep) {
      router.push("/");
      return;
    }

    return next();
  };

  const goToChat = () => {
    setShowPaymentModal(false);
    setChats(true);
  };

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

        {/* {!isLastStep &&  */}
        <Button
          className={styles.bottomButton}
          buttonChildren={bottomButtonText}
          buttonType="normal"
          buttonSize="large"
          name="bottom-btn"
          type="button"
          ariaLabel="Bottom Button"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={
            bottomButtonText === "Contact Seller" ? goToChat : () => back()
          }
        />
        {/* } */}
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
