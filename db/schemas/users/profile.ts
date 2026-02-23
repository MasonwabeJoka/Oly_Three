import { pgTable, varchar, text, timestamp, index } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { users } from "./user";

export const userProfiles = pgTable("user_profiles", {
  id,
  userId: varchar("user_id", { length: 36 })
    .references(() => users.id)
    .notNull(),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  lastSeenAt: timestamp("last_seen_at"),
  ...timestamps,
}, (t) => ({
  userIdx: index("user_profiles_user_idx").on(t.userId),
}));