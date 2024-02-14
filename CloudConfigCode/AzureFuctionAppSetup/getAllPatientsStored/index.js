module.exports = async function (context, req, results) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: results
    };
}
