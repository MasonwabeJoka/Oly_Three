import { pgTable, varchar, doublePrecision, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingLocations = pgTable("listing_locations", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  province: varchar("province", { length: 120 }),
  city: varchar("city", { length: 120 }),
  suburb: varchar("suburb", { length: 120 }),
  customLocation: varchar("custom_location", { length: 255 }),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("listing_locations_listing_unique").on(t.listingId),
}));
