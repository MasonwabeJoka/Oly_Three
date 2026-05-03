import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { users } from "./users";

export const userProfiles = pgTable(
  "user_profiles",
  {
    id,
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull()
      .unique(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    socialMediaName: varchar("social_media_name", { length: 100 }),
    socialMediaUrl: text("social_media_url"),
    ...timestamps,
  }
);
