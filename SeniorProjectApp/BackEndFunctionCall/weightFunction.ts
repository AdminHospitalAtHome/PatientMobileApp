import timeTableParser from './tableTimeParser';
export function parseWeightData(weightJson: any) {
  let weightArr = [];
  for (let i = 0; i < weightJson.length; i++) {
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
): Promise<string> {
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

export function addWeightAutomaticallyToServer(
  patientId: number,
  weight: number[],
  dateTimeTaken: string[],
  ifManualInput: boolean,
): Promise<string> {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    let dateTimeTakenString = '[';
    let weightString = '[';
    for (let i = 0; i < weight.length; i++) {
      dateTimeTakenString += '"' + dateTimeTaken[i] + '"';
      weightString += '"' + weight[i] + '"';
      if (i !== weight.length - 1) {
        dateTimeTakenString += ',';
        weightString += ',';
      }
    }
    dateTimeTakenString += ']';
    weightString += ']';

    fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addWeights', {
      method: 'POST',
      body: `{"PatientID": ${patientId}, "DateTimeTaken": ${dateTimeTakenString}, "WeightInPounds": ${weightString}, "IfManualInput": ${ifManualInput}}`,
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

// Returns a promise with best case scenario [Most Recent, Second Most Recent]
export function getRecentWeight(patientID: number): Promise<string> {
  return new Promise(resolve => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentWeight?patientID=${patientID}`,
    )
      .then(res => res.json())
      .then(output => {
        if (output.length === 1) {
          resolve(`${output[0].WeightInPounds} lbs`);
        } else {
          resolve('N/A');
        }
      });
  });
}
