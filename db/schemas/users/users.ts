import {
  pgTable,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { userRoleEnum, userStatusEnum } from "../enums";

export const users = pgTable("users", {
  id: id,
  workosId: text("workos_id").unique().notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phoneNumber: varchar("phone", { length: 20 }),
  role: userRoleEnum("role").default("buyer").notNull(),
  status: userStatusEnum("status").default("active").notNull(),
  createdAt: timestamps.createdAt,
  updatedAt: timestamps.updatedAt,
});
