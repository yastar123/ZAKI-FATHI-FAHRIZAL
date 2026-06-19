import test from "node:test";
import assert from "node:assert/strict";
import { normalizeDatabaseUrl } from "./db-url.js";

test("trims whitespace and removes surrounding quotes from DATABASE_URL", () => {
  assert.equal(
    normalizeDatabaseUrl('  "postgresql://user:pass@host:5432/db"  '),
    "postgresql://user:pass@host:5432/db",
  );
});

test("keeps valid postgres URLs unchanged", () => {
  const value = "postgres://user:pass@host:5432/db";
  assert.equal(normalizeDatabaseUrl(value), value);
});

test("throws when DATABASE_URL is missing or malformed", () => {
  assert.throws(() => normalizeDatabaseUrl("not a valid url"), /DATABASE_URL/i);
});
