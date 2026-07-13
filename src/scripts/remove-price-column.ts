
import dotenv from 'dotenv';
dotenv.config();
import { neon } from '@neondatabase/serverless';

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error("DATABASE_URL not found in environment variables");
        return;
    }
    console.log("Connecting to database...");
    const sql = neon(databaseUrl);
    
    try {
        console.log("Dropping price column...");
        await sql`ALTER TABLE products DROP COLUMN IF EXISTS price`;
        console.log("Successfully removed price column!");
    } catch (error) {
        console.error("Error removing price column:", error);
    }
}

main();
