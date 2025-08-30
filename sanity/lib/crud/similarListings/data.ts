import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { getFeaturedListings } from "../featuredListings/data";

// Query to get similar listings based on category, price range, and excluding the current listing
export const similarListingsQuery = defineQuery(`
  *[_type == "listing" && 
    defined(slug.current) && 
    isActive == true && 
    approvedForSale == "approved" &&
    _id != $currentListingId &&
    (
      category._ref == $categoryRef ||
      (price >= $minPrice && price <= $maxPrice) ||
      user->address->city == $userCity
    )
  ] | order(postedOn desc) [0...$limit]{
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
    category->{
      _id,
      title,
      slug
    },
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

// Function to get similar listings based on the current listing
export const getSimilarListings = async (currentListing: any, limit: number = 6) => {
  try {
    if (!currentListing) {
      // Fallback to featured listings if no current listing provided
      const featured = await getFeaturedListings(1);
      return featured.listings.slice(0, limit);
    }

    // Calculate price range for similar listings (±50% of current price)
    const currentPrice = currentListing.price || 0;
    const minPrice = Math.max(0, currentPrice * 0.5);
    const maxPrice = currentPrice * 1.5;

    const similarListings = await client.fetch(similarListingsQuery, {
      currentListingId: currentListing._id,
      categoryRef: currentListing.category?._ref || currentListing.category?._id,
      minPrice,
      maxPrice,
      userCity: currentListing.user?.city,
      limit
    });

    // If we don't have enough similar listings, supplement with recent listings
    if (similarListings.length < limit) {
      const recentListingsQuery = defineQuery(`
        *[_type == "listing" && 
          defined(slug.current) && 
          isActive == true && 
          approvedForSale == "approved" &&
          _id != $currentListingId
        ] | order(postedOn desc) [0...$remainingLimit]{
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

      const remainingLimit = limit - similarListings.length;
      const recentListings = await client.fetch(recentListingsQuery, {
        currentListingId: currentListing._id,
        remainingLimit
      });

      // Filter out any duplicates and combine
      const existingIds = similarListings.map((listing: any) => listing._id);
      const filteredRecentListings = recentListings.filter(
        (listing: any) => !existingIds.includes(listing._id)
      );

      return [...similarListings, ...filteredRecentListings].slice(0, limit);
    }

    return similarListings;
  } catch (error) {
    console.error("Error fetching similar listings:", error);
    // Fallback to featured listings on error
    try {
      const featured = await getFeaturedListings(1);
      return featured.listings.slice(0, limit);
    } catch (fallbackError) {
      console.error("Error fetching fallback listings:", fallbackError);
      return [];
    }
  }
};
