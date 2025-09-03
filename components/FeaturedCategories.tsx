"use client";
import styles from "./FeaturedCategories.module.scss";
import Button from "@/components/Buttons";
import { useModalStore } from "@/store/modalStore";
import LinkCard from "@/components/cards/LinkCard";
import Link from "next/link";
import { FeaturedCategoriesSectionQueryResult } from "@/sanity/types";

export type FeaturedCategoriesProps = {
  data: FeaturedCategoriesSectionQueryResult;
};

type Category = {
  _id: string;
  overrideTitle: string;
  overrideUrl: string;
  overrideImage: string;
  image: string;
}

const FeaturedCategories = ({
  data,
}: FeaturedCategoriesProps) => {
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  const {featuredCategories } = data;
  return (
    <div className={styles.categoriesSection}>
      <ul className={styles.categoriesContainer}>
        {featuredCategories.slice(0, 12).map((category, index) => {
          const { _id, overrideTitle: title, displayImage: image } = category;
          return (
            <li key={_id || `category-${index}`}>
          
              <Link href={`/listings/?category=${title.toLocaleLowerCase()}`}>
                <LinkCard label={title} cardSize="large" image={featuredCategories[index].displayImage} />
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

export default FeaturedCategories;
