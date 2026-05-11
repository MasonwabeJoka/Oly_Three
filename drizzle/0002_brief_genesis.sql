ALTER TABLE "listing_auto_details" ALTER COLUMN "listing_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "owner_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "shop_members" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "shops" ALTER COLUMN "owner_user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "site_profiles" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_site_memberships" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "workos_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(255);--> statement-breakpoint
UPDATE "users"
SET
  "workos_id" = COALESCE("workos_id", 'legacy-' || "id"),
  "first_name" = COALESCE("first_name", split_part("name", ' ', 1), 'Unknown'),
  "last_name" = COALESCE(
    "last_name",
    NULLIF(trim(substr("name", length(split_part("name", ' ', 1)) + 1)), ''),
    'User'
  );--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "workos_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_workos_id_unique" UNIQUE("workos_id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";
