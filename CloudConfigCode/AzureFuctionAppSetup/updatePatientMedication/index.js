module.exports = async function (context, req) {
    // Parse the request body
    const data = req.body;

    try {
        const input = {
            // "noteType": data.noteType,
            "ID":data.id,
            "medicationName": data.medicationName,
            "prescription":data.prescription,
            "amount":data.amount
            // "patientID": data.patientId
        };
        context.bindings.result = JSON.stringify(input)

        context.res = {
            status: 200,
            body: {message: "Patient medication updated successfully."}
        };

    } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: "Error updating patient notes in the database."
        };
    }
};
