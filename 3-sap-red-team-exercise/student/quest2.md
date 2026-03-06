# Quest 2 - Analyze the catch with SAP Audit Log Viewer and Microsoft Sentinel for SAP BTP (blue team)

[< Quest 1 ](quest1.md) - **[🏠Home](README.md)** - [ Quest 3 >](quest3.md)

## Welcome back, blue team defender!

In the previous quest, our red team lured a SAP BTP developer to upgrade the SAP CAP application ;-) by creating a new API endpoint with susprising outcome using the SAP CAP MCP server and an AI assistant. At this stage the only thing defenders can do for post-breach scenarios, is to monitor SAP BTP's standard built-in audit log. Looking at walls of text is no fun and not efficient though.

## See the SAP Audit Log Viewer in action

- Do it anyways to know what's what. Open the SAP Audit Log Viewer from the SAP BTP subaccount and try to find your logged login on the CAP app.

So, now it's time to analyze what Microsoft Sentinel for SAP BTP caught so far.

> [!NOTE]
> For the next steps Sentinel for SAP BTP must have been set up in your SAP BTP subaccount beforehand. If you are doing this exercise in a guided workshop, your instructor should have taken care of this already. If you are doing this on your own, please follow the instructions in the prerequisites to set up [Sentinel for SAP BTP]() to onboard your subaccount.

## Use Microsoft Sentinel for SAP BTP to find the attack pattern

- Open the Microsoft Sentinel workspace that is connected to your SAP BTP subaccount and navigate to the Sentinel for SAP BTP data connector via the Content hub.
- Search for `SAP` in the content hub and open the SAP BTP solution overview.
- Open the [data connector page]() and verify log ingest from the graph
- Next use `Go to log analytics` to open the log query editor. Switch from Simple mode to KQL mode if needed
- Run the following query to find the login events for your CAP app:

```kql
SAPBTPAuditLog_CL
| distinct AlsServiceId, UserName;
```

Do you see why audit log monitoring alone is not sufficient to detect the attack? Take note that multiple entries are required for a meaningful detection of the attack pattern.

## Discover the built-in analytic rule for unaudited custom SAP BTP apps

- [Browse](https://portal.azure.com/?feature.customportal=false#view/Microsoft_Azure_Security_Insights/MainMenuBlade/~/Analytics/subscriptionId/48b193a0-2500-45b5-ad41-f09cde1a95cd/resourceGroup/dsagws-rg/workspaceName/dsagwstechxchange) the available templates for BTP detections.
- Find the one for `Unaudited custom SAP BTP applications` and open it (use the `...` button and click edit).
- Navigate to `Set rule logic` pane and expand the KQL view. Understand how the rule matches multiple audit events to detect the unaudited apps. Ask an AI to explain in simple terms for convenience.

## The difference between SAP pre-breach and post-breach threat detection



## Update the [leaderboard](https://martinpankraz.github.io/crispy-potato/) with your progress⏱

Congratulations for completing the mandatory quests! Just got started!? We got you covered with somore more Blue Team work and AI driven remediation of the compromise! Move on to the optional quest 3.

## Where to next?

[< Quest 1 ](quest1.md) - **[🏠Home](README.md)** - [ Quest 3 >](quest3.md)

[🔝](#)
