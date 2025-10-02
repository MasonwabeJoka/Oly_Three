import { useQuery } from '@tanstack/react-query';
import { client } from '../sanity/lib/client';

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

interface UseArticlesOptions {
  category: string;
  nextPage?: string | null;
  search?: string;
  size?: number;
}

interface ArticlesResponse {
  articles: OlyArticle[];
  totalResults: number;
  nextPage: string | null;
}

export function useArticlesQuery({ category, nextPage, search, size = 9 }: UseArticlesOptions) {
  return useQuery({
    queryKey: ['articles', category, nextPage, search, size],
    queryFn: async (): Promise<ArticlesResponse> => {
      try {
        // Build filters
        const isAll = (category || '').toLowerCase() === 'all';
        const categoryFilter = isAll ? '' : `&& ("${category}" in tags || category == "${category}")`;
        const searchFilter = search ? `&& title match "${search}*"` : '';
        const offset = nextPage ? parseInt(nextPage) * size : 0;

        // Build the query
        const query = `
          {
              "articles": *[_type == "olyArticle" ${categoryFilter} ${searchFilter}] | order(pubDate desc) [${offset}...${offset + size}] {
           
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
              category
            },
            "total": count(*[_type == "olyArticle" ${categoryFilter} ${searchFilter}])
          }
        `;

        const result = await client.fetch(query);
        
        console.log('✅ Sanity API Response:', result);

        const articles = result.articles || [];
        const totalResults = result.total || 0;
        const hasNextPage = articles.length === size;
        const nextPageNumber = hasNextPage ? String(Math.floor(offset / size) + 1) : null;

        console.log('📊 Processed result:', {
          articlesCount: articles.length,
          totalResults,
          nextPageNumber,
          hasNextPage,
        });

        return {
          articles,
          totalResults,
          nextPage: nextPageNumber,
        };
      } catch (error) {
        console.error('💥 useArticlesQuery error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    enabled: !!category,
  });
}