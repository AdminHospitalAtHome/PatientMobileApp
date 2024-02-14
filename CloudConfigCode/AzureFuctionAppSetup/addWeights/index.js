module.exports = async function (context, req) {
    let data = [];
    for (let i = 0; i < req.body.WeightInPounds.length; i++) {
        const weightRecord = {
            "PatientID": req.body.PatientID,
            "WeightInPounds": req.body.WeightInPounds[i],
            "DateTimeTaken": req.body.DateTimeTaken[i],
            "IfManualInput": req.body.IfManualInput
        }
        data.push(weightRecord);
    }

    context.bindings.patient = JSON.stringify(data);

    context.res = {
        status: 201,
        body: context.bindings.patient
    };
}
