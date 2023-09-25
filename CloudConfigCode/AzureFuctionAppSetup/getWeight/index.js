module.exports = async function (context, req, weight) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: weight
    };
}