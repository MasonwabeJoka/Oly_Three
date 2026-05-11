import {
  pgTable,
  text,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { appSiteEnum } from "../enums";
import { id, timestamps } from "../common";

export const userSiteMemberships = pgTable(
  "user_site_memberships",
  {
    id,
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    site: appSiteEnum("site").notNull(),
    onboardingCompleted: boolean("onboarding_completed")
      .default(false)
      .notNull(),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
  },
  (t) => ({
    userSiteUnique: uniqueIndex("user_site_unique").on(
      t.userId,
      t.site
    ),
  })
);
