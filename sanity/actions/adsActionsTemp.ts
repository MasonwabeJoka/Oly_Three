'use server';
import { groq } from 'next-sanity';
import { createClient } from '@sanity/client';
import ClientConfig from "../config/client-config";
import { Ad } from '../Types/Ad';
import { PartialAd, PartialAdSchema } from '../Types/PartialSchemas/AdPartial';
import {z} from 'zod';
import { fromZodError } from 'zod-validation-error';
import { PortableTextBlock } from 'sanity';

const client = createClient(ClientConfig);

// Define the Zod schema
const FetchAdsParamsSchema = z.object({
  limit: z.number().min(1).max(100),
  offset: z.number(),
  page: z.number(),
  category: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  sortBy: z.string().optional(),
});

// Infer the TypeScript type
type FetchAdsParams = z.infer<typeof FetchAdsParamsSchema>;

interface FetchAdsResponse {
  ads: PartialAd[];
  hasMore: boolean;
}
export async function fetchAds({ limit, page = 1, offset = 0, category, sortOrder, sortBy }: FetchAdsParams): Promise<FetchAdsResponse> {
  try {
    const calculatedOffset = (page - 1) * limit + offset;
    const query = groq`
      *[_type == "ad" ${category ? `&& category == "${category}"` : ''}]
      | order(${sortBy} ${sortOrder})
      [${calculatedOffset}...${calculatedOffset + limit}] {
        _id,
        "slug": slug.current,
        title,
        description,
        price,
        "images": images[]{
          _ref,
          _key,
          "alt": *[_type == "imageFile" && _id == ^._ref][0].image.alt,
          "aspectRatio": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.aspectRatio,
          "width": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.width,
          "height": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.height,
          "url": *[_type == "imageFile" && _id == ^._ref][0].image.asset->url
        },
        postedOn,
      
      }
    `;

    const rawAds = await client.fetch(query);
    // Validate fetched ads against the partial schema
    const ads = rawAds.map((rawAd: any) => {
      return PartialAdSchema.parse(rawAd);
    });
  
    // const ads = await client.fetch(query);
    const hasMore = ads.length === limit; // Check if the number of ads fetched is equal to the limit
    return { ads, hasMore };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = fromZodError(error);
      console.error('Validation failed:', zodError.message);
      throw new Error('Validation failed');
    } else {
      console.error('Error fetching ads:', error);
      throw new Error('Failed to fetch ads');
    }
    
  }
}
