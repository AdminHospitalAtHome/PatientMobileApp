module.exports = async function (context, req, heartRate) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: heartRate
    };
}