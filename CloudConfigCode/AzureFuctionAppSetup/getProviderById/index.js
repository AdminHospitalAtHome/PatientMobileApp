module.exports = async function (context, req, provider) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: provider
    };
}
