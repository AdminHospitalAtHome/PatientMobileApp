
import getCurrentDateTime from "./getCurrentDateAndTime";
export function AddWeight({patientId, weight, ifManualInput}: {patientId: number, weight: number, ifManualInput: boolean}):boolean{
    const dateTime:String = getCurrentDateTime();
    //console.log(`{"PatientID": ${patientId}, "DateTimeTaken": ${dateTime}, "WeightInPounds": ${weight}, "IfManualInput": ${ifManualInput}}`);
    
    fetch("https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight", {
        method: 'POST',
        body:`{"PatientID": ${patientId}, "DateTimeTaken": "${dateTime}", "WeightInPounds": ${weight}, "IfManualInput": ${ifManualInput}}`
    }).then((response) => response.json())
      .then(responseJson => {
        if(responseJson.status_code === 201){
            return true;
        }
    
      })
    return false;
}



