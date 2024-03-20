module.exports = async function (context, req) {
    const viewedRecord = {
        "AlertID": req.body.AlertID,
        "ProviderId": req.body.ProviderId,
        "DateTimeViewed":req.body.DateTimeViewed

    }

    context.bindings.result = JSON.stringify(viewedRecord);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            message:"added doctor view successfully"
        }
    };
}
