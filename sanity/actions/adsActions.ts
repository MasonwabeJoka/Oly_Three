import { groq } from 'next-sanity';
import { createClient } from '@sanity/client';
import ClientConfig from "../config/client-config"
import { Ad } from '../Types/Ad';

const client = createClient(ClientConfig);

export async function fetchAds(): Promise<Ad[]> {
  try {
    const query = groq`*[_type == "ad"] {
      _id,
      "slug": slug.current,
      title,
      description,
      price,
      pricingOption,
      "images": images[]{
        _key,
        "url": asset->url,
        "aspectRatio": asset->metadata.dimensions.aspectRatio,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        alt
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

    const ads = await client.fetch(query);
    return ads;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw new Error('Failed to fetch ads');
  }
}