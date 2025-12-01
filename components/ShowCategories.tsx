"use client";
import styles from "./ShowCategories.module.scss";
import Modal from "./Modal";
import { useModalStore } from "@/store/modalStore";
import CategoriesClient from "./CategoriesClient";
interface CategoryItem {
  _id: string;
  title: string | null;
  slug: { current: string | null } | null;
  secondLevelSubcategories?: Array<{
    _id: string;
    title: string | null;
    slug: { current: string | null } | null;
  }> | null;
  thirdLevelSubcategories?: Array<{
    _id: string;
    title: string | null;
    slug: { current: string | null } | null;
  } | null> | null;
}

type ShowCategoriesProps = {
  categories: CategoryItem[] | null | undefined;
};

const ShowCategories = ({ categories }: ShowCategoriesProps) => {
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  // Only render the modal if categories are available
  return (
    <div className={styles.container}>
      {categories && categories.length > 0 && (
        <Modal
          showModal={showCategoriesModal}
          setShowModal={setShowCategoriesModal}
          modalContent={<CategoriesClient categories={categories} />}
        />
      )}
    </div>
  );
};

export default ShowCategories;
