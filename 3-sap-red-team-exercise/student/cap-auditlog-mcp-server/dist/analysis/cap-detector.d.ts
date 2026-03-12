/**
 * CAP (Cloud Application Programming Model) detection logic.
 * Analyses file paths and content to identify SAP CAP Node.js workspaces
 * and extract service handlers, sensitive entities, and outbound call patterns.
 */
import type { FileNode, Evidence } from "../types.js";
/**
 * Returns true when the parsed package.json content contains a CAP dependency.
 */
export declare function packageJsonHasCap(content: string): boolean;
/** Returns true for files that look like CDS service implementation files */
export declare function isCapServiceFile(path: string, content: string): boolean;
/**
 * Extracts handler event names from a CAP service file, e.g. "CREATE", "READ".
 */
export declare function extractCapHandlerEvents(content: string): string[];
/**
 * Extracts entity names referenced in handler calls.
 * e.g. this.on('CREATE', 'Orders', ...) → 'Orders'
 */
export declare function extractCapEntityNames(content: string): string[];
/**
 * Returns true when the entity name matches any sensitive pattern.
 */
export declare function isSensitiveEntity(entityName: string): boolean;
/**
 * Checks whether a handler event should be treated as audit-relevant.
 */
export declare function isAuditRelevantEvent(event: string): boolean;
/**
 * Detects outbound call patterns in a file.
 */
export declare function detectOutboundCalls(content: string): string[];
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
export declare function analyseCapWorkspace(files: FileNode[]): CapAnalysisResult;
/**
 * Populate the shared Evidence object from CAP analysis.
 */
export declare function buildCapEvidence(result: CapAnalysisResult, files: FileNode[], evidence: Evidence): void;
//# sourceMappingURL=cap-detector.d.ts.map