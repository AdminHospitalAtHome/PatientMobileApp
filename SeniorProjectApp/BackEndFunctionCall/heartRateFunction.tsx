export function addHeartRate(patientID:number, heartRate:number, IfManualInput:boolean){
    const promise: Promise<any> = new Promise((resolve, reject) =>{
        const dateTime: String = (new Date()).toISOString();
        fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addHeartRate', {
          method: 'POST',
          body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}","HeartRateInBPM": ${heartRate}, "IfManualInput": ${IfManualInput}}`,
        }).then(response => {
          console.log(response.status);
          if(response.status === 201){
            resolve("add successful");
          }
          else{
            reject("failed to add heart rate");
          }
        });
        
      })
      return promise;
}


export function getHeartRate(patientID:number, startDateTime:String, stopDateTime:String) {
    return fetch(
        `https://hosptial-at-home-js-api.azurewebsites.net/api/getHeartRate?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
      )
        .then(response => response.json())
      .then((json) =>
      parseHeartRateData(json)
      )
}


export function parseHeartRateData(heartRateJson:any) {
    let heartRateArr = [];
    for (var i = 0; i < heartRateJson.length; i++) {
      var tempDateObject = new Date(heartRateJson[i].DateTimeTaken);
      tempDateObject.setMinutes(
        tempDateObject.getMinutes() - tempDateObject.getTimezoneOffset(),
      );
      var tmpDate = tempDateObject.toISOString().split('T')[0].split('-');
  
      const tmpDateString = tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0];
  
      var tmpTime = tempDateObject.toISOString().split('T')[1].split(':');
      var tmpHour = parseInt(tmpTime[0]);
      var tmpTimeString = '';
      if (tmpHour > 12) {
        tmpTimeString = String(tmpHour - 12) + ':' + tmpTime[1] + ' PM';
      } else {
        tmpTimeString = String(tmpHour) + ':' + tmpTime[1] + ' AM';
      }
  
      heartRateArr.push([
        tmpDateString,
        tmpTimeString,
        heartRateJson[i].HeartRateInBPM,
      ]);
    }
    return heartRateArr;
  }