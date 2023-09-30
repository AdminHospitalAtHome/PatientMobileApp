module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const heartRateRecord = {
        "PatientID": req.body.PatientID,
        "HeartRateInBPM": req.body.HeartRateInBPM,
        "DateTimeTaken": req.body.DateTimeTaken,
        "IfManualInput": req.body.IfManualInput
    }

    context.bindings.heartRate = JSON.stringify(heartRateRecord);

    context.res = {
        status: 201,
        body: context.bindings.heartRate
    };
}
