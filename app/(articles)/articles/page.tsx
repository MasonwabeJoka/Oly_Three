"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { socialMediaData } from "@/data/socialMediaData";
import { articleCategories } from "@/data/articlesCategories";
import { articles } from "@/data/articles";
import HomeButton from "@/components/HomeButton";
import Icon from "@/components/Icon";
import Pill from "@/components/Pill";
import Avatar from "@/components/Avatars";
import RecommendedArticle from "@/components/cards/RecommendedArticle";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination as PaginationDots, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import './styles.css';
import NavButtons from "@/components/NavButtons";
import Button from "@/components/Buttons";
import Pagination from "@/components/Pagination";

// Todo: onClick of .more in the topBar replace all top bar icons with share icons.

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9; // Example: 9 total pages
  // Add this new state for initial slide
  const [initialSlide] = useState(() => Math.floor(Math.random() * articles.slice(0, 3).length));

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
          pagination={{
            clickable: true, // Makes bullets clickable
          
            // dynamicBullets: true, // Enables dynamic bullets
            // dynamicMainBullets: 3, // Number of main bullets
            // type: 'progressbar', // Changes to progress bar style
            // type: 'fraction', // Changes to fraction style (1/4)
            // renderBullet: (index, className) => {
            //   return `<span class="${className}">${index + 1}</span>`; // Custom bullet render
            // },
            // renderFraction: (currentClass, totalClass) => {
            //   return `<span class="${currentClass}"></span> of <span class="${totalClass}"></span>`; // Custom fraction render
            // }
          }}
          navigation={true}
          modules={[Autoplay, PaginationDots, Navigation]}
          loop={true}
        >
          {articles.slice(0, 3).map((article: any, index: number) => (
            <SwiperSlide className={styles.article} key={article.id}>
              <Image
                // src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                src={article.coverImage}
                fill
                alt="Image"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "32px",
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
          {/* 
          <div className={styles.navButtons}>
            <NavButtons />
          </div> */}
        </Swiper>
      </header>
      <section className={styles.topBar}>
        <div className={styles.icons}>
          <div className={`${styles.comments} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/comments.svg"
              alt="Comment Icon"
              width={20}
              height={20}
              // boxShadow={boxShadow}
            />
          </div>
          <div className={`${styles.share} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/share.png"
              alt="Share Icon"
              width={20}
              height={20}
              // boxShadow={boxShadow}
            />
          </div>
          <div className={`${styles.bookmark} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/bookmark.svg"
              alt="Bookmark Icon"
              width={20}
              height={20}
              // boxShadow={boxShadow}
            />
          </div>
          <div className={`${styles.more} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/three-dots.png"
              alt="Bookmark Icon"
              width={20}
              height={20}
              // boxShadow={boxShadow}
            />
          </div>
        </div>
      </section>
      <section className={styles.wrapper}>
        <aside className={styles.leftSideBar}>
          <div className={styles.categories}>
            {articleCategories.map((category, index) => (
              <div key={index} className={styles.category}>
                {category.name}
              </div>
            ))}
          </div>
        </aside>
        <main className={styles.main}>
          {articles.map((article: any, index: number) => (
            <div className={styles.articles} key={article.id}>
              <RecommendedArticle
                image={article.coverImage}
                title={article.title}
                author={article.author.name}
                avatar={article.author.avatar}
              />
            </div>
          ))}
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
