module.exports = async function (context, req, chatThread) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: chatThread
    };
}
