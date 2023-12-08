import timeTableParser from './tableTimeParser';
import React from 'react';

export function addBloodPressure(
  patientID: number,
  SystolicBloodPressureInMmHg: number,
  DiastolicBloodPressureInMmHg: number,
  IfManualInput: boolean,
) {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addBloodPressure',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}", "SystolicBloodPressureInMmHg": ${SystolicBloodPressureInMmHg},"DiastolicBloodPressureInMmHg": ${DiastolicBloodPressureInMmHg}, "IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood pressure');
      }
    });
  });
  return promise;
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

function parseBloodPressureData(bloodPressureJSON: any) {
  let bloodPressureArr = [];
  for (var i = 0; i < bloodPressureJSON.length; i++) {
    bloodPressureArr.push([
      timeTableParser(bloodPressureJSON[i].DateTimeTaken),
      bloodPressureJSON[i].SystolicBloodPressureInMmHg,
      bloodPressureJSON[i].DiastolicBloodPressureInMmHg,
    ]);
  }
  return bloodPressureArr;
}

export function getRecentBloodPressure(patientID: number): Promise<string[]> {
  return new Promise(resolve => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentBloodPressure?patientID=${patientID}`,
    )
      .then(res => res.json())
      .then(output => {
        if (output.length === 1) {
          resolve([
            `${output[0].SystolicBloodPressureInMmHg}`,
            `${output[0].DiastolicBloodPressureInMmHg}`,
          ]);
        } else {
          resolve(['N/A', 'N/A']);
        }
      });
  });
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
