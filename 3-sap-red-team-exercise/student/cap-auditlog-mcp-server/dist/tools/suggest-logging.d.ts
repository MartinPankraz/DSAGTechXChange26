/**
 * Tool: suggest_logging
 * Analyses CAP and UI5 source files and produces actionable SuggestionEdits
 * for adding AUDIT_LOG and APP_LOG instrumentation.
 */
import type { SuggestLoggingInput, SuggestLoggingOutput } from "../types.js";
import { auditWrapperSource } from "../analysis/classifier.js";
export declare function runSuggestLogging(input: SuggestLoggingInput): SuggestLoggingOutput;
export { auditWrapperSource };
//# sourceMappingURL=suggest-logging.d.ts.map