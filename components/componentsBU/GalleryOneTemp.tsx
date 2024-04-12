import styles from "./GalleryOne.module.scss";
import Button from "@/components/Buttons";
import Image from "next/image";
import { useState } from "react";
import Icon from "./Icon";

type Props = {
  id: number; // Unique identifier for the image
  image: string; // URL of the image
  isPrimary?: boolean; // Optional flag to indicate primary image
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const GalleryOne = ({ data, onClick }: Props) => {
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

  // Determine the primary image
  const primaryImage = data.find((img) => data[0]);
  // const primaryImage = data.find((img) => img.isPrimary) || data[0];
  // Get secondary images, up to 4 more after the primary
  const secondaryImages = data
    .filter((img) => img !== primaryImage)
    .slice(0, 4);
  return (
    <div className={styles.container}>
      <div
        className={styles.gallery}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div
          className={styles.primaryImageContainer}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          <div
            className={styles.primaryImagePositioner}
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <Image
              className={styles.primaryImage}
              src={primaryImage.image}
              fill={true}
              alt="Gallery Image"
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: "cover" }}
            />

            <div
              className={styles.likeIconContainer}
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              onClick={handleIconClick}
            >
              {isCardHovered && (
                <Icon
                  className={styles.likeIcon}
                  src={getImageSrc()}
                  alt="Like Icon"
                  width={64}
                  height={64}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.secondaryImages}>
          {secondaryImages.map((image, index) => (
            <div key={image.id} className={styles.imageContainer}>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  className={`${styles.image} ${styles.imageOne}`}
                  src={image.image}
                  fill={true}
                  sizes="(max-width: 768px) 100vw"
                  alt="Gallery Image"
                  style={{ objectFit: "cover" }}
                />
              </div>
              {/* Check if it's the last secondary image and render the button */}
              {index === 3 && (
                <Button
                  className={styles.allImagesBtn}
                  buttonChildren={
                    data.length > 5 ? "Show All Images" : "Show Full Image"
                  }
                  buttonType="normal"
                  buttonSize="medium"
                  name="allImagesBtn"
                  type="button"
                  ariaLabel="All Images Button"
                  autoFocus={false}
                  disabled={false}
                  formTarget="_blank"
                  onClick={onClick}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.postMetrics}>
        <div className={styles.likes}>
          <div className={styles.icon}>
            <Icon
              className={styles.likesIcon}
              src={"/icons/heart-clicked.svg"}
              alt="likes icon"
              width={20}
              height={20}
            />
          </div>
          <p>10</p>
        </div>
        <div className={styles.views}>
          <div className={styles.icon}>
            <Icon
              className={styles.viewsIcon}
              src={getImageSrc()}
              alt="likes icon"
              width={20}
              height={20}
            />
          </div>
          <p>10</p>
        </div>
        <div className={styles.postAge}>
          <p>
            Posted <span className={styles.duration}>2 weeks</span>ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryOne;
