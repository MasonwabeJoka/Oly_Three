"use client";

import styles from "./FeaturedCategories.module.scss";
import Button from "@/components/Buttons";
import { useModalStore } from "@/store/modalStore";
import LinkCard from "@/components/cards/LinkCard";
import Link from "next/link";
import { urlFor } from "@/server/sanity/lib/image";

type FeaturedCategory = {
  id?: string;
  title?: string | null;
  displayTitle?: string | null;
  image?: any;
};

type Props = {
  data: FeaturedCategory[];
};

const FeaturedCategoriesClient = ({ data }: Props) => {
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  return (
    <div className={styles.categoriesSection}>
      <h2 className={styles.title}>Featured Categories</h2>
      <ul className={styles.categoriesContainer}>
        {data?.slice(0, 12).map((category, index) => {
          const { id, title, displayTitle, image } = category;
          return (
            <li key={id || `category-${index}`}>
              <Link
                href={`/listings/?category=${title?.toLocaleLowerCase()}#tabsContainer`}
              >
                <LinkCard
                  label={displayTitle || title || ""}
                  cardSize="large"
                  image={image ? urlFor(image).url() : ""}
                />
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
