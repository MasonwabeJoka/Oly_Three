
export const imagesData = [
  { id: "1", url: "/images/img1.jpg", width: 1200, height: 800, alt: "Sample 1" }, // L
  { id: "7", url: "/images/img7.jpg", width: 3057, height: 4584, alt: "Sample 7" }, // P
  { id: "5", url: "/images/img5.jpg", width: 1000, height: 700, alt: "Sample 5" }, // L
  { id: "2", url: "/images/img2.jpg", width: 800, height: 1200, alt: "Sample 2" }, // P
  { id: "6", url: "/images/img6.jpg", width: 1100, height: 800, alt: "Sample 6" }, // L
  { id: "3", url: "/images/img3.jpg", width: 1500, height: 900, alt: "Sample 3" }, // L
  { id: "4", url: "/images/img4.jpg", width: 900, height: 1600, alt: "Sample 4" }, // P
    ]

 

export const images = imagesData.map((image) => image.url);
