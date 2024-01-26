const { CommunicationIdentityClient } = require('@azure/communication-identity');
module.exports = async function (context, req) {

    // const connectionString = Environment.CommunicationConnectionString;
    // const connectionString = Environment.GetEnvironmentVariable("CommunicationConnectionString");

    const connectionString = process.env['CommunicationConnectionString'];

    const identityClient = new CommunicationIdentityClient(connectionString);
    let identityResponse = await identityClient.createUser();

    const newPatientRecord = {
        "PatientID": req.body.PatientID,
        "FirstName": req.body.FirstName,
        "LastName": req.body.LastName,
        "DateOfBirth": req.body.DateOfBirth,
        "IfAccessibilityMode": false,
        "CommunicationId": identityResponse.communicationUserId,
        "Gender": req.body.Gender
    }

    context.bindings.newPatient = JSON.stringify(newPatientRecord);


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Patient Created"
    };
}

