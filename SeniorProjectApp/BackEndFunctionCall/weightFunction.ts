import timeTableParser from './tableTimeParser';
export function parseWeightData(weightJson: any) {
  let weightArr = [];
  for (var i = 0; i < weightJson.length; i++) {
    weightArr.push([
      timeTableParser(weightJson[i].DateTimeTaken),
      weightJson[i].WeightInPounds,
    ]);
  }
  return weightArr;
}

export function addWeight(
  patientId: number,
  weight: number,
  ifManualInput: boolean,
): Promise<any> {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight', {
      method: 'POST',
      body: `{"PatientID": ${patientId}, "DateTimeTaken": "${dateTime}", "WeightInPounds": ${weight}, "IfManualInput": ${ifManualInput}}`,
    }).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add weight');
      }
    });
  });
  return promise;
}

export function getWeightCall(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getWeight?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseWeightData(json));
}

export function getMostRecentTwo(patientID: number) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getWeight?patientID=${patientID}`,
  );
}

export function getRecentWeight(patientID: number): Promise<void> {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentWeight?patientID=${patientID}`,
  ).then(res => res.json());
}

export function weightTrend(patientID:number): Promise<void> {

}
