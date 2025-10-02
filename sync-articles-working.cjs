// Working sync script for articles with ImageKit integration
const { createClient } = require('@sanity/client');
const { CronJob } = require('cron');
const { fetch } = require('undici');
const ImageKit = require('imagekit');
require('dotenv').config({ path: '.env.local' });

// Initialize ImageKit client
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_SECRET_TOKEN,
  useCdn: false,
  apiVersion: '2025-02-19'
});

// NewsData.io fetch function
async function fetchArticles(options = {}) {
  const API_BASE_URL = 'https://newsdata.io/api/1';
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_DATA_API_KEY;

  if (!API_KEY) {
    throw new Error('NewsData API key is missing');
  }

  const normalized = {};
  if (options.category) normalized.category = options.category;
  if (options.size) normalized.size = String(options.size);
  if (!normalized.size) normalized.size = '10';
  
  // South Africa specific settings
  normalized.country = 'za';
  normalized.language = 'en';
  normalized.domain = 'news24,iol';

  const params = new URLSearchParams({ apikey: API_KEY, ...normalized });
  const url = `${API_BASE_URL}/news?${params.toString()}`;

  try {
    console.log('📡 NewsData API URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Response Error:', response.status, response.statusText);
      console.error('❌ Error Body:', errorText.substring(0, 200));
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      console.error('❌ Non-JSON Response:', responseText.substring(0, 200));
      throw new Error('API returned non-JSON response');
    }

    const data = await response.json();

    if (data.status === 'error') {
      console.error('❌ API Error Response:', data.results?.message || 'Unknown API error');
      throw new Error(data.results?.message || 'API returned error status');
    }

    return {
      articles: data.results || [],
      totalResults: data.totalResults || 0,
      nextPage: data.nextPage || null,
    };
  } catch (error) {
    console.error('📡 Fetch error:', error.message);
    return { articles: [], totalResults: 0, nextPage: null };
  }
}

// Enhanced image processing with ImageKit
async function processImage(originalUrl) {
  if (!originalUrl) {
    console.log('🔍 No image URL provided');
    return null;
  }

  try {
    console.log('📥 Fetching image from:', originalUrl.substring(0, 100) + '...');
    
    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      console.error('❌ Invalid URL format');
      return originalUrl; // Return original URL if malformed
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

    console.log(`📤 Uploading to ImageKit (${(buffer.length / 1024).toFixed(2)}KB)...`);

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
    
  } catch (error) {
    console.error('💥 Image processing error:', error.message);
    console.error('🔄 Falling back to original URL');
    return originalUrl; // Always return original URL as fallback
  }
}

// Map NewsData.io article to Sanity schema
function articlesToSanity(article, imageUrl) {
  return {
    _type: 'olyArticle',
    _id: article.article_id || `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    articleId: article.article_id || `article-${Date.now()}`,
    title: article.title,
    keywords: (typeof article.keywords === 'string' && article.keywords) ? article.keywords.split(',').map((k) => k.trim()) : [],
    content: [{ _type: 'block', children: [{ _type: 'span', text: article.content || article.description || 'Click to read full article' }] }],
    fullContent: article.full_content
      ? [{ _type: 'block', children: [{ _type: 'span', text: article.full_content }] }]
      : undefined,
    url: article.link,
    metaKeywords: (typeof article.meta_keywords === 'string' && article.meta_keywords) ? article.meta_keywords.split(',').map((k) => k.trim()) : [],
    metaDescription: article.meta_description,
    pubDate: new Date(article.pubDate || Date.now()).toISOString(),
    fromDate: article.from_date ? new Date(article.from_date).toISOString() : undefined,
    toDate: article.to_date ? new Date(article.to_date).toISOString() : undefined,
    timezone: article.timezone || 'UTC',
    language: article.language ? [article.language] : [],
    coins: (typeof article.coins === 'string' && article.coins) ? article.coins.split(',').map((c) => c.trim()) : [],
    tags: Array.isArray(article.category) ? article.category : (typeof article.category === 'string' && article.category) ? article.category.split(',').map(c => c.trim()) : [],
    sentiment: article.sentiment,
    domain: [article.source_id || new URL(article.link).hostname],
    domainUrl: [article.source_id ? `https://${article.source_id}` : undefined].filter(Boolean),
    excludedDomain: [],
    priorityDomain: 'medium',
    hasImage: !!imageUrl,
    imageUrl: imageUrl || undefined,
    hasVideo: !!article.video_url,
    videoUrl: article.video_url || undefined,
    isDuplicateRemoved: article.is_duplicate_removed ?? true,
  };
}

// Enhanced sync function
async function syncArticles(category = null, limit = 10) {
  console.log(`🚀 Sync started at ${new Date().toISOString()} for category: ${category || 'all'}`);
  
  try {
    const { articles } = await fetchArticles({ category, size: limit });
    console.log(`📰 Fetched ${articles.length} articles from NewsData.io`);

    if (articles.length === 0) {
      console.log('⚠️ No articles fetched. Check your API key and try again.');
      return;
    }

    let successCount = 0;
    let imageCount = 0;

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`\n📄 Processing article ${i + 1}/${articles.length}: ${article.title.substring(0, 60)}...`);
      
      try {
        const imageUrl = await processImage(article.image_url);
        if (imageUrl && imageUrl.includes('imagekit.io')) {
          imageCount++;
          console.log(`🖼️ ✅ Image processed via ImageKit`);
        } else if (imageUrl) {
          console.log(`🖼️ ⚠️ Using original image URL`);
        } else {
          console.log(`🖼️ ❌ No image available`);
        }

        const doc = articlesToSanity(article, imageUrl);
        await sanityClient.createIfNotExists(doc);
        
        successCount++;
        console.log(`✅ Article synced to Sanity`);
        
      } catch (articleError) {
        console.error(`❌ Error processing article:`, articleError.message);
      }
    }

    console.log(`\n🎉 Sync complete!`);
    console.log(`📊 Results: ${successCount}/${articles.length} articles synced, ${imageCount} images via ImageKit`);
    
  } catch (error) {
    console.error('💥 Sync failed:', error.message);
  }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { syncArticles, processImage, fetchArticles };
}

//Set up cron job (commented out for manual testing)

const job = new CronJob('0 * * * *', () => {
  console.log('⏰ Running hourly sync...');
  const categories = ['politics', 'sports', 'entertainment', 'business', 'technology', 'lifestyle', 'health'];
  
  (async () => {
    for (const category of categories) {
      await syncArticles(category, 9);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between categories
    }
  })().catch((err) => console.error('Cron sync failed:', err));
}, null, false, 'UTC'); // Set to false to not auto-start

// Uncomment to start cron job
job.start();
console.log('⏰ Cron job started - will run every hour');

// Run if called directly (skip if --cron flag is present)
if (require.main === module && !process.argv.includes('--cron')) {
  console.log('🔧 Starting enhanced article sync with ImageKit integration...');
  syncArticles('', 10).then(() => {
    console.log('✨ Sync process completed!');
    process.exit(0);
  }).catch((err) => {
    console.error('💥 Sync process failed:', err);
    process.exit(1);
  });
}




// To run immediately

//npm run sync-articles-now 