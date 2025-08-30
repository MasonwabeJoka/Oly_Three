'use server';
import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config";
import { Ad } from '../Types/Ad';
import {z} from 'zod';
import { fromZodError } from 'zod-validation-error';

const client = createClient(ClientConfig);

export const fetchProducts = async (adIds: string[]): Promise<Ad[]> => {
try {  
    const query = groq`*[_type == "ad" && _id in $adIds && defined(priceId)] {
        _id,
        "slug": slug.current,
        title,
        description,
        price,
        priceId,
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
       }`;

       const products = await client.fetch(query, { adIds })

       return products
 }catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = fromZodError(error);
      console.error('Validation failed:', zodError.message);
      throw new Error('Validation failed');
    } else {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
    
  }
    
     

}