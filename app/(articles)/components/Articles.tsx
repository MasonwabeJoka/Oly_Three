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
import { OlyArticle } from "@/server/sanity/articles";
import RecommendedArticle from "@/components/cards/RecommendedArticle";
import Image from "@/components/Image";
import ArticlesHeader from "./ArticlesHeader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { featuredServicesSectionQueryOptions } from "@/server/sanity/read-write/featuredServicesSection/queryOptions";

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
  const [isPinned, setIsPinned] = useState(false);
  const isAll = (category || "").toLowerCase() === "all";
  const { data } = useSuspenseQuery(featuredServicesSectionQueryOptions);
  const filteredByCategory = isAll
    ? articles
    : articles.filter((article) =>
        article.tags?.some(
          (tag) => tag?.toLowerCase() === category.toLowerCase(),
        ),
      );

  const featuredArticles = filteredByCategory
    .filter((a) => a.imageUrl && a.imageUrl.trim() !== "")
    .slice(0, 3);

  return (
    <div className={`${styles.container} ${styles.swiperGlobalStyles}`}>
      <ArticlesHeader data={data} />

      <section className={styles.wrapper}>
        <aside className={styles.leftSideBar}>
          <ul className={styles.categories}>
            {articleCategories.map((category, index) => (
              <li key={index} className={styles.category}>
                <Pill child={category.name} shadow />
              </li>
            ))}
          </ul>
        </aside>
        {/* <aside className={styles.leftSideBar}>
          <ul className={styles.categories}>
            {articleCategories.map((category) => (
              <Link href={category.path} key={category.id}>
                <li className={styles.category}>{category.name}</li>
              </Link>
            ))}
          </ul>
        </aside> */}
        <main className={styles.main}>
          <section className={styles.filter}>
            <Select
              options={["Recent Articles", "Most Popular Articles"]}
              initialValue="Sort Articles"
              selectSize="large"
              label="Sort Articles"
              id="sortArticles"
              name="sortArticles"
              ariaLabel="Sort Articles"
              autoFocus={false}
              required={false}
            />
          </section>
          {filteredByCategory.length > 0 ? (
            <ul className={styles.articlesContainer}>
              {filteredByCategory.map((article, index) => (
                <li className={styles.article} key={index}>
                  <RecommendedArticle
                    image={article.imageUrl || ""}
                    title={article.title}
                    author={article.author || ""}
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
              autoFocus={false}
              disabled={false}
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

