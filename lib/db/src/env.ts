export function normalizeDatabaseUrl(value: string | undefined): string {
  if (!value) {
    throw new Error("DATABASE_URL is not set");
  }

  const trimmed = value.trim();
  const unquoted = trimmed.replace(/^['"]+|['"]+$/g, "");

  const tryParse = (candidate: string) => {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") {
      throw new Error(
        "DATABASE_URL must use postgres:// or postgresql:// protocol",
      );
    }
    return parsed.toString();
  };

  try {
    return tryParse(unquoted);
  } catch {
    // Some providers expose raw credentials with special characters that need
    // percent-encoding before the URL can be parsed correctly.
    const authMatch = unquoted.match(/^([^:]+):\/\/([^@/]+)@(.+)$/i);
    if (!authMatch) {
      throw new Error(
        "DATABASE_URL is invalid. Expected a postgres:// or postgresql:// connection string.",
      );
    }

    const [, protocol, rawAuth, rest] = authMatch;
    const [rawUser, rawPassword] = rawAuth.split(":");
    const safeUser = rawUser ? encodeURIComponent(rawUser) : "";
    const safePassword = rawPassword
      ? encodeURIComponent(rawPassword)
      : "";
    const rebuilt = `${protocol}//${safeUser}${safePassword ? `:${safePassword}` : ""}@${rest}`;

    try {
      return tryParse(rebuilt);
    } catch {
      throw new Error(
        "DATABASE_URL is invalid. Expected a postgres:// or postgresql:// connection string.",
      );
    }
  }
}
