module.exports = async function (context, req, ManualAlertLevel) {

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: ManualAlertLevel
    };
}
