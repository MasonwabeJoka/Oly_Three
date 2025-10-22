"use client";
import styles from "./ArticlesSlider.module.scss";
import ArticleCardBox from "./cards/ArticleCardBox";
import useFeedStore from "@/store/feedStore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "./NavButtons";
import { useQuery } from "@tanstack/react-query";
import { featuredArticlesQueryOptions } from "@/sanity/lib/crud/featuredArticles/queryOptions";
import { useEffect, useState } from "react";

const ArticleSlider = () => {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading, error } = useQuery(featuredArticlesQueryOptions);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything until we're on the client to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className={styles.articleSection}>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          Loading articles...
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.articleSection}>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          Loading articles...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.articleSection}>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          Error loading articles. Please try again later.
        </div>
      </div>
    );
  }

  if (!data) return null;
  const { articles } = data;

  // If no articles, show a placeholder message
  if (!articles || articles.length === 0) {
    return (
      <div className={styles.articleSection}>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          No articles available at the moment. Check back later!
        </div>
      </div>
    );
  }

  return (
    <div className={styles.articleSection}>
      <Swiper
        className={styles.swiper}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
          1439: {
            slidesPerView: 6,
            spaceBetween: 32,
          },
        }}
      >
        {articles.map((article: any, index: number) => {
          const { _id, title, content, imageUrl, creator, sourceIcon } =
            article;
          return (
            <SwiperSlide className={styles.article} key={_id}>
              <ArticleCardBox
                images={imageUrl}
                avatar={(sourceIcon && sourceIcon) || ""}
                author={creator}
                title={title}
                description={content}
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
