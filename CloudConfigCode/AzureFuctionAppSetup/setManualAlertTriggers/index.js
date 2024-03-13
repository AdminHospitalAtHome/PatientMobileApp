module.exports = async function (context, req, manualAlertTriggersIn) {

    context.log(req.body.JsonData)

    context.log(manualAlertTriggersIn.length)
    if (manualAlertTriggersIn.length === 1) {
        context.log("AAHA", manualAlertTriggersIn[0].UniqueID)
        const newAlertTrigger = {
            "UniqueID": manualAlertTriggersIn[0].UniqueID,
            "PatientID": manualAlertTriggersIn[0].PatientID,
            "Weight_Level": manualAlertTriggersIn[0].Weight_Level,
            "Should_Trigger_Weight": manualAlertTriggersIn[0].Should_Trigger_Weight,
            "Heart_Rate_Level": manualAlertTriggersIn[0].Heart_Rate_Level,
            "Should_Trigger_Heart_Rate": manualAlertTriggersIn[0].Should_Trigger_Heart_Rate,
            "Blood_Oxygen_Level": manualAlertTriggersIn[0].Blood_Oxygen_Level,
            "Should_Trigger_Blood_Oxygen": manualAlertTriggersIn[0].Should_Trigger_Blood_Oxygen,
            "Blood_Pressure_Level": manualAlertTriggersIn[0].Blood_Pressure_Level,
            "Should_Trigger_Blood_Pressure": manualAlertTriggersIn[0].Should_Trigger_Blood_Pressure,
            "Custom_Alert_Levels": JSON.stringify(req.body.JsonData),
        }

        context.bindings.manualAlertTriggersOut = JSON.stringify(newAlertTrigger);
    } else {
        const newAlertTrigger = {
            "PatientID": req.query.PatientID,
            "Weight_Level": -1,
            "Should_Trigger_Weight": 0,
            "Heart_Rate_Level": -1,
            "Should_Trigger_Heart_Rate": 0,
            "Blood_Oxygen_Level": -1,
            "Should_Trigger_Blood_Oxygen": 0,
            "Blood_Pressure_Level": -1,
            "Should_Trigger_Blood_Pressure": 0,
            "Custom_Alert_Levels": JSON.stringify(req.body.JsonData),
        }

        context.bindings.manualAlertTriggersOut = JSON.stringify(newAlertTrigger);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.body.JsonData
    };
}
