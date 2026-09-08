"use client";
import styles from "./OlyArticles.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import ArticlesSlider from "@/components/ArticlesSlider";

const OlyArticles = () => {
  return (
    <div className={styles.blogSection}>
      <h2 className={styles.title}>Oly Articles</h2>
      <ArticlesSlider />
      <div className={styles.buttons}>
        <Link href="/articles/sports/?page=1">
          <Button
            className={styles.moreArticlesBtn}
            buttonVariant="normal"
            children="More articles..."
            buttonSize="large"


            ariaLabel="More Articles Button"


          />
        </Link>
        <Link href="#">
          <Button
            className={styles.forumBtn}
            buttonVariant="normal"
            children="Forum"
            buttonSize="large"


            ariaLabel="Forum Button"


          />
        </Link>
      </div>
    </div>
  );
};

export default OlyArticles;
