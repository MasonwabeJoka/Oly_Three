"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import styles from "./SelectACategory.module.scss";
import NavButtons from "@/components/NavButtons";
import LinkCard from "@/components/cards/LinkCard";

interface Category {
  id: number;
  category: string;
  image: string;
  subcategories: string[];
}

interface CategorySelectorClientProps {
  categories: Category[];
  categoriesChunks: string[][];
  activeCategory: Category | null;
  showButtons: boolean;
  goTo: (index: number) => void;
  setCategory: (main: string, subcategory: string) => void;
}

const CategorySelectorClient = ({
  categories,
  categoriesChunks,
  activeCategory,
  showButtons,
  goTo,
  setCategory,
}: CategorySelectorClientProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { setValue, trigger } = useFormContext();

  const handleSubcategoryClick = async (subcategory: string) => {
    const selectedCategory = categories.find((cat) => cat.id === activeCategoryId);
    if (selectedCategory) {
      setValue("category.main", selectedCategory.category, { shouldValidate: true });
      setValue("category.subcategory", subcategory, { shouldValidate: true });
      const isValid = await trigger(["category.main", "category.subcategory"]);
      if (isValid) {
        setCategory(selectedCategory.category, subcategory);
        goTo(1);
      }
    }
  };

  const handleCategoryClick = (id: number) => {
    setActiveCategoryId(id);
    const selectedCategory = categories.find((cat) => cat.id === id);
    if (selectedCategory) {
      setValue("category.main", selectedCategory.category, { shouldValidate: true });
    }
  };

  const mouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const identifier = event.currentTarget.dataset.identifier;
    setHovered(identifier || null);
  };

  const mouseLeave = () => {
    setHovered(null);
  };

  const subcategoriesStyles: React.CSSProperties = {
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

  return (
    <>
      <Swiper
        className={styles.swipper}
        spaceBetween={48}
        slidesPerView={6}
        slidesOffsetAfter={240}
        direction="horizontal"
        freeMode={true}
        scrollbar={false}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
      >
        <div className={styles.categories}>
          {categories.map((category) => (
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
          ))}
        </div>
        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      </Swiper>

      {activeCategory && activeCategory.subcategories.length > 0 && (
        <div className={styles.subcategories}>
          <div className={styles.subcategoriesTitleContainer}>
            <h4 className={styles.title}>{activeCategory.category}</h4>
          </div>
          <div className={styles.subcategoriesWrapper}>
            <Swiper
              spaceBetween={0}
              slidesPerView="auto"
              direction="horizontal"
              freeMode={true}
              scrollbar={false}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel]}
              slidesOffsetAfter={240}
            >
              {categoriesChunks.map((chunk, categoryIndex) => (
                <SwiperSlide
                  key={categoryIndex}
                  style={subcategoriesStyles}
                  className={styles.subcategorySlide}
                >
                  {chunk.map((subcategory, subcategoryIndex) => {
                    const identifier = `${categoryIndex}-${subcategoryIndex}`;
                    const color = hovered === identifier ? "#ff3c14" : "";
                    const transform = hovered === identifier ? "scale(1.02)" : "";
                    const transition = hovered === identifier ? "all 0.15s ease-in" : "";
                    return (
                      <div
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
                          cursor: "pointer",
                        }}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        data-identifier={identifier}
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        {subcategory}
                      </div>
                    );
                  })}
                </SwiperSlide>
              ))}
            </Swiper>
            {showButtons && (
              <div className={styles.navButtons}>
                <NavButtons />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySelectorClient;