import getDefaultStartTime from './getDefaultStartTime';

export function parseWeightData(weightJson) {
  let weightArr = [];
  for (var i = 0; i < weightJson.length; i++) {
    var tempDateObject = new Date(weightJson[i].DateTimeTaken);
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

    weightArr.push([
      tmpDateString,
      tmpTimeString,
      weightJson[i].WeightInPounds,
    ]);
  }
  return weightArr;
}

export function addWeight({
  patientId,
  weight,
  ifManualInput,
}: {
  patientId: number;
  weight: number;
  ifManualInput: boolean;
}): Promise<any> {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight', {
      method: 'POST',
      body: `{"PatientID": ${patientId}, "DateTimeTaken": "${dateTime}", "WeightInPounds": ${weight}, "IfManualInput": ${ifManualInput}}`,
    }).then(response => {
      console.log(response.status);
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add weight');
      }
    });
  });
  return promise;
}

export function getWeightCall(patientID, startDateTime, stopDateTime) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getWeight?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseWeightData(json));
}
