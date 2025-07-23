"use client";
import styles from "./Categories.module.scss";
import Link from "next/link";
import { useResponsive } from "@/store/useResponsive";
import MobileSubcategories from "@/components/MobileSubcategories";
import Button from "./Buttons";
import useSidebarStore from "@/store/useSidebarStore";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";
import Icon from "./Icon";

export type CategoriesProps = {
  fetchedCategories: any[];
};

const CategoriesClient = ({ fetchedCategories }: CategoriesProps) => {
  const [visibleSubcategories, setVisibleSubcategories] = useState<
    Record<string, number>
  >({});
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  const handleCategoriesContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleShowMore = (categoryId: string) => {
    setVisibleSubcategories((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 8) + 8,
    }));
  };

  if (isMobile) {
    return (
      <div
        className={styles.container}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "1440px",
          paddingTop: "6rem",
          overflowX: "hidden",
        }}
        onClick={() => setShowCategoriesModal(false)}
      >
        <ul className={styles.categoriesContainer}>
          {fetchedCategories.map((categoryItem, index) => {
            const { id, category, subcategories } = categoryItem;

            return (
              <li
                className={styles.mobileSubcategoriesContainer}
                key={id}
                onClick={handleCategoriesContainerClick}
              >
                <MobileSubcategories
                  options={subcategories}
                  category={category}
                  id={id}
                  name={subcategories[index]}
                  ariaLabel={subcategories[index]}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div
        className={styles.container}
        style={{
          // width: isSidebarOpen ? "62.625rem" : "100dvw",
          height: isSidebarOpen ? "62.625rem" : "100dvh",
          paddingTop: "3rem",
          paddingLeft: "2rem",
        }}
        onClick={() => setShowCategoriesModal(false)}
      >
        <div
          className={styles.categoriesContainer}
          onClick={handleCategoriesContainerClick}
        >
          {fetchedCategories.map((categoryItem) => {
            const { _id, title, subcategories } = categoryItem;
            const categoryId = _id;

            const visibleCount = visibleSubcategories[categoryId] || 8;

            return (
              <div key={categoryId} className={styles.categoriesSection}>
                <h4 className={styles.category}>{title}</h4>
                {subcategories
                  .slice(0, visibleCount)
                  .map((subcategory: string) => (
                    <div
                      key={subcategory}
                      className={styles.subcategoryContainer}
                    >
                      <Link href="/">
                        {isSidebarOpen ? (
                          <p className={styles.subcategory}>
                            {subcategory.length > 20
                              ? `${subcategory.slice(0, 54)}`
                              : subcategory}
                          </p>
                        ) : (
                          <p className={styles.subcategory}>
                            {subcategory.length > 20
                              ? `${subcategory.slice(0, 60)}`
                              : subcategory}
                          </p>
                        )}
                      </Link>
                    </div>
                  ))}
                {subcategories.length > visibleCount && (
                  <p
                    className={styles.more}
                    onClick={() => handleShowMore(categoryId)}
                  >
                    Show More...
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default CategoriesClient;
