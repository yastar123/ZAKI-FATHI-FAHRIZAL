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
    const schemeMatch = unquoted.match(/^([a-z][a-z0-9+.-]*):\/\//i);
    if (!schemeMatch) {
      throw new Error(
        "DATABASE_URL is invalid. Expected a postgres:// or postgresql:// connection string.",
      );
    }

    const protocol = schemeMatch[1];
    const atIndex = unquoted.lastIndexOf("@");
    if (atIndex === -1) {
      throw new Error(
        "DATABASE_URL is invalid. Expected a postgres:// or postgresql:// connection string.",
      );
    }

    const afterScheme = unquoted.slice(unquoted.indexOf("://") + 3);
    const credentialsPart = afterScheme.slice(0, atIndex - (unquoted.indexOf("://") + 3));
    const hostAndPath = afterScheme.slice(atIndex - (unquoted.indexOf("://") + 3) + 1);

    const firstColon = credentialsPart.indexOf(":");
    const rawUser =
      firstColon === -1 ? credentialsPart : credentialsPart.slice(0, firstColon);
    const rawPassword =
      firstColon === -1 ? "" : credentialsPart.slice(firstColon + 1);

    const safeUser = encodeURIComponent(rawUser);
    const safePassword = rawPassword ? encodeURIComponent(rawPassword) : "";
    const rebuilt = `${protocol}://${safeUser}${safePassword ? `:${safePassword}` : ""}@${hostAndPath}`;

    try {
      return tryParse(rebuilt);
    } catch {
      throw new Error(
        "DATABASE_URL is invalid. Expected a postgres:// or postgresql:// connection string.",
      );
    }
  }
}
