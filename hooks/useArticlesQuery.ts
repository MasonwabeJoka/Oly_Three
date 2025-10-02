// hooks/useArticlesQuery.ts
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@sanity/client';
import { client } from '../sanity/lib/client';

// Use the correct interface from articles.ts
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
        console.log('🔍 useArticlesQuery called with:', { category, nextPage, search, size });
        
        // Validate environment variables
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
        const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19';
        
        if (!projectId || !dataset) {
          throw new Error(`Missing Sanity configuration: projectId=${!!projectId}, dataset=${!!dataset}`);
        }
        
        console.log('🔧 Sanity config:', { projectId, dataset, apiVersion });
        
        // Build filters
        const isAll = (category || '').toLowerCase() === 'all';
        const categoryFilter = isAll ? '' : `&& "${category}" in tags`;
        const searchFilter = search ? `&& title match "${search}*"` : '';
        const offset = nextPage ? parseInt(nextPage) * size : 0;
        
        console.log('📊 Query filters:', { isAll, categoryFilter, searchFilter, offset });
        
        // Build the query - corrected to match the actual schema structure
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
              "category": tags
            },
            "total": count(*[_type == "olyArticle" ${categoryFilter} ${searchFilter}])
          }
        `;
        
        console.log('📝 GROQ Query:', query);

        
        const result = await client.fetch(query);
        console.log('✅ Sanity API Response:', result);
        
        if (!result) {
          console.warn('⚠️ No result from Sanity query');
          return {
            articles: [],
            totalResults: 0,
            nextPage: null,
          };
        }
        
        const articles = result.articles || [];
        const totalResults = result.total || 0;
        const hasNextPage = articles.length === size;
        const nextPageToken = hasNextPage ? String(Math.floor(offset / size) + 1) : null;
        
        console.log('📊 Processed result:', { 
          articlesCount: articles.length, 
          totalResults, 
          nextPageToken,
          hasNextPage 
        });
        
        return {
          articles,
          totalResults,
          nextPage: nextPageToken,
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
    // Enable query when we have required parameters
    enabled: !!category,
  });
}
