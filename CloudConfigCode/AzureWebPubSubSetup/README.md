# Azure WebPubSub Configuration
## Creation
1. Navigate to the "Web PubSub Service" page in Azure
2. Select "Create"
3. Click "Create" under the "Web PubSub" option
4. Click "Change" in "Pricing tier" and select "Free_F1"
5. Go to the "Networking" tab
6. Ensure the Connectivity method is set to "Public endpoint" (Unless you are setting up authentication)
7. Go to the "Review + create" tab
8. Click "Create"

## Configuration
1. Select your created Web PubSub service
2. Go to the "Settings" tab
3. Click "Add" under "Hub Settings"
4. Enter "Hub" as the "Hub name"
5. Turn on "Allow anonymous clients" (Unless you are setting up authentication)
6. Click "Add" Under "Configure Event Handlers"
7. For "URL Template" enter "\<Azure Function URL>/runtime/webhooks/webpubsub?code=\<code>"
    1. Code: Found in Azure Functions "App Keys" then "webpubsub_extension"
8. Leave "System events" blank
9. Select "All" for "User Events"
10. Select "No Authentication" under "Authentication"
11. Select "Confirm"
12. Select "Save" or "Create" (Whatever you see)

## Access Configuration
1. Select your created Web PubSub service
2. Go to the "Keys" tab
3. Ensure "Access Key" is set to "Enable"
4. Copy the "Connection String" under "Primary"
5. Navigate to the Azure Function App
6. Open the "getWebSocketAccessToken" function
7. Select "Code + Test"
8. Replace the first argument to the WebPubSubServiceClient constructor with your new endpoint


