module.exports = async function (context, req) {
    let data = [];
    for (let i = 0; i < req.body.HeartRateInBPM.length; i++) {
        const heartRateRecord = {
            "PatientID": req.body.PatientID,
            "HeartRateInBPM": req.body.HeartRateInBPM[i],
            "DateTimeTaken": req.body.DateTimeTaken[i],
            "IfManualInput": req.body.IfManualInput
        }
        data.push(heartRateRecord);
    }

    context.bindings.patient = JSON.stringify(data);

    context.res = {
        status: 201,
        body: context.bindings.patient
    };
}
