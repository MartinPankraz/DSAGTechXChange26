/**
 * Tool: explain_suggestion
 * Returns expanded rationale, privacy guidance, BTP verification steps,
 * and alternative placements for a previously generated suggestion.
 */
import type { ExplainSuggestionInput, ExplainSuggestionOutput, SuggestionEdit } from "../types.js";
export declare function registerSuggestions(edits: SuggestionEdit[]): void;
export declare function clearRegistry(): void;
export declare function runExplainSuggestion(input: ExplainSuggestionInput): ExplainSuggestionOutput;
//# sourceMappingURL=explain-suggestion.d.ts.map