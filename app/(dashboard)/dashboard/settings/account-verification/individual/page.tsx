"use client";
import styles from "./styles.module.scss";

import useVerificationStore from "./store/useVerificationStore";
import VerifyYourAccount from "./../../components/AccountVerification"
import QrScanner from "./../../components/QrScanner";
import IdPassport from "./../../components/IdPassport";
import SelfieVerification from "./../../components/SelfieVerification";
import MobileVerification from "./../../components/MobileVerification";
import Finish from "./../../components/Finish";

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
