import { useState } from "react";
import Button from "./Buttons";
import styles from "./FeedbackOptions.module.scss";
import Modal from "./Modal";
import FeedbackForm from "./FeedbackForm";

const FeedbackOptions = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");

  const openModal = (type: string) => {
    setFeedbackType(type);
    setShowFeedbackModal(true);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.buttonContainer} ${styles.generalButtonContainer}`}
      >
        <Button
          className={styles.generalButton}
          buttonChildren="General Feedback"
          buttonType="normal"
          buttonSize="large"
          name="general-feedback-btn"
          type="button"
          ariaLabel="General Feedback Button"
          onClick={() => openModal("General Feedback")}
          autoFocus={false}
          disabled={false}
        />
      </div>
      <div
        className={`${styles.buttonContainer} ${styles.featureButtonContainer}`}
      >
        <Button
          className={styles.featureButton}
          buttonChildren="Feature Request"
          buttonType="normal"
          buttonSize="large"
          name="feature-request-btn"
          type="button"
          ariaLabel="Feature Request Button"
          onClick={() => openModal("Feature Request")}
          autoFocus={false}
          disabled={false}
        />
      </div>
      <div
        className={`${styles.buttonContainer} ${styles.bugReportButtonContainer}`}
      >
        <Button
          className={styles.bugReportButton}
          buttonChildren="Bug Report"
          buttonType="normal"
          buttonSize="large"
          name="bug-report-btn"
          type="button"
          ariaLabel="Bug Report Button"
          onClick={() => openModal("Bug Report")}
          autoFocus={false}
          disabled={false}
        />
      </div>
      <Modal
        showModal={showFeedbackModal}
        setShowModal={setShowFeedbackModal}
        modalContent={<FeedbackForm title={feedbackType} />}
      />
    </div>
  );
};

export default FeedbackOptions;
