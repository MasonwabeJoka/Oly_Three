import { imagekit } from './lib/client';

export async function processImage(originalUrl: string | undefined): Promise<string | null> {
  if (!originalUrl) {
    console.log('🔍 No image URL provided');
    return null;
  }

  try {
    console.log('📥 Fetching image from:', originalUrl);
    
    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      console.error('❌ Invalid URL format:', originalUrl);
      return originalUrl; // Return original URL if it's malformed but might still work
    }

    const imgResponse = await fetch(originalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!imgResponse.ok) {
      console.error(`❌ Failed to fetch image: ${imgResponse.status} ${imgResponse.statusText}`);
      return originalUrl; // Fallback to original URL
    }

    const contentType = imgResponse.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      console.error('❌ URL does not point to an image:', contentType);
      return originalUrl; // Fallback to original URL
    }

    const arrayBuffer = await imgResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    if (buffer.length === 0) {
      console.error('❌ Empty image buffer');
      return originalUrl;
    }

    console.log(`📤 Uploading image to ImageKit (${(buffer.length / 1024).toFixed(2)}KB)`);

    const uploadResult = await imagekit.upload({
      file: buffer,
      fileName: `article-${Date.now()}-${Math.random().toString(36).substr(2, 6)}.jpg`,
      folder: '/articles',
      tags: ['article', 'news'],
      transformation: {
        pre: 'w-800,h-450,c-maintain_ratio'
      }
    });

    console.log('✅ Image uploaded to ImageKit:', uploadResult.url);
    return uploadResult.url;
    
  } catch (error: any) {
    console.error('💥 Image processing error:', error.message);
    console.error('🔄 Falling back to original URL:', originalUrl);
    return originalUrl; // Always return original URL as fallback
  }
}
