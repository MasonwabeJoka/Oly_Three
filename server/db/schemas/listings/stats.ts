import { pgTable, integer, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingStats = pgTable("listing_stats", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  viewsTotal: integer("views_total").default(0).notNull(),
  viewsToday: integer("views_today").default(0).notNull(),
  unreadMessages: integer("unread_messages").default(0).notNull(),
  bidsCount: integer("bids_count").default(0).notNull(),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("listing_stats_listing_unique").on(t.listingId),
}));
