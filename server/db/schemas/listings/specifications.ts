import { pgTable, varchar, text, integer, index, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingSpecifications = pgTable("listing_specifications", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  key: varchar("key", { length: 120 }).notNull(),
  value: text("value").notNull(),
  position: integer("position").default(0).notNull(),
  ...timestamps,
}, (t) => ({
  listingIdx: index("listing_specifications_listing_idx").on(t.listingId),
}));
