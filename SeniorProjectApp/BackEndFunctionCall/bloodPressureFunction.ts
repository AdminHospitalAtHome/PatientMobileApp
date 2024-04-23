import timeTableParser from './tableTimeParser';
import React from 'react';
import {parseXMLBloodPressureData} from './BluetoothAutomaticVitals/MedMDeviceConnection';

export function parseBloodPressureData(bloodPressureJSON: any) {
  let bloodPressureArr = [];
  for (let i = 0; i < bloodPressureJSON.length; i++) {
    bloodPressureArr.push([
      timeTableParser(bloodPressureJSON[i].DateTimeTaken),
      bloodPressureJSON[i].SystolicBloodPressureInMmHg,
      bloodPressureJSON[i].DiastolicBloodPressureInMmHg,
    ]);
  }
  return bloodPressureArr;
}

export function addBloodPressure(
  patientID: number,
  SystolicBloodPressureInMmHg: number,
  DiastolicBloodPressureInMmHg: number,
  IfManualInput: boolean,
) {
  return new Promise<string>((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addBloodPressure',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}", "SystolicBloodPressureInMmHg": ${SystolicBloodPressureInMmHg.toFixed(
          0,
        )},"DiastolicBloodPressureInMmHg": ${DiastolicBloodPressureInMmHg.toFixed(
          0,
        )}, "IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood pressure');
      }
    });
  });
}

export function addBloodPressureAutomaticallyToServer(
  patientId: number,
  SystolicBloodPressureInMmHg: number[],
  DiastolicBloodPressureInMmHg: number[],
  dateTimeTaken: string[],
  ifManualInput: boolean,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let dateTimeTakenString = '[';
    let systolicBloodPressureString = '[';
    let diastolicBloodPressureString = '[';
    for (let i = 0; i < SystolicBloodPressureInMmHg.length; i++) {
      dateTimeTakenString += '"' + dateTimeTaken[i] + '"';
      systolicBloodPressureString += '"' + SystolicBloodPressureInMmHg[i] + '"';
      diastolicBloodPressureString +=
        '"' + DiastolicBloodPressureInMmHg[i] + '"';
      if (i !== SystolicBloodPressureInMmHg.length - 1) {
        dateTimeTakenString += ',';
        systolicBloodPressureString += ',';
        diastolicBloodPressureString += ',';
      }
    }
    dateTimeTakenString += ']';
    systolicBloodPressureString += ']';
    diastolicBloodPressureString += ']';
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addBloodPressures',
      {
        method: 'POST',
        body: `{"PatientID": ${patientId}, "DateTimeTaken": ${dateTimeTakenString}, "SystolicBloodPressureInMmHg": ${systolicBloodPressureString},"DiastolicBloodPressureInMmHg": ${diastolicBloodPressureString}, "IfManualInput": ${ifManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood pressure');
        console.log(response);
      }
    });
  });
}

export function addBloodPressureAutomatically(
  data: string[],
  patientID: number,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> {
  return new Promise(resolve => {
    let parsedSystolicBloodPressure: number[] = [];
    let parsedDiastolicBloodPressure: number[] = [];
    let parsedDateTime: string[] = [];

    // Parse Data
    for (let i = 0; i < data.length; i++) {
      let parsedData: Record<string, any> = parseXMLBloodPressureData(data[i]);

      parsedSystolicBloodPressure.push(parsedData.SystolicBloodPressureInmmHg);
      parsedDiastolicBloodPressure.push(
        parsedData.DiastolicBloodPressureInmmHg,
      );
      parsedDateTime.push(parsedData.DateTimeTaken);
    }

    addBloodPressureAutomaticallyToServer(
      patientID,
      parsedSystolicBloodPressure,
      parsedDiastolicBloodPressure,
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

export function getRecentBloodPressure(
  bloodPressureData: any[][],
  type: string,
): string {
  if (bloodPressureData.length === 0) {
    return 'N/A';
  }
  if (type === 'Systolic') {
    return `${bloodPressureData[bloodPressureData.length - 1][1]}`;
  }
  if (type === 'Diastolic') {
    return `${bloodPressureData[bloodPressureData.length - 1][2]}`;
  }
  return 'N/A';
}

export function addBloodPressureOnClick(
  inputSystolic: string,
  inputDiastolic: string,
  numberRegex: RegExp,
  patientID: number,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modalVisible: boolean,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
  setInputDiastolic: React.Dispatch<React.SetStateAction<string>>,
  setInputSystolic: React.Dispatch<React.SetStateAction<string>>,
): void {
  if (
    inputSystolic === '' ||
    inputDiastolic === '' ||
    !numberRegex.test(inputSystolic) ||
    !numberRegex.test(inputDiastolic)
  ) {
  } else {
    addBloodPressure(
      patientID,
      Number(inputSystolic),
      Number(inputDiastolic),
      true,
    ).then(successful => {
      setModalVisible(!modalVisible);
      if (successful === 'add successful') {
        setAddSuccessVisible(true);
      } else {
        // Failed view here
        setAddFailedVisible(true);
      }
      setStopDateTime(new Date().toISOString());
    });
    setInputDiastolic('');
    setInputSystolic('');
  }
}

export function getBloodPressure(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getBloodPressure?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseBloodPressureData(json));
}
