import Image from "next/image";
import { useMemo } from "react";
import type { GalleryImage } from "@/data/galleryImages";

// Image processing with ordering rules
const processImages = (images: GalleryImage[]): GalleryImage[] => {
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
const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  const displayImages = useMemo(() => processImages(images), [images]);

  // Styles
  const containerStyle = {
    display: "flex",
    gap: "12px",
    height: "475px",
  };

  const landscapeFirstImageStyle = {
    flex: "0 0 630px",
    height: "100%",
    position: "relative" as const,
  };
  const portraitFirstImageStyle = {
    flex: "0 0 315px",
    height: "100%",
    position: "relative" as const,
  };

  const gridContainerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
    gridTemplateRows: "repeat(2, 1fr)", // Two equal rows
    gap: "12px",
    // backgroundColor: "blue",
  };

  const gridItemStyle = {
    position: "relative" as const,
    overflow: "hidden",
    width: "315px",
  };

  if (displayImages.length === 0) return null;

  const firstImage = displayImages[0];
  const remainingImages = displayImages.slice(1);

  return (
    <div style={containerStyle}>
      {/* Main Image Container */}
      <div
        style={
          images[0].aspectRatio < 1
            ? portraitFirstImageStyle
            : landscapeFirstImageStyle
        }
      >
        <Image
          src={firstImage.url}
          alt="Main"
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
      </div>

      {/* Secondary Images Grid */}
      {remainingImages.length > 0 && (
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
      )}
    </div>
  );
};

export default ImageGallery;
