module.exports = async function (context, req) {
    let data = [];
    for (let i = 0; i < req.body.SystolicBloodPressureInMmHg.length; i++) {
        const bloodPressureRecord = {
            "PatientID": req.body.PatientID,
            "SystolicBloodPressureInMmHg": req.body.SystolicBloodPressureInMmHg[i],
            "DiastolicBloodPressureInMmHg": req.body.DiastolicBloodPressureInMmHg[i],
            "DateTimeTaken": req.body.DateTimeTaken[i],
            "IfManualInput": req.body.IfManualInput
        }
        data.push(bloodPressureRecord);
    }

    context.bindings.patient = JSON.stringify(data);

    context.res = {
        status: 201,
        body: context.bindings.patient
    };
}
