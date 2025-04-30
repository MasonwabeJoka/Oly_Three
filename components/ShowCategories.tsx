"use client";
import styles from "./ShowCategories.module.scss";
import Modal from "./Modal";
import { useModalStore } from "@/store/modalStore";
import Categories from "./Categories";

const ShowCategories = () => {
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  return (
    <div className={styles.container}>
      <Modal
        showModal={showCategoriesModal}
        setShowModal={setShowCategoriesModal}
        modalContent={<Categories />}
      />
    </div>
  );
};

export default ShowCategories;
