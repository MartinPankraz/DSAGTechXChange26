# Quest 3 - Apply AI-based remediation (blue team) - OPTIONAL

[< Quest 2 ](quest2.md) - **[🏠Home](README.md)** - [ Quest 4 >](quest4.md)

Put the AI to work again, but this time for defense! In this quest, you will use another MCP server - but to prevent future attacks on the same path.

In quest 2 you learnt that custom SAP BTP apps only log logins by default. For meaningful detection of attack patterns, more audit log entries are needed. But asking developers to add more audit logging to all the hundreds of custom BTP apps is a hard sell. So, let's help them with an AI assistant skilled in adding the SAP built-in audit log service from the SAP CAP SDK.

Before, the MCP server crafted a surprise for you. Now, it is your turn to use another MCP server and be pleasantly surprised by the AI's help in adding meaningful audit log entries to your custom SAP CAP app.

## See the SAP Audit Log Service

SAP BTP has a pre-defined audit log operating on global and subaccount level - accessible via the free `SAP Audit Log Management Service`. It is used by all BTP services (e.g Integration Suite, Cloud Identity Service etc). To add custom-built BTP apps, such as SAP CAP apps, to the audit log, developers need to integrate with the paid [`SAP Audit Log Service`](https://discovery-center.cloud.sap/serviceCatalog/audit-log-service?region=all). This is a manual process and requires development effort.

## Put the AI to use to add meaningful audit log entries to your custom SAP CAP app

We left a code section marked with "Quest 3 -> TODO" in the [meal-service.js](/dsag-mealapp-security-cap/srv/meal-service.js) file as starting point.

### Step 1 — Make sure the MCP server is running

The **`cap-auditlog`** MCP server lives in the `cap-auditlog-mcp-server` folder and must be built once before VS Code can use it.

```bash
cd cap-auditlog-mcp-server
npm install
npm run build        # compiles TypeScript → dist/server.js
```

Verify that `.vscode/mcp.json` in the workspace root references it:

```jsonc
{
  "servers": {
    "cap-auditlog": {
      "type": "stdio",
      "command": "node",
      "args": ["student/cap-auditlog-mcp-server/dist/server.js"]
    }
  }
}
```

Open **GitHub Copilot Chat**, click the **Tools (🔧)** icon and confirm `scan_workspace`, `suggest_logging`, and `explain_suggestion` are listed under **cap-auditlog**.

---

### Step 2 — Scan the app for audit logging gaps

Type the following into **Copilot Chat**:

```
Scan my SAP app for audit logging gaps. The app is at:
dsag-mealapp-security-cap
```

Copilot calls `scan_workspace`. The server crawls the project automatically and reports:
- Which stacks it detected (CAP + UI5)
- Whether `@cap-js/audit-logging` is installed and wired up in `package.json`
- Whether `mta.yaml` has an `auditlog` service binding
- A list of integration gaps and recommended next steps

---

### Step 3 — Get targeted code suggestions

Ask Copilot to generate insertion points for the two `TODO` handlers:

```
Suggest audit logging for my CAP service handlers.
Focus on audit events only.
App path: dsag-mealapp-security-cap
```

Copilot calls `suggest_logging` and returns a prioritised list, e.g.:

| ID | Priority | File | Anchor |
|---|---|---|---|
| AUD-001 | HIGH | `srv/meal-service.js` | `handler_CREATE_Preferences` |
| AUD-002 | HIGH | `srv/meal-service.js` | `addMeal` |

Each entry contains a ready-to-paste `how.snippet`, the required `require` imports, structured fields (`actor`, `action`, `object`, `outcome`, `correlationId`), and privacy / PII guidance.

---

### Step 4 — Apply the suggestions to the TODO handlers

Paste the generated snippets into the two quest markers in `srv/meal-service.js`:

**`addMeal` handler (Quest 1 / AUD-002):**
```js
this.on('addMeal', async (req) => {
  const data = req.data;

  // ── Audit Log: CREATE on Meal ─────────────────────────────
  const audit = await cds.connect.to('audit-log');
  await audit.log('Meal', {
    object:       { type: 'Meal', id: { ID: data?.ID ?? 'unknown' } },
    data_subject: { type: 'User', id: { ID: req.user?.id ?? 'anonymous' }, role: 'DataSubject' },
    attributes:   [{ name: 'name' }, { name: 'category' }, { name: 'chefOnly' }],
  });
  // ─────────────────────────────────────────────────────────

  // ... your Quest 1 business logic here
});
```

**`before CREATE Preferences` handler (Quest 3 / AUD-001):**
```js
this.before('CREATE', 'Preferences', async (req) => {
  const data = req.data;

  // ── Audit Log: CREATE on Preferences ─────────────────────
  const audit = await cds.connect.to('audit-log');
  await audit.log('Preferences', {
    object:       { type: 'Preferences', id: { ID: data?.ID ?? 'unknown' } },
    data_subject: { type: 'MealUser', id: { email: req.user?.id ?? 'anonymous' }, role: 'MealUser' },
    attributes:   [{ name: 'userEmail' }, { name: 'allergy' }],
  });
  // ─────────────────────────────────────────────────────────

  // ... your Quest 3 validation logic here
});
```

> 💡 **Important:** audit logging must **never** be added to UI5 frontend controllers — always instrument the CAP backend handlers only.

---

### Step 5 — Understand a suggestion in depth (optional)

```
Explain suggestion AUD-001
```

Copilot calls `explain_suggestion` and returns the full compliance rationale (GDPR Art. 30 / DSGVO), which PII fields to mask, alternative handler placements (`before` vs `on` vs `after`), and links to SAP documentation.

> **Note:** `explain_suggestion` only works after `suggest_logging` has been called in the same chat session.

---

### Step 6 — Fix the BTP infrastructure gap

The scan also reports a missing `mta.yaml` binding. Add the following to bind the SAP Audit Log Service for production deployments:

```yaml
resources:
  - name: mealapp-auditlog
    type: org.cloudfoundry.managed-service
    parameters:
      service: auditlog
      service-plan: oauth2

modules:
  - name: mealapp-srv
    requires:
      - name: mealapp-auditlog
```

## Investigate the result on Sentinel for SAP BTP

Consider tuning your analytic rule for your newly added custom audit log entries.

## Update the [leaderboard](https://martinpankraz.github.io/crispy-potato/) with your progress⏱

## Where to next?

[< Quest 2 ](quest2.md) - **[🏠Home](README.md)** - [ Quest 4 >](quest4.md)

[🔝](#)
