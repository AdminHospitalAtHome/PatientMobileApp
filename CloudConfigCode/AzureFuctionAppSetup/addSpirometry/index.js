module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const spirometryRecord = {
        "PatientID": req.body.PatientID,
        "FEV1InLiters": req.body.FEV1InLiters,
        "FEV1_FVCInPercentage": req.body.FEV1_FVCInPercentage,
        "DateTimeTaken": req.body.DateTimeTaken,
        "IfManualInput": req.body.IfManualInput
    }

    context.bindings.Spirometry = JSON.stringify(spirometryRecord);

    context.res = {
        status: 201,
        body: context.bindings.Spirometry
    };
}
