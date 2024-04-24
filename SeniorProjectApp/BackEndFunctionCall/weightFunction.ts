import timeTableParser from './tableTimeParser';
import {parseXMLWeightData} from './BluetoothAutomaticVitals/MedMDeviceConnection';
import React from 'react';

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
  return new Promise<string>(resolve => {
    const dateTime: String = new Date().toISOString();
    fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight', {
      method: 'POST',
      body: `{"PatientID": ${patientId}, "DateTimeTaken": "${dateTime}", "WeightInPounds": ${weight.toFixed(
        0,
      )}, "IfManualInput": ${ifManualInput}}`,
    }).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        resolve('failed to add weight');
      }
    });
  });
}

export function addWeightAutomaticallyToServer(
  patientId: number,
  weight: number[],
  dateTimeTaken: string[],
  ifManualInput: boolean,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let dateTimeTakenString = '[';
    let weightString = '[';
    for (let i = 0; i < weight.length; i++) {
      dateTimeTakenString += '"' + dateTimeTaken[i] + '"';
      weightString += '"' + weight[i].toFixed(0) + '"';
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
}

export function addWeightAutomatically(
  data: string[],
  patientID: number,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> {
  return new Promise(resolve => {
    let parsedWeight: number[] = [];
    let parsedDateTime: string[] = [];

    // Parse Data
    for (let i = 0; i < data.length; i++) {
      let parsedData: Record<string, any> = parseXMLWeightData(data[i]);

      parsedWeight.push(parsedData.WeightInPounds);
      parsedDateTime.push(parsedData.DateTimeTaken);
    }

    addWeightAutomaticallyToServer(
      patientID,
      parsedWeight,
      parsedDateTime,
      false,
    )
      .then(() => {
        setAddSuccessVisible(true);
        setStopDateTime(new Date().toISOString());
        resolve();
      })
      .catch(() => {
        setAddFailedVisible(true);
        setStopDateTime(new Date().toISOString());
        resolve();
      });
  });
}

export function addWeightOnClick(
  input: string,
  patientID: number,
  numberRegex: RegExp,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modalVisible: boolean,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
) {
  if (input === '' || !numberRegex.test(input)) {
  } else {
    addWeight(patientID, Number(input), true).then(successful => {
      setModalVisible(!modalVisible);
      if (successful === 'add successful') {
        setAddSuccessVisible(true);
      } else {
        // Failed view here
        setAddFailedVisible(true);
      }
      setStopDateTime(new Date().toISOString());
    });
    setInput('');
  }
}

export async function getWeightCall(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
) {
  const response = await fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getWeight?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  );
  const json = await response.json();
  return parseWeightData(json);
}

export function getRecentWeight(weightData: any[][]): string {
  if (weightData.length === 0) {
    return 'N/A';
  }
  return `${weightData[weightData.length - 1][1]} lbs`;
}
