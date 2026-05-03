import { pgTable, uuid, varchar, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { users } from "./users";

export const userAuth = pgTable(
  "user_auth",
  {
    id,
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    provider: varchar("provider", { length: 50 }).notNull().default("workos"),
    providerUserId: text("provider_user_id").notNull(),
    ...timestamps,
  },
  (t) => ({
    providerUserUnique: uniqueIndex("user_auth_provider_user_unique").on(
      t.provider,
      t.providerUserId
    ),
    userProviderUnique: uniqueIndex("user_auth_user_provider_unique").on(
      t.userId,
      t.provider
    ),
  })
);
