"use client";
import styles from "./styles.module.scss";
import VerifyYourAccount from "./components/VerifyYourAccount";
import SecurityQuestions from "./components/SecurityQuestions";
import QrScanner from "./components/QrScanner";
import IdPassport from "./components/IdPassport";
import SelfieVerification from "./components/SelfieVerification";
import MobileVerification from "./components/MobileVerification";
import Finish from "./components/Finish";
import useVerificationStore from "./store/useVerificationStore";

const AccountVerification = () => {
  const { currentStepIndex, steps } = useVerificationStore();
  return (
    <form className={styles.container}>
      <div className={styles.form}>
        {currentStepIndex === 0 && <VerifyYourAccount />}
        {currentStepIndex === 1 && <QrScanner />}
        {currentStepIndex === 2 && <IdPassport />}
        {currentStepIndex === 3 && <SecurityQuestions />}
        {currentStepIndex === 4 && <SelfieVerification />}
        {currentStepIndex === 5 && <MobileVerification />}
        {currentStepIndex === 6 && <Finish />}
      </div>
    </form>
  );
};

export default AccountVerification;
