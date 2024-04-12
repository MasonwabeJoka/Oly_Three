"use client";
import styles from "./SponsoredArticles.module.scss";
import { useState, useEffect } from "react";
import Articles from "@/components/Articles";
import useArticlesStore from "@/store/articlesStore";
import Button from "@/components/Buttons";
import { blogData } from "@/data/BlogData";
import useTitleStore from "@/store/titleStore";

const SponsoredArticles = () => {
  const title = useArticlesStore((state) => state.title);
  const setTitle = useArticlesStore((state) => state.setTitle);
  const description = useArticlesStore((state) => state.description);
  const author = useArticlesStore((state) => state.author);
  const images = useArticlesStore((state) => state.images);
  const getImages = useArticlesStore((state) => state.getImages);
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);
  const price = useArticlesStore((state) => state.price);
  const data = useArticlesStore((state) => state.data);
  const setData = useArticlesStore((state) => state.setData);
  const Title = useTitleStore((state) => state.Title);

  useEffect(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  useEffect(() => {
    setTitle();
  }, [setTitle]);

  useEffect(() => {
    setData(blogData);
  }, [setData]);

  return (
    <div className={styles.sponsoredArticlesSection}>
      <Title className={styles.title}>Sponsored Articles</Title>

      <div className={styles.articlesContainer}>
        <div className={styles.sponsoredBy}>
          <p>Sponsored by Taboola</p>
          <div className={styles.taboolaIcon}> ICON</div>
        </div>
        <Articles
          className={styles.Articles}
          images={images.length ? images : data.images}
          avatars={avatars.length ? avatars : ""}
          author={author}
          title={title}
          description={description}
          data={data}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.moreArticlesBtn}
          buttonChildren="More articles..."
          buttonType="normal"
          buttonSize="large"
          name="More Articles Button"
          type="button"
          ariaLabel="More Articles Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          className={styles.forumBtn}
          buttonChildren="Forum"
          buttonType="normal"
          buttonSize="large"
          name="Forum Button"
          type="button"
          ariaLabel="Forum Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default SponsoredArticles;
