module.exports = async function (context, req) {

    context.log("AlertID", req.body.AlertID)
    context.log("ProviderId", req.body.ProviderId)
    context.log("DateTimeViewed", req.body.DateTimeViewed)
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
