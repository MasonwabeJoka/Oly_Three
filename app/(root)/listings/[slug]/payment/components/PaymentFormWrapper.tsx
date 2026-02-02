"use client";

import Button from "@/components/Buttons";
import styles from "./PaymentFormWrapper.module.scss";
import { useEffect, useState } from "react";


type FormWrapperProps = {
  children: React.ReactNode;
  title?: string;
};

export const PaymentFormWrapper = ({ children, title }: FormWrapperProps) => {
 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

 

  return (
    <div className={styles.container}>
      <div className={styles.children}>{children}</div>
      <nav className={styles.buttons}>
        <Button
          className={styles.proceedButton}
          buttonChildren="Continue To Payment"
          buttonType={"primary"}
          buttonSize="large"
          name="proceed-btn"
          type="button"
          ariaLabel="Proceed Button"
          autoFocus={false}
          disabled={false}
          dashboard
          // onClick={nextStep}
        />

        <Button
          className={styles.bottomButton}
          buttonChildren="Cancel"
          buttonType="normal"
          buttonSize="large"
          name="bottom-btn"
          type="button"
          ariaLabel="Bottom Button"
          autoFocus={false}
          disabled={false}
          dashboard
          // onClick={
          //   bottomButtonText === "Contact Seller" ? goToChat : () => back()
          // }
        />
        {/* } */}
      </nav>
      {/* <div className={styles.progressBar}>
        <FormProgressBar
          totalSteps={steps.length}
          currentStepIndex={currentStepIndex}
        />
      </div> */}
    </div>
  );
};
