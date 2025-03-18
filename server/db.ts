import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema";

// Initialize connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize drizzle with the connection and schema
export const db = drizzle(pool, { schema });