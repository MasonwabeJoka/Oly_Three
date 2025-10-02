// import Image from "@/components/Image";
import styles from "./RecommendedArticle.module.scss";
import Avatar from "../Avatar";
import Link from "next/link";
import Image from "../Image";
// import {Image as IKImage} from "@imagekit/next";

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
  // Extract author name safely
  const getAuthorName = (rawAuthor: string) => {
    if (!rawAuthor) return "";
    const match = rawAuthor.match(/\(([^)]+)\)/);
    return match ? match[1] : rawAuthor;
  };

  const authorName = getAuthorName(author);

  return (
    <Link href="/article" className={styles.container}>
      <div className={styles.article}>
        <Image
          src={image}
          alt="Recommended Article"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "2.5rem",
          }}
          transformation={[
            {
              width: "280",
              height: "350",
              quality: 100,
              focus: "person",
            },
            {
              // raw: 'fo-person',
            } as any,
          ]}
        />
        <div
          className={`${styles.titleContainer} ${
            image
              ? styles.titleContainerWithImage
              : styles.titleContainerNoImage
          }`}
        >
          <div className={styles.contentWrapper}>
            <p className={styles.title}>{title}</p>
            <div className={styles.author}>
              {avatar && (
                <div className={styles.authorAvatar}>
                  <Avatar
                    className={styles.avatar}
                    avatar={avatar}
                    avatarSize="tiny"
                  />
                </div>
              )}
              {authorName && (
                <div className={styles.authorName}>By {authorName}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendedArticle;
