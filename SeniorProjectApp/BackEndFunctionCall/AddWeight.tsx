
import getCurrentDateTime from "./getCurrentDateAndTime";
export function AddWeight({patientId, weight, ifManualInput}: {patientId: String, weight: String, ifManualInput: String}):boolean{


    const dateTime:String = getCurrentDateTime();
    //It should print 18/04/2012 15:07:33 and prints 3/3/2012 15:07:33

    // 2023-01-01T08:00:00.0000000
    // @ts-ignore
    fetch("https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight", {
        method: 'POST',
        body:{"PatientID" : {patientId}, "DateTimeTaken" : {dateTime}, "WeightInPounds": {weight}, "IfManualInput": {ifManualInput}}
    }).then((response) => {
        console.log(response)
        response.json()}).then((responseJson)=>{
        // console.log(responseJson)
        // console.log(responseJson.status_code)
    })

    return true;
}



