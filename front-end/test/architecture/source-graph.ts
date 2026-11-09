import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("../../src", import.meta.url));

const IMPORT_SPECIFIER =
  /(?:import|export)\s[^'"]*?\sfrom\s*["']([^"']+)["']|import\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;

export interface SourceImport {
  /** Importing file, relative to `src`. */
  readonly file: string;
  readonly specifier: string;
  /** Imported path relative to `src`, or `null` for an external package. */
  readonly target: string | null;
}

export function listSourceFiles(): string[] {
  return readdirSync(SRC, { recursive: true, encoding: "utf8" })
    .filter((file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file))
    .map((file) => file.split(path.sep).join("/"));
}

export function importsOf(file: string): SourceImport[] {
  const code = readFileSync(path.join(SRC, file), "utf8");
  return [...code.matchAll(IMPORT_SPECIFIER)].map((match) => {
    const specifier = match[1] ?? match[2] ?? match[3];
    return { file, specifier, target: resolveInSrc(file, specifier) };
  });
}

export function segment(file: string, index: number): string {
  return file.split("/")[index] ?? "";
}

function resolveInSrc(file: string, specifier: string): string | null {
  if (specifier.startsWith("@/")) return specifier.slice(2);
  if (specifier.startsWith(".")) {
    return path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier));
  }
  return null;
}
