import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "buyer",
  "seller",
  "admin",
  "moderator",
]);

export const userStatusEnum = pgEnum("user_status", [
  "active",
  "suspended",
  "deleted",
]);

export const listingDomainEnum = pgEnum("listing_domain", [
  "auto",
  "property",
  "job",
  "service",
  "shop",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "draft",
  "active",
  "paused",
  "sold",
  "expired",
  "removed",
]);

export const mediaTypeEnum = pgEnum("media_type", [
  "image",
  "video",
  "attachment",
]);

export const currencyEnum = pgEnum("currency", ["ZAR"]);

export const notificationChannelEnum = pgEnum("notification_channel", [
  "in_app",
  "email",
  "sms",
  "push",
  "whatsapp",
]);

export const messageStatusEnum = pgEnum("message_status", [
  "sent",
  "delivered",
  "read",
  "deleted",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "initiated",
  "pending",
  "paid",
  "in_escrow",
  "completed",
  "cancelled",
  "refunded",
  "disputed",
]);

export const payoutStatusEnum = pgEnum("payout_status", [
  "queued",
  "processing",
  "paid",
  "failed",
]);

export const promotionTypeEnum = pgEnum("promotion_type", [
  "featured",
  "bump",
  "urgent",
  "top",
]);