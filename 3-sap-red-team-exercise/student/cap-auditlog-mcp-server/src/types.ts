/**
 * Shared types and Zod schemas for the CAP Audit Log MCP Server.
 * All tool inputs/outputs are validated against these schemas.
 */

import { z } from "zod";

// ─── Stack Detection ────────────────────────────────────────────────────────

export type DetectedStack = "cap" | "ui5";

export const OpenFileSchema = z.object({
  path: z.string().describe("Relative or absolute file path"),
  content: z.string().describe("Full text content of the file"),
});
export type OpenFile = z.infer<typeof OpenFileSchema>;

export const AuditLibrary =
  z.enum(["@cap-js/audit-logging", "@sap/audit-logging", "none"]);
export type AuditLibrary = z.infer<typeof AuditLibrary>;

export const AuditIntegrationSchema = z.object({
  library: AuditLibrary,
  configuredInCdsRequires: z.boolean(),
  mtaResourcePresent: z.boolean(),
  vcapServicesUsed: z.boolean(),
  capPluginActive: z.boolean(),
  integrationGaps: z.array(z.string()),
});
export type AuditIntegration = z.infer<typeof AuditIntegrationSchema>;

export const EvidenceSchema = z.object({
  capFiles: z.array(z.string()),
  ui5Files: z.array(z.string()),
  packageJsonPaths: z.array(z.string()),
  handlerPatterns: z.array(z.string()),
  sensitiveEntities: z.array(z.string()),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

// ─── Suggestion Edit ────────────────────────────────────────────────────────

export const SuggestionTypeSchema = z.enum(["AUDIT_LOG", "APP_LOG"]);
export type SuggestionType = z.infer<typeof SuggestionTypeSchema>;

export const PrioritySchema = z.enum(["HIGH", "MEDIUM", "LOW"]);
export type Priority = z.infer<typeof PrioritySchema>;

export const WhatToLogSchema = z.object({
  actor: z.string().describe(
    "Who performed the action (user/principal, never raw token)"
  ),
  action: z.string().describe(
    "Business action name (e.g. 'READ', 'CREATE', 'EXPORT', 'LOGIN')"
  ),
  object: z.string().describe("Entity or resource type affected"),
  objectId: z.string().describe(
    "Safe identifier for the specific resource (no PII in id unless necessary)"
  ),
  outcome: z.enum(["success", "failure", "denied"]),
  tenant: z.string().describe(
    "Tenant/subdomain (from req.tenant or authInfo)"
  ),
  correlationId: z.string().describe(
    "Correlation ID from request header or generated UUID"
  ),
  additionalAttributes: z.record(z.string()).optional().describe(
    "Any extra safe fields (no secrets, no full payloads)"
  ),
});
export type WhatToLog = z.infer<typeof WhatToLogSchema>;

export const AnchorSchema = z.object({
  type: z.enum([
    "function_name",
    "pattern",
    "line_start",
    "after_require",
    "before_return",
  ]),
  value: z.string().describe(
    "Function name, regex pattern string, or line number string"
  ),
});
export type Anchor = z.infer<typeof AnchorSchema>;

export const CodeSnippetSchema = z.object({
  snippet: z.string().describe("The actual code to insert"),
  imports: z.array(z.string()).describe(
    "Import/require statements to add at the top of the file"
  ),
  setupNotes: z.array(z.string()).describe(
    "One-time setup steps needed (e.g. npm install, cds config)"
  ),
  wrapperNeeded: z.boolean().describe(
    "True if audit library is absent and a wrapper module must be created"
  ),
  wrapperPath: z.string().optional().describe(
    "Suggested path for the wrapper module if wrapperNeeded is true"
  ),
});
export type CodeSnippet = z.infer<typeof CodeSnippetSchema>;

export const PrivacyNoteSchema = z.object({
  piiFields: z.array(z.string()).describe(
    "Field names that may contain PII – must be masked or omitted"
  ),
  maskingAdvice: z.string(),
  legalBasis: z.string().optional().describe(
    "GDPR / DSGVO legal basis for logging this event"
  ),
});
export type PrivacyNote = z.infer<typeof PrivacyNoteSchema>;

export const ValidationStepsSchema = z.object({
  unitTestHint: z.string(),
  btpVerification: z.array(z.string()).describe(
    "Steps to verify the audit log appears in BTP Audit Log Viewer"
  ),
});
export type ValidationSteps = z.infer<typeof ValidationStepsSchema>;

export const SuggestionEditSchema = z.object({
  id: z.string().describe("Stable unique ID for this suggestion, e.g. AUD-001"),
  type: SuggestionTypeSchema,
  priority: PrioritySchema,
  file: z.string().describe(
    "Relative path to the file where the edit should be applied"
  ),
  anchor: AnchorSchema,
  line_hint: z.number().optional().describe(
    "Approximate 1-based line number as a hint; anchor is authoritative"
  ),
  why: z.string().describe(
    "Why this event must be logged – compliance / security reason"
  ),
  what_to_log: WhatToLogSchema,
  how: CodeSnippetSchema,
  privacy_notes: PrivacyNoteSchema,
  validation: ValidationStepsSchema,
  correlation: z.object({
    strategy: z.string(),
    headerName: z.string().optional(),
    capBinding: z.string().optional(),
  }),
  confidence: z.number().min(0).max(1).describe(
    "Confidence score 0..1 based on evidence strength"
  ),
  ui5BackendNote: z.string().optional().describe(
    "For UI5 files: note explaining that audit logging must happen in CAP backend"
  ),
});
export type SuggestionEdit = z.infer<typeof SuggestionEditSchema>;

// ─── Tool I/O ────────────────────────────────────────────────────────────────

export const ScanWorkspaceInputSchema = z.object({
  rootPath: z.string().optional().describe(
    "Absolute path to workspace root (optional when fileList or openFiles supplied)"
  ),
  fileList: z.array(z.string()).optional().describe(
    "Explicit list of relative file paths to analyse"
  ),
  openFiles: z.array(OpenFileSchema).optional().describe(
    "Files with their content already provided (avoids disk reads)"
  ),
});
export type ScanWorkspaceInput = z.infer<typeof ScanWorkspaceInputSchema>;

export const ScanWorkspaceOutputSchema = z.object({
  detectedStacks: z.array(z.enum(["cap", "ui5"])),
  evidence: EvidenceSchema,
  auditIntegration: AuditIntegrationSchema,
  recommendedNextSteps: z.array(z.string()),
});
export type ScanWorkspaceOutput = z.infer<typeof ScanWorkspaceOutputSchema>;

export const SuggestLoggingInputSchema = z.object({
  rootPath: z.string().optional().describe(
    "Absolute path to workspace root. When supplied without openFiles, the server " +
    "will crawl the directory automatically (skips node_modules, dist, .git)."
  ),
  fileTree: z.array(z.string()).optional().describe(
    "List of relative file paths present in the workspace"
  ),
  openFiles: z.array(OpenFileSchema).optional().describe(
    "Files with their content provided"
  ),
  diff: z.string().optional().describe(
    "Unified diff of recent changes to scope suggestions"
  ),
  focus: z.enum(["audit", "errors", "performance", "all"]).default("all"),
  maxSuggestions: z.number().int().positive().default(20),
});
export type SuggestLoggingInput = z.infer<typeof SuggestLoggingInputSchema>;

export const SuggestLoggingOutputSchema = z.object({
  summary: z.object({
    totalEdits: z.number(),
    auditLogEdits: z.number(),
    appLogEdits: z.number(),
    highPriorityCount: z.number(),
    detectedStacks: z.array(z.enum(["cap", "ui5"])),
    auditLibraryDetected: AuditLibrary,
    coverageWarnings: z.array(z.string()),
  }),
  edits: z.array(SuggestionEditSchema),
});
export type SuggestLoggingOutput = z.infer<typeof SuggestLoggingOutputSchema>;

export const ExplainSuggestionInputSchema = z.object({
  id: z.string().describe("The suggestion ID to explain, e.g. AUD-001"),
});
export type ExplainSuggestionInput = z.infer<
  typeof ExplainSuggestionInputSchema
>;

export const ExplainSuggestionOutputSchema = z.object({
  id: z.string(),
  expandedRationale: z.string(),
  privacyGuidance: z.string(),
  btpVerificationSteps: z.array(z.string()),
  alternativePlacements: z.array(
    z.object({
      file: z.string(),
      anchor: AnchorSchema,
      tradeoff: z.string(),
    })
  ),
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    })
  ),
});
export type ExplainSuggestionOutput = z.infer<
  typeof ExplainSuggestionOutputSchema
>;

// ─── Internal helpers ────────────────────────────────────────────────────────

export interface FileNode {
  path: string;
  content: string;
}

export interface AnalysisContext {
  stacks: DetectedStack[];
  auditIntegration: AuditIntegration;
  evidence: Evidence;
  files: FileNode[];
}
