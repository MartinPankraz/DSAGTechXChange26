/**
 * Tool: suggest_logging
 * Analyses CAP and UI5 source files and produces actionable SuggestionEdits
 * for adding AUDIT_LOG and APP_LOG instrumentation.
 */

import type {
  AuditIntegration,
  FileNode,
  SuggestLoggingInput,
  SuggestLoggingOutput,
  SuggestionEdit,
} from "../types.js";
import {
  analyseCapWorkspace,
} from "../analysis/cap-detector.js";
import {
  analyseUi5Workspace,
  extractUi5HandlerNames,
  hasODataCalls,
} from "../analysis/ui5-detector.js";
import { detectAuditIntegration } from "../analysis/audit-integration-detector.js";
import {
  auditWrapperSource,
  buildSuggestion,
  resetIdCounter,
} from "../analysis/classifier.js";

// ─── Internal types ───────────────────────────────────────────────────────────

interface HandlerLocation {
  file: string;
  event: string;
  entityName: string;
  functionName: string;
  lineHint?: number;
  isUi5?: boolean;
}

// ─── Diff parsing ─────────────────────────────────────────────────────────────

/**
 * Extracts modified file paths from a unified diff string.
 */
function extractModifiedFilesFromDiff(diff: string): string[] {
  const files: string[] = [];
  const pattern = /^(?:\+\+\+|---)\s+b?\/(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(diff)) !== null) {
    const p = m[1].trim();
    if (!files.includes(p) && !p.startsWith("/dev/null")) {
      files.push(p);
    }
  }
  return files;
}

// ─── CAP handler extraction ───────────────────────────────────────────────────

/**
 * Extracts handler locations from CAP service implementation files.
 */
function extractCapHandlerLocations(file: FileNode): HandlerLocation[] {
  const locations: HandlerLocation[] = [];
  const lines = file.content.split("\n");

  // Pattern: this.on/before/after('EVENT', 'EntityName', async (req) => {
  const handlerRegex =
    /this\.(on|before|after)\s*\(\s*['"`]([A-Za-z_]+)['"`]\s*(?:,\s*['"`]([A-Za-z_.]+)['"`])?\s*,/g;

  let m: RegExpExecArray | null;
  while ((m = handlerRegex.exec(file.content)) !== null) {
    const event = m[2];
    const entity = m[3] ?? "UnknownEntity";

    // Find approximate line number
    const upToMatch = file.content.substring(0, m.index);
    const lineHint = upToMatch.split("\n").length;

    // Find the surrounding function name from context
    const functionName = findEnclosingFunctionName(lines, lineHint - 1);

    locations.push({
      file: file.path,
      event,
      entityName: entity,
      functionName: functionName ?? `handler_${event}_${entity}`,
      lineHint,
    });
  }

  // Also detect express-style / action-level handlers: async function handle*(req, res)
  const funcRegex = /(?:async\s+)?function\s+(\w+)\s*\(req/g;
  while ((m = funcRegex.exec(file.content)) !== null) {
    const funcName = m[1];
    if (/create|update|delete|read|save|export|import|approve|reject/i.test(funcName)) {
      const upToMatch = file.content.substring(0, m.index);
      const lineHint = upToMatch.split("\n").length;
      locations.push({
        file: file.path,
        event: deriveEventFromName(funcName),
        entityName: deriveEntityFromName(funcName),
        functionName: funcName,
        lineHint,
      });
    }
  }

  return locations;
}

function findEnclosingFunctionName(
  lines: string[],
  targetLine: number
): string | undefined {
  for (let i = targetLine; i >= 0; i--) {
    const line = lines[i];
    if (!line) continue;
    const m =
      /(?:async\s+)?function\s+(\w+)/.exec(line) ??
      /(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/.exec(line) ??
      /(\w+)\s*:\s*(?:async\s*)?\(/.exec(line);
    if (m) return m[1];
  }
  return undefined;
}

function deriveEventFromName(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("create") || lower.includes("add")) return "CREATE";
  if (lower.includes("update") || lower.includes("save") || lower.includes("edit")) return "UPDATE";
  if (lower.includes("delete") || lower.includes("remove")) return "DELETE";
  if (lower.includes("read") || lower.includes("get") || lower.includes("fetch")) return "READ";
  if (lower.includes("export")) return "EXPORT";
  if (lower.includes("import") || lower.includes("upload")) return "UPLOAD";
  if (lower.includes("approve")) return "APPROVE";
  if (lower.includes("reject")) return "REJECT";
  return "WRITE";
}

function deriveEntityFromName(name: string): string {
  return name
    .replace(/^(handle|on|do|perform|process)/i, "")
    .replace(/^(create|update|delete|read|save|get|fetch|export|import)/i, "")
    || name;
}

// ─── UI5 handler extraction ───────────────────────────────────────────────────

/**
 * Extracts handler locations from UI5 controller files.
 * These produce APP_LOG suggestions (with a note about where the AUDIT_LOG belongs).
 */
function extractUi5HandlerLocations(file: FileNode): HandlerLocation[] {
  const locations: HandlerLocation[] = [];
  const handlers = extractUi5HandlerNames(file.content);

  for (const handler of handlers) {
    // Find approximate line
    const idx = file.content.indexOf(`${handler}:`);
    const lineHint = idx >= 0 ? file.content.substring(0, idx).split("\n").length : undefined;

    // Try to infer entity from the controller file name
    const entityMatch = /(\w+)\.controller\.js$/i.exec(file.path);
    const entity = entityMatch ? entityMatch[1] : "Entity";

    // For action handlers, derive event
    const event = deriveEventFromName(handler);

    locations.push({
      file: file.path,
      event,
      entityName: entity,
      functionName: handler,
      lineHint,
      isUi5: true,
    });

    // If the controller has OData calls, add a special AUDIT_LOG location hint
    // pointing to where the backend handler should be
    if (
      hasODataCalls(file.content) &&
      /save|submit|create|update|delete|approve|reject/i.test(handler)
    ) {
      // Virtual suggestion pointing at the (likely) backend location
      locations.push({
        file: `srv/${entity.toLowerCase()}-service.js`,
        event,
        entityName: entity,
        functionName: `on${event.charAt(0)}${event.slice(1).toLowerCase()}${entity}`,
        lineHint: undefined,
        isUi5: false, // This is the backend location
      });
    }
  }

  return locations;
}

// ─── Error/performance location extraction ────────────────────────────────────

function extractErrorHandlerLocations(file: FileNode): HandlerLocation[] {
  const locations: HandlerLocation[] = [];
  const fileLines = file.content.split("\n");
  const catchPattern = /catch\s*\(\s*(\w+)\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = catchPattern.exec(file.content)) !== null) {
    const upToMatch = file.content.substring(0, m.index);
    const lineHint = upToMatch.split("\n").length;
    const funcName = findEnclosingFunctionName(fileLines, lineHint - 1) ?? "errorHandler";

    locations.push({
      file: file.path,
      event: "ERROR",
      entityName: "Application",
      functionName: funcName,
      lineHint,
    });
  }

  return locations;
}

// ─── Coverage warnings ────────────────────────────────────────────────────────

function buildCoverageWarnings(
  auditIntegration: AuditIntegration,
  stacks: string[]
): string[] {
  const warnings: string[] = [];

  if (stacks.includes("ui5") && !stacks.includes("cap")) {
    warnings.push(
      "Only UI5 files analysed. Audit logging suggestions point to a hypothetical CAP backend. " +
        "Provide CAP source files for precise placements."
    );
  }

  if (auditIntegration.library === "none") {
    warnings.push(
      "No audit logging library installed. Suggestions include a stub wrapper – replace with a real library before production."
    );
  }

  if (!auditIntegration.mtaResourcePresent) {
    warnings.push(
      "mta.yaml auditlog service binding not detected. Audit events will not reach BTP Audit Log Service at runtime."
    );
  }

  return warnings;
}

// ─── Main tool function ───────────────────────────────────────────────────────

export function runSuggestLogging(input: SuggestLoggingInput): SuggestLoggingOutput {
  resetIdCounter();

  // Build file nodes
  const files: FileNode[] = [];
  if (input.openFiles) {
    for (const of_ of input.openFiles) {
      files.push({ path: of_.path, content: of_.content });
    }
  }

  // If only a diff is provided, parse modified file paths for context
  let diffFiles: string[] = [];
  if (input.diff) {
    diffFiles = extractModifiedFilesFromDiff(input.diff);
  }

  // Detect stacks and audit integration
  const capResult = analyseCapWorkspace(files);
  const ui5Result = analyseUi5Workspace(files);
  const auditIntegration = detectAuditIntegration(files);

  const stacks: string[] = [];
  if (capResult.isCapWorkspace) stacks.push("cap");
  if (ui5Result.isUi5Workspace) stacks.push("ui5");

  // Gather handler locations
  const allLocations: HandlerLocation[] = [];

  for (const file of files) {
    // Determine focus filter
    if (input.focus === "performance") {
      allLocations.push(...extractErrorHandlerLocations(file));
      continue;
    }

    if (file.path.endsWith(".controller.js")) {
      allLocations.push(...extractUi5HandlerLocations(file));
    } else if (
      file.path.endsWith(".js") &&
      !file.path.includes("node_modules") &&
      (capResult.serviceFiles.includes(file.path) || /\/srv\//.test(file.path))
    ) {
      allLocations.push(...extractCapHandlerLocations(file));
      if (input.focus !== "audit") {
        allLocations.push(...extractErrorHandlerLocations(file));
      }
    } else if (file.path.endsWith(".js") && !file.path.includes("node_modules")) {
      // Generic JS file (helper, route, etc.)
      allLocations.push(...extractCapHandlerLocations(file));
    }
  }

  // If we have diff context but no open files, generate heuristic suggestions from diff paths
  if (files.length === 0 && diffFiles.length > 0) {
    for (const p of diffFiles) {
      if (/\/srv\/.*\.js$/.test(p) || p.endsWith("-service.js")) {
        allLocations.push({
          file: p,
          event: "WRITE",
          entityName: deriveEntityFromDiffPath(p),
          functionName: "modifiedHandler",
          lineHint: undefined,
        });
      }
    }
  }

  // Build suggestion edits
  const edits: SuggestionEdit[] = [];

  // Deduplicate by file+event+entity
  const seen = new Set<string>();

  for (const loc of allLocations) {
    const key = `${loc.file}:${loc.event}:${loc.entityName}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const suggestion = buildSuggestion({
      file: loc.file,
      event: loc.event,
      entityName: loc.entityName,
      lineHint: loc.lineHint,
      functionName: loc.functionName,
      isUi5: loc.isUi5,
      auditIntegration,
    });

    // Apply focus filter
    if (input.focus === "audit" && suggestion.type !== "AUDIT_LOG") continue;
    if (input.focus === "errors" && suggestion.type !== "APP_LOG") continue;

    edits.push(suggestion);

    if (edits.length >= (input.maxSuggestions ?? 20)) break;
  }

  // Sort: AUDIT_LOG HIGH first, then by priority
  const priorityOrder: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  edits.sort((a, b) => {
    if (a.type === "AUDIT_LOG" && b.type !== "AUDIT_LOG") return -1;
    if (a.type !== "AUDIT_LOG" && b.type === "AUDIT_LOG") return 1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const coverageWarnings = buildCoverageWarnings(auditIntegration, stacks);

  // If wrapperNeeded, mention the wrapper file in warnings
  const wrapperNeeded = edits.some((e) => e.how.wrapperNeeded);
  if (wrapperNeeded) {
    coverageWarnings.push(
      "A stub audit log wrapper will be referenced at ./lib/audit-log-wrapper.js – create this file using the auditWrapperSource() helper or replace with a real library."
    );
  }

  return {
    summary: {
      totalEdits: edits.length,
      auditLogEdits: edits.filter((e) => e.type === "AUDIT_LOG").length,
      appLogEdits: edits.filter((e) => e.type === "APP_LOG").length,
      highPriorityCount: edits.filter((e) => e.priority === "HIGH").length,
      detectedStacks: stacks as Array<"cap" | "ui5">,
      auditLibraryDetected: auditIntegration.library,
      coverageWarnings,
    },
    edits,
  };
}

function deriveEntityFromDiffPath(p: string): string {
  const base = p.split("/").pop() ?? p;
  return base
    .replace(/\.js$/, "")
    .replace(/-service$/, "")
    .replace(/-handler$/, "");
}

// Re-export helper so server.ts can expose wrapper source
export { auditWrapperSource };
