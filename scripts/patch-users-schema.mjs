import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  await sql.query('ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "workos_id" text;');
  await sql.query('ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "first_name" varchar(255);');
  await sql.query('ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "last_name" varchar(255);');

  await sql.query(`
    UPDATE "users"
    SET
      "workos_id" = COALESCE("workos_id", 'legacy-' || "id"),
      "first_name" = COALESCE("first_name", split_part("name", ' ', 1), 'Unknown'),
      "last_name" = COALESCE(
        "last_name",
        NULLIF(trim(substr("name", length(split_part("name", ' ', 1)) + 1)), ''),
        'User'
      );
  `);

  await sql.query('ALTER TABLE "users" ALTER COLUMN "workos_id" SET NOT NULL;');
  await sql.query('ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;');
  await sql.query('ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL;');

  await sql.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'users_workos_id_unique'
      ) THEN
        ALTER TABLE "users"
        ADD CONSTRAINT "users_workos_id_unique" UNIQUE ("workos_id");
      END IF;
    END $$;
  `);

  await sql.query('ALTER TABLE "users" DROP COLUMN IF EXISTS "name";');
  console.log('USERS_SCHEMA_PATCHED');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
