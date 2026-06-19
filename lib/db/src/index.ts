import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { normalizeDatabaseUrl } from "./env";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString = normalizeDatabaseUrl(
  process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRESQL_URL ||
    process.env.PG_CONNECTION_STRING,
);

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

export * from "./schema";
