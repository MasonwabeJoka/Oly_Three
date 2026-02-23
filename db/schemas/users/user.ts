import { pgTable, varchar, uniqueIndex, index } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { userRoleEnum, userStatusEnum } from "../enums";

export const users = pgTable("users", {
  id,
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  role: userRoleEnum("role").default("buyer").notNull(),
  status: userStatusEnum("status").default("active").notNull(),
  ...timestamps,
}, (t) => ({
  emailUnique: uniqueIndex("users_email_unique").on(t.email),
  phoneUnique: uniqueIndex("users_phone_unique").on(t.phone),
}));