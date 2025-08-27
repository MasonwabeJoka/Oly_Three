"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import styles from "./CategoryCarousel.module.scss";
import NavButtons from "@/components/NavButtons";
import LinkCard from "@/components/cards/LinkCard";

type Subcategory = { id: number; name: string };

interface Category {
  id: number;
  category: string;
  image: string;
  subcategories: Subcategory[];
}

interface CategoryCarouselProps {
  categories: Category[];
  selectedId?: number;
  onSelect: (categoryId: number) => void;
}

const CategoryCarousel = ({
  categories,
  selectedId,
  onSelect,
}: CategoryCarouselProps) => {
  return (
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
          <SwiperSlide className={styles.category} key={category.id}>
            <div
              className={`${styles.cardContainer} ${selectedId === category.id ? styles.active : ""}`}
              onClick={()=> onSelect(category.id)}
              aria-pressed={selectedId === category.id}
            >
              <LinkCard
                label={category.category}
                image={category.image}
                cardSize="standard"
              />
            </div>
          </SwiperSlide>
        ))}
      </div>
      <div className={styles.navButtons}>
        <NavButtons />
      </div>
    </Swiper>
  );
};

export default CategoryCarousel;
