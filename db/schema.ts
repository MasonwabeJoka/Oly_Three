import { pgEnum, pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const roleEnum = pgEnum('role', ['buyer', 'seller', 'admin', 'moderator']);
export const statusEnum = pgEnum('status', ['active', 'suspended', 'deleted']);

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  name: varchar('name', { length: 255 }).notNull(),
  email: text('email').unique(),
  phone: text('phone').unique(),
  role: roleEnum('role').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
