module.exports = async function (context, req, object) {
    context.res = {
        status: 200, /* Defaults to 200 */
        body: object
    };
}
