"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import styles from "./SubcategoryCarousel.module.scss";
import NavButtons from "@/components/NavButtons";
import Link from "next/link";

type Subcategory = { id: number; name: string };
interface SubcategoryCarouselProps {
  subcategories: Subcategory[];
}

const SubcategoryCarousel = ({ subcategories }: SubcategoryCarouselProps) => {
  const itemsPerColumn = 4;
  // create columns array of arrays (length = columns), some may be empty
  const columnsArr: Subcategory[][] = [];
  for (let i = 0; i < subcategories.length; i += itemsPerColumn) {
    columnsArr.push(subcategories.slice(i, i + itemsPerColumn));
  }
  const slidesPerView = 6;
  return (
    <div className={styles.subcategories}>
      <div className={styles.subcategoriesWrapper}>
        <Swiper
          className={styles.swipper}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          direction="horizontal"
          freeMode={true}
          scrollbar={false}
          mousewheel={true}
          modules={[FreeMode, Scrollbar, Mousewheel]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: slidesPerView },
          }}
        >
          {columnsArr.map((column, index) => (
            <SwiperSlide className={styles.subcategorySlide} key={index}>
              <ul className={styles.subcategoryList}>
                {column.map((subcategory) => (
                  <li key={subcategory.id} className={styles.subcategory}>
                    <Link href="/dashboard/post-your-ad/oly/details" className={styles.subcategoryLink}>
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </SwiperSlide>
          ))}
          <div className={styles.navButtons}>
            <NavButtons />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default SubcategoryCarousel;
