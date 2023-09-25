/*
* @format
*/

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('Gets Weight Data Correctly', () => {
    fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/getWeight?patientID=1&startDateTime=2023-01-01 08:00:00.000&stopDateTime=2023-01-10 08:00:00.000', {
        method: 'GET'
    }).then((response) => {
        response.json()
    }).then((responseJson) =>{
        // TODO: FIX 
        expect(responseJson).toBe([
            {
              "UniqueID": 1,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-01T08:00:00.000Z",
              "WeightInPounds": 190.2,
              "IfManualInput": true
            },
            {
              "UniqueID": 2,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-01T08:00:00.000Z",
              "WeightInPounds": 190.2,
              "IfManualInput": true
            },
            {
              "UniqueID": 3,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-02T08:00:00.000Z",
              "WeightInPounds": 190.4,
              "IfManualInput": false
            },
            {
              "UniqueID": 4,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-03T08:00:00.000Z",
              "WeightInPounds": 190.6,
              "IfManualInput": true
            },
            {
              "UniqueID": 5,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-04T08:00:00.000Z",
              "WeightInPounds": 190.8,
              "IfManualInput": true
            },
            {
              "UniqueID": 6,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-05T08:00:00.000Z",
              "WeightInPounds": 190.9,
              "IfManualInput": false
            },
            {
              "UniqueID": 7,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-06T08:00:00.000Z",
              "WeightInPounds": 191.4,
              "IfManualInput": true
            },
            {
              "UniqueID": 8,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-07T08:00:00.000Z",
              "WeightInPounds": 191.2,
              "IfManualInput": true
            },
            {
              "UniqueID": 9,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-08T08:00:00.000Z",
              "WeightInPounds": 191,
              "IfManualInput": false
            },
            {
              "UniqueID": 10,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-09T08:00:00.000Z",
              "WeightInPounds": 190,
              "IfManualInput": true
            },
            {
              "UniqueID": 11,
              "PatientID": "1",
              "DateTimeTaken": "2023-01-10T08:00:00.000Z",
              "WeightInPounds": 190,
              "IfManualInput": true
            }
          ])
    })
  });