/**
 * SAPUI5 detection logic.
 * Analyses file paths and content to identify SAPUI5 workspaces,
 * event handlers, OData call sites, and routing patterns.
 */
import type { FileNode, Evidence } from "../types.js";
/** Returns true when the path looks like a UI5 artifact */
export declare function isUi5File(path: string): boolean;
/**
 * Returns true when content or path match manifest.json with sap.ui namespace.
 */
export declare function isUi5ManifestJson(path: string, content: string): boolean;
/**
 * Extracts defined handler method names from a controller file.
 */
export declare function extractUi5HandlerNames(content: string): string[];
/**
 * Returns true when the controller file contains OData call patterns.
 */
export declare function hasODataCalls(content: string): boolean;
/**
 * Returns true when the manifest.json references an OData V2/V4 data source.
 */
export declare function manifestHasODataSource(content: string): boolean;
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
export declare function analyseUi5Workspace(files: FileNode[]): Ui5AnalysisResult;
/**
 * Populate the shared Evidence object from UI5 analysis.
 */
export declare function buildUi5Evidence(result: Ui5AnalysisResult, evidence: Evidence): void;
//# sourceMappingURL=ui5-detector.d.ts.map