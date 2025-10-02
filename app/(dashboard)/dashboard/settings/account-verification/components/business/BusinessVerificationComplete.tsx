import styles from "./BusinessVerificationComplete.module.scss";


const BusinessVerificationComplete = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Business is Under Review!</h3>
      <p className={styles.description}>
        Thank you for submitting your business verification. We will review your
        documents and notify you once your business is verified. You’ll gain
        access to business features and a Verified Business Badge upon approval.
      </p>
    </div>
  );
};

export default BusinessVerificationComplete;
