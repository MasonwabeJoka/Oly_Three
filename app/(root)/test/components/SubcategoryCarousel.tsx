'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import  Navigation  from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './SubcategoryCarousel.module.scss';

type Subcat = { id: string; name: string };
type Props = {
  subcategories: Subcat[];
  onChoose: (subcatId: string) => void;
  // how many columns to show at once (desktop)
  columns?: number;
};

export default function SubcategoryCarousel({
  subcategories,
  onChoose,
  columns = 4,
}: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // split into 'columns' arrays so each slide is one column of items
  const perColumn = Math.ceil(subcategories.length / columns);
  // create columns array of arrays (length = columns), some may be empty
  const columnsArr: Subcat[][] = Array.from({ length: columns }, (_, i) =>
    subcategories.slice(i * perColumn, i * perColumn + perColumn)
  );

  return (
    <div className={styles.wrap}>
      <Swiper
        // modules={[Navigation]}
        slidesPerView={columns}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: columns },
        }}
        // onBeforeInit={(swiper) => {
        //   // @ts-expect-error - assignment of DOM nodes into swiper params
        //   swiper.params.navigation?.prevEl = prevRef.current;
        //   // @ts-expect-error
        //   swiper.params.navigation?.nextEl = nextRef.current;
        // }}
        className={styles.swiper}
      >
        {columnsArr.map((col, idx) => (
          <SwiperSlide key={idx} className={styles.colSlide}>
            <ul className={styles.list}>
              {col.map((s) => (
                <li key={s.id} className={styles.item}>
                  <button
                    type="button"
                    className={styles.link}
                    onClick={() => onChoose(s.id)}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <button
          ref={prevRef}
          className={`${styles.arrow} ${styles.left}`}
          aria-label="previous subcategories"
        >
          ←
        </button>
        <button
          ref={nextRef}
          className={`${styles.arrow} ${styles.right}`}
          aria-label="next subcategories"
        >
          →
        </button>
      </div>
    </div>
  );
}