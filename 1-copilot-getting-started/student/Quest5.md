# 🔧 5. Challenge 5: Exposing APIs via MCP Server
[< 🔌 Quest 4](Quest4.md)  - **[Quest 6 >](Quest6.md)**
## 5.1 Create an MCP Server

## 5.1.1. Navigate to MCP 
With this API now managed in Azure APIM, we can create an MCP Server out of it. Select **MCP Servers** on the left hand side
 ![MCP Server](../images/quest5/step01.png) 

Click on **Create MCP Server** and select **Expose an API as an MCP Server**
 ![Create MCP](../images/quest5/step02.png) 
 
Under **API** select the API that you just created, e.g. ```student0XX-GWSAMPLE_BASIC``` 
 ![Select API](../images/quest5/step03.png) 
 

From **API Operations**, select 
* Get entity from BusinessPartnerSet
* Get entity from ProductSet
* Get entity from SalesOrderSet
 
 ![Select Entities](../images/quest5/step04.png) 
 
For the Display Name enter 
```text
student0XX-SAP Products, Business Partner and Sales Orders
```

 ![Enter Display Name](../images/quest5/step05.png) 
 
As the description enter

```text
This MCP Server returns information about Products, Business Partners and Sales Orders from your SAP System
```

and click on **Create**

 ![Create MCP Server](../images/quest5/step06.png) 
 
Now your MCP Server has been created click on **Copy** to note down the URL of your MCP Server (e.g. copy it to Notepad), 
e.g. 
```text
https://techxchangeapim.azure-api.net/trainer001-sap-products-business-partner-and-sales-orders/mcp
```

 ![Copy and note down URL](../images/quest5/step07.png) 
 



## OPTIONAL - Test via MCP Inspector
The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) from Anthrophic allows you to test the basic features of an MCP Server. It helps you to evluate if the MCP Server you created is actually working. 


If you have node.js installed on your laptop, feel free to run 
```text
npx @modelcontextprotocol/inspector
```

 ![Start MCP Inspector](../images/quest5/step08.png) 

After that a new Browser window should open with the MCP Server up and running. From there copy the URL of the MCP Server in Azure API Management to the MCP INspector and click on Connect

 ![Connect](../images/quest5/step09.png) 

Clicking on **List Tools** shows all the Tools or Entity Types that you defined in Azure APIM Before. Click on **getEntitiesFromSalesOrderSet** 

 ![List Tool](../images/quest5/step10.png) 


If you scroll down and click on **Run Tool** you shoudl be able to fetch Sales Orders from the SAP System via the MCP Server. 

 ![List Tool](../images/quest5/step11.png) 


# Where to next?

[🔌Quest 4](Quest4.md) - **[ Quest 6 >](Quest6.md)**

[🔝](#)
