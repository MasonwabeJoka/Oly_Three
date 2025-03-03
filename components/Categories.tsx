"use client";
import styles from "./Categories.module.scss";
import Link from "next/link";
import { useResponsive } from "@/store/useResponsive";
import MobileSubcategories from "@/components/MobileSubcategories";
import Button from "./Buttons";
import useSidebarStore from "@/store/useSidebarStore";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useState } from "react";
import { getCategories } from "@/sanity/actions/categoriesActions";
import Icon from "./Icon";
//TODO:
/*
Fetch categories from Sanity
Make sure there are 15 subcategories per category followed by "more"
When more is clicked reveal more subcategories
Change exist button colour
Change exit button children to X icon
*/
//TODO: If categories is open: center the logo in the navbar and remove the profile picture,
//                             make the logo clickable, and navigate to home-screen when clicked.

const Categories = () => {
  const [fetchedCategories, setFetchedCategories] = useState<any>([]);
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
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setFetchedCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

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
        <div className={styles.categoriesContainer}>
          {fetchedCategories.map((categoryItem, index) => {
            const { id, category, subcategories } = categoryItem;

            return (
              <div
                className={styles.mobileSubcategoriesContainer}
                key={index}
                onClick={handleCategoriesContainerClick}
              >
                <MobileSubcategories
                  options={subcategories}
                  category={category}
                  id={id}
                  name={subcategories[index]}
                  ariaLabel={subcategories[index]}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.goBackButtonContainer}>
          <Button
            className={styles.goBackButton}
            buttonChildren="Go Back"
            buttonType="normal"
            buttonSize="large"
            name="go-back-btn"
            type="button"
            ariaLabel="Go Back Button"
            autoFocus={false}
            disabled={false}
            ariaHidden={false}
            onClick={() => setShowCategoriesModal(false)}
          />
        </div>
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
              <>
                <div key={categoryId} className={styles.categoriesSection}>
                  <h4 className={styles.category}>{title}</h4>
                  {subcategories
                    .slice(0, visibleCount)
                    .map((subcategory, subIndex) => (
                      <div
                        key={subIndex}
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
              </>
            );
          })}
        </div>
        <div className={styles.goBackButtonContainer}>
          <Button
            className={styles.goBackButton}
            buttonChildren={
              <Icon
                className={styles.goBackButton}
                src="/icons/x 20x20.png"
                width={20}
                height={20}
                alt="Exit Button"
              />
            }
            buttonType="round"
            buttonSize="large"
            name="exit-button"
            type="button"
            ariaLabel="Exit Button"
            autoFocus={false}
            disabled={false}
            ariaHidden={false}
            onClick={() => setShowCategoriesModal(false)}
          />
        </div>
      </div>
    );
  }
};

export default Categories;
