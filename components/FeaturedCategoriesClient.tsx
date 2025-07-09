"use client";
import styles from "./FeaturedCategories.module.scss";
import Button from "@/components/Buttons";
import { useModalStore } from "@/store/modalStore";

const FeaturedCategoriesClient = () => {
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  return (
    <Button
      className={styles.button}
      buttonChildren="More Categories..."
      buttonSize="large"
      buttonType="normal"
      name="More Categories Button"
      type="button"
      ariaLabel="More Categories Button"
      autoFocus={false}
      disabled={false}
      onClick={() => setShowCategoriesModal(true)}
    />
  );
};

export default FeaturedCategoriesClient;