/**
 * Filesystem crawler for the CAP Audit Log MCP Server.
 *
 * Walks a workspace root directory recursively and returns FileNode objects
 * for all SAP-relevant source files. Designed to be safe for large repos:
 *  - Hard skip list for heavyweight/irrelevant directories
 *  - File-size cap to avoid reading minified bundles or lock files
 *  - Allowlist of extensions relevant to CAP/UI5 analysis
 */
import type { FileNode } from "../types.js";
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
export declare function crawlWorkspace(options: CrawlOptions): CrawlResult;
/**
 * Convenience wrapper: crawl and return only the FileNode array.
 * Throws if rootPath does not exist.
 */
export declare function crawlToFileNodes(rootPath: string, includePathSegments?: string[]): FileNode[];
//# sourceMappingURL=fs-crawler.d.ts.map