// Memory abstraction for conversation and workflow persistence.
// This layer will eventually store recent interactions, user preferences, and
// generated content history in a structured way. For now, it provides a typed
// placeholder model that can be evolved into a database-backed implementation.

export interface MemoryEntry {
  id: string;
  scope: "user" | "session" | "project";
  key: string;
  value: unknown;
  createdAt: string;
}

export interface MemoryStore {
  get(key: string): MemoryEntry | undefined;
  set(key: string, value: unknown, scope?: MemoryEntry["scope"]): void;
  list(scope?: MemoryEntry["scope"]): MemoryEntry[];
}

export class InMemoryStore implements MemoryStore {
  private entries: MemoryEntry[] = [];

  get(key: string): MemoryEntry | undefined {
    return this.entries.find((entry) => entry.key === key);
  }

  set(key: string, value: unknown, scope: MemoryEntry["scope"] = "session"): void {
    const existing = this.entries.find((entry) => entry.key === key && entry.scope === scope);

    if (existing) {
      existing.value = value;
      existing.createdAt = new Date().toISOString();
      return;
    }

    this.entries.push({
      id: crypto.randomUUID(),
      scope,
      key,
      value,
      createdAt: new Date().toISOString(),
    });
  }

  list(scope?: MemoryEntry["scope"]): MemoryEntry[] {
    if (!scope) {
      return this.entries;
    }
    return this.entries.filter((entry) => entry.scope === scope);
  }
}
