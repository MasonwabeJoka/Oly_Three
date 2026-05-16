ALTER TABLE "user_profiles" ADD COLUMN IF NOT EXISTS "phone" varchar(20);--> statement-breakpoint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'phone'
  ) THEN
    UPDATE "user_profiles" up
    SET "phone" = u."phone"
    FROM "users" u
    WHERE up."user_id" = u."id"
      AND up."phone" IS NULL
      AND u."phone" IS NOT NULL;
  END IF;
END $$;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "phone";
