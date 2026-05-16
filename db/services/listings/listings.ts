import { drizzleDb } from "@/server/db/db";
import { listings } from "@/server/db/schemas/listings/listing";
import { eq } from "drizzle-orm";

// Future: getListingById, createListing, updateListing, deleteListing
// These will be used for user-owned listing management (dashboard)
// Public listing reads (search, browse) are served from Sanity — see sanity/services/listings.ts

export async function getListingsByOwner(ownerId: string) {
  return drizzleDb.query.listings.findMany({
    where: eq(listings.ownerId, ownerId),
  });
}
