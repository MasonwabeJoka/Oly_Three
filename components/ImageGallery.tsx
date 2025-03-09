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
  const remaining = images.slice(1, 4);
 

  // Add null check for remaining
  if (!remaining?.length) return result;

  for (let i = 0; i < remaining?.length; i++) {
    const current = remaining[i];
    const next = remaining[i + 1];

    if (current?.aspectRatio > 1 && next?.aspectRatio < 1) {
      result.push(next, current);
      i++; // Skip the next iteration since we've already added the next image
    } else if (current) {
      // Add check for current
      result.push(current);
    }
  }

  return result.slice(0, 4);
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
      .filter((img) => img.aspectRatio < 1)?.length;

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
    .filter((img) => img.aspectRatio >= 1)?.length;

  // Calculate position based on available columns
  const col = portraitCount + Math.floor(landscapeIndex / 2) + 1;
  const row = (landscapeIndex % 2) + 1;

  return {
    gridColumn: col,
    gridRow: row,
    aspectRatio: `${current.aspectRatio}/1`,
  };
};
const ImageGallery = ({ images = [], onClick }: ImageGalleryProps) => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const displayImages = useMemo(() => processImages({ images }), [images]);
  const portraitsCount = displayImages.filter((img) => img.aspectRatio < 1).length;
  // Guard clause - return null if no images or if processing resulted in empty array
  if (!images?.length || !displayImages?.length) return null;

  const handleIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
  };

  // Styles
  const containerStyle = {
    position: "absolute" as const,
    display: "flex",
    gap: "12px",
    width: images[0]?.aspectRatio < 1 ? "970px" : "1284px",
    height: "475px",
    // clipPath: "inset(-20px -12px -40px -20px)", 
  };

  const landscapeFirstImageStyle = {
    display: "flex",
    flex: "0 0 630px",
    justifyContent: "center",
    height: "475px",
    position: "relative" as const,
  };
  const portraitFirstImageStyle = {
    display: "flex",
    flex: "0 0 315px",
    justifyContent: "center",
    height: "475px",
    position: "relative" as const,
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
    gridTemplateRows: "repeat(2, 1fr)", // Two equal rows
    gap: "12px",
  };

  const gridItemStyle = {
    position: "relative" as const,
    borderRadius: "32px",
    width: "315px",
    height: "475px",
  };

  const allImagesBtnStyle: React.CSSProperties = {
    width: "202px",
    height: "54px",
    position: "relative" as const,
    right:
      images?.length === 1
        ? "67%"
        : images?.length === 2 || images?.length === 3
          ? "44%"
          : "42.5%",
    top: "70%",
    zIndex: 5,
  };

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
        {remainingImages?.length > 0 && (
          <>
            <div style={gridContainerStyle}>
              {remainingImages.map((img, index) => {
                const position = getGridPosition(index, remainingImages);
                const isPortrait = img.aspectRatio < 1;
                // PLL-4-4
                const hideImage = {
                  display: index > 2 && portraitsCount > 1 ? "none" : "block"
                };

              //PPL & PLP
                // const hideImage = {
                //   display: index > 1 && portraitsCount > 1 ? "none" : "block"
                // };
                
                //LLP-5-4
                // const hideImage = {
                //   display: index > 2 && portraitsCount === 1 ? "none" : "block"
                // };

                // LLLL-5-5
                // const hideImage = {
                //   display: index > 3 ? "none" : "block"
                // };

                return (
                  <div
                    key={img.id}
                    style={{
                      ...gridItemStyle,
                      ...position,
                      ...hideImage,
                      aspectRatio: isPortrait
                        ? `1/${1 / img.aspectRatio}`
                        : `${img.aspectRatio}/1`,
                      height: isPortrait ? "475px" : "231px",
                      boxShadow:
                        "10px 10px 20px 0px rgba(169, 196, 203, 0.5), 5px 5px 10px 0px rgba(169, 196, 203, 0.25)",
                     
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{
                        objectFit: "cover",
                        borderRadius: "32px", // Add border radius here as well
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
              images && images.length > 4 ? "Show All Images" : "Full Screen"
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
