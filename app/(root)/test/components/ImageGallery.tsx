import Image from 'next/image';
import { useMemo } from 'react';
import type { GalleryImage } from '@/data/galleryImages';

// Image processing with ordering rules
const processImages = (images: GalleryImage[]): GalleryImage[] => {
    if (!images?.length) return [];
    
    const result = [images[0]];
    let portraitCount = 0;
    let landscapeCount = 0;
  
    for (let i = 1; i < images.length; i++) {
      const img = images[i];
      const isPortrait = img.aspectRatio < 1;
  
      if (isPortrait) {
        if (portraitCount >= 2) continue; // Max 2 portraits after first image
        if (landscapeCount > 0) continue; // No portraits after landscapes
        portraitCount++;
      } else {
        if (portraitCount > 0) continue; // No landscapes after portraits
        if (landscapeCount >= 4) continue; // Max 4 landscapes after first image
        landscapeCount++;
      }
  
      result.push(img);
      if (result.length >= 5) break;
    }
  
    return result;
  };
  
  // Grid positioning logic
  const getGridPosition = (index: number, images: GalleryImage[]) => {
    const current = images[index];
    const isPortrait = current.aspectRatio < 1;
    const prev = images[index - 1];
    const next = images[index + 1];
  
    // Portrait positioning
    if (isPortrait) {
      return {
        // gridColumn: '1',
        gridRow: '1 / 3',
        aspectRatio: `1/${1/current.aspectRatio}`
      };
    }
  
    // Landscape positioning
    const positions = [
      { gridColumn: 1, gridRow: 1 }, // Position 1
      { gridColumn: 1, gridRow: 2 }, // Position 2
      { gridColumn: 2, gridRow: 1 }, // Position 3
      { gridColumn: 2, gridRow: 2 }, // Position 4
    ];
  
    return positions[index] || positions[3];
  };
const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  const displayImages = useMemo(() => processImages(images), [images]);

  // Styles
const containerStyle = {
    display: 'flex',
    gap: '8px',
    height: '400px',
    backgroundColor: 'red',
  };
  
  const landscapeFirstImageStyle = {
    flex: '0 0 533px',
    height: '100%',
    position: 'relative' as const,
  };
  const portraitFirstImageStyle = {
    flex: '0 0 266px',
    height: '100%',
    position: 'relative' as const,
  };
  
  const gridContainerStyle = {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Two equal columns
    gridTemplateRows: 'repeat(2, 1fr)', // Two equal rows
    gap: '8px',
    backgroundColor: 'blue',
  };
  
  const gridItemStyle = {
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: 'green',
    width:  "266px",
  };
  

  if (displayImages.length === 0) return null;

  const firstImage = displayImages[0];
  const remainingImages = displayImages.slice(1);

  return (
    <div style={containerStyle}>
      {/* Main Image Container */}
      <div style={images[0].aspectRatio < 1 ? portraitFirstImageStyle : landscapeFirstImageStyle}>
        <Image
          src={firstImage.url}
          alt="Main"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            borderRadius: '4px',
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
                  aspectRatio: isPortrait ? `1/${1/img.aspectRatio}` : `${img.aspectRatio}/1`
                }}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '4px',
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








