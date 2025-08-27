"use client";
import styles from "./ShowCategories.module.scss";
import Modal from "./Modal";
import { useModalStore } from "@/store/modalStore";
import CategoriesClient from "./CategoriesClient";

type ShowCategoriesProps = {
  categories: any[];
};

const ShowCategories = ({ categories }: ShowCategoriesProps) => {
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
        modalContent={<CategoriesClient categories={categories} />}
      />
    </div>
  );
};

export default ShowCategories;
