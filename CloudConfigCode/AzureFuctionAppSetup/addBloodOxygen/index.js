module.exports = async function (context, req) {

    const bloodOxygenRecord = {
        "PatientID": req.body.PatientID,
        "BloodOxygenLevelInPercentage": req.body.BloodOxygenLevelInPercentage,
        "DateTimeTaken": req.body.DateTimeTaken,
        "IfManualInput": req.body.IfManualInput
    }

    context.bindings.bloodOxygen = JSON.stringify(bloodOxygenRecord);

    context.res = {
        status: 201,
        body: context.bindings.bloodOxygen
    };
}
