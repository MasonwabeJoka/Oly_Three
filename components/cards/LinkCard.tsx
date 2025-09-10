"use client";
import Image from "next/image";
import styles from "./LinkCard.module.scss";

interface CardProps {
  className?: string;
  label: string;
  image: string;
  cardSize: "large" | "standard" | "small";
  cardVariant?: "regular" | "mobile" | "dashboard";
}

const LinkCardBox = ({
  label,
  image,
  cardSize,
  cardVariant = "regular",
}: CardProps) => {
  const cardSizeClass =
    cardSize === "large"
      ? styles.large
      : cardSize === "standard"
        ? styles.standard
        : styles.small;

  const labelContainer =
    cardSize === "large"
      ? styles.largeLabelContainer
      : styles.standardLabelContainer;

  return (
    <div className={`${styles.cardContainer} ${cardSizeClass}`}>
      <div className={cardSizeClass} style={{ borderRadius: "2.5rem" }}>
        <Image
          src={image || "/bear.jpg"}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "2.5rem",
          }}
        />
      </div>
      <div className={`${labelContainer} ${styles.labelContainer}`}>
        <div className={styles.labelBackground}>
          <p className={styles.label}>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default LinkCardBox;
