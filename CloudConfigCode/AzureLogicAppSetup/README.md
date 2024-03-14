# Azure Logic App Configuration
## Creation
1. Go to the "Logic apps" panel in Azure
2. Create a new logic app by clicking add
3. Set the plan type to "Consumption"
4. Set "Zone redundancy" to disabled
5. Do not change "Hosting" tab
6. Go to the "Networking" tab and enable public access
7. Do not change "Monitoring" tab
8. Do not change "Tags" tab
9. Go to "Review + Create" tab and click "create"

## Add Logic
1. Open your new logic app
2. Go to "Logic app code view" tab
3. Paste the JSON from code.json
4. Click save and go to "Logic app designer" tab
5. Expand "When an item is modified (V2)" node
6. Click "Change connection"
7. Click "add new"
8. Set authentication type to be "SQL Server Authentication"
9. Fill in values from your SQL database
10. Leave "Connection Gateway" blank
11. Expand "Execute a SQL query (V2)" node
12. Click "Change connection" and select previously created connection
13. Expand Condition node
14. Expand "Execute a SQL query (V2) 2" node inside "True"
15. Click "Change connection" and select previously created connection
16. Remove httpWebSocket 2
17. Create new azure function node in "True"
18. Select your azure function then select httpWebSocket
19. Put the "JSON" variable in Request Body

# Modifications:
The logic app will have to be updated to support new vitals when you choose to add more.

