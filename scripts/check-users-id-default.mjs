import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const rows = await sql.query(`
    select column_default, is_nullable, data_type
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'users'
      and column_name = 'id'
  `);

  console.log(rows);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
