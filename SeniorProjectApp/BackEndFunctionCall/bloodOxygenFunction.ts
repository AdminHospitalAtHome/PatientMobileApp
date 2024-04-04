import timeTableParser from './tableTimeParser';
import React from 'react';
import {parseXMLBloodOxygenData} from './BluetoothAutomaticVitals/MedMDeviceConnection';

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
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}", "BloodOxygenLevelInPercentage": ${bloodOxygenLevelInPercentage.toFixed(
          0,
        )} ,"IfManualInput": ${IfManualInput}}`,
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

export function getRecentBloodOxygen(patientID: number): Promise<string> {
  return new Promise(resolve => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getRecentBloodOxygen?patientID=${patientID}`,
    )
      .then(res => res.json())
      .then(output => {
        if (output.length === 1) {
          resolve(`${output[0].BloodOxygenLevelInPercentage}%`);
        } else {
          resolve('N/A');
        }
      });
  });
}

export function addBloodOxygenAutomatically(
  data: string[],
  patientID: number,
  setAddSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setAddFailedVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> {
  return new Promise(resolve => {
    let parsedBloodOxygen: number[] = [];
    let parsedDateTime: string[] = [];

    // Parse Data
    for (let i = 0; i < data.length; i++) {
      let parsedData: Record<string, any> = parseXMLBloodOxygenData(data[i]);

      parsedBloodOxygen.push(parsedData.BloodOxygenInPercentage);
      parsedDateTime.push(parsedData.DateTimeTaken);
    }

    addBloodOxygenAutomaticallyToServer(
      patientID,
      parsedBloodOxygen,
      parsedDateTime,
      false,
    )
      .then(() => {
        console.log('Added Good');
        setAddSuccessVisible(true);
        setStopDateTime(new Date().toISOString());
        resolve();
      })
      .catch(() => {
        console.log('FAIL');
        setAddFailedVisible(true);
        setStopDateTime(new Date().toISOString());
        resolve();
      });
  });
}

export function addBloodOxygenOnClick(
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
    //warning messages will already be displayed in this case
  } else {
    addBloodOxygen(patientID, Number(input), true).then(successful => {
      setModalVisible(!modalVisible);
      if (successful === 'add successful') {
        setAddSuccessVisible(true);
      } else {
        setAddFailedVisible(true);
      }
      setStopDateTime(new Date().toISOString());
    });
    setInput('');
  }
}

export function addBloodOxygenAutomaticallyToServer(
  patientId: number,
  bloodOxygen: number[],
  dateTimeTaken: string[],
  ifManualInput: boolean,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let dateTimeTakenString = '[';
    let bloodOxygenString = '[';
    for (let i = 0; i < bloodOxygen.length; i++) {
      dateTimeTakenString += '"' + dateTimeTaken[i] + '"';
      bloodOxygenString += '"' + bloodOxygen[i].toFixed(0) + '"'; // toFixed sets decimal points
      if (i !== bloodOxygen.length - 1) {
        dateTimeTakenString += ',';
        bloodOxygenString += ',';
      }
    }
    dateTimeTakenString += ']';
    bloodOxygenString += ']';

    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addBloodOxygens',
      {
        method: 'POST',
        body: `{"PatientID": ${patientId}, "DateTimeTaken": ${dateTimeTakenString}, "BloodOxygenLevelInPercentage": ${bloodOxygenString}, "IfManualInput": ${ifManualInput}}`,
      },
    ).then(response => {
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood oxygen');
      }
    });
  });
}
