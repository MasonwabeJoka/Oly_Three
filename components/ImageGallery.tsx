"use client";
import styles from "./ImageGallery.module.scss";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryImage } from "@/data/galleryImages";
import Icon from "@/components/Icon";
import Button from "@/components/Buttons";

interface ImageGalleryProps {
  images: GalleryImage[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Image processing with ordering rules
const processImages = ({ images }: ImageGalleryProps) => {
  if (!images?.length) return [];

  const result = [images[0]];
  const remaining = images.slice(1);

  const portraits = remaining.filter((img) => img.aspectRatio < 1);
  const landscapes = remaining.filter((img) => img.aspectRatio >= 1);

  // Select up to 2 portraits
  const selectedPortraits = portraits.slice(0, 2);
  result.push(...selectedPortraits);
  const portraitCount = selectedPortraits.length;

  // Calculate max landscapes based on grid capacity (2 columns - portraits) × 2 rows
  const maxLandscapes = (2 - portraitCount) * 2;
  const selectedLandscapes = landscapes.slice(0, maxLandscapes);
  result.push(...selectedLandscapes);

  return result.slice(0, 5); // Ensure max 5 images total
};

// Grid positioning logic
const getGridPosition = (
  index: number,
  images: GalleryImage[]
): React.CSSProperties => {
  const current = images[index];
  const isPortrait = current.aspectRatio < 1;

  if (isPortrait) {
    // Portrait images get their own column
    const portraitIndex = images
      .slice(0, index + 1)
      .filter((img) => img.aspectRatio < 1).length;

    return {
      gridColumn: portraitIndex,
      gridRow: "1 / 3",
      aspectRatio: `1/${1 / current.aspectRatio}`,
    };
  }

  // Landscape positioning logic
  const portraitCount = images.filter((img) => img.aspectRatio < 1).length;
  const landscapeIndex = images
    .slice(0, index)
    .filter((img) => img.aspectRatio >= 1).length;

  // Calculate position based on available columns
  const col = portraitCount + Math.floor(landscapeIndex / 2) + 1;
  const row = (landscapeIndex % 2) + 1;

  return {
    gridColumn: col,
    gridRow: row,
    aspectRatio: `${current.aspectRatio}/1`,
  };
};
const ImageGallery = ({ images, onClick }: ImageGalleryProps) => {
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

  const displayImages = useMemo(() => processImages({ images }), [images]);

  // Styles
  const containerStyle = {
    position: "absolute" as const,
    display: "flex",
    gap: "12px",
    width: "630px",
    height: "475px",
  };

  const landscapeFirstImageStyle = {
    display: "flex",
    flex: "0 0 630px",
    justifyContent: "center",
    height: "100%",
    position: "relative" as const,
  };
  const portraitFirstImageStyle = {
    display: "flex",
    flex: "0 0 315px",
    justifyContent: "center",
    height: "100%",
    position: "relative" as const,
  };

  const gridContainerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
    gridTemplateRows: "repeat(2, 1fr)", // Two equal rows
    gap: "12px",
  };

  const gridItemStyle = {
    position: "relative" as const,
    overflow: "hidden",
    width: "315px",
  };

  const allImagesBtnStyle: React.CSSProperties = {
    width: "202px",
    height: "54px",

    position: "relative" as const,
    right: images.length === 1 ? "68%" : images.length === 2 ||images.length === 3 ? "44%" : "42.5%",
    top: "70%",
    zIndex: 5,
  };

  if (displayImages.length === 0) return null;

  const firstImage = displayImages[0];
  const remainingImages = displayImages.slice(1);

  return (
    <>
      <div style={containerStyle}>
        {/* Primary Image Container */}
        <div
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
          style={
            images[0].aspectRatio < 1
              ? portraitFirstImageStyle
              : landscapeFirstImageStyle
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={firstImage.url}
              alt="Primary"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                borderRadius: "32px",
                boxShadow:
                  "10px 10px 20px 0px rgba(169, 196, 203, 0.5), 5px 5px 10px 0px rgba(169, 196, 203, 0.25)",
              }}
              priority
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

        {/* Secondary Images Grid */}
        {remainingImages.length > 0 && (
          <>
            <div style={gridContainerStyle}>
              {remainingImages.map((img, index) => {
                const position = getGridPosition(index, remainingImages);
                const isPortrait = img.aspectRatio < 1;

                return (
                  <div
                    key={img.id}
                    style={{
                      ...gridItemStyle,
                      ...position,
                      aspectRatio: isPortrait
                        ? `1/${1 / img.aspectRatio}`
                        : `${img.aspectRatio}/1`,
                      height: isPortrait ? "475px" : "231px",
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{
                        objectFit: "cover",
                        borderRadius: "32px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
            <div style={allImagesBtnStyle}>
              <Button
                style={{ width: "202px", height: "54px" }}
                buttonChildren={
                  images && images.length > 4
                    ? "Show All Images"
                    : "Full Screen"
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
    </>
  );
};

export default ImageGallery;
