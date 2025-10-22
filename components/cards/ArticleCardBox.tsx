import useArticlesStore from "@/store/articlesStore";
import Avatar from "../Avatar";
import styles from "./ArticleCardBox.module.scss";
import Image, { ImageLoaderProps } from "next/image";

interface CardProps {
  images: string;
  avatar: string;
  author: string;
  title: string;
  description?: string;
}

type CustomImageLoader = (props: ImageLoaderProps) => string;

const imageLoader: CustomImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`;
};

const ArticleCardBox = ({
  images,
  avatar,
  author,
  title,
  description,
}: CardProps): JSX.Element => {
  // Default image if none provided
  const defaultImage = "/placeholder-image.jpg"; // Make sure this exists in your public folder
  const imageSource = images || defaultImage;
;
  return (
    <article className={styles.articleCard}>
      <div className={styles.imageContainer}>
        {imageSource && (
          <Image
            className={styles.image}
            // loader={imageLoader}
            src={imageSource}
            width={310}
            height={233}
            alt={title || "Article image"}
            style={{ height: 233, objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>
            {title?.length > 84 ? `${title.slice(0, 84)}...` : title}
          </p>
        </div>
        <div className={styles.author}>
          <Avatar
            className={styles.profilePic}
            avatar={avatar || null}
            avatarSize="small"
            isOnline={false}
          />
          <p className={styles.authorName}>{author}</p>
        </div>
      </div>
    </article>
  );
};

export default ArticleCardBox;