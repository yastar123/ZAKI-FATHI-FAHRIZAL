export function normalizeDatabaseUrl(value: string | undefined): string {
  if (!value) {
    throw new Error("DATABASE_URL is not set");
  }

  const trimmed = value.trim();
  const unquoted = trimmed.replace(/^['"]+|['"]+$/g, "");

  try {
    const parsed = new URL(unquoted);
    if (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") {
      throw new Error(
        "DATABASE_URL must use postgres:// or postgresql:// protocol",
      );
    }
    return unquoted;
  } catch {
    throw new Error(
      "DATABASE_URL is invalid. Expected a postgres:// or postgresql:// connection string.",
    );
  }
}
