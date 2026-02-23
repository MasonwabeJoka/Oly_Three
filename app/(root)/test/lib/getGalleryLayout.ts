export type GalleryImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Orientation = "L" | "P";

export const getOrientation = (img: GalleryImage): Orientation =>
  img.width >= img.height ? "L" : "P";

export const arrangeImages = (images: GalleryImage[]) => {
  // Determine orientations
  let oriented = images.map(img => ({ ...img, o: getOrientation(img) }));

  // Apply Rule 1: Avoid P L P
  for (let i = 1; i < oriented.length - 1; i++) {
    if (oriented[i - 1].o === "P" && oriented[i].o === "L" && oriented[i + 1].o === "P") {
      // Swap with next portrait if possible
      const swapIndex = oriented.findIndex(
        (x, idx) => idx > i && x.o === "P"
      );
      if (swapIndex !== -1) {
        const temp = oriented[i];
        oriented[i] = oriented[swapIndex];
        oriented[swapIndex] = temp;
      }
    }
  }

  // Apply Rule 2: No P after L unless L is first image
  for (let i = 1; i < oriented.length; i++) {
    if (oriented[i - 1].o === "L" && oriented[i].o === "P" && i !== 1) {
      // Move portrait further down
      const nextLandscapeIndex = oriented.findIndex((x, idx) => idx > i && x.o === "L");
      if (nextLandscapeIndex !== -1) {
        const temp = oriented[i];
        oriented.splice(i, 1);
        oriented.splice(nextLandscapeIndex, 0, temp);
      }
    }
  }

  // Return only first 5 for display
  const preview = oriented.slice(0, 5);
  const hasMore = images.length > 5;

  return { preview, hasMore };
};
