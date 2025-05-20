'use client';
import ExitButton from "./ExitButton";
import styles from "./Modal.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Todo: Consider adding logo that takes you to home screen to modal
type Props = {
  showModal: boolean; // Boolean to show or hide the modal
  setShowModal: (value: boolean) => void; // Function to close the modal
  modalContent: JSX.Element; // JSX element to render inside the modal
  path?: string; // Optional path to redirect to when modal is closed
  reload?: boolean; // Optional boolean to reload the page when modal is closed
};

const Modal = ({ showModal, setShowModal, modalContent, path, reload }: Props) => {
  const router = useRouter();
  // Close modal function
  const handleClose = () => {
    if (reload) {
      // Hide all modal overlays immediately using CSS
      const modalOverlays = document.querySelectorAll(`.${styles.modalOverlay}`);
      modalOverlays.forEach((overlay) => {
        (overlay as HTMLElement).style.display = 'none';
      });
      // Update state to close current modal (for consistency)
      setShowModal(false);
      // Redirect if path is provided
      path && router.push(path);
      // Trigger full page reload
      window.location.reload();
    } else {
      // Normal close behavior without reload
      setShowModal(false);
      path && router.push(path);
    }
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
            <ExitButton />
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