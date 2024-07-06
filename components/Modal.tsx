"use client";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  modalContent: JSX.Element;
  dashboard?: boolean;
};

const Modal = ({
  showModal,
  setShowModal,
  modalContent,
  dashboard = false,
}: Props) => {
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
        <div
          className={styles.modalOverlay}
          onClick={handleClose}
          style={
            { 
              
              left: dashboard? "50%" : "0",
              transform: dashboard ? "translateX(-34.5%)" : "none",
              width: dashboard ? "57vw" : "100vw",

            }
        }
        >
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
