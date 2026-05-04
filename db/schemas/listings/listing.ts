import {
  pgTable,
  varchar,
  text,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import {
  listingSiteEnum,
  listingStatusEnum,
  currencyEnum,
} from "../enums";
import { users } from "../user/user";

export const listings = pgTable("listings", {
  id,
  ownerId: varchar("owner_id", { length: 36 })
    .references(() => users.id)
    .notNull(),
  categoryId: varchar("category_id", { length: 36 }),
  domain: listingSiteEnum("domain").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price"),
  currency: currencyEnum("currency").default("ZAR").notNull(),
  status: listingStatusEnum("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  ...timestamps,
}, (t) => ({
  ownerIdx: index("listings_owner_idx").on(t.ownerId),
  categoryIdx: index("listings_category_idx").on(t.categoryId),
  statusIdx: index("listings_status_idx").on(t.status),
}));