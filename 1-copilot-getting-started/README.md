# Copilot Studio & SAP: Getting started

** [🤖 Quest 1 >](* ```text student/Quest1.md)

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

* ```text student001_M365x75849431.OnMicrosoft.com ```
* ```text student002_M365x75849431.OnMicrosoft.com ```
* ```text student003_M365x75849431.OnMicrosoft.com ```
* ```text student004_M365x75849431.OnMicrosoft.com ```
* ```text student005_M365x75849431.OnMicrosoft.com ```
* ```text student006_M365x75849431.OnMicrosoft.com ```
* ```text student007_M365x75849431.OnMicrosoft.com ```
* ```text student008_M365x75849431.OnMicrosoft.com ```
* ```text student009_M365x75849431.OnMicrosoft.com ```
* ```text student010_M365x75849431.OnMicrosoft.com ```
* ```text student011_M365x75849431.OnMicrosoft.com ```
* ```text student012_M365x75849431.OnMicrosoft.com ```
* ```text student013_M365x75849431.OnMicrosoft.com ```
* ```text student014_M365x75849431.OnMicrosoft.com ```
* ```text student015_M365x75849431.OnMicrosoft.com ```
* ```text student016_M365x75849431.OnMicrosoft.com ```
* ```text student017_M365x75849431.OnMicrosoft.com ```
* ```text student018_M365x75849431.OnMicrosoft.com ```
* ```text student019_M365x75849431.OnMicrosoft.com ```
* ```text student020_M365x75849431.OnMicrosoft.com ```
* ```text student031_M365x49933862.OnMicrosoft.com ```
* ```text student032_M365x49933862.OnMicrosoft.com ```
* ```text student033_M365x49933862.OnMicrosoft.com ```
* ```text student034_M365x49933862.OnMicrosoft.com ```
* ```text student035_M365x49933862.OnMicrosoft.com ```
* ```text student036_M365x49933862.OnMicrosoft.com ```
* ```text student037_M365x49933862.OnMicrosoft.com ```
* ```text student038_M365x49933862.OnMicrosoft.com ```
* ```text student039_M365x49933862.OnMicrosoft.com ```
* ```text student040_M365x49933862.OnMicrosoft.com ```
* ```text student041_M365x49933862.OnMicrosoft.com ```
* ```text student042_M365x49933862.OnMicrosoft.com ```
* ```text student043_M365x49933862.OnMicrosoft.com ```
* ```text student044_M365x49933862.OnMicrosoft.com ```
* ```text student045_M365x49933862.OnMicrosoft.com ```
* ```text student046_M365x49933862.OnMicrosoft.com ```
* ```text student047_M365x49933862.OnMicrosoft.com ```
* ```text student048_M365x49933862.OnMicrosoft.com ```
* ```text student049_M365x49933862.OnMicrosoft.com ```
* ```text student050_M365x49933862.OnMicrosoft.com ```


## 📢Feedback

This repos encourages contributions and feedback via the [GitHub Issues](https://github.com/MartinPankraz/DSAGTechXChange26/issues/new/choose).

## Where to next?

** [🤖 Quest 1 >](* ```text student/Quest1.md)

[🔝](#)
