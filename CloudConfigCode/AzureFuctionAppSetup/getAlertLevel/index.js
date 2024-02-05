module.exports = async function (context, req, alertLevel) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: alertLevel
    };
}
