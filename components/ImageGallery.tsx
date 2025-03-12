"use client";
import styles from "./ImageGallery.module.scss";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryImage } from "@/data/galleryImages";
import Icon from "@/components/Icon";
import Button from "@/components/Buttons";
import { Ad } from "@/sanity/Types/Ad";

interface ImageGalleryProps {
  id: Ad["_id"];
  images?: Ad["images"];
  aspectRatios: (number | undefined)[] | undefined; // Array of aspect ratios
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
// interface ImageGalleryProps {
//   images: GalleryImage[];
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }

// Image processing with ordering rules
const processImages = ({ images }: ImageGalleryProps) => {
  if (!images?.length) return [];

  // Keep the first image as is
  const result = [images[0]];
  const remaining = images.slice(1, 5);

  if (!remaining?.length) return result;

  // Separate portraits and landscapes from remaining images
  const portraits = remaining.filter((img) => img.aspectRatio < 1);
  const landscapes = remaining.filter((img) => img.aspectRatio >= 1);

  // Combine them with portraits first, then landscapes
  result.push(...portraits, ...landscapes);

  // Return only first 5 images
  return result.slice(0, 5);
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
  const portraitsCount = displayImages.filter(
    (img) => img.aspectRatio < 1
  ).length;
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

  const wrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    height: "fit-content",
    marginBottom: "16px",
  };

  const containerStyle = {
    display: "flex",
    gap: "12px",
    width: "fit-content",
    height: "475px",
    marginBottom: "4px",
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
  };

  const firstImage = displayImages[0];
  const remainingImages = displayImages.slice(1);

  const hideImage = (
    index: number,
    remainingImages: GalleryImage[],
    portraitsCount: number
  ): React.CSSProperties => {
    // Get the aspect ratios of the remaining images
    const patterns = remainingImages
      .map((img) => (img.aspectRatio >= 1 ? "L" : "P"))
      .join("");
    console.log("Pattern:", patterns);
    console.log("remainingImages:", remainingImages);
    switch (patterns) {
      // Landscape-Portrait-Portrait-Landscape pattern
      case "LPPL":
        return {
          display:
            (index === 1 || index === 3) && portraitsCount > 1
              ? "none"
              : "block",
        };

      // Portrait-Portrait-Landscape or Portrait-Landscape-Portrait pattern
      case "PPL":
      case "PLP":
        return {
          display: index > 1 && portraitsCount > 1 ? "none" : "block",
        };

      // Landscape-Landscape-Portrait pattern
      case "LLP":
        return {
          display: index === 3 ? "none" : "block",
        };

      // Portrait-Landscape-Landscape-Landscape pattern
      case "PLLL":
        return {
          display: index === 3 ? "none" : "block",
        };
      // Portrait-Landscape-Landscape-Portrait pattern
      case "PPLL":
        return {
          display: index === 2 || index === 3 ? "none" : "block",
        };
      // Portrait-Portrait-Portrait-Portrait pattern or
      // Portrait-Portrait-Portrait-Portrait
      case "PPPP":
      case "PPPL":
        return {
          display: index === 2 || index === 3 ? "none" : "block",
        };

      // Landscape-Landscape-Landscape-Landscape pattern (5 images)
      case "LLLL":
        return {
          display: index > 3 ? "none" : "block",
        };

      // Default case - show all images
      default:
        return {
          display: "block",
        };
    }
  };

  return (
    <div style={wrapper}>
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
          {images.length === 1 && (
            <div
              style={{
                ...allImagesBtnStyle,
                position: "absolute" as const,
                left: "50%",
                top: "70%",
                transform: "translateX(-50%)",
                zIndex: 5,
              }}
            >
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
          )}
        </div>

        {/* Secondary Images Grid */}
        {remainingImages?.length > 0 && (
          <>
            <div style={gridContainerStyle}>
              {remainingImages.map((img, index) => {
                const position = getGridPosition(index, remainingImages);
                const isPortrait = img.aspectRatio < 1;
                const hideImageStyle = hideImage(
                  index,
                  remainingImages,
                  portraitsCount
                );

                return (
                  <div
                    key={img.id}
                    style={{
                      ...gridItemStyle,
                      ...position,
                      ...hideImageStyle,
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
                        borderRadius: "32px", 
                      }}
                    />
                    {remainingImages?.length === 1 &&
                    index === 0 &&
                    isPortrait ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: "70%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : remainingImages?.length === 2 &&
                      index === 1 &&
                      !isPortrait ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: "37%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : remainingImages?.length > 1 &&
                      index === 1 &&
                      isPortrait ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: "70%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : remainingImages?.length >= 3 &&
                      remainingImages[0].aspectRatio < 1 &&
                      index === 2 ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: isPortrait ? "70%" : "37%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : remainingImages?.length === 3 &&
                      remainingImages[0].aspectRatio > 1 &&
                      index === 2 ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: isPortrait ? "70%" : "144%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : remainingImages?.length === 1 && index === 0 ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: isPortrait ? "70%" : "144%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : remainingImages?.length === 4 && index === 3 ? (
                      <div
                        style={{
                          ...allImagesBtnStyle,
                          position: "absolute" as const,
                          left: "50%",
                          top: "37%",
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
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
                    ) : null}
                  </div>
                );
              })}
            </div>
          </>
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
              alt="views icon"
              width={20}
              height={20}
            />
          </div>
          <p>10</p>
        </div>
        <div className={styles.postAge}>
          <p>
            Posted <span className={styles.duration}>2 weeks</span> ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
