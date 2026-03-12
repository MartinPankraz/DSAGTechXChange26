/**
 * CAP (Cloud Application Programming Model) detection logic.
 * Analyses file paths and content to identify SAP CAP Node.js workspaces
 * and extract service handlers, sensitive entities, and outbound call patterns.
 */

import type { FileNode, Evidence } from "../types.js";

// ─── Patterns ────────────────────────────────────────────────────────────────

/** Patterns that indicate a CAP Node.js project */
const CAP_PKG_DEPS = [
  "@sap/cds",
  "@sap/cds-dk",
  "@cap-js/sqlite",
  "@cap-js/hana",
];

/** Handler registration patterns in service implementations */
const CAP_HANDLER_PATTERNS = [
  /this\.(on|before|after)\s*\(/g,
  /cds\.service\.impl/g,
  /module\.exports\s*=\s*cds\.service\.impl/g,
  /srv\.(on|before|after)\s*\(/g,
];

// Outbound call label reference (informational, consumed by detectOutboundCalls)
void 0; // intentional – labels are embedded in detectOutboundCalls below

/** CDS event names that are security/audit-relevant */
const AUDIT_RELEVANT_EVENTS = new Set([
  "CREATE",
  "UPDATE",
  "DELETE",
  "UPSERT",
  "READ",
  "login",
  "logout",
  "activate",
  "deactivate",
  "approve",
  "reject",
  "export",
  "import",
  "upload",
  "download",
]);

/** CDS entity name fragments that suggest sensitive/personal data */
const SENSITIVE_ENTITY_PATTERNS = [
  /user|person|employee|customer|contact|account/i,
  /payment|credit|invoice|order|contract/i,
  /audit|log|trail|event/i,
  /role|permission|authorization|auth/i,
  /password|secret|credential|token|key/i,
  /salary|compensation|benefit/i,
  /health|medical|diagnosis/i,
  /gdpr|privacy|consent|personal/i,
];

// ─── Detection Helpers ───────────────────────────────────────────────────────

/**
 * Returns true when the parsed package.json content contains a CAP dependency.
 */
export function packageJsonHasCap(content: string): boolean {
  try {
    const pkg = JSON.parse(content) as Record<
      string,
      Record<string, string> | unknown
    >;
    const deps = {
      ...(pkg["dependencies"] as Record<string, string> | undefined ?? {}),
      ...(pkg["devDependencies"] as Record<string, string> | undefined ?? {}),
    };
    return CAP_PKG_DEPS.some((dep) => dep in deps);
  } catch {
    return false;
  }
}

/** Returns true for files that look like CDS service implementation files */
export function isCapServiceFile(path: string, content: string): boolean {
  const looksLikeSrvFile =
    /\/srv\//.test(path) ||
    path.endsWith("-service.js") ||
    path.endsWith("-service.cds") ||
    path.endsWith(".service.js");

  const hasHandlers = CAP_HANDLER_PATTERNS.some((re) => {
    re.lastIndex = 0;
    return re.test(content);
  });

  return looksLikeSrvFile || hasHandlers;
}

/**
 * Extracts handler event names from a CAP service file, e.g. "CREATE", "READ".
 */
export function extractCapHandlerEvents(content: string): string[] {
  const events: string[] = [];
  // Match: this.on('CREATE', ...) or this.before("UPDATE", ...)
  const eventPattern =
    /this\.(on|before|after)\s*\(\s*['"`]([A-Za-z_]+)['"`]/g;
  let m: RegExpExecArray | null;
  while ((m = eventPattern.exec(content)) !== null) {
    events.push(m[2]);
  }
  return [...new Set(events)];
}

/**
 * Extracts entity names referenced in handler calls.
 * e.g. this.on('CREATE', 'Orders', ...) → 'Orders'
 */
export function extractCapEntityNames(content: string): string[] {
  const entities: string[] = [];
  const entityPattern =
    /this\.(on|before|after)\s*\(\s*['"`][A-Za-z_]+['"`]\s*,\s*['"`]([A-Za-z_.]+)['"`]/g;
  let m: RegExpExecArray | null;
  while ((m = entityPattern.exec(content)) !== null) {
    entities.push(m[2]);
  }
  return [...new Set(entities)];
}

/**
 * Returns true when the entity name matches any sensitive pattern.
 */
export function isSensitiveEntity(entityName: string): boolean {
  return SENSITIVE_ENTITY_PATTERNS.some((re) => re.test(entityName));
}

/**
 * Checks whether a handler event should be treated as audit-relevant.
 */
export function isAuditRelevantEvent(event: string): boolean {
  return AUDIT_RELEVANT_EVENTS.has(event);
}

/**
 * Detects outbound call patterns in a file.
 */
export function detectOutboundCalls(content: string): string[] {
  const found: string[] = [];
  if (/cds\.connect\.to/.test(content)) found.push("cds.connect.to");
  if (/axios\.(get|post|put|patch|delete)/.test(content)) found.push("axios");
  if (/http-client|HttpClient/.test(content)) found.push("sap-cloud-sdk");
  if (/fetch\s*\(/.test(content)) found.push("fetch");
  return found;
}

// ─── Main Analyser ───────────────────────────────────────────────────────────

export interface CapAnalysisResult {
  isCapWorkspace: boolean;
  serviceFiles: string[];
  handlerPatterns: string[];
  sensitiveEntities: string[];
  outboundCallFiles: string[];
}

/**
 * Analyses an array of file nodes and returns a structured CAP analysis result.
 */
export function analyseCapWorkspace(files: FileNode[]): CapAnalysisResult {
  const serviceFiles: string[] = [];
  const handlerPatternsFound: string[] = [];
  const sensitiveEntitiesFound: string[] = [];
  const outboundCallFiles: string[] = [];
  let isCapWorkspace = false;

  for (const file of files) {
    // Detect via package.json
    if (
      (file.path.endsWith("package.json") ||
        file.path.endsWith("package.json")) &&
      packageJsonHasCap(file.content)
    ) {
      isCapWorkspace = true;
    }

    // Detect via .cds files
    if (file.path.endsWith(".cds")) {
      isCapWorkspace = true;
    }

    // Detect via service implementation
    if (isCapServiceFile(file.path, file.content)) {
      isCapWorkspace = true;
      serviceFiles.push(file.path);

      const events = extractCapHandlerEvents(file.content);
      for (const ev of events) {
        handlerPatternsFound.push(`${file.path}:${ev}`);
      }

      const entities = extractCapEntityNames(file.content);
      for (const entity of entities) {
        if (isSensitiveEntity(entity)) {
          sensitiveEntitiesFound.push(entity);
        }
      }
    }

    // Outbound calls
    const calls = detectOutboundCalls(file.content);
    if (calls.length > 0) {
      outboundCallFiles.push(file.path);
    }
  }

  return {
    isCapWorkspace,
    serviceFiles,
    handlerPatterns: [...new Set(handlerPatternsFound)],
    sensitiveEntities: [...new Set(sensitiveEntitiesFound)],
    outboundCallFiles,
  };
}

/**
 * Populate the shared Evidence object from CAP analysis.
 */
export function buildCapEvidence(
  result: CapAnalysisResult,
  files: FileNode[],
  evidence: Evidence
): void {
  evidence.capFiles.push(...result.serviceFiles);
  evidence.handlerPatterns.push(...result.handlerPatterns);
  evidence.sensitiveEntities.push(...result.sensitiveEntities);

  for (const file of files) {
    if (file.path.endsWith("package.json")) {
      evidence.packageJsonPaths.push(file.path);
    }
  }
}
