"use client";
import { useState } from "react";
import Button from "@/components/Button";
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
        children="Please give us your feedback"
        buttonVariant="primary"
        buttonSize="large"


        ariaLabel="Open Feedback Form"
        onClick={openModal}


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