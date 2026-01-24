import styles from "./ClassifiedLink.module.scss";
import Image from "@/components/Image";

interface ClassifiedLinkProps {
  text?: string;
  image?: string;
}
const ClassifiedLink = ({
  text,

  image,
}: ClassifiedLinkProps) => {
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

export default ClassifiedLink;
