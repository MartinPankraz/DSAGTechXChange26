# Quest 3 - Apply AI-based remediation (blue team) - OPTIONAL

[< Quest 2 ](quest2.md) - **[🏠Home](README.md)** - [ Quest 4 >](quest4.md)

Put the AI to work again, but this time for defense! In this quest, you will use another MCP server - but to prevent future attacks on the same path.

In quest 2 you learnt that custom SAP BTP apps only log logins by default. For meaningful detection of attack patterns, more audit log entries are needed. But asking developers to add more audit logging to all the hundreds of custom BTP apps is a hard sell. So, let's help them with an AI assistant skilled in adding the SAP built-in audit log service from the SAP CAP SDK.

Before, the MCP server crafted a surprise for you. Now, it is your turn to use another MCP server and be pleasantly surprised by the AI's help in adding meaningful audit log entries to your custom SAP CAP app.

## See the SAP Audit Log Service

SAP BTP has a pre-defined audit log operating on global and subaccount level - accessible via the free `SAP Audit Log Management Service`. It is used by all BTP services (e.g Integration Suite, Cloud Identity Service etc). To add custom-built BTP apps, such as SAP CAP apps, to the audit log, developers need to integrate with the paid [`SAP Audit Log Service`](https://discovery-center.cloud.sap/serviceCatalog/audit-log-service?region=all). This is a manual process and requires development effort.

## Put the AI to use to add meaningful audit log entries to your custom SAP CAP app

We left a code section marked with "Quest 3 -> TODO" in the [meal-service.js](/dsag-mealapp-security-cap/srv/meal-service.js) file as starting point.

TODO: add narrative from audit mcp server.

## Investigate the result on Sentinel for SAP BTP

Optionally, consider tuning your analytic rule for your newly added custom audit log entries.

## Update the [leaderboard](https://martinpankraz.github.io/crispy-potato/) with your progress⏱

## Where to next?

[< Quest 2 ](quest2.md) - **[🏠Home](README.md)** - [ Quest 4 >](quest4.md)

[🔝](#)
