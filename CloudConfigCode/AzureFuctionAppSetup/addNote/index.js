const { v4: uuidv4 } = require('uuid');
module.exports = async function (context, req) {

    // Parse the request body
    const data = req.body;

    try {
        const noteId = uuidv4();
        const input = {
            "uuid": noteId,
            "noteType": data.noteType,
            "noteText": data.noteText,
            "patientID": data.patientId
        };
        context.bindings.sqlOutput = JSON.stringify(input)

        context.res = {
            status: 200,
            body: context.bindings.sqlOutput
        };

    } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: "Error adding patient notes in the database."
        };
    }
};
