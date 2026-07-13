
// Direct script to drop price column from Neon DB
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('ERROR: DATABASE_URL not found in .env.local');
        process.exit(1);
    }

    console.log('Connecting to Neon DB...');
    const sql = neon(databaseUrl);

    try {
        console.log('Dropping price column...');
        await sql`ALTER TABLE products DROP COLUMN IF EXISTS price`;
        console.log('✅ SUCCESS: Price column has been dropped from your Neon database!');
    } catch (error) {
        console.error('❌ ERROR dropping price column:', error);
        process.exit(1);
    }
}

main();
