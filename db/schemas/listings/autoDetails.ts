import { pgTable, varchar, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingAutoDetails = pgTable("listing_auto_details", {
  id,
  listingId: varchar("listing_id", { length: 36 })
    .references(() => listings.id)
    .notNull(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  mileage: integer("mileage").notNull(),
  transmission: varchar("transmission", { length: 20 }).notNull(),
  fuelType: varchar("fuel_type", { length: 20 }).notNull(),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("auto_listing_unique").on(t.listingId),
}));

