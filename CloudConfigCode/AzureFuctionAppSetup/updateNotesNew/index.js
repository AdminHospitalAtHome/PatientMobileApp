module.exports = async function (context, req) {
    // Parse the request body
    const data = req.body;

    try {
        const input = {
            // "noteType": data.noteType,
            "uuid":data.uuid,
            "noteText": data.noteText,
            // "patientID": data.patientId
        };
        context.bindings.sqlOutput = JSON.stringify(input)

        context.res = {
            status: 200,
            body: {message: "Patient notes updated successfully."}
        };

    } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: "Error updating patient notes in the database."
        };
    }
};
