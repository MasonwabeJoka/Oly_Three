"use client";
import styles from "./OlyArticles.module.scss";
import Button from "@/components/Buttons";
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
            buttonType="normal"
            buttonChildren="More articles..."
            buttonSize="large"
            type="button"
            name="More Articles Button"
            ariaLabel="More Articles Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>
        <Link href="#">
          <Button
            className={styles.forumBtn}
            buttonType="normal"
            buttonChildren="Forum"
            buttonSize="large"
            type="button"
            name="Forum Button"
            ariaLabel="Forum Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>
      </div>
    </div>
  );
};

export default OlyArticles;
