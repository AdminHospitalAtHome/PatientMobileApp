import timeTableParser from './tableTimeParser';
import React from 'react';

export function getSpirometry(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getSpirometry?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseSpirometryData(json));
}

export function getRecentSpirometry(spirometryData: any[][]): string {
  if (spirometryData.length === 0) {
    return 'N/A';
  }
  return `${spirometryData[spirometryData.length - 1][1]} L`;
}

// Sets the data to the format used by our application (includes FEV1 and FEV1/FVC
export function parseSpirometryData(spirometryJson: any) {
  let spirometryArr = [];
  for (let i = 0; i < spirometryJson.length; i++) {
    spirometryArr.push([
      timeTableParser(spirometryJson[i].DateTimeTaken),
      spirometryJson[i].FEV1InLiters,
      spirometryJson[i].FEV1_FVCInPercentage,
    ]);
  }
  return spirometryArr;
}

// Strips FEV1/FVC because we do not want that value for the Chart, only the table
export function parseSpirometryForChart(spirometryArr: any[][]) {
  let newSpirometryArr = [];
  for (let i = 0; i < spirometryArr.length; i++) {
    newSpirometryArr.push([spirometryArr[i][0], spirometryArr[i][1]]);
  }
  return newSpirometryArr;
}

export function addSpirometryOnClick(
  inputFEV1: string,
  inputFEV1_FVC: string,
  patientID: number,
  FEV1Regex: RegExp,
  FEV1_FVCRegex: RegExp,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modalVisible: boolean,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
  setInputFEV1: React.Dispatch<React.SetStateAction<string>>,
  setInputFEV1_FVC: React.Dispatch<React.SetStateAction<string>>,
) {
  if (
    inputFEV1 === '' ||
    inputFEV1_FVC === '' ||
    !FEV1_FVCRegex.test(inputFEV1_FVC) ||
    !FEV1Regex.test(inputFEV1)
  ) {
    //warning messages will already be displayed in this case
  } else {
    addSpirometry(
      patientID,
      Number(inputFEV1),
      Number(inputFEV1_FVC),
      true,
    ).then(successful => {
      setModalVisible(!modalVisible);
      if (successful === 'add successful') {
        setAddSuccessVisible(true);
      } else {
        setAddFailedVisible(true);
      }
      setStopDateTime(new Date().toISOString());
    });
    setInputFEV1('');
    setInputFEV1_FVC('');
  }
}

export function addSpirometry(
  patientID: number,
  FEV1: number,
  FEV1_FVC: number,
  IfManualInput: boolean,
) {
  return new Promise<string>((resolve, reject) => {
    const dateTime: String = new Date().toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addSpirometry',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}","FEV1InLiters": ${FEV1.toFixed(
          2,
        )}, "FEV1_FVCInPercentage":${FEV1_FVC.toFixed(
          0,
        )}, "IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add spirometry');
      }
    });
  });
}
