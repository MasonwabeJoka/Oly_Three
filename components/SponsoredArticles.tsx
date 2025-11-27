"use client";
import { useEffect } from "react";
import ArticleSlider from "@/components/ArticlesSlider";
import useArticlesStore from "@/store/articlesStore";
import useTitleStore from "@/store/titleStore";
import styles from "./SponsoredArticles.module.scss";
import { articlesData } from "@/data/articleData";

const SponsoredArticles = () => {
  const images = useArticlesStore((state) => state.images);
  const avatars = useArticlesStore((state) => state.avatars);
  const author = useArticlesStore((state) => state.author);
  const title = useArticlesStore((state) => state.title);
  const description = useArticlesStore((state) => state.description);
  const data = useArticlesStore((state) => state.data);
  const getImages = useArticlesStore((state) => state.getImages);
  const getAvatars = useArticlesStore((state) => state.getAvatars);
  const setTitle = useArticlesStore((state) => state.setTitle);
  const setData = useArticlesStore((state) => state.setData);

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
    setData(
      articlesData.map((item) => ({
        ...item,
        images: [item.images],
        avatars: [],
      }))
    );
  }, [setData]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sponsored Articles</div>

      <ArticleSlider />
    </div>
  );
};

export default SponsoredArticles;
