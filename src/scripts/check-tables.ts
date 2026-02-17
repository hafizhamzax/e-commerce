
import dotenv from 'dotenv';
dotenv.config();
import { neon } from '@neondatabase/serverless';

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error("DATABASE_URL not found");
        return;
    }
    console.log("Connecting to DB...");
    const sql = neon(databaseUrl);
    try {
        const result = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'products'
        `;
        console.log("Columns found:", result);
    } catch (e) {
        console.error("Error querying columns:", e);
    }
}
main();
