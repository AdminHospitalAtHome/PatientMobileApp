module.exports = async function (context, req, result) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: result
    };
}
