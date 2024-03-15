# Configuration Tutorial:
## Creating Functions:
1. Create a new Azure Function App using the free tier and using Javascript V3 API
2. On the "Overview" tab, click "Create"
3. Set the Trigger to be HTTP
4. Set the "New Function" field to be the name you want your function to have (If recreating our functions, use the names of the folders below)
5. Set the "Authorization Level" to be Anonymous (Unless you want to set up authentication)
6. Select your created function
7. Select "Code + Test"
8. Copy the contents of "index.js" from the folders below into the appropriate file
9. Copy the contents of "function.json" from the folders below into the appropriate file

## Adding Dependencies:
### Option 1: Copy files (Easier but may not work)
1. Select your function app and go to the App Files tab
2. Copy The files from "1 - Configurations\App Files" from this repository to the azure web portal
### Option 2: Manually add Dependencies (More Reliable)
1. Select your function app and go to the Console tab
2. Run the following commands to add dependencies...
```
C:\home\site\wwwroot> npm install @azure/communication-chat
C:\home\site\wwwroot> npm install @azure/communication-identity
C:\home\site\wwwroot> npm install @azure/web-pubsub
```

## Configuring CORS:
1. Select your function app and go to the CORS tab
2. In "Allowed Origins", ensuring the following are listed:
   1. http://localhost:8081
   2. https://portal.azure.com
   3. http://localhost:3000
3. Also add the url for your provider web page (Static Web App)

## Configuring Connection Strings:
1. Select your function app and go to the Configuration tab
2. Under "Application Settings", add the following 3 settings:
   1. SqlConnectionString: Connection string from Azure SQL database
   2. CommunicationConnectionString: Connection string from Azure Communication Service
   3. WebPubSubConnectionString: Connection String from Azure WebPubSub Service

## Adding Functions to Code:
Here is the fun part. Your function path may end up being slightly different than ours if
your base function app is called. You will need to find EVERY single instance of functions being called in both the
mobil app as well as the website and replace it. I recommend searching for all of our calls for the term 
"hosptial-at-home-js-api" which should find every time our API is called. 
