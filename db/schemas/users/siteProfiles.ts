import {
  pgTable,
  uuid,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { appSiteEnum } from "../enums";
import { id, timestamps } from "../common";

export const siteProfiles = pgTable(
  "site_profiles",
  {
    id,

    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    site: appSiteEnum("site").notNull(),

    // Flexible structured data per platform
    data: jsonb("data").notNull(),

    createdAt: timestamps.createdAt,

    updatedAt: timestamps.updatedAt
  },
  (t) => ({
    userSiteUnique: uniqueIndex("site_profiles_user_site_unique").on(
      t.userId,
      t.site
    ),
  })
);