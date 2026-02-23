// /data/galleryImages.ts
// Mock dataset: include width/height so the algorithm can infer orientation.
// In real use you'll compute width/height server-side or have them stored in DB.

export type MockImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  alt?: string;
};

export const galleryImages: MockImage[] = [
  { id: "6", url: "/images/img6.jpg", width: 1100, height: 800, alt: "Sample 6" }, // L
  { id: "1", url: "/images/img1.jpg", width: 1200, height: 800, alt: "Sample 1" }, // L
  { id: "5", url: "/images/img5.jpg", width: 1000, height: 700, alt: "Sample 5" }, // L
  { id: "2", url: "/images/img2.jpg", width: 800, height: 1200, alt: "Sample 2" }, // P
  { id: "4", url: "/images/img4.jpg", width: 900, height: 1600, alt: "Sample 4" }, // P
  { id: "3", url: "/images/img3.jpg", width: 1500, height: 900, alt: "Sample 3" }, // L
];
