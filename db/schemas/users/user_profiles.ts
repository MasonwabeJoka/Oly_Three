import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { id, timestamps } from "../common";

export const userProfiles = pgTable("user_profiles", {
  id,
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone", { length: 20 }),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  socialMediaName: varchar("social_media_name", { length: 100 }),
  socialMediaUrl: text("social_media_url"),
  createdAt: timestamps.createdAt,
  updatedAt: timestamps.updatedAt,
});
