import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { users } from "./users";

export const userSessions = pgTable(
  "user_sessions",
  {
    id,
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    sessionToken: text("session_token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (t) => ({
    sessionTokenUnique: uniqueIndex("user_sessions_session_token_unique").on(
      t.sessionToken
    ),
  })
);
