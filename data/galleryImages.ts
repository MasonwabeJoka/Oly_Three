export type GalleryImage = {
  id: string;
  url: string;
  aspectRatio: number; // > 1 for Landscape, < 1 for Portrait
};

export type GalleryGroup = {
  id: string;
  title: string;
  images: GalleryImage[];
};

export const galleryImages: GalleryGroup[] = [
  // {
  //   id: "all-Landscape",
  //   title: "All Landscape Images",
  //   images: [
  //     { id: "l1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "l2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
  //     { id: "l3", url: "/listing_images/Landscape/3.jpg", aspectRatio: 1.5 },
  //     { id: "l4", url: "/listing_images/Landscape/4.jpg", aspectRatio: 1.5 },
  //     { id: "l5", url: "/listing_images/Landscape/5.jpg", aspectRatio: 1.5 },
  //   ]
  // },
  // {
  //   id: "all-Portrait",
  //   title: "All Portrait Images",
  //   images: [
  //     { id: "p1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "p2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //     { id: "p3", url: "/listing_images/Portrait/3.jpg", aspectRatio: 0.67 },
  //     { id: "p4", url: "/listing_images/Portrait/4.jpg", aspectRatio: 0.67 },
  //     { id: "p5", url: "/listing_images/Portrait/5.jpg", aspectRatio: 0.67 },
  //   ]
  // },
  // {
  //   id: "mixed-leading-Landscape",
  //   title: "Mixed with Leading Landscape",
  //   images: [
  //     { id: "ml1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "mp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "ml2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
  //     { id: "mp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //     { id: "ml3", url: "/listing_images/Landscape/3.jpg", aspectRatio: 1.5 },
  //   ]
  // },
  // {
  //   id: "mixed-leading-portrait",
  //   title: "Mixed with Leading Portrait",
  //   images: [
  //     { id: "mp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "ml1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "mp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //     { id: "ml2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
  //     { id: "mp3", url: "/listing_images/Portrait/3.jpg", aspectRatio: 0.67 },
  //   ]
  // },
  // {
  //   id: "two-portrait-three-Landscape",
  //   title: "Two Portraits, Three Landscape",
  //   images: [
  //     { id: "tp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "tp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //     { id: "tl1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "tl2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
  //     { id: "tl3", url: "/listing_images/Landscape/3.jpg", aspectRatio: 1.5 },
  //   ]
  // },
  // {
  //   id: "three-Portraits-two-Landscape",
  //   title: "Three Portraits, Two Landscape",
  //   images: [
  //     { id: "tp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "tp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //     { id: "tp3", url: "/listing_images/Portrait/3.jpg", aspectRatio: 0.67 },
  //     { id: "tl1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "tl2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
  //   ]
  // },
  // {
  //   id: "four-images-mixed",
  //   title: "Four Images Mixed",
  //   images: [
  //     { id: "fp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "fl1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "fp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //     { id: "fl2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
  //   ]
  // },
  // {
  //   id: "three-images-mixed",
  //   title: "Three Images Mixed",
  //   images: [
  //     { id: "tp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
  //     { id: "tl1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
  //     { id: "tp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
  //   ]
  // },
  {
    id: "random-images-mixed",
    title: "Random Images Mixed",
    images: [
      { id: "fl2", url: "/listing_images/Landscape/5.jpg", aspectRatio: 1.5 },
      { id: "tl1", url: "/listing_images/Landscape/1.jpg", aspectRatio: 1.5 },
      { id: "tp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
      { id: "fl1", url: "/listing_images/Landscape/3.jpg", aspectRatio: 1.5 },
      { id: "tp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
      { id: "fl2", url: "/listing_images/Landscape/2.jpg", aspectRatio: 1.5 },
      { id: "fl1", url: "/listing_images/Landscape/4.jpg", aspectRatio: 1.5 },
      // { id: "fp1", url: "/listing_images/Portrait/1.jpg", aspectRatio: 0.67 },
      // { id: "fp2", url: "/listing_images/Portrait/2.jpg", aspectRatio: 0.67 },
    ]
  },
];

// Helper function to get a specific gallery by ID
export const getGalleryById = (id: string): GalleryGroup | undefined => {
  return galleryImages.find(gallery => gallery.id === id);
};

// Helper function to get random gallery
export const getRandomGallery = (): GalleryGroup => {
  if (!galleryImages || galleryImages.length === 0) {
    // Return a default gallery or throw an error
    throw new Error('No galleries available');
  }
  const randomIndex = Math.floor(Math.random() * galleryImages.length);
  return galleryImages[randomIndex];
};
