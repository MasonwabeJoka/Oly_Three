import { relations } from "drizzle-orm";
import { users } from "./users";
import { userProfiles } from "./user_profiles";
import { userSiteMemberships } from "./userSiteMembership";
import { siteProfiles } from "./siteProfiles";

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId], // userProfiles.userId references users.id
  }),

  siteMemberships: many(userSiteMemberships),
  siteProfiles: many(siteProfiles),
}));