import { client } from "@/server/sanity/client";
import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

export const featuredListingsQuery = defineQuery(`
  *[_type == "listing" && defined(slug.current) && isFeatured == true]
  | order(postedOn desc) [$offset...$limit]{
    _id,
    user->{
      _id,
      firstName,
      lastName,
      fullName,
      "profileImage": profileImage.asset->url,
      "city": address->city,
      "suburb": address->suburb,
      "cityAbbr": address->cityAbbreviation,
    },
    title,
    slug,
    description,
    price,
    priceOption,
    postedOn,
    "images": images[]->{
      "alt": image.alt,
      "id": image.asset->_id,
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "aspectRatio": image.asset->metadata.dimensions.aspectRatio
    },
  }
`);

export const featuredListingsCountQuery = defineQuery(`
  count(*[_type == "listing" && defined(slug.current) && isFeatured == true])
`);




const listingsPerPage = 15; 

export const getFeaturedListings = async (page: number = 1) => {
  "use cache";
  cacheTag("featured-listings");
  cacheTag(`featured-listings:page:${page}`);
  cacheLife("minutes");

  try {
    const offset = (page - 1) * listingsPerPage;
    const limit = offset + listingsPerPage;

    const [listings, totalCount] = await Promise.all([
      client.fetch(featuredListingsQuery, { offset, limit }),
      client.fetch(featuredListingsCountQuery),
    ]);

    return {
      listings,
      totalPages: Math.ceil(totalCount / listingsPerPage),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    throw error;
  }
};

