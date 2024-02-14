module.exports = async function (context, req) {

    // Parse the request body
    const data = req.body;

    try {
        const input = {
            "patientID": data.patientID,
            "medicationName": data.medicationName,
            "amount": data.amount,
            "prescription": data.prescription
        };
        context.bindings.result = JSON.stringify(input)

        context.res = {
            status: 200,
            body: context.bindings.result
        };

    } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: "Error adding patient notes in the database."
        };
    }
};
