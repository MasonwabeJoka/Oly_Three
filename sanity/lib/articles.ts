interface NewsDataArticle {
  article_id?: string;
  id?: string;
  title: string;
  content?: string;
  description?: string;
  full_content?: string;
  link: string;
  image_url?: string;
  video_url?: string;
  keywords?: string;
  meta_keywords?: string;
  meta_description?: string;
  pubDate?: string;
  from_date?: string;
  to_date?: string;
  timezone?: string;
  language?: string;
  coins?: string;
  tags?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  source_id?: string;
  is_duplicate_removed?: boolean;
}

interface OlyArticle {
  _type: 'olyArticle';
  _id: string;
  articleId: string;
  title: string;
  keywords?: string[];
  content: Array<{ _type: 'block'; children: Array<{ _type: 'span'; text: string }> }>;
  fullContent?: Array<{ _type: 'block'; children: Array<{ _type: 'span'; text: string }> }>;
  url: string;
  metaKeywords?: string[];
  metaDescription?: string;
  pubDate: string;
  fromDate?: string;
  toDate?: string;
  timezone?: string;
  language?: string[];
  coins?: string[];
  tags?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  domain?: string[];
  domainUrl?: string[];
  excludedDomain?: string[];
  priorityDomain?: 'top' | 'medium' | 'low';
  hasImage?: boolean;
  imageUrl?: string;
  hasVideo?: boolean;
  videoUrl?: string;
  isDuplicateRemoved?: boolean;
  category?: string;
}

// Map NewsData.io article to Sanity schema
export function articlesToSanity(article: NewsDataArticle, imageUrl: string | null, category: string | null): OlyArticle {
  return {
    _type: 'olyArticle',
    _id: article.article_id || article.id || `article-${Date.now()}`,
    articleId: article.article_id || article.id || `article-${Date.now()}`,
    title: article.title,
    keywords: article.keywords ? article.keywords.split(',').map((k) => k.trim()) : [],
    content: [{ _type: 'block', children: [{ _type: 'span', text: article.content || article.description || '' }] }],
    fullContent: article.full_content
      ? [{ _type: 'block', children: [{ _type: 'span', text: article.full_content }] }]
      : undefined,
    url: article.link,
    metaKeywords: article.meta_keywords ? article.meta_keywords.split(',').map((k) => k.trim()) : [],
    metaDescription: article.meta_description,
    pubDate: new Date(article.pubDate || Date.now()).toISOString(),
    fromDate: article.from_date ? new Date(article.from_date).toISOString() : undefined,
    toDate: article.to_date ? new Date(article.to_date).toISOString() : undefined,
    timezone: article.timezone || 'UTC',
    language: article.language ? [article.language] : [],
    coins: article.coins ? article.coins.split(',').map((c) => c.trim()) : [],
    tags: article.tags ? article.tags.split(',').map((t) => t.trim()) : [],
    sentiment: article.sentiment,
    domain: [article.source_id || new URL(article.link).hostname],
    domainUrl: [article.source_id ? `https://${article.source_id}` : undefined].filter(Boolean) as string[],
    excludedDomain: [],
    priorityDomain: 'medium',
    hasImage: !!imageUrl,
    imageUrl: imageUrl || undefined,
    hasVideo: !!article.video_url,
    videoUrl: article.video_url || undefined,
    isDuplicateRemoved: article.is_duplicate_removed ?? true,
    category: category || 'general',
  };
}