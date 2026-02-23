"use client";
import { useState } from "react";
import Button from "@/components/Buttons";
import Modal from "../Modal";
import FeedbackOptions from "../FeedbackOptions";
import styles from "./Footer.module.scss";

const FooterClient = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const openModal = () => {
    setShowFeedbackModal(true);
  };

  return (
    <>
      <Button
        className={styles.feedbackButton}
        buttonChildren="Please give us your feedback"
        buttonType="primary"
        buttonSize="large"
        name="feedback-btn"
        type="button"
        ariaLabel="Open Feedback Form"
        onClick={openModal}
        autoFocus={false}
        disabled={false}
      />
      <Modal
        showModal={showFeedbackModal}
        setShowModal={setShowFeedbackModal}
        modalContent={<FeedbackOptions />}
      />
    </>
  );
};

export default FooterClient;