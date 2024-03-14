const { WebPubSubServiceClient } = require("@azure/web-pubsub");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const serviceClient = new WebPubSubServiceClient(
        "Endpoint=https://hospitalathome.webpubsub.azure.com;AccessKey=ClPTFQ+ayLA10PD5/UilVnzuIJs/uNFr1ETGc6B/bKs=;Version=1.0;",
        "Hub"
    );

    let token = await serviceClient.getClientAccessToken();

    context.log(token)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: token
    };
}
