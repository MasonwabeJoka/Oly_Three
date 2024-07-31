"use client";
import React, { useState, useCallback, useEffect } from "react";
import LinkCard from "@/components/cards/LinkCard";
import styles from "./SelectACategory.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import NavButtons from "@/components/NavButtons";
import { categories } from "@/data/CategoriesData";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import MobileSubcategories from "@/components/MobileSubcategories";
import Button from "@/components/Buttons";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";

const PostYourAd = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);

  // Find the active category object
  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId
  );

  // Define the style object for the grid container
  const subcategoriesStyles = {
    display: "flex",
    flexDirection: "column",
    width: "18rem",
    height: "fit-content",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    paddingBottom: "1rem",
    paddingLeft: "1rem",
  };

  const handleCategoryClick = (id: number) => {
    setActiveCategoryId(id);
  };

  const categoriesArray = (arr: any, size: number) => {
    if (!arr) {
      return [];
    }
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  // Dividing subcategories into chunks of 5
  const categoriesChunks = categoriesArray(activeCategory?.subcategories, 5);

  const mouseEnter = (event: any) => {
    const identifier = event.target.dataset.identifier;
    setHovered(identifier);
  };

  const mouseLeave = () => {
    setHovered(null);
  };

  useEffect(() => {
    // Check the length of the first chunk and update showButtons
    if (categoriesChunks.length > 4) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [categoriesChunks]);

  const SelectACategoryDesktop = () => {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h4 className={styles.title}>Select a category</h4>
          <Swiper
            className={styles.swipper}
            spaceBetween={48}
            slidesPerView={6}
            slidesOffsetAfter={240}
          >
            <div className={styles.categories}>
              {categories.map((category) => {
                return (
                  <SwiperSlide
                    className={styles.category}
                    onClick={() => handleCategoryClick(category.id)}
                    key={category.id}
                  >
                    <LinkCard
                      label={category.category}
                      image={category.image}
                      cardSize="standard"
                    />
                  </SwiperSlide>
                );
              })}
            </div>
            <div className={styles.navButtons}>
              <NavButtons />
            </div>
          </Swiper>

          {activeCategory && activeCategory?.subcategories.length > 0 && (
            <>
              <h4 className={styles.title}>{activeCategory.category}</h4>
              <div
                style={{
                  marginLeft: "3rem",
                  width: "150%",
                }}
              >
                <Swiper
                  spaceBetween={8}
                  slidesPerView="auto"
                  direction={"horizontal"}
                  freeMode={true}
                  scrollbar={false}
                  mousewheel={true}
                  modules={[FreeMode, Scrollbar, Mousewheel]}
                  slidesOffsetAfter={240}
                >
                  <div>
                    {categoriesChunks.map((chunk, categoryIndex) => (
                      <SwiperSlide
                        key={categoryIndex}
                        style={subcategoriesStyles}
                      >
                        {chunk.map(
                          (subcategory: any, subcategoryIndex: any) => {
                            const identifier = `${categoryIndex}-${subcategoryIndex}`;
                            const color =
                              hovered === identifier ? "#ff3c14" : "";
                            const transform =
                              hovered === identifier ? "scale(1.02)" : "";
                            const transition =
                              hovered === identifier
                                ? "all 0.1.5s ease-in"
                                : "";
                            return (
                              <Link
                                href="/dashboard/post-your-ad/details"
                                key={subcategoryIndex}
                                className={styles.subcategory}
                                style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  height: "1.5rem",
                                  marginBottom: "0.75rem",
                                  color,
                                  transform,
                                  transition,
                                }}
                                onMouseEnter={(event) => mouseEnter(event)}
                                onMouseLeave={mouseLeave}
                                data-identifier={identifier}
                              >
                                {subcategory}
                              </Link>
                            );
                          }
                        )}
                      </SwiperSlide>
                    ))}
                  </div>
                  {showButtons && (
                    <div className={styles.navButtons}>
                      <NavButtons />
                    </div>
                  )}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  const SelectACategoryMobile = () => {
    return (
      <MaxWidthWrapper className={styles.maxWidthWrapper}>
        <div className={styles.container}>
          <div className={styles.categoriesContainer}>
            {categories.map((categoryItem, index) => {
              const { id, category, subcategories } = categoryItem;

              return (
                <div className={styles.mobileSubcategoriesContainer}>
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
            />
          </div>
        </div>
      </MaxWidthWrapper>
    );
  };

  if (isMobile) {
    return <SelectACategoryMobile />;
  } else {
    return <SelectACategoryDesktop />;
  }
};

export default PostYourAd;