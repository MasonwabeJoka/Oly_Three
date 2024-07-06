"use client";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

const Modal = ({ showModal, setShowModal, modalContent }) => {
  // Close modal function
  const handleClose = () => {
    setShowModal(false);
  };

  // Prevents modal from closing when clicking inside the modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div
            className={styles.modalContent}
            onClick={handleModalContentClick}
          >
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
