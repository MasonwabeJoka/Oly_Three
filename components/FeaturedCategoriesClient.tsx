"use client";
import styles from "./FeaturedCategoriesClient.module.scss";
import Button from "@/components/Buttons";
import { useModalStore } from "@/store/modalStore";
import LinkCard from "@/components/cards/LinkCard";
import Link from "next/link";

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
      <ul className={styles.categoriesContainer}>
        {categories.slice(0, 12).map((category) => {
          const { _id: id, title, image } = category;
          return (
            <li key={id}>
          
              <Link href={`/listings/?category=${title.toLocaleLowerCase()}`}>
                <LinkCard label={title} cardSize="large" image={image} />
              </Link>
            </li>
          );
        })}
      </ul>
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
