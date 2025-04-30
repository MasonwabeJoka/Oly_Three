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
      <Swiper className={styles.swipper} spaceBetween={160} slidesPerView={6}>
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
