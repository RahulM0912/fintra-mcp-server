import { Pool } from "pg";
import dotenv from "dotenv";
import postgres from 'postgres'


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set in .env file");
}

const sql = postgres(DATABASE_URL!)
export default sql;


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

// Run the test asynchronously (non-blocking)
testPostgresDb();
testDbConnection();
