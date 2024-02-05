module.exports = async function (context, req) {

    const weightRecord = {
        "PatientID": req.body.PatientID,
        "WeightInPounds": req.body.WeightInPounds,
        "DateTimeTaken": req.body.DateTimeTaken,
        "IfManualInput": req.body.IfManualInput
    }

    context.bindings.patient = JSON.stringify(weightRecord);

    context.res = {
        status: 201,
        body: context.bindings.patient
    };
}
