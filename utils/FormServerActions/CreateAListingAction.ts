"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { eq } from "drizzle-orm";
import { drizzleDb } from "@/server/db/db";
import {
  listings,
  listingLocations,
  listingStats,
  listingAutoDetails,
  listingPropertyDetails,
  listingJobDetails,
  listingServiceDetails,
  users,
} from "@/server/db/schemas";

type ListingFormData = {
  category?: { main?: string; subcategory?: string };
  details?: { condition?: string };
  listingType?: "sale" | "auction";
  price?: {
    pricingOption?: string;
    amount?: number;
    startingPrice?: number;
    buyNowPrice?: number;
    startTime?: string;
    auctionDuration?: string;
  };
  titleAndDescription?: { title?: string; description?: string };
  location?: {
    province?: string;
    city?: string;
    suburb?: string;
    customLocation?: string;
  };
  promoteYourAd?: { promotionDuration?: string };
  site?: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services";
};

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 150);
}

function computeExpiresAt(site: ListingFormData["site"]) {
  const now = new Date();
  const days =
    site === "oly-hiring" ? 30 :
    site === "oly-auto" ? 60 :
    90;
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

export async function createListingAction(formData: ListingFormData) {
  try {
    const { user } = await withAuth({ ensureSignedIn: true });
    const dbUser = await drizzleDb.query.users.findFirst({
      where: eq(users.workosId, user.id),
    });

    if (!dbUser) {
      return { success: false, error: "User not found in database." };
    }

    const site = formData.site ?? "oly";
    const title = formData.titleAndDescription?.title?.trim() || "Untitled listing";
    const description = formData.titleAndDescription?.description?.trim() || "";
    const baseSlug = toSlug(title) || `listing-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    const [listingRow] = await drizzleDb
      .insert(listings)
      .values({
        ownerId: dbUser.id,
        slug,
        site,
        listingType: formData.listingType ?? "sale",
        categoryMain: formData.category?.main,
        categorySubcategory: formData.category?.subcategory,
        title,
        description,
        pricingOption: formData.price?.pricingOption,
        amount: formData.price?.amount,
        startingPrice: formData.price?.startingPrice,
        buyNowPrice: formData.price?.buyNowPrice,
        auctionStartAt: formData.price?.startTime ? new Date(formData.price.startTime) : null,
        auctionDuration: formData.price?.auctionDuration,
        condition: formData.details?.condition,
        status: "active",
        isActive: true,
        isFeatured: false,
        publishedAt: new Date(),
        expiresAt: computeExpiresAt(site),
      })
      .returning();

    if (!listingRow) {
      return { success: false, error: "Failed to create listing." };
    }

    await drizzleDb.insert(listingLocations).values({
      listingId: listingRow.id,
      province: formData.location?.province,
      city: formData.location?.city,
      suburb: formData.location?.suburb,
      customLocation: formData.location?.customLocation,
    });

    await drizzleDb.insert(listingStats).values({
      listingId: listingRow.id,
      likesCount: 0,
      viewsTotal: 0,
      viewsToday: 0,
      unreadMessages: 0,
      bidsCount: 0,
    });

    if (site === "oly-auto") {
      await drizzleDb.insert(listingAutoDetails).values({
        listingId: listingRow.id,
        make: "Unknown",
        model: "Unknown",
        year: new Date().getFullYear(),
      });
    }

    if (site === "oly-properties") {
      await drizzleDb.insert(listingPropertyDetails).values({
        listingId: listingRow.id,
        propertyType: formData.category?.subcategory ?? formData.category?.main,
      });
    }

    if (site === "oly-hiring") {
      await drizzleDb.insert(listingJobDetails).values({
        listingId: listingRow.id,
      });
    }

    if (site === "oly-services") {
      await drizzleDb.insert(listingServiceDetails).values({
        listingId: listingRow.id,
      });
    }

    return { success: true, listingId: listingRow.id, slug };
  } catch (error) {
    console.error("createListingAction error:", error);
    return { success: false, error: "Failed to create listing." };
  }
}
