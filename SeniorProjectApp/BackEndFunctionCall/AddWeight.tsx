
import getCurrentDateTime from "./getCurrentDateAndTime";
export function AddWeight({patientId, weight, ifManualInput}: {patientId: String, weight: String, ifManualInput: String}):boolean{
    const dateTime:String = getCurrentDateTime();
    console.log(`{"PatientID": "${patientId}", "DateTimeTaken": "${dateTime}", "WeightInPounds": "${weight}", "IfManualInput": "${ifManualInput}"}`)
    fetch("https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight", {
        method: 'POST',
        body:`{"PatientID": "${patientId}", "DateTimeTaken": "${dateTime}", "WeightInPounds": "${weight}", "IfManualInput": "${ifManualInput}"}`
    }).then((response:Response) => console.log(response)
    )
    return true;
}



