import timeTableParser from './tableTimeParser';
import React from 'react';
import {parseXMLHeartRateData} from './BluetoothAutomaticVitals/MedMDeviceConnection';

export function addHeartRate(
  patientID: number,
  heartRate: number,
  IfManualInput: boolean,
) {
  return new Promise<string>((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addHeartRate',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}","HeartRateInBPM": ${heartRate.toFixed(
          0,
        )}, "IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add heart rate');
      }
    });
  });
}

export function addHeartRateAutomaticallyToServer(
  patientId: number,
  heartRate: number[],
  dateTimeTaken: string[],
  ifManualInput: boolean,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let dateTimeTakenString = '[';
    let heartRateString = '[';
    for (let i = 0; i < heartRate.length; i++) {
      dateTimeTakenString += '"' + dateTimeTaken[i] + '"';
      heartRateString += '"' + heartRate[i].toFixed(0) + '"';
      if (i !== heartRate.length - 1) {
        dateTimeTakenString += ',';
        heartRateString += ',';
      }
    }
    dateTimeTakenString += ']';
    heartRateString += ']';

    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addHeartRates',
      {
        method: 'POST',
        body: `{"PatientID": ${patientId}, "DateTimeTaken": ${dateTimeTakenString},"HeartRateInBPM": ${heartRateString}, "IfManualInput": ${ifManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add Heart Rate');
      }
    });
  });
}

export function addHeartRateAutomatically(
  data: string[],
  patientID: number,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> {
  return new Promise(resolve => {
    let parsedHeartRate: number[] = [];
    let parsedDateTime: string[] = [];

    // Parse Data
    for (let i = 0; i < data.length; i++) {
      let parsedData: Record<string, any> = parseXMLHeartRateData(data[i]);

      parsedHeartRate.push(parsedData.HeartRateInBPM);
      parsedDateTime.push(parsedData.DateTimeTaken);
    }
    addHeartRateAutomaticallyToServer(
      patientID,
      parsedHeartRate,
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

export function getRecentHeartRate(heartRateData: any[][]): string {
  if (heartRateData.length === 0) {
    return 'N/A';
  }
  return `${heartRateData[heartRateData.length - 1][1]} BPM`;
}

export function parseHeartRateData(heartRateJson: any) {
  let heartRateArr = [];
  for (let i = 0; i < heartRateJson.length; i++) {
    heartRateArr.push([
      timeTableParser(heartRateJson[i].DateTimeTaken),
      heartRateJson[i].HeartRateInBPM,
    ]);
  }
  return heartRateArr;
}

export function addHeartRateOnClick(
  input: string,
  patientID: number,
  numberRegex: RegExp,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modalVisible: boolean,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
): void {
  if (input === '' || !numberRegex.test(input)) {
  } else {
    addHeartRate(patientID, Number(input), true).then(successful => {
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
