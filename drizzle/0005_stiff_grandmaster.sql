ALTER TABLE "user_profiles" ADD COLUMN IF NOT EXISTS "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "phone";
