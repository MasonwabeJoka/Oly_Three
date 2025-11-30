export interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
  aspectRatio?: number;
}

export const galleryImages: GalleryImage[] = [];

export { galleryImages as default };
export const imagesData = galleryImages;
export const images = galleryImages;