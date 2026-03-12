# 🔧 4. Challenge 4: Manage APIs in Azure API Management
[< 🔌 Quest 3](Quest3.md)  - **[Quest 5 >](Quest5.md)**

## 4.1. Azure API Management
!!! TODO !!! What is APIM

### 4.1.1. Open Azure API Management in the Azure Portal:
Open a new browse tab and open the link:

https://portal.azure.com/#@tws22.onmicrosoft.com/resource/subscriptions/0973cd86-8527-4a13-a1c8-b3431c0e1fde/resourceGroups/techXChange2026-apim/providers/Microsoft.ApiManagement/service/techxchangeapim/overview


### 4.1.2. Accept Permissions
Click on **Accept**

![Accept](../images/quest4/step01.png) 

### 4.1.3. Add to Authenticator App
Since this is an external user in this Azure subscription you need to add also this user to the Authentictor

![Next](../images/quest4/step02.png) 
 
### 4.1.4. Run through enrollment process
As before run though the process to add the user to your Authentictor app
![Azure API Management](../images/quest4/step03.png) 
 
 
 
 
### 4.2.1. In Azure API Management
Now you are in Azure API Management. This is one instance that is used by  all participants. Please don’t delete any existing APIs and only work with your own

![Next](../images/quest4/step04.png) 
 
### 4.2.2. Managing APIs
Expand **API** and click on **APIs**

![Expand](../images/quest4/step05.png) 
 
### 4.2.3. Define API from OpenAPI specification
Scroll down and click on OpenAPI

![OpenAPI](../images/quest4/step06.png) 
 
### 4.2.4. Upload OpenAPI Specification
Click on **Select a File** and select the **$metadata-openapi.json** file that we converted and downloaded before in Step 3.1.5

> [!NOTE]
> If you had issues converting the file, you can find another file [here](../files/$metadata-openapi.json)


![Select File](../images/quest4/step07.png) 
 
 ### 4.2.5. Configure the Displayname & more
For the **API URL Suffix** enter your ID, e.g. 
```text
student0XX
``` 
with your student number, 

Make also sure to adjust the **display name** and add ```text
student0XX GWSAMPLE_BASIC
```  
(the Name should be automatically be adjusted)

then click on **Create**

![Enter URL](../images/quest4/step08.png) 
 
From now on, please only use your API, e.g. **student0XX GWSAMPLE_BASIC**
![Overview](../images/quest4/step09.png) 
 
### 4.3.1. Configure authentication
Next we will configure the authentication. Here you would now setup principal propagation / SSO. In our scenario we are going to do basic authentication with a username and password that is already configured as “Named values” pair. In order to use that configuration, click on the *Policies Code editor*

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

And click on **Save**

![Save](../images/quest4/step11.png) 

> [!NOTE]
> The full policy should now look like
> 
```xml
<!--
    - Policies are applied in the order they appear.
    - Position <base/> inside a section to inherit policies from the outer scope.
    - Comments within policies are not preserved.
-->
<!-- Add policies as children to the <inbound>, <outbound>, <backend>, and <on-error> elements -->
<policies>
    <!-- Throttle, authorize, validate, cache, or transform the requests -->
    <inbound>
        <base />
        <authentication-basic username="{{sap-user}}" password="{{sap-password}}" />
    </inbound>
    <!-- Control if and how the requests are forwarded to services  -->
    <backend>
        <base />
    </backend>
    <!-- Customize the responses -->
    <outbound>
        <base />
    </outbound>
    <!-- Handle exceptions and customize error responses  -->
    <on-error>
        <base />
    </on-error>
</policies>
```

 
### 4.4.1. Adjust the settings
Now click on **Settings**

![Settings](../images/quest4/step12.png) 
 

### 4.4.2. Change the target URL
And change the **Web Service URL** to 

```text
https://microsoftintegrationdemo.com:44301/sap/opu/odata/IWBEP/GWSAMPLE_BASIC
```

and click on **Save**

![Update URL](../images/quest4/step13.png) 
 
### 4.4.3. Uncheck Subscription Required
On the same screen, scroll down and uncheck “**Subscription required**” and click on **Save**
![Uncheck Subcription URL](../images/quest4/step14.png) 
 
### 4.5.1. Test the API
Now click on **Test**, select the *Entity Type* ```Get entities from BusinessPartnerSet``` 
![Test API](../images/quest4/step15.png) 

### 4.5.2 Submit the request
And click on **Send**

![See Results](../images/quest4/step16.png) 

 
If you scroll down you should see **HTTP/1.1 200 OK** and lots of Business partners
![See Results](../images/quest4/step17.png) 


# Where to next?

**[🔌Quest 3](Quest3.md) - [ Quest 5 >](Quest5.md)

[🔝](#)

