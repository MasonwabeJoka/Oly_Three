"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigation from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./CategoryCarousel.module.scss";

type Category = { id: string; name: string; image: string };
type Props = {
  categories: Category[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export default function CategoryCarousel({
  categories,
  selectedId,
  onSelect,
}: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={styles.wrapper}>
      <Swiper
        // modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={24}
        // onBeforeInit={(swiper) => {
        //   // wire navigation refs before init
        //   // @ts-expect-error - assigning DOM elements to swiper params is valid
        //   swiper.params.navigation?.prevEl = prevRef.current;
        //   // @ts-expect-error
        //   swiper.params.navigation?.nextEl = nextRef.current;
        // }}
        className={styles.swiper}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id} className={styles.slide}>
            <button
              type="button"
              className={`${styles.card} ${
                selectedId === cat.id ? styles.active : ""
              }`}
              onClick={() => onSelect(cat.id)}
              aria-pressed={selectedId === cat.id}
            >
              <div className={styles.imageWrap}>
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className={styles.label}>{cat.name}</div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        className={`${styles.ctrl} ${styles.prev}`}
        aria-label="previous category"
      >
        ←
      </button>
      <button
        ref={nextRef}
        className={`${styles.ctrl} ${styles.next}`}
        aria-label="next category"
      >
        →
      </button>
    </div>
  );
}
