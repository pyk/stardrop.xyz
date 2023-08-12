import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import path from "path";

async function sync() {
  // Load env based on the env variable
  if (process.env.NODE_ENV == "production") {
    config({ path: path.resolve(process.cwd(), ".env.prod") });
  } else {
    config({ path: path.resolve(process.cwd(), ".env.dev") });
  }

  if (process.env.DATABASE_URL == null) {
    throw new Error(`DATABASE_URL is undefined`);
  }

  try {
    // Migration client should have max connections = 1
    const client = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(client);

    // this will automatically run needed migrations on the database
    await migrate(db, { migrationsFolder: "./database/migrations" });
    console.log("Migrations complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migrations failed!", err);
    process.exit(1);
  }
}

sync();
