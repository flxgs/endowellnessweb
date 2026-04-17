import { readFile } from "node:fs/promises";
import path from "node:path";

const LOCALE_FILES = {
  en: "messages/en.json",
  es: "messages/es.json",
};

function flattenKeys(value, prefix = "", keys = new Set()) {
  if (Array.isArray(value)) {
    if (value.length === 0 && prefix) {
      keys.add(prefix);
      return keys;
    }

    value.forEach((entry, index) => {
      flattenKeys(entry, `${prefix}[${index}]`, keys);
    });
    return keys;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0 && prefix) {
      keys.add(prefix);
      return keys;
    }

    for (const [key, entryValue] of entries) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      flattenKeys(entryValue, nextPrefix, keys);
    }
    return keys;
  }

  if (prefix) {
    keys.add(prefix);
  }
  return keys;
}

async function loadLocaleMessages(locale, relativePath) {
  const filePath = path.resolve(process.cwd(), relativePath);
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  return {
    locale,
    keys: flattenKeys(parsed),
  };
}

function diffKeys(reference, target) {
  return [...reference].filter((key) => !target.has(key)).sort((a, b) => a.localeCompare(b));
}

async function main() {
  const loaded = await Promise.all(
    Object.entries(LOCALE_FILES).map(([locale, relativePath]) => loadLocaleMessages(locale, relativePath)),
  );

  const [base, ...rest] = loaded;
  const issues = [];

  for (const other of rest) {
    const missingInOther = diffKeys(base.keys, other.keys);
    if (missingInOther.length > 0) {
      issues.push(
        `Missing in ${other.locale} (${missingInOther.length}):\n${missingInOther.map((key) => `  - ${key}`).join("\n")}`,
      );
    }

    const missingInBase = diffKeys(other.keys, base.keys);
    if (missingInBase.length > 0) {
      issues.push(
        `Missing in ${base.locale} (${missingInBase.length}):\n${missingInBase.map((key) => `  - ${key}`).join("\n")}`,
      );
    }
  }

  if (issues.length > 0) {
    console.error("i18n key parity check failed.\n");
    console.error(issues.join("\n\n"));
    process.exit(1);
  }

  console.log(`i18n key parity check passed (${loaded.map((entry) => entry.locale).join(", ")}).`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`i18n key parity check crashed: ${message}`);
  process.exit(1);
});
