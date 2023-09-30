export function addBloodOxygen(
  patientID: number,
  bloodOxygenLevelInPercentage: number,
  IfManualInput: boolean,
): Promise<any> {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addBloodOxygen',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}", "BloodOxygenLevelInPercentage": ${bloodOxygenLevelInPercentage} ,"IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      console.log(response.status);
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood pressure');
      }
    });
  });
  return promise;
}

export function getBloodOxygen(
  patientID: number,
  startDateTime: String,
  stopDateTime: String,
) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getBloodOxygen?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseBloodOxygenData(json));
}

export function parseBloodOxygenData(bloodOxygenJson: any) {
  let bloodOxygenArr = [];
  for (var i = 0; i < bloodOxygenJson.length; i++) {
    var tempDateObject = new Date(bloodOxygenJson[i].DateTimeTaken);
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
    } else if (tmpHour === 0) {
      tmpTimeString = String(tmpHour + 12) + ':' + tmpTime[1] + 'AM';
    } else {
      tmpTimeString = String(tmpHour) + ':' + tmpTime[1] + ' AM';
    }

    bloodOxygenArr.push([
      tmpDateString,
      tmpTimeString,
      bloodOxygenJson[i].BloodOxygenLevelInPercentage,
    ]);
  }
  return bloodOxygenArr;
}
