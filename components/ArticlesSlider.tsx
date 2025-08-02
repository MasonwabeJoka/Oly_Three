"use client";
import styles from "./ArticlesSlider.module.scss";
import ArticleCardBox from "./cards/ArticleCardBox";
import useFeedStore from "@/store/feedStore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "./NavButtons";

type DataType = {
  id: number;
  author: string;
  title: string;
  description: string;
  price: string;
};

interface Props {
  images: string[];
  avatars: string[];
  author: string;
  title: string[];
  description: string;
  price?: string;
  data: any;
}

const ArticleSlider: React.FC<Props> = ({
  images,
  avatars,
  author,
  title,
  description,
  price,
  data,
}) => {
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);
  

  return (
    <div className={styles.articleSection}>
      <Swiper className={styles.swiper}    slidesPerView={1}
        spaceBetween={20}breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1439: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
        }}>
        {data.map((article: any, index: number) => {
          return (
            <SwiperSlide className={styles.article} key={article.id}>
              <ArticleCardBox
                images={images[index]}
                avatar={avatars[index]}
                author={article.author}
                title={article.title}
                description={article.description}
              />
            </SwiperSlide>
          );
        })}

        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      </Swiper>
    </div>
  );
};

export default ArticleSlider;
