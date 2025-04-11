"use client";
import Icon from "./Icon";
import styles from "./Modal.module.scss";
import { useEffect } from "react";
// Todo: Consider adding logo that takes you to home screen to modal
type Props = {
  showModal: boolean; // Boolean to show or hide the modal
  setShowModal: (value: boolean) => void; // Function to close the modal
  modalContent: JSX.Element; // JSX element to render inside the modal
};

const Modal = ({ showModal, setShowModal, modalContent }: Props) => {
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
          <div className={styles.exitButtonContainer}>
            <div className={styles.exitButton}>
              <Icon src="/icons/x.png" alt="exit Icon" width={20} height={20} />
            </div>
          </div>
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
