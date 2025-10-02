'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

// Local image loader for static assets that should bypass Gumlet processing
export const localImageLoader = ({ src }: ImageLoaderProps): string => {
  // For local files, we can return them as-is since they're served from the public folder
  // This ensures they work with the custom loader configuration
  return src;
};
