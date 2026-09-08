import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./FeedbackOptions.module.scss";
import Modal from "./Modal";
import FeedbackForm from "./FeedbackForm";
import { useRouter } from "next/navigation";

const FeedbackOptions = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [closeAllModals, setCloseAllModals] = useState(false);
  const router = useRouter();

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
          children="General Feedback"
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="General Feedback Button"
          onClick={() => openModal("General Feedback")}


        />
      </div>
      <div
        className={`${styles.buttonContainer} ${styles.featureButtonContainer}`}
      >
        <Button
          className={styles.featureButton}
          children="Feature Request"
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Feature Request Button"
          onClick={() => openModal("Feature Request")}


        />
      </div>
      <div
        className={`${styles.buttonContainer} ${styles.bugReportButtonContainer}`}
      >
        <Button
          className={styles.bugReportButton}
          children="Bug Report"
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Bug Report Button"
          onClick={() => openModal("Bug Report")}


        />
      </div>
      {showFeedbackModal && (
        <Modal
          showModal={showFeedbackModal}
          setShowModal={setShowFeedbackModal}
          modalContent={<FeedbackForm title={feedbackType} />}
          reload
          closeAllModals={closeAllModals}
        />
      )}
    </div>
  );
};

export default FeedbackOptions;
