# CAP Audit Log MCP Server

An MCP (Model Context Protocol) server that helps developers instrument SAP CAP (Node.js) and SAPUI5 applications with compliant audit logging targeting **SAP BTP Audit Log Service**.

Works with **any SAP CAP + UI5 project** — point it at your app folder and get actionable, ready-to-paste code suggestions immediately. No manual file listing required.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Install & Build](#install--build)
4. [Configure VS Code](#configure-vs-code)
5. [End-to-End Example](#end-to-end-example)
6. [Backdoor Detection](#backdoor-detection)
7. [Tools Reference](#tools-reference)
8. [Audit Library Setup](#audit-library-setup)
9. [Verifying Audit Logs in BTP](#verifying-audit-logs-in-btp)
10. [Security Rules](#security-rules)
11. [Repository Layout](#repository-layout)
12. [Development](#development)

---

## Features

| Capability | Detail |
|---|---|
| **Auto filesystem scan** | Point at any project root — the server crawls automatically, no file listing needed |
| **Stack detection** | Detects SAP CAP (Node.js) and SAPUI5 from `package.json`, `*.cds`, `srv/*.js`, `webapp/`, `manifest.json` |
| **AUDIT_LOG suggestions** | Ready-to-paste code for `@cap-js/audit-logging` (preferred), `@sap/audit-logging`, or a local stub wrapper |
| **APP_LOG suggestions** | `cds.log()` instrumentation for operational / error logging |
| **UI5 guard** | UI5 controllers never get direct audit log code — suggestions point to the correct CAP backend handler |
| **Gap detection** | Identifies missing library, missing `mta.yaml` binding, missing VCAP_SERVICES wiring |
| **Privacy enforcement** | All suggestions mask PII fields and include GDPR/DSGVO guidance |
| **Correlation IDs** | Every audit snippet propagates `x-correlation-id` from the inbound request header |
| **Backdoor detection** | Scans CAP service files for hardcoded data mutations, handler hijacks, auth bypasses, exfiltration calls, logic bombs, and privilege escalation — 8 rule categories, severity-ranked |

---

## Prerequisites

| Requirement | Check |
|---|---|
| Node.js ≥ 18 | `node --version` |
| npm ≥ 9 | `npm --version` |
| VS Code with GitHub Copilot | Extensions panel → search "GitHub Copilot" |

---

## Install & Build

```bash
# 1. Clone the repo (skip if already cloned)
git clone https://github.com/MartinPankraz/DSAGTechXChange26.git
cd DSAGTechXChange26/3-sap-red-team-exercise/student/cap-auditlog-mcp-server

# 2. Install dependencies
npm install

# 3. Compile TypeScript → dist/
npm run build

# 4. Verify
ls dist/server.js   # must print: dist/server.js
```

---

## Configure VS Code

The server communicates over **stdio**. Add it to `.vscode/mcp.json` in your workspace root.

### `.vscode/mcp.json` (recommended — workspace-scoped)

```jsonc
{
  "servers": {
    "cap-auditlog": {
      "type": "stdio",
      "command": "node",
      "args": [
        "student/cap-auditlog-mcp-server/dist/server.js"
      ]
    }
  }
}
```

> **Verify it works:**
> 1. Open **Copilot Chat** (`Ctrl+Alt+I` / `Cmd+Alt+I`)
> 2. Click the **Tools** (wrench) icon at the bottom of the chat input
> 3. You should see `scan_workspace`, `suggest_logging`, and `explain_suggestion` listed under **cap-auditlog**
>
> If the tools don't appear, run **Developer: Reload Window** and check **Output → MCP** for errors.

---

## End-to-End Example

This walkthrough uses the included `dsag-mealapp-security-cap` sample app.  
The **exact same steps** work for any other SAP CAP project — just substitute the path.

> All prompts below are typed into **GitHub Copilot Chat** in VS Code.

---

### Step 1 — Scan for audit logging gaps

Type in Copilot Chat:

```
Scan my SAP app for audit logging gaps. The app is at:
/absolute/path/to/dsag-mealapp-security-cap
```

Copilot calls `scan_workspace` with `rootPath`. The server crawls the directory automatically — skipping `node_modules`, `dist`, `.git`, and files over 512 KB — and returns:

```
Detected stacks:   cap, ui5
Audit library:     @cap-js/audit-logging  ✓  (installed)
Config in CDS:     ✗  (cds.requires.audit-log missing)
mta.yaml binding:  ✗  (no auditlog resource in mta.yaml)

Integration gaps:
  1. @cap-js/audit-logging installed but cds.requires.audit-log not configured.
  2. No mta.yaml auditlog service resource detected.

Recommended actions:
  → Add cds.requires.audit-log to package.json
  → Add auditlog managed service resource to mta.yaml
  → Run suggest_logging to get handler-level insertion points
```

---

### Step 2 — Fix the configuration gaps reported in Step 1

#### 2a — Add `audit-log` to `package.json`

```json
{
  "cds": {
    "requires": {
      "audit-log": {
        "impl": "@cap-js/audit-logging",
        "handle": ["READ", "CREATE", "UPDATE", "DELETE"]
      }
    }
  }
}
```

#### 2b — Add the BTP service resource to `mta.yaml`

```yaml
resources:
  - name: my-auditlog
    type: org.cloudfoundry.managed-service
    parameters:
      service: auditlog
      service-plan: standard

modules:
  - name: my-cap-srv
    requires:
      - name: my-auditlog
```

---

### Step 3 — Get targeted code suggestions

```
Suggest audit logging for my CAP service handlers.
Focus on audit events only.
App path: /absolute/path/to/dsag-mealapp-security-cap
```

Copilot calls `suggest_logging` with `rootPath` and `focus: "audit"`. You receive a prioritised list:

```
AUD-001  HIGH  AUDIT_LOG  srv/meal-service.js     anchor: addMeal
AUD-002  HIGH  AUDIT_LOG  srv/admin-service.js    anchor: onCreateAdmin
AUD-003  HIGH  AUDIT_LOG  srv/admin-service.js    anchor: onDeleteAdmin
AUD-004  HIGH  AUDIT_LOG  srv/meals-service.js    anchor: onUpdateMeals
```

Each entry contains everything you need:

| Field | What it gives you |
|---|---|
| `how.snippet` | The exact code block to paste into the handler |
| `how.imports` | Any `require` / import lines to add at the top of the file |
| `what_to_log` | Structured fields: actor, action, object, objectId, outcome, tenant, correlationId |
| `privacy_notes` | Which fields are PII and how to mask them |
| `validation.btpVerification` | Numbered steps to confirm the log in BTP Audit Log Viewer |

---

### Step 4 — Apply a suggestion

Take `AUD-001` (`addMeal` in `srv/meal-service.js`) as an example.

**Before:**
```js
this.on('addMeal', async (req) => {
  // existing logic ...
});
```

**After** — paste the `how.snippet` inside the handler, before your business logic:
```js
this.on('addMeal', async (req) => {
  const data = req.data;

  // ── Audit Log: CREATE on Meal ─────────────────────────────────────────────
  const audit = await cds.connect.to('audit-log');
  await audit.log('Meal', {
    object: {
      type: 'Meal',
      id: { ID: data?.ID ?? req.params?.[0] ?? 'unknown' },
    },
    data_subject: {
      type: 'User',
      id: { ID: req.user?.id ?? 'anonymous' },
      role: 'DataSubject',
    },
    attributes: [
      // List only fields actually accessed/mutated — no secrets, no full payloads
      // { name: 'title' }
    ],
  });
  // ──────────────────────────────────────────────────────────────────────────

  // existing logic ...
});
```

Repeat for each suggestion in the list.

---

### Step 5 — Understand a suggestion in depth

```
Explain suggestion AUD-001
```

> **Note:** `explain_suggestion` works only after `suggest_logging` has been called in the same session. The in-memory registry resets when the MCP server restarts.

Copilot returns:

- **`expandedRationale`** — full compliance story (GDPR Article 30, SOX Section 404, DSGVO)
- **`privacyGuidance`** — which fields to mask, golden rules
- **`btpVerificationSteps`** — numbered steps to confirm the event in BTP Audit Log Viewer
- **`alternativePlacements`** — `before()` vs `on()` vs `after()` handler tradeoffs with pros/cons
- **`references`** — SAP documentation links

---

### Step 6 — Verify in BTP (after deployment)

Once your app is deployed to BTP:

```bash
# 1. Confirm the service instance exists and is bound
cf services
cf bind-service my-cap-app my-auditlog
cf restage my-cap-app

# 2. Trigger the audited action once (e.g. POST /addMeal via UI or curl)

# 3. Open BTP Cockpit:
#    Subaccount → Services → Instances and Subscriptions
#    → click Audit Log Service instance → Open Dashboard
#    → filter by time range and application GUID
#    → confirm the CREATE event on Meal appears
```

**Programmatic check via Audit Log Retrieval API:**
```
GET https://<auditlog-retrieval-host>/auditlog/v2/auditlogrecords
    ?$filter=time ge '2026-01-01T00:00:00' and time le '2026-12-31T23:59:59'
Authorization: Bearer <token>
```
Reference: https://api.sap.com/api/CFAuditLogRetrievalAPI/overview

---

### Copilot Prompt Cheat Sheet

| Goal | Copilot prompt |
|---|---|
| Scan an entire project | `Scan /path/to/my-sap-app for audit logging gaps` |
| Get all audit suggestions | `Suggest audit logging for /path/to/my-sap-app, focus audit` |
| Get error logging suggestions | `Suggest error logging for /path/to/my-sap-app, focus errors` |
| Scan open files only | Open the files in VS Code, then ask `Scan my open files for audit gaps` |
| Deep-dive on one suggestion | `Explain suggestion AUD-001` |
| **Detect backdoors & strange logic** | `Scan /path/to/my-sap-app for backdoors and suspicious logic` |
| **Raise the severity bar** | `Scan /path/to/my-sap-app for backdoors, minimum severity HIGH` |

---

## Backdoor Detection

> **Why this matters:**  A malicious or compromised MCP server — or a rogue dependency — can inject subtle code into your CAP service handlers. Common patterns include silently overwriting a submitted field with a hardcoded value (the "chocolate cake" attack), re-registering handlers to hijack the request flow, adding invisible outbound HTTP calls to exfiltrate data, or manipulating `req.user` to escalate privileges. The `detect_backdoors` tool automates the search for these patterns.

### Detection rule catalogue

| Rule ID | Category | Severity | What it catches |
|---|---|---|---|
| **BD-001** | `DATA_MUTATION` | CRITICAL | `req.data.field = "hardcoded"` — silent payload overwrite (classic "chocolate cake" pattern) |
| **BD-002** | `DATA_MUTATION` | HIGH | `Object.assign(req.data, …)` / full `req.data = {…}` replacement |
| **BD-003** | `HANDLER_HIJACK` | HIGH | Duplicate `this.on/before/after` registration for the same event+entity |
| **BD-004** | `AUTH_BYPASS` | CRITICAL | `\|\| true`, hardcoded user/role string comparisons, `// bypass auth` comments |
| **BD-005** | `HIDDEN_EXFILTRATION` | CRITICAL | `fetch/axios/https.request` to non-SAP external URLs inside a handler |
| **BD-006** | `LOGIC_BOMB` | HIGH | `new Date()` / `Date.now()` check followed by a `DELETE` / `truncate` within a few lines |
| **BD-007** | `STRUCTURAL_ANOMALY` | MEDIUM | Dynamic `require(variable)` — loading a module whose name is not a string literal |
| **BD-008** | `PRIVILEGE_ESCALATION` | CRITICAL | Direct assignment to `req.user.id`, `req.user.roles`, or `req.user.attr` |

### Step-by-step usage

#### Step 1 — Ask Copilot to scan for backdoors

Type in **Copilot Chat**:

```
Scan my SAP app for backdoors and suspicious logic. The app is at:
dsag-mealapp-security-cap
```

Copilot calls `detect_backdoors` with `rootPath`. The server crawls all `.js` / `.ts` files under `srv/`, skipping `node_modules`, `dist`, and test files.

#### Step 2 — Read the verdict

The response opens with a one-line verdict:

```
⛔ CRITICAL risk — 2 critical finding(s) detected.
   Immediate review required before any deployment.
```

Followed by a findings table, e.g.:

| ID | Severity | Category | File | Line | Anchor |
|---|---|---|---|---|---|
| BD-001 | CRITICAL | DATA_MUTATION | `srv/meal-service.js` | 18 | `data.mealName = "chocolate cake"` |
| BD-002 | CRITICAL | AUTH_BYPASS | `srv/meal-service.js` | 34 | `\|\| true` |

#### Step 3 — Inspect the evidence

Each finding includes a `evidence` snippet — the actual lines of code (with ±2 lines of context) where the pattern was detected. Use it to pinpoint exactly what needs to be removed or corrected.

#### Step 4 — Remediate

Follow the `recommendation` field for each finding:

| Category | What to do |
|---|---|
| `DATA_MUTATION` | Remove the hardcoded assignment. If a default is intentional, gate it with `if (!data.field)` and add an audit log entry recording both original and final values. |
| `HANDLER_HIJACK` | Consolidate duplicate handler registrations into a single `this.on(…)` call. |
| `AUTH_BYPASS` | Replace `\|\| true` / hardcoded role checks with `@requires` CDS annotations or `req.user.is('role')`. |
| `HIDDEN_EXFILTRATION` | Audit every outbound call. Remove any that forward `req.data` or `req.user` to external hosts. Allowlist permitted destinations in the MTA security descriptor. |
| `LOGIC_BOMB` | Remove time-gated destructive conditions. Implement legitimate cleanup as a CF task with full audit logging. |
| `STRUCTURAL_ANOMALY` | Replace dynamic `require(variable)` with static `require('module-name')` and verify the module is in `package.json`. |
| `PRIVILEGE_ESCALATION` | Never write to `req.user`. Derive all access decisions from the immutable JWT token claims. |

#### Step 5 — Re-scan to confirm clean

```
Scan dsag-mealapp-security-cap for backdoors again
```

Expect:

```
✅ No suspicious patterns detected in 3 scanned file(s).
```

### Filtering by severity

To focus only on the most critical issues:

```
Scan dsag-mealapp-security-cap for backdoors, minimum severity HIGH
```

This suppresses `MEDIUM` and `LOW` findings, reducing noise during a quick triage.

### Scanning only open files

Open just `srv/meal-service.js` in VS Code and ask:

```
Check my open file for backdoors
```

Copilot passes the file content directly — no filesystem access needed.

---

### `scan_workspace`

Detects SAP stacks and assesses audit integration maturity.

**Option A — filesystem crawl (simplest, works standalone)**
```json
{ "rootPath": "/absolute/path/to/your-sap-app" }
```

**Option B — caller-supplied files (used by Copilot automatically)**
```json
{
  "openFiles": [
    { "path": "package.json",      "content": "..." },
    { "path": "srv/my-service.js", "content": "..." }
  ]
}
```

**Option C — path list (path-heuristics only, no content analysis)**
```json
{
  "rootPath": "/abs/path",
  "fileList": ["srv/my-service.js", "package.json", "db/schema.cds"]
}
```

**Response structure:**
```jsonc
{
  "detectedStacks": ["cap", "ui5"],
  "evidence": {
    "capFiles":         ["srv/meal-service.js"],
    "ui5Files":         ["webapp/controller/Admin.controller.js"],
    "handlerPatterns":  ["srv/meal-service.js:addMeal"],
    "sensitiveEntities":["Preferences"]
  },
  "auditIntegration": {
    "library":                  "@cap-js/audit-logging",
    "configuredInCdsRequires":  false,
    "mtaResourcePresent":       false,
    "integrationGaps":          ["…", "…"]
  },
  "recommendedNextSteps": ["ACTION REQUIRED: …", "GAP: …"]
}
```

---

### `suggest_logging`

Produces `SuggestionEdit` objects for each detected handler.

**Input:**
```json
{
  "rootPath": "/absolute/path/to/your-sap-app",
  "focus": "audit",
  "maxSuggestions": 20
}
```

**`focus` values:**

| Value | What you get |
|---|---|
| `"audit"` | Only `AUDIT_LOG` suggestions targeting BTP Audit Log Service |
| `"errors"` | Only `APP_LOG` suggestions for `catch` blocks |
| `"performance"` | Only `APP_LOG` suggestions for slow-path instrumentation |
| `"all"` | Everything (default) |

**Key fields per suggestion:**

| Field | Description |
|---|---|
| `id` | Stable ID e.g. `AUD-001` — pass to `explain_suggestion` |
| `type` | `AUDIT_LOG` or `APP_LOG` |
| `priority` | `HIGH` / `MEDIUM` / `LOW` |
| `file` | Relative path of the file to edit |
| `anchor.value` | Function name or pattern to locate the insertion point |
| `line_hint` | Approximate 1-based line number |
| `why` | Compliance rationale |
| `what_to_log` | Structured fields: actor, action, object, objectId, outcome, tenant, correlationId |
| `how.snippet` | Ready-to-paste code block |
| `how.imports` | `require` / import lines to add at the file top |
| `how.setupNotes` | One-time setup steps (npm install, cf bind-service) |
| `how.wrapperNeeded` | `true` if no audit library found → create `./lib/audit-log-wrapper.js` |
| `privacy_notes` | PII fields, masking advice, GDPR legal basis |
| `validation.btpVerification` | Numbered BTP verification steps |

---

### `explain_suggestion`

Returns full rationale, privacy guidance, and BTP verification steps for one suggestion.

> **Prerequisite:** Run `suggest_logging` first in the same session.

**Input:**
```json
{ "id": "AUD-001" }
```

**Output:**
- `expandedRationale` — full compliance story
- `privacyGuidance` — PII masking rules
- `btpVerificationSteps` — how to confirm the log in BTP
- `alternativePlacements` — `before()` vs `on()` vs `after()` tradeoffs
- `references` — SAP documentation links

---

### `detect_backdoors`

Scans CAP Node.js service files for structural backdoors, covert data mutations, handler hijacks, and hidden authorization bypasses.

**Option A — filesystem crawl**
```json
{ "rootPath": "/absolute/path/to/your-sap-app" }
```

**Option B — caller-supplied files**
```json
{
  "openFiles": [
    { "path": "srv/meal-service.js", "content": "..." }
  ]
}
```

**Option C — raise the severity bar (reduce noise)**
```json
{
  "rootPath": "/absolute/path/to/your-sap-app",
  "minSeverity": "HIGH"
}
```

**`minSeverity` values:** `"LOW"` (default, all findings) | `"MEDIUM"` | `"HIGH"` | `"CRITICAL"`

**Response structure:**
```jsonc
{
  "summary": {
    "totalFindings": 3,
    "criticalCount": 2,
    "highCount": 1,
    "mediumCount": 0,
    "lowCount": 0,
    "filesScanned": 3,
    "verdict": "⛔ CRITICAL risk — 2 critical finding(s) detected. Immediate review required before any deployment."
  },
  "findings": [
    {
      "id": "BD-001",
      "severity": "CRITICAL",
      "category": "DATA_MUTATION",
      "file": "srv/meal-service.js",
      "lineHint": 18,
      "anchor": "data.mealName = \"chocolate cake\"",
      "description": "A handler directly assigns a hardcoded string to a request data field, silently overwriting whatever the caller submitted.",
      "evidence": "16: this.on('addMeal', async (req) => {\n17:   const data = req.data;\n18:   data.mealName = \"chocolate cake\";  // <-- backdoor\n19:   const result = await INSERT.into(Meals).entries(data);\n20: });",
      "recommendation": "Remove or justify the hardcoded assignment. If a default is intentional, gate it behind an explicit condition.",
      "falsePositiveRisk": "medium"
    }
  ]
}
```

**Key fields per finding:**

| Field | Description |
|---|---|
| `id` | Stable finding ID, e.g. `BD-001` |
| `severity` | `CRITICAL` / `HIGH` / `MEDIUM` / `LOW` |
| `category` | `DATA_MUTATION`, `HANDLER_HIJACK`, `AUTH_BYPASS`, `HIDDEN_EXFILTRATION`, `LOGIC_BOMB`, `STRUCTURAL_ANOMALY`, `PRIVILEGE_ESCALATION` |
| `file` | Relative path of the affected file |
| `lineHint` | Approximate 1-based line number |
| `anchor` | The suspicious code fragment |
| `evidence` | ±2 lines of source context around the finding |
| `recommendation` | Concrete remediation guidance |
| `falsePositiveRisk` | `low` / `medium` / `high` — helps triage |

---

### Option A — `@cap-js/audit-logging` (recommended — zero boilerplate)

```bash
npm install @cap-js/audit-logging
```

In `package.json`:
```json
{
  "cds": {
    "requires": {
      "audit-log": {
        "impl": "@cap-js/audit-logging",
        "handle": ["READ", "CREATE", "UPDATE", "DELETE"]
      }
    }
  }
}
```

Annotate sensitive entities in your CDS model — the plugin does the rest automatically:
```cds
entity Employees : cuid {
  @PersonalData.FieldSemantics: 'DataSubjectID'
  ID : UUID;

  @PersonalData.IsPotentiallySensitive
  name : String;

  @PersonalData.IsPotentiallySensitive
  email : String;
}
```

### Option B — `@sap/audit-logging` (imperative API)

```bash
npm install @sap/audit-logging
```

```js
const auditLogging = require('@sap/audit-logging');

// Once at bootstrap:
const credentials = JSON.parse(process.env.VCAP_SERVICES).auditlog[0].credentials;
const auditLog = await auditLogging.v2(credentials);

// Inside a handler:
this.on('CREATE', 'Orders', async (req) => {
  await auditLog
    .securityMessage(`CREATE on Orders by ${req.user.id}`)
    .by(req.user.id)
    .tenant(req.tenant)
    .log();
});
```

### BTP Service Binding

```bash
cf create-service auditlog standard my-auditlog
cf bind-service my-cap-app my-auditlog
cf restage my-cap-app
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

1. **CF CLI** — confirm binding:
   ```bash
   cf services
   cf env my-cap-app | grep auditlog
   ```
2. **Trigger the event** — perform the audited action once (e.g. POST `/addMeal`).
3. **BTP Cockpit** → Subaccount → **Services → Instances and Subscriptions** → click Audit Log instance → **Open Dashboard**
4. Filter by **time range** and **application GUID** — confirm the event appears.
5. **Retrieval API** (programmatic):
   ```
   GET https://<auditlog-retrieval-host>/auditlog/v2/auditlogrecords
       ?$filter=time ge '2026-01-01T00:00:00'
   Authorization: Bearer <token>
   ```
   Docs: https://api.sap.com/api/CFAuditLogRetrievalAPI/overview

---

## Security Rules

These rules are enforced by the suggestions the server generates. Do not bypass them.

| Rule | Reason |
|---|---|
| **Never log secrets** | No passwords, tokens, API keys, or session cookies in any log entry |
| **Never log full payloads** | Log identifiers, counts, and outcomes only — never full request/response bodies |
| **Mask PII** | Use `@PersonalData.IsPotentiallySensitive` or omit personal field values manually |
| **One correlation ID per request** | Propagate `x-correlation-id` from inbound headers — never generate a new UUID per log statement |
| **Audit logging belongs in the backend** | UI5 frontend code must never call the Audit Log Service directly |
| **The MCP server itself never logs** | It only generates code recommendations — your CAP app does the logging at runtime |

---

## Repository Layout

```
cap-auditlog-mcp-server/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── server.ts                          # MCP stdio server bootstrap
│   ├── types.ts                           # Zod schemas & TypeScript interfaces
│   ├── analysis/
│   │   ├── fs-crawler.ts                  # Filesystem walker (rootPath → FileNode[])
│   │   ├── cap-detector.ts                # CAP handler & entity detection
│   │   ├── ui5-detector.ts                # UI5 controller & OData call detection
│   │   ├── audit-integration-detector.ts  # Library / mta.yaml / VCAP gap detection
│   │   └── classifier.ts                  # AUDIT_LOG vs APP_LOG logic & snippet generation
│   └── tools/
│       ├── scan-workspace.ts              # Tool: scan_workspace
│       ├── suggest-logging.ts             # Tool: suggest_logging
│       ├── explain-suggestion.ts          # Tool: explain_suggestion
│       └── detect-backdoors.ts            # Tool: detect_backdoors (8 rule categories)
└── example/
    ├── mock-workspace/                    # Sample CAP+UI5 app (no audit logging)
    ├── inputs/                            # Sample JSON inputs for each tool
    └── outputs/                           # Sample JSON outputs for each tool
```

---

## Development

```bash
npm run typecheck       # type-check only, no emit
npm run build:watch     # watch mode, rebuilds on every save
npm run lint            # ESLint
```

### Adding support for a new framework

1. Add detection logic in `src/analysis/` (follow the pattern of `cap-detector.ts`).
2. Export a handler extractor and wire it into `suggest-logging.ts`.
3. Add the stack name to `DetectedStack` in `types.ts`.
4. Update `buildRecommendedNextSteps` in `scan-workspace.ts`.

---

## Contributing

Pull requests are welcome. Please ensure:

1. `npm run typecheck` passes with zero errors.
2. New heuristics live in pure functions in `src/analysis/` (easier to unit-test).
3. New tools follow the existing `SuggestionEdit` schema in `types.ts`.
