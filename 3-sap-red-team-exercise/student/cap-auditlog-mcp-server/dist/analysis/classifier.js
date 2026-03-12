/**
 * Classifier: determines whether a code location requires AUDIT_LOG or APP_LOG,
 * and assigns priority, privacy notes, and generates code snippets.
 */
// ─── Classification Rules ────────────────────────────────────────────────────
/**
 * Events / patterns that MUST produce AUDIT_LOG (HIGH priority).
 */
const ALWAYS_AUDIT_EVENTS = new Set([
    "CREATE",
    "UPDATE",
    "DELETE",
    "UPSERT",
    "WRITE",
    "SAVE",
    "SUBMIT",
    "APPROVE",
    "REJECT",
    "ACTIVATE",
    "DEACTIVATE",
    "EXPORT",
    "DOWNLOAD",
    "UPLOAD",
    "IMPORT",
    "LOGIN",
    "LOGOUT",
    "ROLE_CHANGE",
    "PERMISSION_CHANGE",
    "CONFIG_CHANGE",
    "AUTH_DENIED",
    "ACCESS_DENIED",
    "SENSITIVE_READ",
]);
/** Phrases in why/context strings that trigger AUDIT_LOG classification */
const AUDIT_CONTEXT_KEYWORDS = [
    "personal data",
    "sensitive",
    "gdpr",
    "privacy",
    "compliance",
    "authorization",
    "permission",
    "role",
    "password",
    "credential",
    "token",
    "secret",
    "export",
    "access denied",
    "auth",
    "log",
    "audit",
];
/** Events that are APP_LOG only */
const APP_LOG_ONLY_EVENTS = new Set([
    "PERF",
    "TRACE",
    "DEBUG",
    "TIMING",
    "CACHE_HIT",
    "CACHE_MISS",
]);
/**
 * Classifies an event/context as AUDIT_LOG or APP_LOG with a priority.
 */
export function classify(input) {
    const upperEvent = input.event.toUpperCase();
    // UI5 files never directly write audit logs
    if (input.isUi5) {
        return {
            type: "APP_LOG",
            priority: "LOW",
            rationale: "UI5 frontend code must never call the Audit Log Service directly. " +
                "Suggest a backend action/endpoint in the CAP service layer.",
        };
    }
    if (APP_LOG_ONLY_EVENTS.has(upperEvent)) {
        return {
            type: "APP_LOG",
            priority: "LOW",
            rationale: `Event '${input.event}' is a performance/trace metric – APP_LOG is appropriate.`,
        };
    }
    if (ALWAYS_AUDIT_EVENTS.has(upperEvent)) {
        return {
            type: "AUDIT_LOG",
            priority: "HIGH",
            rationale: `Event '${input.event}' is a data-mutating or security-relevant operation that must be audit-logged for compliance (GDPR, SOX, DSGVO).`,
        };
    }
    // Entity-based classification
    if (input.entityName) {
        const lower = input.entityName.toLowerCase();
        if (/user|person|employee|customer|contact|payment|credit|role|auth|secret|salary|health|gdpr|personal/.test(lower)) {
            return {
                type: "AUDIT_LOG",
                priority: "HIGH",
                rationale: `Entity '${input.entityName}' likely contains personal or sensitive data – all access/mutation must be audit-logged.`,
            };
        }
    }
    // Context keyword scan
    if (input.context) {
        const lower = input.context.toLowerCase();
        if (AUDIT_CONTEXT_KEYWORDS.some((kw) => lower.includes(kw))) {
            return {
                type: "AUDIT_LOG",
                priority: "MEDIUM",
                rationale: `Context contains audit-relevant keywords – classifying as AUDIT_LOG to be safe.`,
            };
        }
    }
    return {
        type: "APP_LOG",
        priority: "MEDIUM",
        rationale: `No strong signals for mandatory audit logging. APP_LOG is sufficient for operational visibility.`,
    };
}
// ─── Snippet Generation ───────────────────────────────────────────────────────
/** Generate a WhatToLog template given event / entity context */
export function buildWhatToLog(event, entityName = "UnknownEntity", outcome = "success") {
    return {
        actor: "req.user?.id ?? 'anonymous'",
        action: event.toUpperCase(),
        object: entityName,
        objectId: "data?.ID ?? req.params?.[0] ?? 'unknown'",
        outcome,
        tenant: "req.tenant ?? 'default'",
        correlationId: "req.headers?.['x-correlation-id'] ?? req.headers?.['x-request-id'] ?? crypto.randomUUID()",
        additionalAttributes: {
            serviceMethod: `'${event}'`,
        },
    };
}
/** Returns the import statements required for the chosen audit library */
function importsForLibrary(library) {
    switch (library) {
        case "@cap-js/audit-logging":
            return [
                "// @cap-js/audit-logging is active as a CDS plugin – no explicit import needed.",
                "// Access via: const audit = cds.services['audit-log'] or use personalData annotations.",
            ];
        case "@sap/audit-logging":
            return [
                "const auditLogging = require('@sap/audit-logging');",
                "// Initialise once at service bootstrap:",
                "// const auditLog = await auditLogging.v2(process.env.VCAP_SERVICES /* or bound credentials */);",
            ];
        default:
            return [
                "// TODO: Install and configure an audit logging library.",
                "// Option A (preferred): npm install @cap-js/audit-logging",
                "// Option B: npm install @sap/audit-logging",
                "// See README for full setup checklist.",
            ];
    }
}
/** Generates the core audit log snippet for a CAP handler */
export function buildCapAuditSnippet(event, entityName, library, wrapperPath) {
    let snippet;
    let wrapperNeeded = false;
    if (library === "@cap-js/audit-logging") {
        // @cap-js/audit-logging integrates automatically for @PersonalData annotated entities.
        // For custom events, use the service API directly.
        snippet = `// ── Audit Log: ${event} on ${entityName} ──────────────────────────────
// @cap-js/audit-logging is active. For custom audit events:
const audit = await cds.connect.to('audit-log');
await audit.log('${entityName}', {
  object: {
    type: '${entityName}',
    id: { ID: data?.ID ?? req.params?.[0] ?? 'unknown' },
  },
  data_subject: {
    type: 'User',
    id: { ID: req.user?.id ?? 'anonymous' },
    role: 'DataSubject',
  },
  attributes: [
    // TODO: list only the fields actually accessed/mutated (no secrets, no full payloads)
    // { name: 'field1' }
  ],
  // outcome is inferred from whether an exception is thrown
});`;
    }
    else if (library === "@sap/audit-logging") {
        snippet = `// ── Audit Log: ${event} on ${entityName} ──────────────────────────────
// Requires: const auditLog = await auditLogging.v2(credentials);
const correlationId =
  req.headers?.['x-correlation-id'] ??
  req.headers?.['x-request-id'] ??
  crypto.randomUUID();

const message = auditLog
  .securityMessage('${event.toLowerCase()} performed on ${entityName}')
  .by(req.user?.id ?? 'anonymous')
  .tenant(req.tenant ?? 'default');

// Add data-access log if personal data is involved:
// const dataAccessLog = auditLog
//   .dataAccessLog()
//   .object({ type: '${entityName}', id: { ID: data?.ID ?? 'unknown' } })
//   .attributes([{ name: 'field1', new: '<value>', old: '<previous>' }])
//   .by(req.user?.id ?? 'anonymous');

message.externalId(correlationId);
await message.log();`;
    }
    else {
        wrapperNeeded = true;
        snippet = `// ── Audit Log: ${event} on ${entityName} ──────────────────────────────
// TODO: No audit library found. Install one first:
//   npm install @cap-js/audit-logging   ← preferred (CDS plugin, zero boilerplate)
//   npm install @sap/audit-logging      ← alternative (imperative API)
//
// Until then, use this local wrapper to avoid losing audit events:
const { writeAuditLog } = require('${wrapperPath}');
await writeAuditLog({
  actor:        req.user?.id ?? 'anonymous',
  action:       '${event.toUpperCase()}',
  object:       '${entityName}',
  objectId:     String(data?.ID ?? req.params?.[0] ?? 'unknown'),
  outcome:      'success',
  tenant:       req.tenant ?? 'default',
  correlationId:
    req.headers?.['x-correlation-id'] ??
    req.headers?.['x-request-id'] ??
    crypto.randomUUID(),
});`;
    }
    return {
        snippet,
        imports: importsForLibrary(library),
        setupNotes: library === "none"
            ? [
                "TODO-1: npm install @cap-js/audit-logging",
                "TODO-2: Add to package.json > cds > requires: { 'audit-log': { impl: '@cap-js/audit-logging' } }",
                "TODO-3: Add auditlog service resource to mta.yaml and bind (cf bind-service <app> <auditlog-instance>)",
                "TODO-4: Verify via BTP Audit Log Viewer or Audit Log Retrieval API",
            ]
            : [
                "Verify mta.yaml contains auditlog service resource and binding.",
                "In CF, run: cf bind-service <app-name> <auditlog-service-instance>",
                "Restage/redeploy the app after binding.",
            ],
        wrapperNeeded,
        wrapperPath: wrapperNeeded ? wrapperPath : undefined,
    };
}
/** Generates an APP_LOG snippet for a CAP handler */
export function buildCapAppLogSnippet(event, entityName) {
    return {
        snippet: `// ── APP_LOG: ${event} on ${entityName} ──────────────────────────────
const log = cds.log('${entityName.toLowerCase()}');
const start = Date.now();
// ... your business logic ...
log.info('${event} completed', {
  entity: '${entityName}',
  durationMs: Date.now() - start,
  tenant: req.tenant,
  // Do NOT log secrets, tokens, or full payload dumps
});`,
        imports: ["// cds.log is built-in – no additional import required."],
        setupNotes: [],
        wrapperNeeded: false,
    };
}
/** Privacy notes for a given entity and event */
export function buildPrivacyNote(entityName, event) {
    const potentiallyPersonal = /user|person|employee|customer|contact|salary|health/i.test(entityName);
    return {
        piiFields: potentiallyPersonal
            ? ["email", "name", "phoneNumber", "address", "salary"]
            : [],
        maskingAdvice: potentiallyPersonal
            ? `Fields such as email or name from '${entityName}' must NOT appear in audit log attribute values. ` +
                "Log only identifiers (IDs) and exclude sensitive field content. " +
                "Use @PersonalData.IsPotentiallySensitive annotations in your CDS model."
            : `Verify that no PII or secrets from '${entityName}' records are included in audit log attribute values.`,
        legalBasis: event === "READ" || event === "EXPORT"
            ? "GDPR Art. 6(1)(b) – processing necessary for contract performance; or Art. 6(1)(c) – legal obligation"
            : undefined,
    };
}
/** BTP verification steps */
export function buildValidationSteps(entityName, event) {
    return {
        unitTestHint: `In your unit test, mock the audit-log service and assert that \`audit.log\` is called with object.type === '${entityName}' and the correct action '${event}'.`,
        btpVerification: [
            "1. Deploy/run the app with audit-log service bound (cf bind-service).",
            `2. Trigger the '${event}' operation on '${entityName}' once.`,
            "3. Open BTP Cockpit → Services → Instances → Audit Log Service → 'Open Dashboard'.",
            "4. Filter by app GUID and time range; confirm the event appears.",
            "5. (Optional) Use Audit Log Retrieval API: GET /auditlog/v2/auditlogrecords?$filter=...",
        ],
    };
}
// ─── Suggestion ID counter ────────────────────────────────────────────────────
let _idCounter = 0;
export function resetIdCounter() {
    _idCounter = 0;
}
export function nextSuggestionId(type) {
    _idCounter += 1;
    const prefix = type === "AUDIT_LOG" ? "AUD" : "APP";
    return `${prefix}-${String(_idCounter).padStart(3, "0")}`;
}
/**
 * Builds a complete SuggestionEdit for a given code location.
 */
export function buildSuggestion(input) {
    const { file, event, entityName, lineHint, functionName, isUi5, auditIntegration } = input;
    const classification = classify({
        event,
        entityName,
        isUi5,
    });
    const id = nextSuggestionId(classification.type);
    const whatToLog = buildWhatToLog(event, entityName, event === "READ" || event === "EXPORT" ? "success" : "success");
    const wrapperPath = "./lib/audit-log-wrapper.js";
    const how = classification.type === "AUDIT_LOG"
        ? buildCapAuditSnippet(event, entityName, auditIntegration.library, wrapperPath)
        : buildCapAppLogSnippet(event, entityName);
    const privacyNotes = buildPrivacyNote(entityName, event);
    const validation = buildValidationSteps(entityName, event);
    const ui5BackendNote = isUi5
        ? `This event originates in a UI5 controller. The audit log MUST be written ` +
            `server-side in the CAP service handler that processes the corresponding ` +
            `OData request. Suggested backend location: srv/${entityName.toLowerCase()}-service.js ` +
            `in the handler for '${event}'.`
        : undefined;
    return {
        id,
        type: classification.type,
        priority: classification.priority,
        file,
        anchor: {
            type: "function_name",
            value: functionName,
        },
        line_hint: lineHint,
        why: classification.rationale,
        what_to_log: whatToLog,
        how,
        privacy_notes: privacyNotes,
        validation,
        correlation: {
            strategy: "Use x-correlation-id header if present (set by SAP BTP API Gateway / CAP framework). Fall back to crypto.randomUUID().",
            headerName: "x-correlation-id",
            capBinding: "req.headers?.['x-correlation-id'] ?? req.id",
        },
        confidence: isUi5 ? 0.7 : lineHint !== undefined ? 0.9 : 0.75,
        ui5BackendNote,
    };
}
// ─── Audit wrapper file content ───────────────────────────────────────────────
/**
 * Returns the source code for a minimal audit log wrapper module.
 * Used when no audit library is present.
 */
export function auditWrapperSource() {
    return `/**
 * Minimal audit log wrapper.
 * TODO: Replace this stub with @cap-js/audit-logging or @sap/audit-logging.
 *
 * Setup checklist:
 *   1. npm install @cap-js/audit-logging
 *   2. Add to package.json > cds > requires:
 *        "audit-log": { "impl": "@cap-js/audit-logging" }
 *   3. Add auditlog service resource to mta.yaml + cf bind-service
 *   4. Remove this file once the real library is configured.
 */
"use strict";

/**
 * @typedef {{ actor: string; action: string; object: string; objectId: string;
 *   outcome: 'success'|'failure'|'denied'; tenant: string; correlationId: string;
 *   [key: string]: unknown }} AuditEvent
 */

/**
 * Writes an audit event.
 * Currently logs to stderr as a structured JSON line (NOT a real audit trail).
 * Replace with a real audit library before going to production.
 *
 * @param {AuditEvent} event
 * @returns {Promise<void>}
 */
async function writeAuditLog(event) {
  // Safeguard: never include secrets, tokens, or full payloads
  const safeEvent = {
    timestamp: new Date().toISOString(),
    actor: String(event.actor ?? 'anonymous'),
    action: String(event.action),
    object: String(event.object),
    objectId: String(event.objectId),
    outcome: event.outcome,
    tenant: String(event.tenant ?? 'default'),
    correlationId: String(event.correlationId ?? ''),
  };
  // TODO: replace with real audit library call
  process.stderr.write('[AUDIT-STUB] ' + JSON.stringify(safeEvent) + '\\n');
}

module.exports = { writeAuditLog };
`;
}
//# sourceMappingURL=classifier.js.map