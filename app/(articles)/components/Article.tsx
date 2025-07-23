"use client";
import Image from "next/image";
import styles from "./Article.module.scss";
import { useState } from "react";
import HomeButton from "../../../components/HomeButton";
import Icon from "../../../components/Icon";
import Pill from "../../../components/Pill";
import Avatar from "../../../components/Avatar";
import TempArticle from "../../../components/TempArticle";
import RecommendedArticle from "../../../components/cards/RecommendedArticle";
import CommentsSection from "../../../components/CommentsSection";

const Article = ({ socialMediaData, articleCategories, articles }) => {
  const boxShadow = `0px 1px 3px 0px rgba(180, 191, 203, 0.2),
      0px 5px 5px 0px rgba(180, 191, 203, 0.17),
      0px 11px 7px 0px rgba(180, 191, 203, 0.1),
      0px 20px 8px 0px rgba(180, 191, 203, 0.03),
      0px 30px 9px 0px rgba(180, 191, 203, 0)`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Image"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "2.5rem",
          }}
        />
        <section className={styles.topSection}>
          <nav className={styles.homeButton}>
            <HomeButton />
          </nav>
          <div className={styles.shareArticle}>
            <div className={styles.copyArticle}>
              <div className={styles.copyArticleIcon}>
                <Icon
                  className=""
                  src="/icons/copy.png"
                  alt="Copy Icon"
                  width={15}
                  height={15}
                />
              </div>
              <div>Copy Link</div>
            </div>
            <div className={styles.socialMediaLinks}>
              {socialMediaData.slice(0, 3).map((socialMedia, index) => (
                <div key={index} className={styles.icon}>
                  <Icon
                    src={socialMedia.icon}
                    alt={`${socialMedia.name} Icon`}
                    width={12}
                    height={12}
                  />
                </div>
              ))}
            </div>
            <div className={styles.more}>
              <Icon
                src="/icons/three-dots.png"
                alt="More Icon"
                width={12}
                height={12}
              />
            </div>
          </div>
        </section>
        <section className={styles.bottomSection}>
          <div className={styles.categoryPill}>
            <Pill child="Lifestyle" colour="#fff" boxShadow="none" />
          </div>
          <div className={styles.articleDetails}>
            <div className={styles.leftSection}>
              <div className={styles.articleTitle}>
                <p> The Ultimate Guide to Boosting Productivity in 2025</p>
              </div>
              <div className={styles.articleExcerpt}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                dolorem atque accusantium quod ad incidunt repudiandae! Labore
                quis incidunt corrupti...
              </div>
              <div className={styles.articleMetadata}>
                <div className={styles.articleDate}>
                  <p>20th July, 2022</p>
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
            />
          </div>
          <div className={`${styles.share} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/share.png"
              alt="Share Icon"
              width={20}
              height={20}
            />
          </div>
          <div className={`${styles.bookmark} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/bookmark.svg"
              alt="Bookmark Icon"
              width={20}
              height={20}
            />
          </div>
          <div className={`${styles.more} ${styles.iconContainer}`}>
            <Icon
              className={styles.icon}
              src="/icons/three-dots.png"
              alt="Bookmark Icon"
              width={20}
              height={20}
            />
          </div>
        </div>
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
        <main className={styles.main}>
          <div className={styles.article}>
            <TempArticle />
          </div>
        </main>
        <aside className={styles.rightSideBar}>
          <div className={styles.articleRecommendations}>
            <h2 className={styles.title}>Recommended</h2>
            <ul className={styles.articles}>
              {articles.map((article, index) => (
                <li key={index} className={styles.article}>
                  <RecommendedArticle
                    image={article.coverImage}
                    title={article.title}
                    author={article.author.name}
                    avatar={article.author.avatar}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      <section className={styles.articleBottom}>
        <div className={styles.articleAuthor}>
          <div className={styles.authorAvatar}>
            <Avatar avatar="/profilePic.jpg" avatarSize="small" />
          </div>
          <div className={styles.authorName}>
            <p>John Doe</p>
          </div>
        </div>
        <div className={styles.shareArticleBottom}>
          <div className={styles.copyArticle}>
            <div className={styles.copyArticleIcon}>
              <Icon
                className=""
                src="/icons/copy.png"
                alt="Copy Icon"
                width={15}
                height={15}
              />
            </div>
            <div>Copy Link</div>
          </div>
          <ul className={styles.socialMediaLinks}>
            {socialMediaData.slice(0, 3).map((socialMedia, index) => (
              <div key={index} className={styles.icon}>
                <Icon
                  src={socialMedia.icon}
                  alt={`${socialMedia.name} Icon`}
                  width={12}
                  height={12}
                />
              </div>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.commentsSection}>
        <CommentsSection />
      </section>
    </div>
  );
};

export default Article;
