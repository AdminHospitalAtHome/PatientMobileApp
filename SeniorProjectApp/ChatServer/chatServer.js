const express = require('express');
const cors = require('cors');
const { CommunicationIdentityClient } = require('@azure/communication-identity');

const { ChatClient } = require('@azure/communication-chat');
// import { AzureCommunicationTokenCredential } from '@azure/communication-common';
// require('node-libs-react-native/globals');
// require('react-native-get-random-values');
// require('react-native-url-polyfill/auto');

const app = express();
app.use(cors());

const connectionString = "endpoint=https://hospitalathomechat.unitedstates.communication.azure.com/;accesskey=fpfyHwhSCAtth0RhQQw9MWzQ0wZm6RWaDQxYymmYHUidth7xPgcgzudxUa1A8hnt2ZLxe+11LOMBbzMRPtMU0A==";
const client = new CommunicationIdentityClient(connectionString);

app.get('/token', async (req, res) => {
  const user = await client.createUser();
  const tokenResponse = await client.getToken(user, ["chat"]);

  res.json({
    user: user,
    token: tokenResponse.token,
    expiresOn: tokenResponse.expiresOn
  });
});



const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
