import timeTableParser from './tableTimeParser';

export function addHeartRate(
  patientID: number,
  heartRate: number,
  IfManualInput: boolean,
) {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addHeartRate',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}","HeartRateInBPM": ${heartRate}, "IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add heart rate');
      }
    });
  });
  return promise;
}

export function getHeartRate(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getHeartRate?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseHeartRateData(json));
}

export function getRecentHeartRate(
  patientID: number,
): Promise<{mode: string} | string> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentHeartRate?patientID=${patientID}`,
    ).then(res => {
      if (res.status === 200) {
        resolve(res.json());
      } else {
        reject('failed to get recent heart rate!');
      }
    });
  });
}

export function parseHeartRateData(heartRateJson: any) {
  let heartRateArr = [];
  for (var i = 0; i < heartRateJson.length; i++) {
    heartRateArr.push([
      timeTableParser(heartRateJson[i].DateTimeTaken),
      heartRateJson[i].HeartRateInBPM,
    ]);
  }
  return heartRateArr;
}
