/**
 * Tool: explain_suggestion
 * Returns expanded rationale, privacy guidance, BTP verification steps,
 * and alternative placements for a previously generated suggestion.
 */

import type {
  ExplainSuggestionInput,
  ExplainSuggestionOutput,
  SuggestionEdit,
} from "../types.js";

// ─── In-memory registry ───────────────────────────────────────────────────────

/**
 * The server populates this registry after each suggest_logging call.
 * Maps suggestion ID → SuggestionEdit.
 */
const registry = new Map<string, SuggestionEdit>();

export function registerSuggestions(edits: SuggestionEdit[]): void {
  for (const edit of edits) {
    registry.set(edit.id, edit);
  }
}

export function clearRegistry(): void {
  registry.clear();
}

// ─── Static knowledge ─────────────────────────────────────────────────────────

const AUDIT_LOG_REFERENCES = [
  {
    title: "SAP CAP Audit Logging Plugin (@cap-js/audit-logging)",
    url: "https://cap.cloud.sap/docs/guides/data-privacy/audit-logging",
  },
  {
    title: "SAP BTP Audit Log Service Documentation",
    url: "https://help.sap.com/docs/btp/sap-btp-neo-environment/audit-log-overview",
  },
  {
    title: "@sap/audit-logging npm package",
    url: "https://www.npmjs.com/package/@sap/audit-logging",
  },
  {
    title: "GDPR Compliance with SAP BTP",
    url: "https://help.sap.com/docs/btp/sap-business-technology-platform/data-protection-and-privacy",
  },
  {
    title: "SAP CAP Personal Data Annotations",
    url: "https://cap.cloud.sap/docs/guides/data-privacy/",
  },
  {
    title: "Audit Log Retrieval API",
    url: "https://api.sap.com/api/CFAuditLogRetrievalAPI/overview",
  },
];

const APP_LOG_REFERENCES = [
  {
    title: "SAP CAP Logging with cds.log()",
    url: "https://cap.cloud.sap/docs/node.js/cds-log",
  },
  {
    title: "SAP BTP Application Logging Service",
    url: "https://help.sap.com/docs/application-logging-service/sap-application-logging-service/sap-application-logging-service-for-cloud-foundry-environment",
  },
];

// ─── Expanded rationale builder ───────────────────────────────────────────────

function buildExpandedRationale(edit: SuggestionEdit): string {
  const parts: string[] = [];

  parts.push(`## Suggestion ${edit.id} – ${edit.type} (${edit.priority} priority)`);
  parts.push("");
  parts.push(`**File:** \`${edit.file}\``);
  parts.push(`**Event / Action:** ${edit.what_to_log.action}`);
  parts.push(`**Entity:** ${edit.what_to_log.object}`);
  parts.push("");
  parts.push("### Why this matters");
  parts.push(edit.why);
  parts.push("");

  if (edit.type === "AUDIT_LOG") {
    parts.push("### Compliance context");
    parts.push(
      "Under GDPR (EU) / DSGVO (Germany), organisations must be able to demonstrate " +
        "lawful processing of personal data and maintain a record of processing activities (Art. 30 GDPR). " +
        "SAP BTP Audit Log Service provides a tamper-evident, centralised audit trail that satisfies " +
        "these requirements. Missing audit entries for data mutations or access events can lead to " +
        "regulatory findings and fines."
    );
    parts.push("");
    parts.push("### What the audit log entry must contain");
    parts.push(`- **Actor**: Who performed the action (user ID or service principal).`);
    parts.push(`- **Action**: The operation type (${edit.what_to_log.action}).`);
    parts.push(`- **Object**: The entity type (${edit.what_to_log.object}).`);
    parts.push(`- **ObjectId**: A stable, safe identifier for the specific record.`);
    parts.push(`- **Outcome**: success / failure / denied.`);
    parts.push(`- **Tenant**: The BTP subaccount / CF org subdomain.`);
    parts.push(`- **CorrelationId**: Propagated from x-correlation-id header.`);
    parts.push("");
  } else {
    parts.push("### Why APP_LOG is sufficient here");
    parts.push(
      "This location does not handle personal data mutation or security-relevant decisions. " +
        "Structured application logging (cds.log / console.log with JSON) is appropriate for " +
        "operational visibility, performance monitoring, and debugging."
    );
    parts.push("");
  }

  if (edit.ui5BackendNote) {
    parts.push("### ⚠️ UI5 frontend — backend action required");
    parts.push(edit.ui5BackendNote);
    parts.push("");
  }

  parts.push("### Correlation ID strategy");
  parts.push(edit.correlation.strategy);
  if (edit.correlation.capBinding) {
    parts.push(`CAP binding: \`${edit.correlation.capBinding}\``);
  }

  return parts.join("\n");
}

function buildPrivacyGuidance(edit: SuggestionEdit): string {
  const parts: string[] = [];
  const pn = edit.privacy_notes;

  parts.push("### Privacy / PII guidance");
  parts.push("");
  parts.push(pn.maskingAdvice);
  parts.push("");

  if (pn.piiFields.length > 0) {
    parts.push("**Potentially PII-bearing fields to mask or omit:**");
    for (const f of pn.piiFields) {
      parts.push(`  - \`${f}\`: do NOT log the value; log only the field name or a hash.`);
    }
    parts.push("");
  }

  parts.push("**Golden rules:**");
  parts.push("1. Never log passwords, tokens, API keys, or session cookies.");
  parts.push("2. Never log full request/response payloads – log only identifiers and counts.");
  parts.push("3. For names/emails: log only if the audit standard explicitly requires it, and mask to first letter (e.g. J*** D***e).");
  parts.push("4. Use @PersonalData.IsPotentiallySensitive in CDS annotations to let @cap-js/audit-logging handle masking automatically.");

  if (pn.legalBasis) {
    parts.push("");
    parts.push(`**Applicable legal basis:** ${pn.legalBasis}`);
  }

  return parts.join("\n");
}

// ─── Alternative placements ───────────────────────────────────────────────────

function buildAlternativePlacements(
  edit: SuggestionEdit
): ExplainSuggestionOutput["alternativePlacements"] {
  const alts: ExplainSuggestionOutput["alternativePlacements"] = [];

  if (edit.type === "AUDIT_LOG") {
    // Suggest a before() handler as an alternative
    alts.push({
      file: edit.file,
      anchor: {
        type: "pattern",
        value: `this\\.before\\(['"\`]${edit.what_to_log.action}['"\`]`,
      },
      tradeoff:
        "Logging in a before() handler fires even when the operation fails. " +
          "Use outcome:'pending' and update to 'failure' in a catch block. " +
          "Preferred for pre-check audit events (e.g., access denied scenarios).",
    });

    // Suggest after() handler
    alts.push({
      file: edit.file,
      anchor: {
        type: "pattern",
        value: `this\\.after\\(['"\`]${edit.what_to_log.action}['"\`]`,
      },
      tradeoff:
        "Logging in an after() handler fires only on success. " +
          "Simple but means failed operations are not logged unless error handling also emits an audit event.",
    });

    // If UI5-origin, suggest backend srv/ file
    if (edit.ui5BackendNote) {
      const entity = edit.what_to_log.object.toLowerCase();
      alts.push({
        file: `srv/${entity}-service.js`,
        anchor: {
          type: "function_name",
          value: `on${edit.what_to_log.action.charAt(0)}${edit.what_to_log.action.slice(1).toLowerCase()}${edit.what_to_log.object}`,
        },
        tradeoff:
          "Primary recommended location – audit logging in the CAP handler that " +
            "performs the actual data operation ensures the log is closest to the data mutation.",
      });
    }
  } else {
    // APP_LOG alternatives
    alts.push({
      file: edit.file,
      anchor: { type: "after_require", value: "require" },
      tradeoff:
        "Add the log call at module level if you want startup / initialisation diagnostics.",
    });
  }

  return alts;
}

// ─── Main tool function ───────────────────────────────────────────────────────

export function runExplainSuggestion(
  input: ExplainSuggestionInput
): ExplainSuggestionOutput {
  const edit = registry.get(input.id);

  if (!edit) {
    // Return a helpful error payload rather than throwing
    return {
      id: input.id,
      expandedRationale: `Suggestion '${input.id}' not found in the current session registry. ` +
        "Run suggest_logging first to populate suggestions, then call explain_suggestion with one of the returned IDs.",
      privacyGuidance:
        "No suggestion found. Run suggest_logging to generate suggestion IDs.",
      btpVerificationSteps: [],
      alternativePlacements: [],
      references: AUDIT_LOG_REFERENCES,
    };
  }

  const expandedRationale = buildExpandedRationale(edit);
  const privacyGuidance = buildPrivacyGuidance(edit);
  const btpVerificationSteps = edit.validation.btpVerification;
  const alternativePlacements = buildAlternativePlacements(edit);

  const references =
    edit.type === "AUDIT_LOG"
      ? AUDIT_LOG_REFERENCES
      : APP_LOG_REFERENCES;

  return {
    id: input.id,
    expandedRationale,
    privacyGuidance,
    btpVerificationSteps,
    alternativePlacements,
    references,
  };
}
