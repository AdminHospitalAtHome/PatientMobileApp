module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const bloodPressureRecord = {
        "PatientID": req.body.PatientID,
        "SystolicBloodPressureInMmHg": req.body.SystolicBloodPressureInMmHg,
        "DiastolicBloodPressureInMmHg": req.body.DiastolicBloodPressureInMmHg,
        "DateTimeTaken": req.body.DateTimeTaken,
        "IfManualInput": req.body.IfManualInput
    }

    context.bindings.bloodPressure = JSON.stringify(bloodPressureRecord);

    context.res = {
        status: 201,
        body: context.bindings.bloodPressure
    };
}
