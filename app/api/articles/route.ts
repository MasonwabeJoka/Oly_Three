import { fetchArticles } from '@/app/(articles)/articles/utils/newsdata';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const options: Record<string, any> = {};

    // Extract query parameters
    for (const [key, value] of searchParams.entries()) {
      options[key] = value;
    }

    const result = await fetchArticles(options);
    return Response.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}