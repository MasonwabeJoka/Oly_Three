interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function gumletLoader({ src, width, quality }: ImageLoaderProps): string {
  console.log('🔧 Image loader called:', { src, width, quality });
  
  // Handle null, undefined, or empty src
  if (!src || src === 'null' || src === 'undefined') {
    console.log('⚠️ Invalid src detected, returning fallback:', src);
    return '/no_image_landscape.png';
  }
  
  // Local files: return original (no processing needed)
  if (src.startsWith('/') && !src.startsWith('//')) {
    console.log('📁 Local file detected:', src);
    return src;
  }
  
  // External URLs - return original (working state)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    console.log('✅ Using original URL:', src);
    return src;
  }
  
  // For any other cases, return fallback
  console.log('🔄 No valid URL, returning fallback:', src);
  return '/no_image_landscape.png';
}
