"use server";

import { client } from "@/server/sanity/lib/client";
import { writeClient } from "@/server/sanity/lib/write-client";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import {
  listingsQuery,
  listingsCountQuery,
  listingQuery,
  featuredListingsQuery,
  featuredListingsCountQuery,
  similarListingsQuery,
  listingViewsQuery,
} from "@/server/sanity/queries/listings";

const LISTINGS_PER_PAGE = 15;

// ─── Listings (browse/search) ─────────────────────────────────────────────────

export const getListings = async (params: {
  searchTerm: string;
  locationSearch: string;
  page: number;
  pageSize: number;
}) => {
  const { searchTerm, locationSearch, page, pageSize } = params;
  const offset = (page - 1) * pageSize;
  const limit = offset + pageSize;

  try {
    const [listings, totalCount] = await Promise.all([
      client.fetch(listingsQuery, { searchTerm, locationSearch, offset, limit }),
      client.fetch(listingsCountQuery, { searchTerm, locationSearch }),
    ]);
    return { listings, totalCount };
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};

// ─── Single listing ───────────────────────────────────────────────────────────

export const getListing = async (slug: string) => {
  "use cache";
  cacheTag("listing");
  cacheTag(`listing:${slug}`);
  cacheLife("minutes");

  try {
    const listing = await client.fetch(listingQuery, { slug });
    if (!listing) return notFound();
    return listing;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

// ─── Featured listings ────────────────────────────────────────────────────────

export const getFeaturedListings = async (page: number = 1) => {
  "use cache";
  cacheTag("featured-listings");
  cacheTag(`featured-listings:page:${page}`);
  cacheLife("minutes");

  try {
    const offset = (page - 1) * LISTINGS_PER_PAGE;
    const limit = offset + LISTINGS_PER_PAGE;

    const [listings, totalCount] = await Promise.all([
      client.fetch(featuredListingsQuery, { offset, limit }),
      client.fetch(featuredListingsCountQuery),
    ]);

    return {
      listings,
      totalPages: Math.ceil(totalCount / LISTINGS_PER_PAGE),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    throw error;
  }
};

// ─── Similar listings ─────────────────────────────────────────────────────────

export const getSimilarListings = async (currentListing: any, limit: number = 6) => {
  "use cache";
  cacheTag("similar-listings");
  if (currentListing?._id) cacheTag(`similar-listings:${currentListing._id}`);
  cacheLife("minutes");

  try {
    if (!currentListing) {
      const featured = await getFeaturedListings(1);
      return featured.listings.slice(0, limit);
    }

    const currentPrice = currentListing.price || 0;
    const minPrice = Math.max(0, currentPrice * 0.5);
    const maxPrice = currentPrice * 1.5;

    const similar = await client.fetch(similarListingsQuery, {
      currentListingId: currentListing._id,
      categoryRef: currentListing.category?._ref || null,
      minPrice,
      maxPrice,
      userCity: currentListing.user?.city ?? null,
      limit,
    });

    if (similar.length < limit) {
      const recentQuery = defineQuery(`
        *[_type == "listing" && defined(slug.current) && isActive == true && approvedForSale == "approved" && _id != $currentListingId]
        | order(postedOn desc) [0...$remainingLimit]{
          _id, user->{ _id, firstName, lastName, fullName, "profileImage": profileImage.asset->url, "city": address->city, "suburb": address->suburb, "cityAbbr": address->cityAbbreviation },
          title, slug, description, price, priceOption, postedOn,
          "images": images[]->{ "alt": image.alt, "id": image.asset->_id, "url": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "aspectRatio": image.asset->metadata.dimensions.aspectRatio }
        }
      `);
      const recent = await client.fetch(recentQuery, {
        currentListingId: currentListing._id,
        remainingLimit: limit - similar.length,
      });
      const existingIds = similar.map((l: any) => l._id);
      return [...similar, ...recent.filter((l: any) => !existingIds.includes(l._id))].slice(0, limit);
    }

    return similar;
  } catch (error) {
    console.error("Error fetching similar listings:", error);
    try {
      const featured = await getFeaturedListings(1);
      return featured.listings.slice(0, limit);
    } catch {
      return [];
    }
  }
};

// ─── Listing views ────────────────────────────────────────────────────────────

export const getListingViews = async (id: string) => {
  try {
    return await client.withConfig({ useCdn: false }).fetch(listingViewsQuery, { id });
  } catch (error) {
    console.error("Error fetching listing views:", error);
    throw error;
  }
};

export async function updateListingView(id: string, totalViews: number) {
  try {
    await writeClient.patch(id).set({ views: totalViews + 1 }).commit();
  } catch (error) {
    console.error("Error updating listing view:", error);
    throw error;
  }
}
