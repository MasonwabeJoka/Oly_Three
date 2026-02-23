import { relations } from "drizzle-orm";
import { users } from "./user";
import { userProfiles } from "./profile";

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
}));