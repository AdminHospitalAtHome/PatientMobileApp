module.exports = async function (context, req) {
    let data = [];
    for (let i = 0; i < req.body.FEV1InLiters.length; i++) {

        const spirometryRecord = {
            "PatientID": req.body.PatientID,
            "FEV1InLiters": req.body.FEV1InLiters,
            "FEV1_FVCInPercentage": req.body.FEV1_FVCInPercentage,
            "DateTimeTaken": req.body.DateTimeTaken,
            "IfManualInput": req.body.IfManualInput
        }
        data.push(spirometryRecord);
    }

    context.bindings.Spirometry = JSON.stringify(data);

    context.res = {
        status: 201,
        body: context.bindings.Spirometry
    };
}
