const { CommunicationIdentityClient } = require('@azure/communication-identity');

module.exports = async function (context, req) {
    const connectionString = process.env["ACS_CONNECTION_STRING"];
    // Get userId from the query string
    const userId = req.query.userId;

    // Check if userId is provided
    if (!userId) {
        context.res = {
            status: 400,
            body: "Please pass a userId on the query string"
        };
        return;
    }

    try {
        const client = new CommunicationIdentityClient(connectionString);
        const tokenResponse = await client.getToken({ communicationUserId: userId }, ["voip","chat"]);

        context.res = {
            status: 200,
            body: {
                token: tokenResponse.token,
                // expiresOn: tokenResponse.expiresOn,
                // userId: userId
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error generating token: ${error.message}`
        };
    }
};
