import Image from "next/image";
import styles from "./RecommendedArticle.module.scss";
import Avatar from "../Avatars";

interface RecommendedArticleProps {
  avatar: string;
  author: string;
  title: string;
  image: string;
}
const RecommendedArticle = ({
  title,
  avatar,
  author,
  image,
}: RecommendedArticleProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <Image
          src={image}
          alt="Recommended Article"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "32px",
          }}
        />
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              <Avatar
                className={styles.avatar}
                avatar={avatar}
                avatarSize="tiny"
              />
            </div>
            <div className={styles.authorName}>
                {author}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedArticle;
