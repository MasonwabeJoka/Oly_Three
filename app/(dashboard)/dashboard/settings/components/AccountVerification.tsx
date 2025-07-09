"use client";
import useVerificationStore from "../store/useVerificationStore";
import Finish from "./Finish";
import IdPassport from "./IdPassport";
import MobileVerification from "./MobileVerification";
import QrScanner from "./QrScanner";
import SelfieVerification from "./SelfieVerification";
import styles from "./AccountVerification.module.scss";
import VerifyYourAccount from "./VerifyYourAccount";


const AccountVerification = () => {
  const { currentStepIndex, steps } = useVerificationStore();
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {currentStepIndex === 0 && <VerifyYourAccount />}
        {currentStepIndex === 1 && <QrScanner />}
        {currentStepIndex === 2 && <IdPassport />}
        {currentStepIndex === 3 && <SelfieVerification />}
        {currentStepIndex === 4 && <MobileVerification />}
        {currentStepIndex === 5 && <Finish />}
      </div>
    </div>
  );
};

export default AccountVerification;
