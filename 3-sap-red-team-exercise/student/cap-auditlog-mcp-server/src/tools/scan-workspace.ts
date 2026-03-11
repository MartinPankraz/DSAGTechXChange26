/**
 * Tool: scan_workspace
 * Detects which SAP stacks (CAP / UI5) exist in a workspace and assesses
 * the current state of audit log integration.
 */

import type {
  AnalysisContext,
  Evidence,
  FileNode,
  ScanWorkspaceInput,
  ScanWorkspaceOutput,
} from "../types.js";
import {
  analyseCapWorkspace,
  buildCapEvidence,
} from "../analysis/cap-detector.js";
import {
  analyseUi5Workspace,
  buildUi5Evidence,
} from "../analysis/ui5-detector.js";
import { detectAuditIntegration } from "../analysis/audit-integration-detector.js";
import { crawlToFileNodes } from "../analysis/fs-crawler.js";
import * as fs from "node:fs";
import * as path from "node:path";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Config files that must always be read from rootPath (if present on disk)
 * and merged with any caller-supplied openFiles, so detectors like
 * hasMtaAuditLogResource() never miss them even when openFiles is provided.
 */
const ALWAYS_MERGE_FROM_ROOT = [
  "mta.yaml",
  "mta.yml",
  ".cdsrc.json",
  "xs-security.json",
  "package.json",
];

function makeEmptyEvidence(): Evidence {
  return {
    capFiles: [],
    ui5Files: [],
    packageJsonPaths: [],
    handlerPatterns: [],
    sensitiveEntities: [],
  };
}

/**
 * Converts the raw input into a list of FileNode objects.
 *
 * Priority order:
 *  1. openFiles  – caller already provided content (fastest, used by Copilot)
 *  2. fileList   – explicit relative paths; content is read from rootPath if given
 *  3. rootPath   – full filesystem crawl when no files are provided at all
 *
 * Additionally, when rootPath is provided it always supplements the node list
 * with key configuration files (mta.yaml, package.json, etc.) that detectors
 * rely on, even when openFiles was already supplied.  This prevents false-positive
 * gap reports when a caller passes only source files but omits config files.
 */
function buildFileNodes(input: ScanWorkspaceInput): FileNode[] {
  const nodes: FileNode[] = [];

  // 1. Caller-supplied files with content (highest priority)
  if (input.openFiles) {
    for (const of_ of input.openFiles) {
      nodes.push({ path: of_.path, content: of_.content });
    }
  }

  // 2. Explicit path list (content = "" for path-only heuristics)
  if (input.fileList) {
    const existingPaths = new Set(nodes.map((n) => n.path));
    for (const p of input.fileList) {
      if (!existingPaths.has(p)) {
        nodes.push({ path: p, content: "" });
      }
    }
  }

  // 3. Full crawl – only when nothing was supplied via openFiles / fileList
  if (nodes.length === 0 && input.rootPath) {
    const crawled = crawlToFileNodes(input.rootPath);
    nodes.push(...crawled);
    return nodes;
  }

  // 4. Always merge key config files from rootPath, even when openFiles was given.
  //    This ensures mta.yaml, .cdsrc.json etc. are never silently missing.
  if (input.rootPath) {
    const existingPaths = new Set(nodes.map((n) => n.path));
    for (const fileName of ALWAYS_MERGE_FROM_ROOT) {
      const absPath = path.join(input.rootPath, fileName);
      // Use relative path (just the filename) to match detector patterns
      if (!existingPaths.has(fileName) && fs.existsSync(absPath)) {
        try {
          const content = fs.readFileSync(absPath, "utf-8");
          nodes.push({ path: fileName, content });
        } catch {
          // If the file can't be read, skip silently
        }
      }
    }
  }

  return nodes;
}

// ─── Recommended next steps builder ──────────────────────────────────────────

function buildRecommendedNextSteps(ctx: AnalysisContext): string[] {
  const steps: string[] = [];
  const { stacks, auditIntegration } = ctx;

  if (!stacks.includes("cap") && !stacks.includes("ui5")) {
    steps.push(
      "No SAP CAP or UI5 workspace detected. " +
        "Provide openFiles with content or a fileList that includes package.json, *.cds, or webapp/ files."
    );
    return steps;
  }

  if (stacks.includes("cap")) {
    steps.push("CAP workspace detected. Run suggest_logging to get targeted audit log insertion points.");

    if (auditIntegration.library === "none") {
      steps.push(
        "ACTION REQUIRED: Install @cap-js/audit-logging → npm install @cap-js/audit-logging"
      );
      steps.push(
        "ACTION REQUIRED: Add CDS plugin config to package.json:\n" +
          '  "cds": { "requires": { "audit-log": { "impl": "@cap-js/audit-logging" } } }'
      );
    }

    if (!auditIntegration.mtaResourcePresent) {
      steps.push(
        "Add auditlog managed service resource to mta.yaml and bind it to your app module."
      );
    }

    if (!auditIntegration.configuredInCdsRequires && auditIntegration.library !== "none") {
      steps.push(
        "Configure audit-log in cds.requires section of package.json or .cdsrc.json."
      );
    }
  }

  if (stacks.includes("ui5")) {
    steps.push(
      "UI5 workspace detected. Note: audit logging must NEVER be done from UI5 frontend code. " +
        "All audit events must be emitted in CAP backend handlers."
    );

    if (!stacks.includes("cap")) {
      steps.push(
        "No companion CAP backend detected in this workspace. " +
          "Ensure your UI5 app calls a CAP backend action, and add audit logging there."
      );
    }
  }

  if (auditIntegration.integrationGaps.length > 0) {
    for (const gap of auditIntegration.integrationGaps) {
      steps.push(`GAP: ${gap}`);
    }
  }

  return steps;
}

// ─── Main tool function ───────────────────────────────────────────────────────

export function runScanWorkspace(input: ScanWorkspaceInput): ScanWorkspaceOutput {
  const files = buildFileNodes(input);
  const evidence = makeEmptyEvidence();

  const capResult = analyseCapWorkspace(files);
  const ui5Result = analyseUi5Workspace(files);
  const auditIntegration = detectAuditIntegration(files);

  buildCapEvidence(capResult, files, evidence);
  buildUi5Evidence(ui5Result, evidence);

  const stacks: Array<"cap" | "ui5"> = [];
  if (capResult.isCapWorkspace) stacks.push("cap");
  if (ui5Result.isUi5Workspace) stacks.push("ui5");

  const ctx: AnalysisContext = {
    stacks,
    auditIntegration,
    evidence,
    files,
  };

  const recommendedNextSteps = buildRecommendedNextSteps(ctx);

  return {
    detectedStacks: stacks,
    evidence,
    auditIntegration,
    recommendedNextSteps,
  };
}
