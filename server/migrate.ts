import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

// This will automatically run needed migrations on the database
async function runMigrations() {
  console.log("Running migrations...");
  
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run migrations
runMigrations().then(() => {
  console.log("Migration process finished");
  process.exit(0);
});