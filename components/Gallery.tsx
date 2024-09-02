"use client";
import styles from "./Gallery.module.scss";
import Button from "@/components/Buttons";
import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { Ad } from "@/sanity/Types/Ad";
import { useFetchAdStore } from "@/store/useFetchStore";

type ImageGroup = {
  id: Ad["_id"]; // Unique identifier for the group
  images?: Ad["images"]; // Array of images
  aspectRatios: (number | undefined)[] | undefined; // Array of aspect ratios
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
// Todo: Use grid for the layout of images in the Gallery
const Gallery = ({ images, onClick, aspectRatios }: ImageGroup) => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  let totalImages = images;
  if (aspectRatios) {
    if (
      aspectRatios[0] > 1 &&
      aspectRatios[1] > 1 &&
      aspectRatios[2] > 1 &&
      aspectRatios[3] > 1 &&
      aspectRatios[4] > 1
    ) {
      totalImages = totalImages?.slice(0, 5);
    } else if (
      aspectRatios[0] < 1 &&
      aspectRatios[1] < 1 &&
      aspectRatios[2] < 1
    ) {
      totalImages = totalImages?.slice(0, 3);
    }
  }



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
    return aspectRatios
      ?.slice(0, 5)
      .reduce((count: number, aspectRatio: number) => {
        if (aspectRatio < 1) {
          return count + 1;
        }
        return count;
      }, 0);
  };

  const numberOfPortraitImages = totalImages ? portraitImages(aspectRatios) : 3;

  const threePortraitImages = aspectRatios && aspectRatios[1] < 1;
  const twoPortraitImagesBefore =
    aspectRatios && aspectRatios[1] < 1 && aspectRatios[2] < 1;

  const PrimaryImage = () => {
    return (
      <div
        className={styles.primaryImageContainer}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        style={
          totalImages && galleryStyles(totalImages?.length, 0, aspectRatios[0])
        }
      >
        <div
          className={styles.primaryImagePositioner}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {totalImages && totalImages.length > 0 && (
            <>
              <Image
                className={styles.primaryImage}
                src={
                  totalImages && totalImages[0]?.url ? totalImages[0].url : ""
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
            </>
          )}
        </div>
      </div>
    );
  };

  const SecondaryImages = () => {
    const ImageTwo = () => {
      let order = "5";
      if (images?.length === 5 && aspectRatios) {
        //portrait
        if (aspectRatios[1] < 1) {
          order = "1";
        }
      }

      let display = "flex";
      if (images?.length === 5 && aspectRatios[1] > 1) {
     
        if (images?.length === 5 && aspectRatios[2] < 1) {
          display = "none";
        }
      }
      if (images?.length === 4 && order === "5") {
        display = "none";
      }
      return (
        <div
          className={`${styles.imageContainer} ${styles.imageTwoContainer}`}
          style={{
            ...(totalImages && totalImages[1]
              ? galleryStyles(totalImages?.length, 1, aspectRatios[1])
              : {}),
            order: order,
            display: display,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              className={`${styles.image} ${styles.imageTwo}`}
              src={totalImages && totalImages[1]?.url ? totalImages[1].url : ""}
              fill={true}
              sizes="(max-width: 768px) 100vw"
              alt="Gallery Image"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        </div>
      );
    };

    const ImageThree = () => {
      let order = "5";

      if (aspectRatios?.[2] < 1) {
        order = "1";
      }

      let display = "flex";
      if (images?.length === 5 && aspectRatios[4] < 1) {
        if (
          numberOfPortraitImages >1 &&
          (aspectRatios[1] < 1 &&
          aspectRatios[2] < 1)
        ) {
          display = "none";
        }
      }
      return (
        <div
          className={`${styles.imageContainer} ${styles.imageThreeContainer}`}
          style={{
            ...(totalImages && totalImages[2]
              ? galleryStyles(totalImages?.length, 2, aspectRatios[2])
              : {}),

            order: order,
            display: display,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              className={`${styles.image} ${styles.imageThree}`}
              src={totalImages && totalImages[2]?.url ? totalImages[2].url : ""}
              fill={true}
              sizes="(max-width: 768px) 100vw"
              alt="Gallery Image"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        </div>
      );
    };

    const ImageFour = () => {
      let order = "5";
      if (aspectRatios) {
        //portrait
        if (aspectRatios[3] < 1) {
          order = "2";
        }
      }

      let display = "flex";
      if (images?.length === 5 && aspectRatios[3] > 1) {
        if (aspectRatios[4] < 1) {
          display = "none";
        }
      }
      if (images?.length === 4 && aspectRatios[2] > 1) {
        if (aspectRatios[3] < 1) {
          display = "none";
        }
      }
      return (
        <div
          className={`${styles.imageContainer} ${styles.imageFourContainer}`}
          style={{
            ...(totalImages && totalImages[3]
              ? galleryStyles(totalImages?.length, 3, aspectRatios[3])
              : {}),
            order: order,
            display: display,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              className={`${styles.image} ${styles.imageFour}`}
              src={totalImages && totalImages[3]?.url ? totalImages[3].url : ""}
              fill={true}
              sizes="(max-width: 768px) 100vw"
              alt="Gallery Image"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        </div>
      );
    };

    const ImageFive = () => {
      let order = "5";
      if (aspectRatios) {
        //portrait
        if (aspectRatios[4] < 1) {
          order = "3";
        }
      }

      let display = "flex";
      //portrait
      if (images?.length === 5 && aspectRatios[4] > 1) {
        if (numberOfPortraitImages > 1) {
          display = "none";
        }
      }
      if (images?.length === 5 && aspectRatios[4] < 1) {
        if (
          numberOfPortraitImages >1 &&
          (aspectRatios[1] > 1 &&
          aspectRatios[2] > 1)
        ) {
          display = "none";
        }
      }
      return (
        <div
          className={`${styles.imageContainer} ${styles.imageFiveContainer}`}
          style={{
            ...(totalImages && totalImages[4]
              ? galleryStyles(totalImages?.length, 4, aspectRatios[4])
              : {}),
            order: order,
            display: display,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              className={`${styles.image} ${styles.imageFive}`}
              src={totalImages && totalImages[4]?.url ? totalImages[4].url : ""}
              fill={true}
              sizes="(max-width: 768px) 100vw"
              alt="Gallery Image"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        </div>
      );
    };

    return (
      <div className={styles.secondaryImages}>
        {totalImages && totalImages?.length > 1 && <ImageTwo />}
        {totalImages && totalImages?.length > 2 && <ImageThree />}
        {totalImages && totalImages?.length > 3 && <ImageFour />}
        {totalImages && totalImages?.length > 4 && <ImageFive />}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.gallery}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <PrimaryImage />

        {totalImages && totalImages.length > 1 && <SecondaryImages />}

        <Button
          className={styles.allImagesBtn}
          buttonChildren={
            totalImages && totalImages.length > 4
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

export default Gallery;
