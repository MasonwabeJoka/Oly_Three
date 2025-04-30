'use client'
import Modal from "./Modal";
import { useModalStore } from "@/store/modalStore";
import styles from "./ShowMenu.module.scss";
import Menu from "./Menu";

const ShowMenu = () => {
  const showMenuModal = useModalStore((state) => state.showMenuModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  return (
    <div className={styles.container}>
      <Modal
        showModal={showMenuModal}
        setShowModal={setShowMenuModal}
        modalContent={<Menu />}
      />
    </div>
  );
};

export default ShowMenu;
