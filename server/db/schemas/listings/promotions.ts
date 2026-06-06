import { pgTable, varchar, integer, index, timestamp, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingPromotions = pgTable("listing_promotions", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  platform: varchar("platform", { length: 80 }).notNull(),
  duration: varchar("duration", { length: 40 }),
  remainingDays: integer("remaining_days"),
  status: varchar("status", { length: 40 }),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  ...timestamps,
}, (t) => ({
  listingIdx: index("listing_promotions_listing_idx").on(t.listingId),
}));
