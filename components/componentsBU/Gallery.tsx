"use client";
import styles from "./Gallery.module.scss";
import Button from "@/components/Buttons";
import Image from "next/image";
import { useState } from "react";
import Icon from "./Icon";
import { Ad } from "@/payload.types";

type ImageAsset = {
  url: string;
  width: number;
  height: number;
  aspectRatio: number;
  // metadata?: {
  //   dimensions: {
  //     width: number;
  //     height: number;
  //     aspectRatio: number;
  //   };
  // ... other metadata properties
};

type Image = {
  asset: ImageAsset;
  alt?: string;
  url: string;
  width: number;
  height: number;
  aspectRatio: number;
  isPrimary?: boolean; // Optional flag to indicate primary image
};

type ImageGroup = {
  id: Ad["adId"]; // Unique identifier for the group
  images?: Ad["images"]; // Array of images
  aspectRatios: number[]; // Array of aspect ratios
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const GalleryOne = ({ images, onClick, aspectRatios }: ImageGroup) => {
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

  const galleryStyles = (
    numberOfImages: number,
    index: number,
    aspectRatio: number
  ) => {
    if (numberOfImages === 0 || numberOfImages === 1) {
      if (aspectRatio > 1) {
        return {
          width: "642px",
          height: "472.75px",
          display: "flex",
        };
      }

      if (aspectRatio < 1) {
        return {
          width: "315px",
          height: "472.75px",
        };
      }
    } else if (numberOfImages === 2) {
      if (aspectRatio >= 1) {
        return {
          width: "642px",
          height: "472.75px",
        };
      }

      if (aspectRatio < 1) {
        return {
          width: "315px",
          height: "472.75px",
        };
      }
    } else if (numberOfImages === 3) {
      if (aspectRatio >= 1 && index === 0) {
        return {
          width: "642px",
          height: "472.75px",
        };
      }

      if (aspectRatio >= 1 && index > 0) {
        return {
          width: "315px",
          height: "231px",
          display: "block",
        };
      }

      if (aspectRatio < 1) {
        return {
          width: "315px",
          height: "472.75px",
        };
      }
    } else if (numberOfImages >= 4) {
      if (aspectRatio >= 1 && index === 0) {
        return {
          width: "642px",
          height: "472.75px",
        };
      }

      if (aspectRatio >= 1 && index > 0) {
        return {
          width: "315px",
          height: "231px",
        };
      }

      if (aspectRatio < 1) {
        return {
          width: "315px",
          height: "472.75px",
        };
      }
    }
  };

  const portraitImages = (aspectRatios: number[]) => {
    return aspectRatios?.reduce((count: number, aspectRatio: number) => {
      if (aspectRatio < 1) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const numberOfPortraitImages = images ? portraitImages(aspectRatios) : 3;

  const urls = images
    ?.map((image) =>
      typeof image.image === "string" ? image.image : image?.image?.url
    )
    .filter((url) => typeof url === "string" && url.trim() !== "") as string[];

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
          style={images && galleryStyles(images?.length, 0, aspectRatios[0])}
        >
          <div
            className={styles.primaryImagePositioner}
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <Image
              className={styles.primaryImage}
              src={
                images && images.length > 0
                  ? urls[0]
                  : "/no_image_landscape.png"
              }
              fill={true}
              alt="Gallery Image"
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: "cover" }}
              priority={true}
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

        {images && images.length > 1 && (
          <div
            className={styles.secondaryImages}
            style={{
              flexDirection:
                images && images.length === 3 && aspectRatios[2] > 1
                  ? "column"
                  : "row",
              rowGap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <div
              className={`${styles.imageContainer} ${styles.imageOneContainer}`}
              style={
                images &&
                images[1] &&
                galleryStyles(images?.length, 1, aspectRatios[1])
              }
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  className={`${styles.image} ${styles.imageOne}`}
                  src={
                    images && images[1] && images.length > 0
                      ? urls[1]
                      : "/no_image_landscape.png"
                  }
                  fill={true}
                  sizes="(max-width: 768px) 100vw"
                  alt="Gallery Image"
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </div>
            </div>
            <div
              className={`${styles.imageContainer} ${styles.imageTwoContainer}`}
              style={
                images &&
                images[2] &&
                galleryStyles(images?.length, 2, aspectRatios[2])
              }
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  className={`${styles.image} ${styles.imageTwo}`}
                  src={
                    images && images[2] && images.length > 0
                      ? urls[2]
                      : "/no_image_landscape.png"
                  }
                  fill={true}
                  sizes="(max-width: 768px) 100vw"
                  alt="Gallery Image"
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </div>
            </div>

            <div
              className={`${styles.imageContainer} ${styles.imageThreeContainer}`}
              style={
                images &&
                images[3] &&
                galleryStyles(images?.length, 3, aspectRatios[3])
              }
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  className={`${styles.image} ${styles.imageThree}`}
                  src={
                    images && images[3] && images.length > 0
                      ? urls[3]
                      : "/no_image_landscape.png"
                  }
                  fill={true}
                  sizes="(max-width: 768px) 100vw"
                  alt="Gallery Image"
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </div>
            </div>
            <div
              className={`${styles.imageContainer} ${styles.imageFourContainer}`}
              style={
                images &&
                images[4] &&
                galleryStyles(images?.length, 4, aspectRatios[4])
              }
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  className={`${styles.image} ${styles.imageFour}`}
                  src={
                    images && images[4] && images.length > 0
                      ? urls[4]
                      : "/no_image_landscape.png"
                  }
                  fill={true}
                  sizes="(max-width: 768px) 100vw"
                  alt="Gallery Image"
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
                {images && images.length > 5 && (
                  <Button
                    className={styles.allImagesBtn}
                    buttonChildren={
                      images && images.length > 5
                        ? "Show All Images"
                        : "Show Full Image"
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
            </div>
          </div>
        )}
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
