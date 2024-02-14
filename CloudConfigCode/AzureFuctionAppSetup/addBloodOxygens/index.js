module.exports = async function (context, req) {
    let data = [];
    for (let i = 0; i < req.body.BloodOxygenLevelInPercentage.length; i++) {
        const bloodOxygenRecord = {
            "PatientID": req.body.PatientID,
            "BloodOxygenLevelInPercentage": req.body.BloodOxygenLevelInPercentage[i],
            "DateTimeTaken": req.body.DateTimeTaken[i],
            "IfManualInput": req.body.IfManualInput
        }
        data.push(bloodOxygenRecord);
    }

    context.bindings.patient = JSON.stringify(data);

    context.res = {
        status: 201,
        body: context.bindings.patient
    };
}
