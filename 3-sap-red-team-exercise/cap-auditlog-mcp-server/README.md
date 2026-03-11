# CAP Audit Log MCP Server

An MCP (Model Context Protocol) server that helps developers instrument SAP CAP (Node.js) and SAPUI5 applications with compliant audit logging targeting **SAP BTP Audit Log Service**.

---

## Features

| Capability | Detail |
|---|---|
| **Stack detection** | Detects SAP CAP (Node.js) and SAPUI5 workspaces from `package.json`, `*.cds`, `srv/*.js`, `webapp/`, `manifest.json` |
| **AUDIT_LOG suggestions** | Generates code snippets for BTP Audit Log Service using `@cap-js/audit-logging` (preferred), `@sap/audit-logging`, or a local stub wrapper |
| **APP_LOG suggestions** | Generates `cds.log()` instrumentation for operational/performance logging |
| **UI5 guard** | UI5 controllers never get direct audit log code – the server redirects to the CAP backend handler |
| **Gap detection** | Identifies missing library, missing mta.yaml binding, missing VCAP_SERVICES wiring |
| **Privacy enforcement** | All suggestions mask PII fields and include GDPR/DSGVO guidance |
| **Correlation IDs** | Every audit snippet propagates `x-correlation-id` from the request header |

---

## Repository Layout

```
cap-auditlog-mcp-server/
├── package.json              # Node.js dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── README.md                 # This file
├── src/
│   ├── server.ts             # MCP server bootstrap (stdio transport)
│   ├── types.ts              # Zod schemas and TypeScript interfaces
│   ├── analysis/
│   │   ├── cap-detector.ts           # CAP workspace detection & handler extraction
│   │   ├── ui5-detector.ts           # UI5 workspace detection & handler extraction
│   │   ├── audit-integration-detector.ts  # Library / mta / VCAP gap detection
│   │   └── classifier.ts             # AUDIT_LOG vs APP_LOG classification & snippet generation
│   └── tools/
│       ├── scan-workspace.ts         # Tool: scan_workspace
│       ├── suggest-logging.ts        # Tool: suggest_logging
│       └── explain-suggestion.ts     # Tool: explain_suggestion
└── example/
    ├── mock-workspace/               # Sample CAP+UI5 app without audit logging
    │   ├── package.json
    │   ├── srv/employee-service.js
    │   └── webapp/
    │       ├── manifest.json
    │       └── controller/Employees.controller.js
    ├── inputs/
    │   ├── scan-workspace-input.json
    │   ├── suggest-logging-input.json
    │   └── explain-suggestion-input.json
    └── outputs/
        ├── scan-workspace-output.json
        ├── suggest-logging-output.json
        └── explain-suggestion-output.json
```

---

## Prerequisites

- **Node.js ≥ 18** (`node --version`)
- **npm ≥ 9**

---

## Install and Build

```bash
# From the cap-auditlog-mcp-server directory
npm install
npm run build
```

The compiled output is placed in `dist/`.

---

## Run

### Production (compiled)

```bash
npm start
# or
node dist/server.js
```

### Development (ts-node/tsx, no build step)

```bash
npm run dev
# or
npx tsx src/server.ts
```

The server listens on **stdio** (stdin/stdout) as required by the MCP protocol.  
All internal diagnostics are written to **stderr** so they never pollute the MCP channel.

---

## Configure VS Code as MCP Client

Add the server to your VS Code MCP configuration (`.vscode/mcp.json` or user-level `settings.json`):

### Option A – `.vscode/mcp.json` (workspace-scoped, recommended)

```jsonc
{
  "servers": {
    "cap-auditlog": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/path/to/cap-auditlog-mcp-server/dist/server.js"],
      "env": {}
    }
  }
}
```

### Option B – VS Code `settings.json` (user-level)

```jsonc
"mcp": {
  "servers": {
    "cap-auditlog": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/cap-auditlog-mcp-server/dist/server.js"]
    }
  }
}
```

### Option C – Development mode (tsx, no build needed)

```jsonc
{
  "servers": {
    "cap-auditlog-dev": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "${workspaceFolder}/path/to/cap-auditlog-mcp-server/src/server.ts"]
    }
  }
}
```

After saving, VS Code will start the server automatically when GitHub Copilot (or another MCP client) is active. You should see `cap-auditlog` listed under **MCP Servers** in the Copilot panel.

---

## MCP Tools Reference

### `scan_workspace`

Detects which SAP stacks exist and assesses audit integration maturity.

**Input:**
```json
{
  "openFiles": [
    { "path": "package.json", "content": "..." },
    { "path": "srv/my-service.js", "content": "..." }
  ]
}
```

**Output fields:**
- `detectedStacks`: `["cap"]`, `["ui5"]`, or `["cap","ui5"]`
- `evidence`: files found, handler patterns, sensitive entities
- `auditIntegration`: library detected, gaps
- `recommendedNextSteps`: prioritised action items

---

### `suggest_logging`

Produces patch-like `SuggestionEdit` objects for each detected handler location.

**Input:**
```json
{
  "openFiles": [
    { "path": "srv/order-service.js", "content": "..." }
  ],
  "focus": "audit",
  "maxSuggestions": 10
}
```

**Focus values:** `"audit"` | `"errors"` | `"performance"` | `"all"` (default)

**Key output fields per edit:**
| Field | Description |
|---|---|
| `id` | Stable ID, e.g. `AUD-001` |
| `type` | `AUDIT_LOG` or `APP_LOG` |
| `priority` | `HIGH` / `MEDIUM` / `LOW` |
| `file` | Relative path of the file to edit |
| `anchor` | How to find the insertion point (`function_name`, `pattern`, `line_start`, etc.) |
| `line_hint` | Approximate 1-based line number |
| `why` | Compliance rationale |
| `what_to_log` | Structured fields: actor, action, object, objectId, outcome, tenant, correlationId |
| `how.snippet` | Ready-to-paste code |
| `how.imports` | Import/require lines to add at file top |
| `how.setupNotes` | One-time setup steps (npm install, cf bind-service) |
| `how.wrapperNeeded` | `true` if no audit library found – create `./lib/audit-log-wrapper.js` |
| `privacy_notes` | PII fields, masking advice, GDPR legal basis |
| `validation.btpVerification` | Step-by-step BTP Audit Log Viewer verification |

---

### `explain_suggestion`

Returns expanded rationale and alternative placements for a suggestion ID.  
**Must call `suggest_logging` first** to populate the session registry.

**Input:**
```json
{ "id": "AUD-001" }
```

**Output:**
- `expandedRationale`: Markdown, full compliance story
- `privacyGuidance`: PII masking rules, golden rules
- `btpVerificationSteps`: How to confirm the log appears in BTP
- `alternativePlacements`: `before()` vs `on()` vs `after()` tradeoffs
- `references`: SAP documentation links

---

## Example Walkthrough

### Step 1 – Scan

Ask Copilot (or any MCP client):

> **"Scan my workspace for audit logging gaps"**

The client sends:
```json
{
  "tool": "scan_workspace",
  "arguments": {
    "openFiles": [
      { "path": "package.json", "content": "{ \"dependencies\": { \"@sap/cds\": \"^8\" } }" },
      { "path": "srv/orders.js", "content": "this.on('CREATE','Orders', async req => { ... })" }
    ]
  }
}
```

Expected response highlights:
```
detectedStacks: ["cap"]
integrationGaps: ["No audit logging library detected…"]
recommendedNextSteps: ["ACTION REQUIRED: npm install @cap-js/audit-logging", ...]
```

### Step 2 – Suggest

> **"Suggest audit logging for my open CAP service file"**

```json
{
  "tool": "suggest_logging",
  "arguments": {
    "openFiles": [{ "path": "srv/orders.js", "content": "..." }],
    "focus": "audit"
  }
}
```

Apply the returned `how.snippet` at the location given by `anchor` in `file`.

### Step 3 – Explain

> **"Explain suggestion AUD-001"**

```json
{
  "tool": "explain_suggestion",
  "arguments": { "id": "AUD-001" }
}
```

Read the `btpVerificationSteps` to confirm your audit log appears in BTP Cockpit.

---

## Audit Library Setup Checklist

When `auditIntegration.library === "none"`, follow these steps:

### Option A: `@cap-js/audit-logging` (recommended – zero boilerplate)

```bash
npm install @cap-js/audit-logging
```

In `package.json`:
```json
{
  "cds": {
    "requires": {
      "audit-log": {
        "impl": "@cap-js/audit-logging"
      }
    }
  }
}
```

Annotate sensitive entities in your CDS model:
```cds
entity Employees : cuid {
  @PersonalData.FieldSemantics: 'DataSubjectID'
  ID     : UUID;

  @PersonalData.IsPotentiallySensitive
  name   : String;

  @PersonalData.IsPotentiallySensitive
  email  : String;
}
```

The plugin then auto-generates audit logs for all annotated entity mutations.

### Option B: `@sap/audit-logging` (imperative API)

```bash
npm install @sap/audit-logging
```

In your service implementation:
```js
const auditLogging = require('@sap/audit-logging');
// At bootstrap (once):
const credentials = JSON.parse(process.env.VCAP_SERVICES).auditlog[0].credentials;
const auditLog = await auditLogging.v2(credentials);

// In handler:
const msg = auditLog
  .securityMessage('CREATE on Employees')
  .by(req.user.id)
  .tenant(req.tenant);
await msg.log();
```

### BTP Service Binding (Cloud Foundry)

```bash
# Create the service instance (standard plan = production)
cf create-service auditlog standard my-auditlog

# Bind to your app
cf bind-service my-cap-app my-auditlog

# Add to mta.yaml
```

```yaml
# mta.yaml
resources:
  - name: my-auditlog
    type: org.cloudfoundry.managed-service
    parameters:
      service: auditlog
      service-plan: standard

modules:
  - name: my-cap-app
    requires:
      - name: my-auditlog
```

---

## Verifying Audit Logs in BTP

1. **BTP Cockpit** → Your Subaccount → **Services** → **Instances and Subscriptions** → click your Audit Log Service instance → **Open Dashboard**
2. Filter by **time range** and **application GUID**
3. Look for entries with the action you triggered (CREATE, DELETE, EXPORT, etc.)
4. **Audit Log Retrieval API** (programmatic):
   ```
   GET https://<auditlog-retrieval-host>/auditlog/v2/auditlogrecords
       ?$filter=time ge '2026-01-01T00:00:00' and time le '2026-12-31T23:59:59'
   Authorization: Bearer <token>
   ```
   See: https://api.sap.com/api/CFAuditLogRetrievalAPI/overview

---

## Security Notes

- **Never log secrets.** No passwords, tokens, API keys, or session cookies should appear in any log entry.
- **Never log full payloads.** Log only identifiers, counts, and outcome. Full request/response bodies must be excluded.
- **Mask PII.** Use `@PersonalData.IsPotentiallySensitive` annotations and let `@cap-js/audit-logging` handle masking, or manually omit personal field values.
- **The MCP server itself never writes to BTP Audit Log.** It only generates code recommendations. The actual audit logging occurs in your CAP application at runtime when deployed to BTP.
- **Correlation IDs.** Always propagate `x-correlation-id` from inbound requests. Do not generate a new UUID for every log statement within the same request.
- **UI5 frontend code must never call the Audit Log Service directly.** All audit events originate in CAP backend handlers.

---

## Development

```bash
# Type-check only (no emit)
npm run typecheck

# Watch mode (rebuilds on save)
npm run build:watch

# Lint
npm run lint
```

---

## Contributing

Pull requests welcome. Please ensure:
1. `npm run typecheck` passes with zero errors.
2. New heuristics are covered by unit-testable pure functions in `src/analysis/`.
3. New tools follow the existing `SuggestionEdit` schema.
