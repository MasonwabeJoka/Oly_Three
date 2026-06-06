import { pgTable, varchar, integer, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingServiceDetails = pgTable("listing_service_details", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  serviceType: varchar("service_type", { length: 80 }),
  providerName: varchar("provider_name", { length: 180 }),
  providerWebsite: varchar("provider_website", { length: 2048 }),
  availability: varchar("availability", { length: 60 }),
  bookingLink: varchar("booking_link", { length: 2048 }),
  portfolioUrl: varchar("portfolio_url", { length: 2048 }),
  averageRating: integer("average_rating"),
  reviewsCount: integer("reviews_count").default(0).notNull(),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("service_listing_unique").on(t.listingId),
}));
