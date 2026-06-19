import { defineConfig } from "drizzle-kit";
import { normalizeDatabaseUrl } from "./src/env";

const connectionString = normalizeDatabaseUrl(
  process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRESQL_URL ||
    process.env.PG_CONNECTION_STRING,
);

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
