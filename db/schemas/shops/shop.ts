import { pgTable, uuid, varchar, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { siteAccessStatusEnum, shopMemberRoleEnum, shopStatusEnum } from "../enums";
import { users } from "../users/users";

export const shops = pgTable(
  "shops",
  {
    id,
    ownerUserId: uuid("owner_user_id")
      .references(() => users.id, { onDelete: "restrict" })
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 150 }).notNull(),
    description: text("description"),
    contactEmail: varchar("contact_email", { length: 255 }),
    contactPhone: varchar("contact_phone", { length: 30 }),
    status: shopStatusEnum("status").default("draft").notNull(),
    ...timestamps,
  },
  (t) => ({
    slugUnique: uniqueIndex("shops_slug_unique").on(t.slug),
  })
);

export const shopMembers = pgTable(
  "shop_members",
  {
    id,
    shopId: uuid("shop_id")
      .references(() => shops.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    role: shopMemberRoleEnum("role").default("staff").notNull(),
    status: siteAccessStatusEnum("status").default("active").notNull(),
    ...timestamps,
  },
  (t) => ({
    shopUserUnique: uniqueIndex("shop_members_shop_user_unique").on(t.shopId, t.userId),
  })
);
