"use client";
import ExitButton from "./ExitButton";
import styles from "./Modal.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
// Todo: Consider adding logo that takes you to home screen to modal
type Props = {
  showModal: boolean; // Boolean to show or hide the modal
  setShowModal: (value: boolean) => void; // Function to close the modal
  modalContent: JSX.Element; // JSX element to render inside the modal
  path?: string; // Optional path to redirect to when modal is closed
  reload?: boolean; // Optional boolean to reload the page when modal is closed
  refresh?: boolean; // Optional boolean to refresh the page when modal is closed
  closeAllModals?: boolean; // Optional boolean to close the current modal
};

const Modal = ({
  showModal,
  setShowModal,
  modalContent,
  path,
  reload,
  refresh,
  closeAllModals,
}: Props) => {
  const router = useRouter();
const [isNavigating, setIsNavigating] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is directly on the modalOverlay, not its children except for the exit button container
    if (
      e.target === e.currentTarget ||
      e.currentTarget.className.includes(styles.exitButtonContainer)
    ) {
      if (path) {
        setShowModal(true);
         setIsNavigating(true);
        try {
          router.push(path);
        } catch (error) {
          console.error("Navigation error:", error);
          // Fallback to direct navigation if router fails
          window.location.href = path;
        }
        
      } else {

        setShowModal(false);
      }
      reload && window.location.reload();
      refresh && router.refresh();
      closeAllModals && setShowModal(false);
    }
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
          <div className={styles.exitButtonContainer}  onClick={handleClose }>
            <ExitButton />
          </div>
          <div className={styles.modalContent}> {isNavigating ? <LoadingSpinner/> : modalContent}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
