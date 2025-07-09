"use client";
import { useEffect } from "react";
import Articles from "@/components/ArticlesSlider";
import useArticlesStore from "@/store/articlesStore";
import useTitleStore from "@/store/titleStore";
import styles from "./SponsoredArticles.module.scss";

interface SponsoredArticlesProps {
  images: string[];
  avatars: string[];
  author: string;
  title: string[];
  description: string;
  data: any; // Consider replacing 'any' with a more specific type if possible
  blogData: any; // Consider replacing 'any' with a more specific type if possible
}
const SponsoredArticlesClient = ({ images, avatars, author, title, description, data, blogData }: SponsoredArticlesProps) => {
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
    setData(blogData);
  }, [setData]);

  return (
    <Articles
      className={styles.articles}
      images={images.length ? images : data.images}
      avatars={avatars.length ? avatars : ""}
      author={author}
      title={title}
      description={description}
      data={data}
    />
  );
};

export default SponsoredArticlesClient;