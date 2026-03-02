# 🔧 4. Challenge 4: Manage APIs in Azure API Management
[< 🔌 Quest 3](Quest3.md)  - **[Quest 5 >](Quest5.md)**

## 4.1. Azure API Management
!!! TODO !!! What is APIM

### 4.1.1. Open Azure API Management in the Azure Portal:
https://portal.azure.com/#@tws22.onmicrosoft.com/resource/subscriptions/0973cd86-8527-4a13-a1c8-b3431c0e1fde/resourceGroups/techXChange2026-apim/providers/Microsoft.ApiManagement/service/techxchangeapim/overview


### 4.1.2. Click on accept
![Accept](../images/quest4/step01.png) 

### 4.1.3. Since this is an external user in this Azure subscription you need to add also this user to the Authentictor
![Next](../images/quest4/step02.png) 
 
### 4.1.4. As before run though the process to add the user to your Authentictor app
![Azure API Management](../images/quest4/step03.png) 
 
 
 
 
### 4.2.1. In Azure API Management
Now you are in Azure API Management. This is one instance that is use for all participants. Please don’t delete any existing APIs and only work with your own
![Next](../images/quest4/step04.png) 
 
### 4.2.2. Expand API and click on APIs
![Expand](../images/quest4/step05.png) 
 
### 4.2.3. Scroll down and click on OpenAPI
![OpenAPI](../images/quest4/step06.png) 
 
### 4.2.4. Click on Select a File and select the $metadata-openapi.json file that we converted and downloaded before
![Select File](../images/quest4/step07.png) 
 
 ### 4.2.5. Configure the rest
For the API URL Suffix enter your ```studenXXX``` with your student number, 

Make also sure to adjust the display name and add ```studenXXX GWSAMPLE_BASIC```  as the display name 

then click on Create

![Enter URL](../images/quest4/step08.png) 
 
From now on, please only use your API, e.g. trainer001-GWSAMPLE_BASIC
![Overview](../images/quest4/step09.png) 
 
### 4.3.1. Configure authentication
Next we will configure the authentication. Here you would now setup principal propagation / SSO. In our scenario we are going to do basic authentication with a username and password that is already configured as “Named values” pair. In order to use that configuration, click on the Policies Code editor

![Authentication](../images/quest4/step10.png) 
 
### 4.3.2. Enhance the policy
 Under     
 ```xml
 <inbound> 
 <base /> 
 ```
 add the following line. This will fetch the username and password fromt he Named Value store and add it to an authorization header for each call to the backend system
````xml
<authentication-basic username="{{sap-user}}" password="{{sap-password}}" />
````

And click on Save
![Save](../images/quest4/step11.png) 
 
### 4.4.1. Adjust the settings
Now click on Settings
![Settings](../images/quest4/step12.png) 
 

### 4.4.2. Change the target URL
And change the Web Service URL to 
```https://microsoftintegrationdemo.com:44301/sap/opu/odata/IWBEP/GWSAMPLE_BASIC```
and click on Save
![Update URL](../images/quest4/step13.png) 
 
### 4.4.3. Uncheck Subscription Required
On the same screen, scroll down and uncheck “Subscription required” and click on Save
![Uncheck Subcription URL](../images/quest4/step14.png) 
 
### 4.5.1. Test the API
Now click on Test, select the Entity Type ```Get entities from BusinessPartnerSet``` 
![Test API](../images/quest4/step15.png) 

### 4.5.2 And click on Send
![See Results](../images/quest4/step16.png) 

 

# Where to next?

**[🔌Quest 3](Quest3.md) - [ Quest 5 >](Quest5.md)

[🔝](#)


################################


## Option: Updating prices
After displaying the information of a specific product in Copilot Studio, we now want to enhance the flow and add the functionality to update a proprty. In the interest of time, we will only do the update for the product price, but obviously this could be done for all other properites as well. 


### 5.1 Create flow Update SAP Product Price
Now we create another flow called *Update SAP Product Price* as another copy of the first flow *List SAP products of a category*. Go to the browser window with Power Automate. (e.g. open Power Automate and click on My flows). The click on *Save as* for the *List of SAP Products of a category* flow 
![Save As 2](../images/quest4/SaveAs2.jpg)
 
Enter the name *Update SAP Product Price* and click on *Save*
![Update Save](../images/quest4/UpdateSave.jpg)

 As before refresh the browser, select the *three dots* for the *update SAP product Price* flow and click on *Turn On* 
![Turn on](../images/quest4/TurnOn2.jpg)

Having the flow selected click on *Edit*
![Edit Flow](../images/quest4/EditFlow2.jpg)

Similar as before, select the trigger action *Run a flow from Copilot* and change the first parameter name to *ProductID*. Then click on *+ Add an input* to add another paraemter for the new Price. 
![Add input](../images/quest4/AddAnInput.jpg)

Select Number
![Add Number input](../images/quest4/AddNumber.jpg)

Change the name to ````ProductPrice````
![Add Product Price](../images/quest4/ProductPrice.jpg)

Now delete the second action *Query OData enttities*, by secting it, and clicking on *Delete* in the *three dots* menu
![Delete action](../images/quest4/DeleteAction.jpg)

If prompted confirm the deletion
![Confirm Delete action](../images/quest4/ConfirmDeletion.jpg)

Now click on the *+* between the *Run a flow from Copilot* and *Respond to Copilot* actions and search for ````OData````. From the list select *Update OData Entity*
![Select update OData](../images/quest4/SelectUpdateOData.jpg)


From the drop down list under *OData Entity name*  
![Select ProductSet](../images/quest4/SelectProductSet.jpg)

Select the *ProductID* field and click on the *Flash* symbol
![Click Flash](../images/quest4/ClickOnFlash.jpg)

From the drop-down select *ProductID*
![Select ProductID](../images/quest4/SelectProductID.jpg)

In this workshop we are only going to update the price of the product. 
From the *Advaned parameters* drop down, select *Price*
![Select Price](../images/quest4/SelectPrice.jpg)
 

Select the *Price* field and as before clicking on the *Flash* symbol, select *ProductPrice* from the drop down
![Change Product Price](../images/quest4/ChangeProductPrice.jpg)

In the last step *Respond to Copilot* hard code a *Response* *The price has been updated*
![Response](../images/quest4/Resposne.jpg)

Now *Publish* the flow again. 
![Response](../images/quest4/Publish.jpg)


## 5.2 Create another action to update the product price
Now that we have the flow created, lets create an *Action* which calls our Power Automate flow. 

From the top menu, click on *Action* and select *+ Add an action*
![Add another action](../images/quest4/AddAnAction2.jpg)

Select the previously crated *Update Product Price* Action
![Select Update Product Price](../images/quest4/SelectUpdateProductPrice.jpg)

> [!Note]
> You might need to select *Flow* if you do not yet see the required Power Automate flow. 

Leave the defaults and click on *Add action*
![Add Action](../images/quest4/AddAction2.jpg)

Select the newly created *Update SAP Product Price* Action
![Select Update Action](../images/quest4/SelectUpdateAction.jpg)

Click on Inputs and verify the correct configuration of the 2 Inputs as follows (Product ID and Price) and save the action.
![Verify input Action](../images/quest4/VerifyInput.jpg)
 

## 5.3 Add a plugin action to update the price
Go back to the Topic *SAP Product Data*
![Select Topic](../images/quest4/SelectTopic.jpg)

At the end of the flow (in the *Questions* step), add a last line in the input field:
````text
What do you want to change?
````

After the *Question* step, click on the *+*, select *Add an action*, select the tab *Action (preview)* and select the newly created Action *Update SAP Product Price*
![Add new Action](../images/quest4/AddAction-Action.jpg)


In the plugin action you don’t need to provide an input because Gen AI will automatically fill in the details into the action input based on the last user input and conversation context.

Save and publish.
![Add new Action](../images/quest4/ClickSaveAndPublish.jpg)

> [!Note]
> Don't be confused if it says that the input field must be filled. Just click on Save

## 5.4 Test the price update in Copilot Studio
As before start asking Copilot about notebooks
````text
please show me notebooks
````
![Add new Action](../images/quest4/TestCopilot1.jpg)


Next ask for specific details, e.g. 
````text
show me details for HT-8003
````
![Add new Action](../images/quest4/ShowDetailsAndConnect.jpg)

Now do an update...
````text
Please update the price to 10 USD
````
<!-- 'XX USD' will cause responsible AI to reject query. -->

Since this is a first time connection, we need to authenticate again. Click on *Connect* and for all *Not connected* connections
![Add new Action](../images/quest4/Connect.jpg)


> [!Note]
> You can open a new browser tab and query the product to check whether the price has been updated by querying the Odata service. Use following URL: https://bestrun-apim.azure-api.net/sap/opu/odata/iwbep/GWSAMPLE_BASIC/ProductSet('HT-8003')?saml2=disabled 

 
# Where to next?

**[🔌Quest 2](Quest3.md)

[🔝](#)
