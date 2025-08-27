"use client";
import styles from "./CategoriesClient.module.scss";
import Link from "next/link";
import { useResponsive } from "@/store/useResponsive";
import MobileSubcategories from "@/components/MobileSubcategories";
import useSidebarStore from "@/store/useSidebarStore";
import { useModalStore } from "@/store/modalStore";
import { useState, useEffect } from "react";
import { useBreakpoint } from "@/store/useBreakpointStore";

export type CategoriesProps = {
  categories: any[];
};

const CategoriesClient = ({ categories }: CategoriesProps) => {
  const [isClient, setIsClient] = useState(false);
  const [totalVisibleSubcategories, setVisibleSubcategories] = useState<
    Record<string, number>
  >({});
  const { isMobile, isTablet, currentScreenSize } = useBreakpoint();
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  // Define the number of subcategories to show per page
  const SUBCATEGORIES_TO_SHOW = 6;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCategoriesContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleToggleSubcategories = (
    id: string,
    numberOfCurrentlyVisible: number,
    totalCount: number
  ) => {
    setVisibleSubcategories((prev) => {
      // Create a new state object to reset all other categories
      const newCurrentlyVisible: Record<string, number> = {};

      // Reset all categories to default (SUBCATEGORIES_TO_SHOW)
      categories.forEach((category) => {
        if (category._id !== id) {
          newCurrentlyVisible[category._id] = SUBCATEGORIES_TO_SHOW;
        }
      });

      // Update the toggled category
      if (numberOfCurrentlyVisible === totalCount) {
        newCurrentlyVisible[id] = SUBCATEGORIES_TO_SHOW;
      } else {
        const nextCount =
          (prev[id] || SUBCATEGORIES_TO_SHOW) + SUBCATEGORIES_TO_SHOW;
        newCurrentlyVisible[id] =
          nextCount >= totalCount ? totalCount : nextCount;
      }

      return newCurrentlyVisible;
    });
  };

  // Don't render until client-side hydration is complete to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

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
          {categories?.map((categoryItem, index) => {
            const {
              _id: id,
              category,
              secondLevelSubcategories,
              thirdLevelSubcategories,
            } = categoryItem;
            const subcategories =
              secondLevelSubcategories?.length < 3
                ? thirdLevelSubcategories
                : secondLevelSubcategories;

            return (
              <li
                className={styles.mobileSubcategoriesContainer}
                key={`subcategory-mobile-${index}`}
                onClick={handleCategoriesContainerClick}
              >
                <MobileSubcategories
                  options={subcategories}
                  category={category}
                  id={id}
                  name={category}
                  ariaLabel={category}
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
        onClick={() => setShowCategoriesModal(false)}
      >
        <div
          className={styles.categoriesContainer}
          onClick={handleCategoriesContainerClick}
          style={{
            columns: isTablet
              ? currentScreenSize < 1100
                ? "200px 2"
                : "200px 3"
              : "",
            width: isTablet
              ? currentScreenSize < 1100 && isTablet
                ? "47rem"
                : ""
              : "",
          }}
        >
          {categories?.map((category, index) => {
            const {
              _id: id,
              title,
              secondLevelSubcategories,
              thirdLevelSubcategories,
            } = category;
            const subcategories =
              secondLevelSubcategories?.length < 3
                ? thirdLevelSubcategories
                : secondLevelSubcategories;

            const visibleCount =
              totalVisibleSubcategories[id] || SUBCATEGORIES_TO_SHOW;

            return (
              <div
                key={`category-${index}`}
                className={styles.categoriesSection}
              >
                <h4 className={styles.category}>{title}</h4>
                {subcategories?.length > 0 &&
                  subcategories?.slice(0, visibleCount).map(
                    (
                      subcategory: {
                        _id: string;
                        title: string;
                        slug: { current: string };
                      },
                      subIndex: number
                    ) => (
                      <div
                        key={`subcategory-${subIndex}`}
                        className={styles.subcategoryContainer}
                      >
                        <Link href={`/category/${subcategory.slug.current}`}>
                          <p className={styles.subcategory}>
                            {subcategory.title?.length > 20
                              ? `${subcategory.title.slice(0, 60)}`
                              : subcategory.title}
                          </p>
                        </Link>
                      </div>
                    )
                  )}
                {!subcategories && (
                  <div
                    key={`subcategory-${index}`}
                    className={styles.subcategoryContainer}
                  >
                    <Link href={`/category/${category.slug.current}`}>
                      <p className={styles.subcategory}>
                        {category.title?.length > 20
                          ? `${category.title.slice(0, 60)}`
                          : category.title}
                      </p>
                    </Link>
                  </div>
                )}

                {subcategories?.length > SUBCATEGORIES_TO_SHOW && (
                  <div
                    className={styles.showMoreContainer}
                    onClick={() =>
                      handleToggleSubcategories(
                        id,
                        visibleCount,
                        subcategories?.length
                      )
                    }
                  >
                    <p className={styles.more}>
                      {visibleCount === subcategories?.length
                        ? "Show Less..."
                        : "Show More..."}
                    </p>
                  </div>
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
