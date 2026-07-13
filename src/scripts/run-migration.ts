
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
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
        const migrationFile = path.resolve(process.cwd(), 'drizzle', '0000_long_bushwacker.sql');
        const migrationSql = fs.readFileSync(migrationFile, 'utf8');
        
        console.log("Running migration:", migrationSql);
        await sql.unsafe(migrationSql);
        
        console.log("Migration applied successfully!");
    } catch (error) {
        console.error("Error applying migration:", error);
    }
}

main();
