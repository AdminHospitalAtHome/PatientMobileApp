module.exports = async function (context, req, spirometry) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: spirometry
    };
}
