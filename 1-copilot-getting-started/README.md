# Copilot Studio & SAP: Getting started

** [🤖 Quest 1 >](student/Quest1.md)

## 0. Introduction
Welcome to the DSAG TechXChange 2026 Hands-on lab. This document provides an overview of the Hands-on activities, challenges, and resources available to participants.

### 0.1. Business Scenario and getting started
Joule has demonstrated how users can interact with their SAP backend system in natural language. While tools such as Joule Studio or Copilot Studio provide also access to tool to connect to APIs directly, the introduction of the Model Context Protocol, MCP, has simplified the integration of AI Clients dramatically. 
As long as an MCP Server is available, MCP Clients like Joule Studio or Copilot Studio, can just access the MCP Server and use the exposed data. Single Sign-On can ensure that the user is only able to see what he or she is allowed to see. 

### 0.2 MCP Server and where to get them
So the main question is: where can I get an MCP Server from. The [MCP Registry](https://registry.modelcontextprotocol.io/) already lists hundreds of MCP Servers, but if you want to connect to your own (SAP) Systems, you can use open source solutions (like the [OData MCP Bridge](https://github.com/oisee/odata_mcp_go)) or use tools like Azure API Management which provide a simply way to expose existing APIs as an MCP Server. 

In our tutorial we will use Azure API Management to create such an MCP Server from the GWSAMPLE OData Service and expose the information in a Copilot Studio agent. 

### 0.3. Labs and More
For DSAG TechXChange we have prepared everything for you. However, you can also reproduce this very same scenario at home. All that you need is
* [Copilot Studio](https://copilotstudio.microsoft.com/)
* Azure API Management (start with the free trial [Azure Free Trial](https://azure.com/free))
* SAP Backend System (you can use a Service from the [SAP API Business Hub](https://api.sap.com))


### 0.4 What user should I use?
For this lab we have prepared 40 users with the required license. Each participant will be assigned one user. The password for all users is the same. 

|User ID |
|----|
student0**01**@M365x**75849431**.OnMicrosoft.com
student0**02**@M365x**75849431**.OnMicrosoft.com
student0**03**@M365x**75849431**.OnMicrosoft.com
student0**04**@M365x**75849431**.OnMicrosoft.com
student0**05**@M365x**75849431**.OnMicrosoft.com
student0**06**@M365x**75849431**.OnMicrosoft.com
student0**07**@M365x**75849431**.OnMicrosoft.com
student0**08**@M365x**75849431**.OnMicrosoft.com
student0**09**@M365x**75849431**.OnMicrosoft.com
student0**10**@M365x**75849431**.OnMicrosoft.com
student0**11**@M365x**75849431**.OnMicrosoft.com
student0**12**@M365x**75849431**.OnMicrosoft.com
student0**13**@M365x**75849431**.OnMicrosoft.com
student0**14**@M365x**75849431**.OnMicrosoft.com
student0**15**@M365x**75849431**.OnMicrosoft.com
student0**16**@M365x**75849431**.OnMicrosoft.com
student0**17**@M365x**75849431**.OnMicrosoft.com
student0**18**@M365x**75849431**.OnMicrosoft.com
student0**19**@M365x**75849431**.OnMicrosoft.com
student0**20**@M365x**75849431**.OnMicrosoft.com
student0**31**@M365x**49933862**.OnMicrosoft.com
student0**32**@M365x**49933862**.OnMicrosoft.com
student0**33**@M365x**49933862**.OnMicrosoft.com
student0**34**@M365x**49933862**.OnMicrosoft.com
student0**35**@M365x**49933862**.OnMicrosoft.com
student0**36**@M365x**49933862**.OnMicrosoft.com
student0**37**@M365x**49933862**.OnMicrosoft.com
student0**38**@M365x**49933862**.OnMicrosoft.com
student0**39**@M365x**49933862**.OnMicrosoft.com
student0**40**@M365x**49933862**.OnMicrosoft.com
student0**41**@M365x**49933862**.OnMicrosoft.com
student0**42**@M365x**49933862**.OnMicrosoft.com
student0**43**@M365x**49933862**.OnMicrosoft.com
student0**44**@M365x**49933862**.OnMicrosoft.com
student0**45**@M365x**49933862**.OnMicrosoft.com
student0**46**@M365x**49933862**.OnMicrosoft.com
student0**47**@M365x**49933862**.OnMicrosoft.com
student0**48**@M365x**49933862**.OnMicrosoft.com
student0**49**@M365x**49933862**.OnMicrosoft.com
student0**50**@M365x**49933862**.OnMicrosoft.com



## 📢Feedback

This repos encourages contributions and feedback via the [GitHub Issues](https://github.com/MartinPankraz/DSAGTechXChange26/issues/new/choose).

## Where to next?

** [🤖 Quest 1 >](student/Quest1.md)

[🔝](#)
