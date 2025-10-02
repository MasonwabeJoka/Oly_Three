// Debug articles rendering issue
const { fetch } = require('undici');
require('dotenv').config({ path: '.env.local' });

async function debugArticles() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19';
  
  console.log('🔍 Debugging articles rendering issue...\n');
  
  // 1. Check all articles with their tags
  console.log('1️⃣ Checking all articles with their tags:');
  const allArticlesQuery = `*[_type == "olyArticle"] | order(pubDate desc) {
    _id,
    title,
    tags,
    imageUrl,
    pubDate
  }`;
  
  const allArticlesUrl = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(allArticlesQuery)}`;
  
  try {
    const response = await fetch(allArticlesUrl);
    const data = await response.json();
    
    console.log(`Found ${data.result.length} total articles:\n`);
    
    data.result.forEach((article, index) => {
      console.log(`${index + 1}. "${article.title.substring(0, 50)}..."`);
      console.log(`   Tags: [${article.tags?.join(', ') || 'None'}]`);
      console.log(`   Has Image: ${!!article.imageUrl}`);
      console.log(`   Published: ${new Date(article.pubDate).toLocaleDateString()}`);
      console.log();
    });
    
    // 2. Check specifically for "politics" category
    console.log('2️⃣ Checking for articles with "politics" tag:');
    const politicsQuery = `*[_type == "olyArticle" && "politics" in tags] | order(pubDate desc) {
      _id,
      title,
      tags,
      imageUrl
    }`;
    
    const politicsUrl = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(politicsQuery)}`;
    const politicsResponse = await fetch(politicsUrl);
    const politicsData = await politicsResponse.json();
    
    console.log(`Found ${politicsData.result.length} articles with "politics" tag:`);
    politicsData.result.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   Tags: [${article.tags?.join(', ')}]`);
    });
    
    // 3. Check for "technology" articles (we know these exist)
    console.log('\n3️⃣ Checking for articles with "technology" tag:');
    const techQuery = `*[_type == "olyArticle" && "technology" in tags] | order(pubDate desc) {
      _id,
      title,
      tags,
      imageUrl
    }`;
    
    const techUrl = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(techQuery)}`;
    const techResponse = await fetch(techUrl);
    const techData = await techResponse.json();
    
    console.log(`Found ${techData.result.length} articles with "technology" tag:`);
    techData.result.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title.substring(0, 60)}...`);
      console.log(`   Tags: [${article.tags?.join(', ')}]`);
    });
    
    // 4. Test the exact query the hook would use
    console.log('\n4️⃣ Testing the exact query structure from the hook:');
    const hookQuery = `
      {
        "articles": *[_type == "olyArticle" && "politics" in tags] | order(pubDate desc) [0...9] {
          _id,
          articleId,
          title,
          "description": coalesce(content[0].children[0].text, "Click to read full article"),
          imageUrl,
          "link": url,
          pubDate,
          tags,
          domain,
          "creator": domain[0],
          "source_id": domain[0],
          "category": tags
        },
        "total": count(*[_type == "olyArticle" && "politics" in tags])
      }
    `;
    
    const hookUrl = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(hookQuery)}`;
    const hookResponse = await fetch(hookUrl);
    const hookData = await hookResponse.json();
    
    console.log('Hook query result:');
    console.log(`- Total politics articles: ${hookData.result.total}`);
    console.log(`- Articles returned: ${hookData.result.articles?.length || 0}`);
    
    if (hookData.result.articles?.length > 0) {
      console.log('Sample article structure:');
      console.log(JSON.stringify(hookData.result.articles[0], null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugArticles();
