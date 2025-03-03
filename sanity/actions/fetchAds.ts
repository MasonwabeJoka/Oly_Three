// 'use server';
import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config";
import { Ad } from '../Types/Ad';
import {z} from 'zod';
import { fromZodError } from 'zod-validation-error';

const client = createClient(ClientConfig);

// Define the Zod schema
export const FetchAdsParamsSchema = z.object({
  limit: z.number().min(1).max(100),
  offset: z.number(),
  page: z.number(),
  category: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  sortBy: z.string().optional(),
});

// Infer the TypeScript type
export type FetchAdsParams = z.infer<typeof FetchAdsParamsSchema>;

interface FetchAdsResponse {
  ads: Ad[];
  hasMore: boolean;
}
export async function fetchAds({ limit = 4, page = 1, offset = 1, category, sortOrder, sortBy }: FetchAdsParams): Promise<FetchAdsResponse> {
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
        category,
        pricingOption,
        "images": images[]{
          _ref,
          _key,
          alt,
          "aspectRatio": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.aspectRatio,
          "width": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.width,
          "height": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.height,
          "url": *[_type == "imageFile" && _id == ^._ref][0].image.asset->url
        },
        "videos": videos[]{
          _ref,
          _key,
          "duration": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.duration,
          "format": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.format,
          "resolution": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.resolution,
          "frameRate": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.frameRate,
          "bitrate": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.bitrate,
          "codec": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.codec,
          "audioChannels": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.audioChannels,
          "aspectRatio": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.aspectRatio,
          "fileSize": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.fileSize,
          "creationDate": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.creationDate,
          "tags": *[_type == "videoFile" && _id == ^._ref][0].video.asset->metadata.tags,
          "url": *[_type == "videoFile" && _id == ^._ref][0].video.asset->url
        },
        "attachments": attachments[]{
          _ref,
          _key,
          "size": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.size,
          "format": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.format,
          "creationDate": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.creationDate,
          "modifiedDate": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.modifiedDate,
          "author": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.author,
          "pageCount": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.pageCount,
          "title": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.title,
          "tags": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->metadata.tags,
          "url": *[_type == "attachment" && _id == ^._ref][0].attachment.asset->url
        },
        featuredImage,
        postedOn,
        details,
        features,
        condition,
        quantity,
        avatar,
        location {
          suburb,
          city,
          coordinates
        },
        "suburb": location->location.suburb,
        "city": location->city,
        "coordinates": location->coordinates,
        attachment,
        promotions,
        bids,
        likes,
        todaysViews,
        totalViews,
        unreadMessages,
        associatedAuction
      }
    `;

  
    const ads = await client.fetch(query);
    
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
