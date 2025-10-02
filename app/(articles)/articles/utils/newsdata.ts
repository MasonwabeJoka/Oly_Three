import { NewsDataArticle } from '@/sanity/lib/article';

const API_BASE_URL = 'https://newsdata.io/api/1';
const API_KEY = process.env.NEXT_PUBLIC_NEWS_DATA_API_KEY; 

interface FetchOptions {
  q?: string;
  category?: string;
  country?: string;
  language?: string;
  size?: number;
  page?: string;
  domain?: string;
  from_date?: string;
  to_date?: string;
  timezone?: string;
  image?: string;
  full_content?: string;
  webhook?: string;
}

interface ArticlesResponse {
  articles: NewsDataArticle[];
  totalResults: number;
  nextPage: string | null;
}

// Normalizes raw options into a clean query params object:
// - keeps only supported keys
// - removes empty/invalid values
// - converts all values to strings
// - applies defaults (e.g. size = "50")

function optionsToQueryParams(inputOptions: FetchOptions = {}): Record<string, string> {
  const queryParamsObject: Record<string, string> = {};

  if (inputOptions.page) {
    queryParamsObject.page = String(inputOptions.page);
  }

  const allowedQueryParams = [
    'q',
    'category',
    'country',
    'language',
    'size',
    'domain',
    'from_date',
    'to_date',
    'timezone',
    'image',
    'full_content',
    'webhook',
  ];

  for (const key of allowedQueryParams) {
    const value = inputOptions[key as keyof FetchOptions];
    if (value !== undefined && value !== null && value !== '') {
      queryParamsObject[key] = String(value);
    }
  }

  if (!queryParamsObject.size) queryParamsObject.size = '50'; 

  return queryParamsObject; // { q: "cars", size: "10" }
}

export async function fetchArticles(options: FetchOptions = {}): Promise<ArticlesResponse> {
  if (!API_KEY) {
    throw new Error('NewsData API key is missing');
  }

  const normalizedOptions = optionsToQueryParams(options);
  const params = new URLSearchParams({ apikey: API_KEY, ...normalizedOptions });
  const url = `${API_BASE_URL}/news?${params.toString()}`;

  try {
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
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return { articles: [], totalResults: 0, nextPage: null };
  }
}

// To run immediately

//npm run sync-articles-now 

