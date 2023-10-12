import timeTableParser from './tableTimeParser';

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
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood oxygen');
      }
    });
  });
  return promise;
}

export function getBloodOxygen(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
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
    bloodOxygenArr.push([
      timeTableParser(bloodOxygenJson[i].DateTimeTaken),
      bloodOxygenJson[i].BloodOxygenLevelInPercentage,
    ]);
  }
  return bloodOxygenArr;
}
