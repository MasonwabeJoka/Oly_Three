"use client";
import styles from "./FeaturedCategories.module.scss";
import Button from "@/components/Buttons";
import { useModalStore } from "@/store/modalStore";
import LinkCard from "@/components/cards/LinkCard";

export type FeaturedCategoriesClientProps = {
  categories: Array<{ _id: string; title: string; image: string }>;
};

const FeaturedCategoriesClient = ({
  categories,
}: FeaturedCategoriesClientProps) => {
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.categoriesContainer}>
        {categories.slice(0, 12).map((category) => (
          <LinkCard
            key={category._id}
            label={category.title}
            cardSize="large"
            image={category.image}
          />
        ))}
      </div>
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
    </div>
  );
};

export default FeaturedCategoriesClient;
