module.exports = async function (context, req, communicationId) {
    context.res = {
        status: 200,
        body: communicationId
    };
}
