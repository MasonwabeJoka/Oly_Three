import VerificationFormWrapper from "./VerificationFormWrapper";
import styles from "./SecurityQuestions.module.scss";

const SecurityQuestions = () => {
  return (
    <VerificationFormWrapper title="Security Questions">
      <div className={styles.container}>
        <p className={styles.description}>
          Upload a clear image of your national ID, passport, or driver’s
          license. Make sure the document is fully visible (with no cropped
          edges), the text is clear and readable, and the document is not
          expired.
        </p>
      </div>
    </VerificationFormWrapper>
  );
};

export default SecurityQuestions;
