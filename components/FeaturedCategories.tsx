"use client";
import styles from "./FeaturedCategories.module.scss";
import { useEffect, useState } from "react";
import LinkCard from "@/components/cards/LinkCard";
import { categories } from "@/data/CategoriesData";
import Button from "@/components/Buttons";
import useTitleStore from "@/store/titleStore";
import { useModalStore } from "@/store/modalStore";
import { getTopCategories } from "@/sanity/actions/topCategoriesActions";
import { FeaturedCategoriesData } from "@/data/featuredCategoriesData";
import { Category } from "@/sanity/Types/Category";

const FeaturedCategories = () => {
  const [fetchedCategories, setFetchedCategories] = useState<any>([]);
  const Title = useTitleStore((state) => state.Title);
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await Promise.all(
        FeaturedCategoriesData.map(async (category: any) => {
          return await getTopCategories(category.fetch);
        })
      );

      setFetchedCategories(fetchedCategories.flat());
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Discover more</Title>
      </div>
      <div className={styles.categoriesContainer}>
        {fetchedCategories.slice(0, 12).map((category: Category) => {
          return (
            <LinkCard
              key={category._id}
              label={category.title}
              cardSize="large"
              image={category.image}
            />
          );
        })}
      </div>

      <Button
        className={styles.button}
        buttonChildren={"More Categories..."}
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
