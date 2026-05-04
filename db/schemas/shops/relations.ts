import { relations } from "drizzle-orm";
import { users } from "../users/users";
import { shopMembers, shops } from "./shop";

export const shopsRelations = relations(shops, ({ one, many }) => ({
  owner: one(users, {
    fields: [shops.ownerUserId],
    references: [users.id],
  }),
  members: many(shopMembers),
}));

export const shopMembersRelations = relations(shopMembers, ({ one }) => ({
  shop: one(shops, {
    fields: [shopMembers.shopId],
    references: [shops.id],
  }),
  user: one(users, {
    fields: [shopMembers.userId],
    references: [users.id],
  }),
}));
