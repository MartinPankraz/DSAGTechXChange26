# 🔧 6. Challenge 6: Consuming MCP Server from Copilot Studio
[< 🔌 Quest 5](Quest5.md)  - **[Quest 7 >](Quest7.md)**
## 6.1 Add the MCP Server to Copilot Studio

Now we are ready to test and integrate the MCP in Copilot Studio. 
Go back to **Copilot Studio** windows and go to the **Agent**
If you do not have the Agent open anymore, click on Agents and select your Agent

 ![Go to Agents](../images/quest6/step01a.png) 

From the **Tools** menu, click on **+Add a tool**

 ![Add new Tool](../images/quest6/step01.png) 
 

Click on **Model Context Protocol**

 ![Select MCP](../images/quest6/step02.png) 
 

Now enter the following values

* Server name: 
```text
Student0XX - SAP MCP Server
```

* Server Description: 
```text
This MCP Server provides read-only access to Business Partner, Products and Sales Order information in the SAP System.
```
* Server URL: 
```text
https://techxchangeapim.azure-api.net/student0XX-sap-products-business-partner-and-sales-orders/mcp
``` 
(use the one that you created in the last step of Quest 5 before)

and click on **Create**

> [!Note]
> In a production environment you would select OAuth and configure the principal propagation flow. 

 ![Enter MCP Details](../images/quest6/step03.png) 
 

The tool is added and now you need to connect to the MCP Server. Click on **Not Connected** and select **Create new connection**

 ![Create new connection](../images/quest6/step04.png) 

 
The new connection is created. Click on **Create**

 ![New Connection](../images/quest6/step05.png) 
 
Click on **Add and configure** to add the new MCP Server to your Copilot Studio agent

 ![Add and configure](../images/quest6/step06.png) 
 


# Where to next?

**[🔌Quest 5](Quest5.md) - [ Quest 7 >](Quest7.md)

[🔝](#)

