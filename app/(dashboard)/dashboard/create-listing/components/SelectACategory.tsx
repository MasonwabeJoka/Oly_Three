"use client";
import { categories } from "@/data/CategoriesData";
import styles from "./SelectACategory.module.scss";
import { useBreakpoint } from "@/store/useBreakpointStore";
import CategoryCarousel from "./CategoryCarousel";
import { useState } from "react";
import SubcategoryCarousel from "./SubcategoryCarousel";


const SelectACategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );
  const { isMobile } = useBreakpoint();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Select a category</h2>
        </div>
        <div className={styles.categoriesContainer}>
          {!isMobile && (
            <>
              <CategoryCarousel
                categories={categories}
                selectedId={selectedCategoryId}
                onSelect={(id) => setSelectedCategoryId(id)}
              />

              {selectedCategoryId && (
                <>
                  <div className={styles.titleContainer}>
                    <h2 className={styles.title}>
                      {selectedCategory?.category}
                    </h2>
                  </div>
                  {selectedCategory?.subcategories &&
                  selectedCategory?.subcategories.length > 0 ? (
                    <SubcategoryCarousel
                      subcategories={selectedCategory?.subcategories}
                    />
                  ) : selectedCategory ? (
                    <p>No {selectedCategory?.category} products found</p>
                  ) : null}
                </>
              )}
            </>
          )}
          {/* {isMobile && (
          <MobileCategorySelector
            categories={categories}
            goTo={goTo}
            setCategory={setCategory}
          />
        )} */}
        </div>
      </div>
    </div>
  );
};

export default SelectACategory;
