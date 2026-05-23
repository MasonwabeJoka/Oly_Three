"use client";
import styles from "./Article.module.scss";
import Icon from "../../../components/Icon";
import Pill from "../../../components/Pill";
import Avatar from "../../../components/Avatar";
import TempArticle from "../../../components/TempArticle";
import RecommendedArticle from "../../../components/cards/RecommendedArticle";
import CommentsSection from "../../../components/CommentsSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import { featuredServicesSectionQueryOptions } from "@/server/sanity/read-write/featuredServicesSection/queryOptions";
import { useEffect, useRef, useState } from "react";
import ArticleHeader from "./ArticleHeader";
import { listingsData } from "@/data/ListingsData";
import { listing } from "@/server/sanity/schemaTypes/documents/listings/oly-listing";
import ListingCard from "@/components/cards/ListingCard";

interface SocialMedia {
  name: string;
  icon: string;
}

interface ArticleCategory {
  name: string;
}

interface Author {
  name: string;
  avatar: string;
}

interface Article {
  coverImage: string;
  title: string;
  author: Author;
}

interface ArticleProps {
  socialMediaData: SocialMedia[];
  articleCategories: ArticleCategory[];
  articles: Article[];
}

const readLengthTemp = 0;

const Article = ({
  socialMediaData,
  articleCategories,
  articles,
}: ArticleProps) => {
  const { data } = useSuspenseQuery(featuredServicesSectionQueryOptions);
  const articleRef = useRef<HTMLDivElement | null>(null);
  const hasPassedBottomRef = useRef(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const stickyOffset = 120;

    const handleScroll = () => {
      if (!articleRef.current) return;

      const { top, bottom } = articleRef.current.getBoundingClientRect();

      setIsPinned((prev) => {
        if (prev) {
          if (bottom <= stickyOffset) {
            hasPassedBottomRef.current = true;
            return false;
          }

          return top <= stickyOffset;
        }

        if (hasPassedBottomRef.current) {
          if (top > stickyOffset) {
            hasPassedBottomRef.current = false;
          }

          return false;
        }

        return top <= stickyOffset && top >= 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <ArticleHeader data={data} />

      <section className={styles.wrapper}>
        <aside className={styles.leftSideBar}>
          <ul
            className={`${styles.categories} ${isPinned ? styles.stickyCategories : ""}`}
          >
            {articleCategories.map((category, index) => (
              <li key={index} className={styles.category}>
                <Pill child={category.name} shadow />
              </li>
            ))}
          </ul>
          <div className={styles.articleRecommendations}>
            <ul className={styles.articles}>
              {articles.slice(0, 5).map((article, index) => (
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
        <main className={styles.main}>
          <div ref={articleRef} className={styles.article}>
            <div
              className={`${styles.articleTopSection} ${isPinned ? styles.stickyArticleTopSection : ""}`}
            >
              {isPinned && (
                <h1 className={styles.articleTitle}>
                  The Ultimate Guide to Boosting Productivity in 2025
                </h1>
              )}
              <div className={styles.icons}>
                <div className={styles.shareArticle}>
                  <div className={styles.more}>
                    <Icon
                      src="/icons/three-dots.png"
                      alt="More Icon"
                      width={12}
                      height={12}
                    />
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
                  </div>
                </div>

                <div className={styles.zoom}>
                  <div className={styles.minus}>
                    <Icon
                      className=""
                      src="/icons/minus.png"
                      alt="minus"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div className={styles.plus}>
                    <Icon
                      className=""
                      src="/icons/plus.png"
                      alt="Copy Icon"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              </div>
            </div>
            <TempArticle />
          </div>
          <div className={styles.articleBottom}>
            <div className={styles.articleAuthor}>
              <div className={styles.authorAvatar}>
                <Avatar avatar="/profilePic.jpg" avatarSize="small" />
              </div>
              <div className={styles.authorName}>
                <p>John Doe</p>
              </div>
            </div>
            <div className={styles.shareArticleBottom}>
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
            </div>
          </div>
          <div className={styles.commentsSection}>
            <CommentsSection />
          </div>
        </main>
        <aside className={styles.rightSideBar}>
          {listingsData.slice(0, 10).map((listing, index) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              site="oly"
              cardType="box"
              imageUrls={listing.imageUrls}
              cardSize="large"
              description={listing.text}
              title={listing.title}
              price={listing.price}
              isDashboard={false}
              isDeletable={false}
              index={index}
            />
          ))}
        </aside>
      </section>
    </div>
  );
};

export default Article;

