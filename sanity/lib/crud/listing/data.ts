import {defineQuery} from "next-sanity";
import {client} from "@/sanity/lib/client";
import { notFound } from "next/navigation";

// Query

const listingQuery = defineQuery(`*[_type == "listing" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    price,
    pricingOption,
    description,
    site,
    postedOn,
    expiresAt,
    location,
    details,
    category->{
      _id,
      title,
      slug
    },
    user->{
      _id,
      firstName,
      lastName,
      fullName,
      "profileImage": profileImage.asset->url,
      "city": address->city,
      "suburb": address->suburb,
      "cityAbbr": address->cityAbbreviation
    },
    "images": images[]->{
      "alt": image.alt,
      "id": image.asset->_id,
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "aspectRatio": image.asset->metadata.dimensions.aspectRatio
    },
  }`)


// Read 

export const getListing = async (slug: string) => {
try {
    const listing = await client.fetch(listingQuery, { slug });
    if(!listing) return notFound();
    return listing;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
}