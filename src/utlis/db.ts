import { Pool } from "pg";
import dotenv from "dotenv";
import postgres from 'postgres'
import { createClient } from '@supabase/supabase-js';


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set in .env file");
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("ERROR: SUPABASE_URL or SUPABASE_ANON_KEY is not set in .env file");
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sql = postgres(DATABASE_URL!)
export default sql;
export { supabase };


export const pool = new Pool({
  connectionString: DATABASE_URL
});

const testPostgresDb = async () => {
  try {
    await sql`
      SELECT 1
    `
    console.log("Database connection successful1.");

  } catch(err) {
        console.error("Database connection failed1221:", err instanceof Error ? err.message : err);
  }
}
// export const getDbClient = async () => pool.connect();

// Test the database connection on startup and log result.
const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    // simple test query to ensure connection is usable
    await client.query("SELECT 1");
    client.release();
    console.log("Database connection successful2.");
  } catch (err) {
    console.error("Database connection failed:", err instanceof Error ? err.message : err);
  }
};

// Test Supabase connection
const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('information_schema.tables').select('*').limit(1);
    if (error) {
      console.error("Supabase connection failed:", error.message);
    } else {
      console.log("Supabase connection successful.");
    }
  } catch (err) {
    console.error("Supabase connection error:", err instanceof Error ? err.message : err);
  }
};

// Run the test asynchronously (non-blocking)
testPostgresDb();
testDbConnection();
testSupabaseConnection();
