import {
  pgTable,
  varchar,
  text,
  integer,
  index,
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import {
  listingSiteEnum,
  listingStatusEnum,
  currencyEnum,
  listingTypeEnum,
} from "../enums";
import { users } from "../users/users";

export const listings = pgTable("listings", {
  id,
  ownerId: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  slug: varchar("slug", { length: 160 }).notNull(),
  site: listingSiteEnum("site").notNull(),
  listingType: listingTypeEnum("listing_type").default("auction").notNull(),
  categoryId: varchar("category_id", { length: 64 }),
  categoryMain: varchar("main", { length: 120 }),
  categorySubcategory: varchar("subcategory", { length: 120 }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  pricingOption: varchar("pricing_option", { length: 40 }),
  amount: integer("amount"),
  startingPrice: integer("starting_price"),
  buyNowPrice: integer("buy_now_price"),
  auctionStartAt: timestamp("auction_start_at", { withTimezone: true }),
  auctionDuration: varchar("auction_duration", { length: 40 }),
  condition: varchar("condition", { length: 64 }),
  currency: currencyEnum("currency").default("ZAR").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  status: listingStatusEnum("status").default("draft").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  ...timestamps,
}, (t) => ({
  ownerIdx: index("listings_owner_idx").on(t.ownerId),
  slugIdx: index("listings_slug_idx").on(t.slug),
  siteIdx: index("listings_site_idx").on(t.site),
  typeIdx: index("listings_type_idx").on(t.listingType),
  categoryIdx: index("listings_category_idx").on(t.categoryId),
  statusIdx: index("listings_status_idx").on(t.status),
}));
