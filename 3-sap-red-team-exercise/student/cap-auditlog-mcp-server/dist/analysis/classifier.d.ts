/**
 * Classifier: determines whether a code location requires AUDIT_LOG or APP_LOG,
 * and assigns priority, privacy notes, and generates code snippets.
 */
import type { AuditIntegration, AuditLibrary, CodeSnippet, PrivacyNote, Priority, SuggestionEdit, SuggestionType, ValidationSteps, WhatToLog } from "../types.js";
export interface ClassificationInput {
    event: string;
    entityName?: string;
    context?: string;
    isUi5?: boolean;
}
export interface ClassificationResult {
    type: SuggestionType;
    priority: Priority;
    rationale: string;
}
/**
 * Classifies an event/context as AUDIT_LOG or APP_LOG with a priority.
 */
export declare function classify(input: ClassificationInput): ClassificationResult;
/** Generate a WhatToLog template given event / entity context */
export declare function buildWhatToLog(event: string, entityName?: string, outcome?: WhatToLog["outcome"]): WhatToLog;
/** Generates the core audit log snippet for a CAP handler */
export declare function buildCapAuditSnippet(event: string, entityName: string, library: AuditLibrary, wrapperPath: string): CodeSnippet;
/** Generates an APP_LOG snippet for a CAP handler */
export declare function buildCapAppLogSnippet(event: string, entityName: string): CodeSnippet;
/** Privacy notes for a given entity and event */
export declare function buildPrivacyNote(entityName: string, event: string): PrivacyNote;
/** BTP verification steps */
export declare function buildValidationSteps(entityName: string, event: string): ValidationSteps;
export declare function resetIdCounter(): void;
export declare function nextSuggestionId(type: SuggestionType): string;
export interface SuggestionInput {
    file: string;
    event: string;
    entityName: string;
    lineHint?: number;
    functionName: string;
    isUi5?: boolean;
    auditIntegration: AuditIntegration;
}
/**
 * Builds a complete SuggestionEdit for a given code location.
 */
export declare function buildSuggestion(input: SuggestionInput): SuggestionEdit;
/**
 * Returns the source code for a minimal audit log wrapper module.
 * Used when no audit library is present.
 */
export declare function auditWrapperSource(): string;
//# sourceMappingURL=classifier.d.ts.map