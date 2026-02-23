// app/sanity/lib/crud/listings/data.ts

import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

// Listings query with pagination + search filters
export const listingsQuery = defineQuery(`
  *[_type == "listing" && defined(slug.current)
    && ($searchTerm == "" || title match $searchTerm || description match $searchTerm)
    && ($locationSearch == "" || user->address->city match $locationSearch 
                              || user->address->suburb match $locationSearch 
                              || user->address->cityAbbreviation match $locationSearch)
  ] | order(postedOn desc) [$offset...$limit]{
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
    }
  }
`);

// Count query (same filters, but only returns total count)
export const listingsCountQuery = defineQuery(`
  count(*[_type == "listing" && defined(slug.current)
    && ($searchTerm == "" || title match $searchTerm || description match $searchTerm)
    && ($locationSearch == "" || user->address->city match $locationSearch 
                              || user->address->suburb match $locationSearch 
                              || user->address->cityAbbreviation match $locationSearch)
  ])
`);

// Params shape
type SearchParams = {
  searchTerm: string;
  locationSearch: string;
  page: number;
  pageSize: number;
};

// Fetch listings + total count in one helper
export const getListings = async (params: SearchParams) => {
  const { searchTerm, locationSearch, page, pageSize } = params;

  const offset = (page - 1) * pageSize;
  const limit = offset + pageSize;

  try {
    const [listings, totalCount] = await Promise.all([
      client.fetch(listingsQuery, {
        searchTerm,
        locationSearch,
        offset,
        limit,
      }),
      client.fetch(listingsCountQuery, { searchTerm, locationSearch }),
    ]);

    return { listings, totalCount };
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};
