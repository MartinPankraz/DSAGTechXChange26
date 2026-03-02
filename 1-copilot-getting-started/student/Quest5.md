# 🔧 5. Challenge 5: Change data in SAP
[< 🔌 Quest 4](Quest4.md)  - **[Quest 6 >](Quest6.md)**
## 5.1 Create an MCP Server

## 5.1.1. Navigate to MCP 
With this API now managed in Azure APIM, we can create an MCP Server out of it. Select MCP Server on the left hand side
 ![MCP Server](../images/quest5/step01.png) 

Click on Create MCP Server and select Expose an API as an MCP Server
 ![Create MCP](../images/quest5/step02.png) 
 
Under API select the API that you just created, e.g. ```studenXXX-GWSAMPLE_BASIC``` 
 ![Select API](../images/quest5/step03.png) 
 

From API Operations, select 
* Get entity from BusinessPartnerSet
* Get entity from ProductSet
* Get entity from SalesOrderSet
 
 ![Select Entities](../images/quest5/step04.png) 
 
For the Display Name enter ```trainer001-SAP Products, Business Partner and Sales Orders```
 ![Enter Display Name](../images/quest5/step05.png) 
 
As the description enter

```This MCP Server returns information about Products, Business Partners and Sales Orders from your SAP System```

and click on Create

 ![Create MCP Server](../images/quest5/step06.png) 
 
Now your MCP Server has been created click on Copy to note down the URL of your MCP Server, 
e.g. ```https://techxchangeapim.azure-api.net/trainer001-sap-products-business-partner-and-sales-orders/mcp```
 ![Copy and note down URL](../images/quest5/step07.png) 
 



## OPTIONAL - Test via MCP Inspector
!!!TODO!!!


# Where to next?

**[🔌Quest 4](Quest4.md) - [ Quest 6 >](Quest6.md)

[🔝](#)
