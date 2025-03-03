import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config"
import { Ad } from '../Types/Ad';


const client = createClient(ClientConfig);

export const fetchAd = async (slug: string): Promise<Ad | undefined> => {
    try {
      const ad = await client.fetch(groq`*[_type == "ad" && slug.current == $slug && approvedForSale == "approved"][0]{
        _id,
        "slug": slug.current,
        title,
        description, 
        price,
        pricingOption,
        approvedForSale,
        images[]{
        _key,
        "alt": *[_type == "imageFile" && _id == ^._ref][0].image.alt,
        "aspectRatio": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.aspectRatio,
        "width": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.width,
        "height": *[_type == "imageFile" && _id == ^._ref][0].image.asset->metadata.dimensions.height,
        "url": *[_type == "imageFile" && _id == ^._ref][0].image.asset->url
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
      
      }`, { slug });
  
      return ad;
    } catch (error) {
      console.error('Error fetching ad:', error);
      return undefined;
    }
  };


  export const createAd = async (adData: Partial<Ad>): Promise<void> => {
    try {
        await client.create({
            _type: 'ad',
            ...adData,
        });
        console.log('Ad added successfully!');
    } catch (error) {
        console.error('Error adding ad:', error);
    }
};

