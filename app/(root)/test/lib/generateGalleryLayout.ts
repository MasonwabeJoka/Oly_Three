import { MockImage } from "../data/galleryImages";

export type GalleryGrid = {
  id: string;
  grid: number; // 1 = full-width image grid, 2 = secondary grid
  position: number; // 1..n inside the grid
};

export function generateGalleryLayout(images: MockImage[]): GalleryGrid[] {
  if (!images.length) return [];

  const isPortrait = (img: MockImage) => img.height > img.width;
  const isLandscape = (img: MockImage) => img.width >= img.height;

  const layout: GalleryGrid[] = [];

  // First grid: only the first image (full-width)
  layout.push({
    id: images[0].id,
    grid: 1,
    position: 1,
  });

  // Second grid: remaining images
  let pos = 1;
  for (let i = 1; i < images.length; i++) {
    layout.push({
      id: images[i].id,
      grid: 2,
      position: pos++,
    });
  }

  // Debugging only in console
  console.log("Generated gallery layout:", layout);
  console.log(
    "Orientation sequence:",
    layout.map((l) => {
      const img = images.find((im) => im.id === l.id);
      return img ? (isPortrait(img) ? "P" : "L") : "?";
    })
  );

  return layout;
}
