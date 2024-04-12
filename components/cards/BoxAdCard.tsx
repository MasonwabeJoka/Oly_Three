"use client";
import styles from "./BoxAdCard.module.scss";
import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import likeButtonStore from "@/store/likeButtonStore";
import Image from "next/image";

interface CardProps {
  cardType: "box";
  images: string;
  title: string;
  description: string;
  price: string;
  cardSize?: keyof typeof CARD_SIZE;
}

const CARD_SIZE = {
  large: `${styles.large}`,
  standard: `${styles.medium}`,
  small: `${styles.small}`,
  largeFeed: `${styles.largeFeed}`,
  standardFeed: `${styles.mediumFeed}`,
  smallFeed: `${styles.smallFeed}`,
  "": "",
};

const BoxAdCard = ({
  images,
  title,
  description,
  price,
  cardSize,
}: CardProps): JSX.Element => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
  };

  return (
    <article
      className={`${cardSize ? CARD_SIZE[cardSize] : ""} ${styles.adCard} `}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div
        className={`${styles.imageContainer} ${
          isCardHovered && styles.imageContainerHovered
        }`}
      >
        <Image
          className={`${styles.image} ${isCardHovered && styles.imageHovered}`}
          src={images}
          width={310}
          height={248}
          alt={title}
          style={{ verticalAlign: "top", minHeight: 248, objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div
          className={styles.likeIconContainer}
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
          onClick={handleIconClick}
        >
          {isCardHovered ? (
            <Icon
              className={styles.likeIcon}
              src={getImageSrc()}
              alt="Like Icon"
              width={isHeartHovered ? 64 : 52}
              height={isHeartHovered ? 64 : 52}
            />
          ) : isHeartClicked ? (
            <Icon
              className={styles.likeIcon}
              src={getImageSrc()}
              alt="Like Icon"
              width={isHeartHovered ? 64 : 52}
              height={isHeartHovered ? 64 : 52}
            />
          ) : null}
        </div>
      </div>

      {!isCardHovered ? (
        <div className={styles.details}>
          <div className={styles.titleDescription}>
            <p className={styles.title}>
              {title.length > 56 ? `${title.slice(0, 56)}...` : title}
            </p>
          </div>
          <h3 className={styles.price}>{price}</h3>
        </div>
      ) : (
        <div
          className={`${styles.details} ${styles.detailsHovered}`}
          onMouseEnter={() => setIsCardHovered(true)}
        >
          <div className={styles.titleDescription}>
            <p className={styles.title}>{`${title.slice(0, 96)}`}</p>

            <p className={styles.description}>{description.length > 400 ?`${description.slice(
              0,
              400
            )}...` : description}</p>
          </div>
          <h3 className={styles.price}>{price}</h3>
        </div>
      )}
    </article>
  );
};

export default BoxAdCard;
