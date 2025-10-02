export const normalizeImageSrc = (src: string): string => {
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return src;
  return `/${src}`;
};