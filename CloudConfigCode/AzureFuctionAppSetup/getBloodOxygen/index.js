module.exports = async function (context, req, bloodOxygen) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: bloodOxygen
    };
}