import styles from "./ClassifiedLink.module.scss";
import Image from "next/image";

interface RecommendedArticleProps {
  text: string;
  image: string;
}
const RecommendedArticle = ({
  text,

  image,
}: RecommendedArticleProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        {image && (
          <Image
            src={image}
            alt={text}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              borderRadius: "2.5rem",
            }}
          />
        )}
        <div className={styles.textContainer}>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedArticle;
