import useArticlesStore from "@/store/articlesStore";
import Avatar from "../Avatars";
import styles from "./ArticleCardBox.module.scss";
import Image, { ImageLoaderProps } from "next/image";

interface CardProps {
  images: string;
  avatar: string;
  author: string;
  title: string;
  description: string;
  price: string;
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
  return (
    <article className={styles.articleCard}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          loader={imageLoader}
          src={images && images}
          width={310}
          height={233}
          alt={title}
          style={{ height: 233, objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.details}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{title.length > 64 ? `${title.slice(0, 64)}...` : title}</p>
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
