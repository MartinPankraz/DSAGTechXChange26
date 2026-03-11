/**
 * SAPUI5 detection logic.
 * Analyses file paths and content to identify SAPUI5 workspaces,
 * event handlers, OData call sites, and routing patterns.
 */

import type { FileNode, Evidence } from "../types.js";

// ─── UI5 Path Signals ────────────────────────────────────────────────────────

const UI5_PATH_PATTERNS = [
  /webapp\//,
  /controller\/.*\.controller\.js$/,
  /Component\.js$/,
  /manifest\.json$/,
  /ui5\.yaml$/,
  /xs-app\.json$/,
];

// ─── Controller Event Handler Patterns ───────────────────────────────────────

/** Lifecycle / action handler names typically found in UI5 controllers */
const UI5_HANDLER_NAMES = [
  "onInit",
  "onBeforeRendering",
  "onAfterRendering",
  "onExit",
  "onPress",
  "onSave",
  "onSubmit",
  "onDelete",
  "onSearch",
  "onNavigate",
  "onRouteMatched",
  "onFilterChange",
  "onExport",
  "onUpload",
  "onApprove",
  "onReject",
];

/** OData binding call patterns in UI5 controller code */
const ODATA_CALL_PATTERNS = [
  /submitChanges\s*\(/g,
  /oModel\.create\s*\(/g,
  /oModel\.update\s*\(/g,
  /oModel\.remove\s*\(/g,
  /oModel\.read\s*\(/g,
  /oModel\.callFunction\s*\(/g,
  /attachRequestFailed\s*\(/g,
  /attachRequestCompleted\s*\(/g,
  /bindingContext/g,
];

// ─── Detection Helpers ───────────────────────────────────────────────────────

/** Returns true when the path looks like a UI5 artifact */
export function isUi5File(path: string): boolean {
  return UI5_PATH_PATTERNS.some((re) => re.test(path));
}

/**
 * Returns true when content or path match manifest.json with sap.ui namespace.
 */
export function isUi5ManifestJson(path: string, content: string): boolean {
  if (!path.endsWith("manifest.json")) return false;
  try {
    const json = JSON.parse(content) as Record<string, unknown>;
    return "sap.ui" in json || "sap.app" in json || "sap.ui5" in json;
  } catch {
    return false;
  }
}

/**
 * Extracts defined handler method names from a controller file.
 */
export function extractUi5HandlerNames(content: string): string[] {
  const found: string[] = [];
  for (const name of UI5_HANDLER_NAMES) {
    if (new RegExp(`${name}\\s*:`).test(content)) {
      found.push(name);
    }
  }
  // Also pick up any pattern onXxx
  const customPattern = /\bon([A-Z][A-Za-z]+)\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = customPattern.exec(content)) !== null) {
    found.push(`on${m[1]}`);
  }
  return [...new Set(found)];
}

/**
 * Returns true when the controller file contains OData call patterns.
 */
export function hasODataCalls(content: string): boolean {
  return ODATA_CALL_PATTERNS.some((re) => {
    re.lastIndex = 0;
    return re.test(content);
  });
}

/**
 * Returns true when the manifest.json references an OData V2/V4 data source.
 */
export function manifestHasODataSource(content: string): boolean {
  try {
    const json = JSON.parse(content) as Record<string, unknown>;
    const sapApp = json["sap.app"] as
      | Record<string, Record<string, unknown>>
      | undefined;
    if (!sapApp?.dataSources) return false;
    for (const ds of Object.values(sapApp.dataSources)) {
      const dsTyped = ds as Record<string, unknown>;
      if (
        typeof dsTyped.type === "string" &&
        dsTyped.type.startsWith("OData")
      ) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

// ─── Main Analyser ───────────────────────────────────────────────────────────

export interface Ui5AnalysisResult {
  isUi5Workspace: boolean;
  controllerFiles: string[];
  handlerPatterns: string[];
  odataCallFiles: string[];
  manifestFiles: string[];
}

/**
 * Analyses an array of file nodes and returns a structured UI5 analysis result.
 */
export function analyseUi5Workspace(files: FileNode[]): Ui5AnalysisResult {
  const controllerFiles: string[] = [];
  const handlerPatternsFound: string[] = [];
  const odataCallFiles: string[] = [];
  const manifestFiles: string[] = [];
  let isUi5Workspace = false;

  for (const file of files) {
    if (!isUi5File(file.path)) continue;

    isUi5Workspace = true;

    if (file.path.endsWith(".controller.js")) {
      controllerFiles.push(file.path);
      const handlers = extractUi5HandlerNames(file.content);
      for (const h of handlers) {
        handlerPatternsFound.push(`${file.path}:${h}`);
      }
      if (hasODataCalls(file.content)) {
        odataCallFiles.push(file.path);
      }
    }

    if (isUi5ManifestJson(file.path, file.content)) {
      manifestFiles.push(file.path);
      isUi5Workspace = true;
    }

    if (file.path.endsWith("Component.js")) {
      isUi5Workspace = true;
    }
  }

  return {
    isUi5Workspace,
    controllerFiles,
    handlerPatterns: [...new Set(handlerPatternsFound)],
    odataCallFiles,
    manifestFiles,
  };
}

/**
 * Populate the shared Evidence object from UI5 analysis.
 */
export function buildUi5Evidence(
  result: Ui5AnalysisResult,
  evidence: Evidence
): void {
  evidence.ui5Files.push(...result.controllerFiles, ...result.manifestFiles);
  evidence.handlerPatterns.push(...result.handlerPatterns);
}
