"use client";
import Image from "next/image";
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
import Avatar from "@/components/Avatar";
import RecommendedArticle from "@/components/cards/RecommendedArticle";
import Select from "@/components/Select";
import Pagination from "@/components/Pagination";

const Articles = ({ articles, articleCategories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [initialSlide] = useState(() => Math.floor(Math.random() * 3));
  const totalPages = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const boxShadow = `0px 1px 3px 0px rgba(180, 191, 203, 0.2),
    0px 5px 5px 0px rgba(180, 191, 203, 0.17),
    0px 11px 7px 0px rgba(180, 191, 203, 0.1),
    0px 20px 8px 0px rgba(180, 191, 203, 0.03),
    0px 30px 9px 0px rgba(180, 191, 203, 0)`;

  return (
    <div className={styles.container}>
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
          {articles.slice(0, 3).map((article: any, index: number) => (
            <SwiperSlide className={styles.article} key={article.id}>
              <Image
                src={article.coverImage}
                fill
                alt="Image"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                }}
              />
              <section className={styles.bottomSection}>
                <div className={styles.categoryPill}>
                  <Pill
                    child={article.category}
                    colour="#f9fcfd"
                    boxShadow="none"
                  />
                </div>
                <div className={styles.articleDetails}>
                  <div className={styles.leftSection}>
                    <div className={styles.articleTitle}>{article.title}</div>
                    <div className={styles.articleExcerpt}>
                      <p>{article.excerpt}</p>
                    </div>
                    <div className={styles.articleMetadata}>
                      <div className={styles.articleDate}>
                        <p>20th July, 2025</p>
                      </div>
                      <div className={styles.articleLength}>
                        <p>25 minute read</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightSection}>
                    <div className={styles.articleAuthor}>
                      <div className={styles.authorAvatar}>
                        <Avatar avatar="/profilePic.jpg" avatarSize="small" />
                      </div>
                      <div className={styles.authorName}>
                        <p>John Doe</p>
                      </div>
                    </div>
                  </div>
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
              <li key={index} className={styles.category}>
                {category.name}
              </li>
            ))}
          </ul>
        </aside>
        <main>
          <ul className={styles.articlesContainer}>
            {articles.map((article: any, index: number) => (
              <li className={styles.article} key={article.id}>
                <RecommendedArticle
                  image={article.coverImage}
                  title={article.title}
                  author={article.author.name}
                  avatar={article.author.avatar}
                />
              </li>
            ))}
          </ul>
        </main>
      </section>
      <section className={styles.bottomSection}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default Articles;
