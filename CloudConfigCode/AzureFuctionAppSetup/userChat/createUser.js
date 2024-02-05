const { CommunicationIdentityClient } = require('@azure/communication-identity');

module.exports = async function (context, req) {
    const connectionString = process.env["ACS_CONNECTION_STRING"];

    if (!connectionString) {
        context.res = { status: 500, body: "ACS connection string not configured" };
        return;
    }

    const client = new CommunicationIdentityClient(connectionString);

    try {
        const user = await client.createUser();
        const tokenResponse = await client.getToken(user, ["voip", "chat"]);

        context.res = {
            body: {
                userId: user.communicationUserId,
                token: tokenResponse.token
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error generating token: ${error.message}`
        };
    }
};
