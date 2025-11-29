"use client";
import styles from "./Articles.module.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination as PaginationDots,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeButton from "@/components/HomeButton";
import Button from "@/components/Buttons";
import Pill from "@/components/Pill";
import Select from "@/components/Select";
import { formatRelativeTime } from "@/utils/formatterFunctions/Formatter";
import Link from "next/link";
import { articleCategories } from "@/data/articlesCategories";
import { OlyArticle } from "@/sanity/lib/articles";
import RecommendedArticle from "@/components/cards/RecommendedArticle";
import Image from "@/components/Image";

type ArticlesProps = {
  articles: OlyArticle[];
  articleCategories: {
    id: string;
    name: string;
    category: string;
    path: string;
  }[];
  nextPage: string | null;
  category: string;
};

const Articles = ({
  articles,
  articleCategories,
  nextPage,
  category,
}: ArticlesProps) => {
  const [initialSlide] = useState(() => Math.floor(Math.random() * 3));
  const isAll = (category || "").toLowerCase() === "all";

  const filteredByCategory = isAll
    ? articles
    : articles.filter((article) =>
        article.tags?.some(
          (tag) => tag?.toLowerCase() === category.toLowerCase()
        )
      );

  const featuredArticles = filteredByCategory
    .filter((a) => a.imageUrl && a.imageUrl.trim() !== "")
    .slice(0, 3);

  return (
    <div className={`${styles.container} ${styles.swiperGlobalStyles}`}>
      <header className={styles.header}>
        <section className={styles.topSection}>
          <nav className={styles.homeButton}>
            <HomeButton />
          </nav>
          <nav className={styles.socialMedia}>
            <Button
              className={styles.readArticleButton}
              buttonChildren="Read Article"
              buttonType="primary"
              buttonSize="tiny"
              name="read-article-btn"
              type="button"
              ariaLabel="Read Article Button"
              autoFocus={false}
              disabled={false}
            />
          </nav>
        </section>
        <Swiper
          className={styles.swipper}
          spaceBetween={30}
          centeredSlides={true}
          initialSlide={initialSlide}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, PaginationDots, Navigation]}
          loop={true}
        >
          {featuredArticles.map((article, index) => (
            <SwiperSlide className={styles.article} key={index}>
              <Image
                src={article.imageUrl}
                fill
                alt={article.title}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                }}
                transformation={[
                  {
                    width: "1368",
                    height: "640",
                    quality: 100,
                    focus: "person",
                    "ai-upscale": true,
                  } as any,
                ]}
              />
              <section className={styles.bottomSection}>
                <div className={styles.categoryPill}>
                  <Pill
                    child={article.tags?.[0] || ""}
                    colour="#ccf6ff"
                    boxShadow="none"
                    shadow={false}
                  />
                </div>
                <div className={styles.articleDetails}>
                  <div className={styles.leftSection}>
                    <div className={styles.articleTitle}>{article.title}</div>
                    <div className={styles.articleExcerpt}>
                      <p>
                        {article.description && article.description.length > 140
                          ? `${article.description.slice(0, 140)}...`
                          : article.description || ''}
                      </p>
                    </div>
                    <div className={styles.articleMetadata}>
                      <div className={styles.articleDate}>
                        <p>{formatRelativeTime(article.pubDate, "en-ZA")}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className={styles.rightSection}>
                        <div className={styles.articleAuthor}>
                          <div className={styles.authorAvatar}>
                            <Avatar
                              avatar="/profilePic.jpg"
                              avatarSize="small"
                            />
                          </div>
                          <div className={styles.authorName}>
                            <p>{creator?.[0]}</p>
                          </div>
                        </div>
                      </div> */}
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
      <section className={styles.topBar}>
        <Select
          options={["Recent Articles", "Most Popular Articles"]}
          initialValue="Sort Articles"
          selectSize="large"
          label="Provinces"
          id="provinces"
          name="provinces"
          ariaLabel="Provinces"
          autoFocus={false}
          required={false}
        />
      </section>
      <section className={styles.wrapper}>
        <aside className={styles.leftSideBar}>
          <ul className={styles.categories}>
            {articleCategories.map((category, index) => (
              <Link href={category.path}>
                <li key={index} className={styles.category}>
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </aside>
        <main className={styles.main}>
          {filteredByCategory.length > 0 ? (
            <ul className={styles.articlesContainer}>
              {filteredByCategory.map((article, index) => (
                <li className={styles.article} key={index}>
                  <RecommendedArticle
                    image={article.imageUrl}
                    title={article.title}
                    author={article.creator?.[0] || ""}
                    avatar=""
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No articles available for this category. Check back later.</p>
          )}
        </main>
      </section>
      <section className={styles.bottomSection}>
        {nextPage && (
          <Link href={`/articles/${category}?nextpage=${nextPage}`}>
            <Button
              buttonChildren="Load More"
              buttonType="primary"
              buttonSize="medium"
              name="load-more"
              type="button"
              ariaLabel="Load More Articles"
            />
          </Link>
        )}
      </section>
      <section className={styles.bottomSection}>
        <section className={styles.bottomSection}>
          {/* <Pagination
          totalItems={total}
          currentPage={currentPage}
          limit={limit}
          offset={offset}
        /> */}
        </section>
      </section>
    </div>
  );
};

export default Articles;
