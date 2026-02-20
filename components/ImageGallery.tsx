"use client";
import styles from "./ImageGallery.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Buttons";
import { useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import AdCarousel from "./carousels/AdCarousel";
import { useBreakpoint } from "@/store/useBreakpointStore";

type Image = {
  id?: string;
  url?: string;
  width?: number;
  height?: number;
  alt?: string;
  aspectRatio?: number;
};

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const firstImage = images[0];
  const remainingImages = images.slice(1);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const { isLargeDesktop, isSmallDesktop, isTablet } = useBreakpoint();

  const handleIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };
  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
  };

  // Function to determine image orientation
  const getOrientation = (image: Image): "portrait" | "landscape" => {
    return (image.width ?? 0) < (image.height ?? 0) ? "portrait" : "landscape";
  };

  // Function to swap landscape-portrait pairs within the first three images
  const swapImages = (images: Image[]): Image[] => {
    const result = [...images]; // Create a copy of the array
    const maxIndex = Math.min(2, images.length - 1); // Limit to first three images or less
    let swapped = true;
    while (swapped && maxIndex > 0) {
      swapped = false;
      for (let i = 0; i < maxIndex; i++) {
        const currentOrientation = getOrientation(result[i]);
        const nextOrientation = getOrientation(result[i + 1]);
        if (
          currentOrientation === "landscape" &&
          nextOrientation === "portrait"
        ) {
          // Swap the images
          [result[i], result[i + 1]] = [result[i + 1], result[i]];
          swapped = true;
        }
      }
    }
    return result;
  };

  // Calculate minimum columns needed to fit content within max height
  const calculateColumns = (images: Image[]): number => {
    // Return 1 column for empty input to avoid invalid layouts
    if (images.length === 0) return 1;

    // Set maxHeight based on device type
    let maxHeight = 0;
    if (isSmallDesktop) {
      maxHeight = 456;
    } else if (isTablet) {
      maxHeight = 340;
    } else {
      maxHeight = 570;
    }
    const margin = 20;

    // Map image heights based on device type and orientation
    const itemHeights = images.map((img) => {
      if (isSmallDesktop) {
        return getOrientation(img) === "portrait" ? 456 : 275;
      } else if (isTablet) {
        return getOrientation(img) === "portrait" ? 340 : 220;
      } else {
        return getOrientation(img) === "portrait" ? 570 : 275;
      }
    });

    // Calculate total height needed for first column
    let firstColumnHeight = 0;
    for (let i = 0; i < itemHeights.length; i++) {
      const addedHeight =
        firstColumnHeight > 0 ? itemHeights[i] + margin : itemHeights[i];
      if (firstColumnHeight + addedHeight > maxHeight) {
        // Content overflows, need 2 columns
        return 2;
      }
      firstColumnHeight += addedHeight;
    }

    // All content fits in one column
    return 1;
  };

  // Apply the swapping logic
  const reorderedImages = swapImages(remainingImages);

  // Get calculated columns
  const numColumns = calculateColumns(reorderedImages);

  // Determine first image orientation for class
  const firstImageOrientation = getOrientation(firstImage);

  if (!showImages) {
    return (
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div
            className={`${styles.firstImage} ${firstImageOrientation === "portrait" ? styles.portrait : ""}`}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
          >
            <Image
              className={styles.image}
              src={firstImage.url}
              alt="First Image"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
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

          <div
            className={styles.remainingImages}
            style={{ columnCount: numColumns }}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
          >
            {reorderedImages.map((image, index) => (
              <div
                key={index}
                className={styles.imageContainer}
                data-orientation={getOrientation(image)}
              >
                <Image
                  className={styles.image}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
            <div className={styles.buttonContainer}>
              <Button
                className={styles.showAllImagesButton}
                buttonChildren="Full Screen"
                buttonType="normal"
                buttonSize="small"
                name="show-all-images-btn"
                type="button"
                ariaLabel="Show All Images Button"
                autoFocus={false}
                disabled={false}
                onClick={() => setShowImages(true)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.allImagesContainer}>
        <Modal
          showModal={showImages}
          setShowModal={setShowImages}
          modalContent={
            <AdCarousel
              images={images}
              onClick={() => showImages && setShowImages(false)}
            />
          }
        />
      </div>
    );
  }
};

export default ImageGallery;
