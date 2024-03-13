module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(req.body);
    let AlertString = "";
    context.log(req.body.Items.Should_Trigger_Weight);

    if (req.body.Items.Should_Trigger_Weight || req.body.Items.Should_Trigger_Heart_Rate || req.body.Items.Should_Trigger_Blood_Oxygen || req.body.Items.Should_Trigger_Blood_Pressure) {
        AlertString += req.body.FirstName[0];
        AlertString += " ";
        AlertString += req.body.LastName[0];
        AlertString += " has the following red alerts: ";
        if (req.body.Items.Should_Trigger_Weight) {
            AlertString += "weight, ";
        }
        if (req.body.Items.Should_Trigger_Heart_Rate) {
            AlertString += "heart rate, ";
        }
        if (req.body.Items.Should_Trigger_Blood_Oxygen) {
            AlertString += "blood oxygen, ";
        }
        if (req.body.Items.Should_Trigger_Blood_Pressure) {
            AlertString += "blood pressure, ";
        }

        AlertString = AlertString.substring(0, AlertString.length-2)

        context.log(AlertString);

        try {
            context.bindings.actions = {
                "actionName": "sendToAll",
                "data": AlertString,
                "dataType": "text"
            }
        } catch (e) {
            context.log(e)
        }
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "responseMessage"
    };
    try {
        context.done();
    } catch (e) {
        context.log(e)
    }

}
