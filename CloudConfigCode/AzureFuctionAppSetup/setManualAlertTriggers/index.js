module.exports = async function (context, req, manualAlertTriggersIn) {
    if (manualAlertTriggersIn.length === 1) {
        const newAlertTrigger = {
            "UniqueID": manualAlertTriggersIn[0].UniqueID,
            "PatientID": manualAlertTriggersIn[0].PatientID,
            "Weight_Level": manualAlertTriggersIn[0].Weight_Level,
            "Heart_Rate_Level": manualAlertTriggersIn[0].Heart_Rate_Level,
            "Blood_Oxygen_Level": manualAlertTriggersIn[0].Blood_Oxygen_Level,
            "Blood_Pressure_Level": manualAlertTriggersIn[0].Blood_Pressure_Level,
            "Custom_Alert_Levels": JSON.stringify(req.body.JsonData),
        }

        context.bindings.manualAlertTriggersOut = JSON.stringify(newAlertTrigger);
    } else {
        const newAlertTrigger = {
            "PatientID": req.query.PatientID,
            "Weight_Level": -1,
            "Heart_Rate_Level": -1,
            "Blood_Oxygen_Level": -1,
            "Blood_Pressure_Level": -1,
            "Custom_Alert_Levels": JSON.stringify(req.body.JsonData),
        }

        context.bindings.manualAlertTriggersOut = JSON.stringify(newAlertTrigger);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Updated"
    };
}
