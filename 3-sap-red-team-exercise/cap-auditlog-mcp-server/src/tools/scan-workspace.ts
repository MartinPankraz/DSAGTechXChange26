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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
 * When content is not provided (fileList only), the content is noted as unavailable
 * so path-based heuristics still run.
 */
function buildFileNodes(input: ScanWorkspaceInput): FileNode[] {
  const nodes: FileNode[] = [];

  if (input.openFiles) {
    for (const of_ of input.openFiles) {
      nodes.push({ path: of_.path, content: of_.content });
    }
  }

  if (input.fileList) {
    const existingPaths = new Set(nodes.map((n) => n.path));
    for (const p of input.fileList) {
      if (!existingPaths.has(p)) {
        // No content – path-only mode
        nodes.push({ path: p, content: "" });
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
