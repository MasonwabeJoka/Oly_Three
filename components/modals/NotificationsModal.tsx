import styles from "./NotificationsModal.module.scss";
import Modal from "@/components/Modal.tsx";
import Menu from "@/components/Menu";
import { useEffect, useRef } from "react"; // Import useRef
import { useNotificationsModalStore } from "@/store/modalStore";

const NotificationsModal = () => {
  const showModal = useNotificationsModalStore((state) => state.showModal);
  const setShowModal = useNotificationsModalStore(
    (state) => state.setShowModal
  );

  const modalRef = useRef<HTMLDivElement | null>(null); // Declare the ref type

  useEffect(() => {
    const modalContainer = modalRef.current;

    function handleOffScreen({
      modalTop,
      modalBottom,
    }: {
      modalTop: boolean;
      modalBottom: boolean;
    }) {
      if (modalTop) {
        setShowModal(false);
      }
      if (modalBottom) {
        setShowModal(false);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const modal = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // Calculate 10% of the element's height
        const tenPercentOfModalHeight =
          (entry.target as HTMLDivElement).offsetHeight * 0.25; // Use type assertion here

        let modalTop = modal.top < -tenPercentOfModalHeight;
        let modalBottom =
          modal.bottom > viewportHeight + tenPercentOfModalHeight;

        if (modalTop || modalBottom) {
          handleOffScreen({ modalTop, modalBottom });
        }
      },
      { rootMargin: "-25% 0px" }
    ); // Set rootMargin here

    if (modalContainer) {
      observer.observe(modalContainer);
    }

    // Cleanup function to unobserve when the component unmounts
    return () => {
      if (modalContainer) {
        observer.unobserve(modalContainer);
      }
    };
  }, []);

  const parentClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const clickedElement = event.target as HTMLDivElement; // Type assertion

    // Check if the clicked element has modal id"
    if (clickedElement.id === "modal") {
      setShowModal(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className={styles.container}
      onClick={parentClickHandler}
      
    >
      <Modal
        modalContent={<Menu />}
        showModal={showModal}
        id="modal"
      />
    </div>
  );
};

export default NotificationsModal;
