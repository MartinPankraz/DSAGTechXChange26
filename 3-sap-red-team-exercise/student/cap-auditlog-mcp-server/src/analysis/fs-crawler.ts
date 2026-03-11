/**
 * Filesystem crawler for the CAP Audit Log MCP Server.
 *
 * Walks a workspace root directory recursively and returns FileNode objects
 * for all SAP-relevant source files. Designed to be safe for large repos:
 *  - Hard skip list for heavyweight/irrelevant directories
 *  - File-size cap to avoid reading minified bundles or lock files
 *  - Allowlist of extensions relevant to CAP/UI5 analysis
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { FileNode } from "../types.js";

// ─── Configuration ────────────────────────────────────────────────────────────

/** Directories that are never relevant and can be huge */
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "out",
  ".cache",
  "coverage",
  ".nyc_output",
  "gen",             // CDS generated output
  "resources",       // MTA build artifacts
  "@types",
]);

/**
 * File extensions we actually analyse.
 * Anything else (images, lock files, compiled output, etc.) is ignored.
 */
const ALLOWED_EXTENSIONS = new Set([
  ".js",
  ".mjs",
  ".cjs",
  ".cds",
  ".json",
  ".yaml",
  ".yml",
  ".xml",
  ".ts",             // source TypeScript (pre-build)
]);

/**
 * Specific filenames always included regardless of extension
 * (e.g. files with no extension like Makefile, Dockerfile are irrelevant here
 * but .env could reveal VCAP — excluded intentionally for security).
 */
const ALWAYS_INCLUDE_NAMES = new Set([
  "mta.yaml",
  "mta.yml",
  ".cdsrc.json",
  "xs-security.json",
  "xs-app.json",
  "ui5.yaml",
  "package.json",
]);

/** Files whose names suggest they should be skipped even with an allowed extension */
const SKIP_NAME_PATTERNS: RegExp[] = [
  /package-lock\.json$/,
  /yarn\.lock$/,
  /pnpm-lock\.yaml$/,
  /\.min\.js$/,
  /[-.]bundle\.js$/,
  /\.d\.ts$/,
  /tsconfig.*\.json$/,     // TS config not useful for analysis
  /jest\.config/,
  /\.eslintrc/,
  /\.prettierrc/,
];

/** Maximum file size to read in bytes (512 KB). Larger files are path-only nodes. */
const MAX_FILE_BYTES = 512 * 1024;

// ─── Crawler ─────────────────────────────────────────────────────────────────

export interface CrawlOptions {
  /** Absolute path to the workspace root */
  rootPath: string;
  /**
   * Optional allow-list of relative glob-like path segments.
   * When set, only files whose relative path contains at least one of these
   * segments are included (e.g. ["srv/", "webapp/", "db/"]).
   * Useful to narrow a very large monorepo scan.
   */
  includePathSegments?: string[];
  /** Override the max file size cap (bytes). */
  maxFileBytes?: number;
}

export interface CrawlResult {
  files: FileNode[];
  /** Paths that were found but skipped due to size or filter */
  skippedPaths: string[];
  /** Total files visited (including skipped) */
  totalVisited: number;
}

/**
 * Recursively walks `rootPath` and returns FileNode objects for all
 * SAP-relevant source files that fit within the size cap.
 */
export function crawlWorkspace(options: CrawlOptions): CrawlResult {
  const { rootPath, includePathSegments, maxFileBytes = MAX_FILE_BYTES } = options;

  const files: FileNode[] = [];
  const skippedPaths: string[] = [];
  let totalVisited = 0;

  function visit(absDir: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(absDir, { withFileTypes: true });
    } catch {
      // Permission denied or not a directory – skip silently
      return;
    }

    for (const entry of entries) {
      const absPath = path.join(absDir, entry.name);
      const relPath = path.relative(rootPath, absPath);

      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        visit(absPath);
        continue;
      }

      if (!entry.isFile()) continue;

      totalVisited++;

      // Extension filter
      const ext = path.extname(entry.name).toLowerCase();
      const isAllowedName = ALWAYS_INCLUDE_NAMES.has(entry.name);
      if (!isAllowedName && !ALLOWED_EXTENSIONS.has(ext)) continue;

      // Skip known noise patterns
      if (SKIP_NAME_PATTERNS.some((re) => re.test(entry.name))) {
        skippedPaths.push(relPath);
        continue;
      }

      // Optional path-segment filter
      if (includePathSegments && includePathSegments.length > 0) {
        const normalised = relPath.replace(/\\/g, "/");
        const matches = includePathSegments.some((seg) =>
          normalised.includes(seg)
        );
        if (!matches) {
          skippedPaths.push(relPath);
          continue;
        }
      }

      // Size guard
      let stat: fs.Stats;
      try {
        stat = fs.statSync(absPath);
      } catch {
        continue;
      }

      if (stat.size > maxFileBytes) {
        // Include as path-only node so path heuristics still fire
        files.push({ path: relPath, content: "" });
        skippedPaths.push(`${relPath} (oversized: ${Math.round(stat.size / 1024)} KB)`);
        continue;
      }

      // Read content
      let content: string;
      try {
        content = fs.readFileSync(absPath, "utf8");
      } catch {
        skippedPaths.push(relPath);
        continue;
      }

      files.push({ path: relPath, content });
    }
  }

  // Validate rootPath exists before walking
  if (!fs.existsSync(rootPath)) {
    throw new Error(`crawlWorkspace: rootPath does not exist: ${rootPath}`);
  }

  visit(rootPath);

  return { files, skippedPaths, totalVisited };
}

/**
 * Convenience wrapper: crawl and return only the FileNode array.
 * Throws if rootPath does not exist.
 */
export function crawlToFileNodes(rootPath: string, includePathSegments?: string[]): FileNode[] {
  return crawlWorkspace({ rootPath, includePathSegments }).files;
}
