/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {AddWeight} from "../BackEndFunctionCall/AddWeight";

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import getCurrentDateTime from "../BackEndFunctionCall/getCurrentDateAndTime";

it('renders correctly', () => {
  renderer.create(<App />);
});

// Test UploadWeight API
// Refrence: https://aboutreact.com/react-native-http-networking/
// it('Upload Data to getWeight correctly', () => {
//   fetch('https://hospital-at-home.azurewebsites.net/api/uploadWeight?code=a_i9B0rOEP4VLleK5_AR3HUo_B3sWT-ghKnyUVPtGeaaAzFu-gQYIw==', {
//     method: 'GET',
//     body: '{"PatientID":"1", "StartDateTime":"2023-01-01 07:00:00.000", "EndDateTime":"2023-01-01 09:00:00.000"}'
//   }).then((response) => response.json())
//   .then((responseJson) => {
//     expect(responseJson.status_code).toBe(200);
//     expect(responseJson.Data[0].DateTimeTaken).toBe('2023-01-01 08:00:00.000')
//     expect(responseJson.Data[0].WeightInPounds).toBe(190.2)
//     expect(responseJson.Data[0].IfManualInput).toBe(1)
//   })
// });

// Refrence Output of API
/*
{'Data': [{'DateTimeTaken':'2023-01-10 08:00:00.000', 'WeightInPounds':200, 'IfManualInput':1}]}
*/
//'1', '2023-01-01 08:00:00.000', 190.2, 1)

// addWeight test
it("Post weight data", ()=>{
  fetch("https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight", {
    method: 'POST',
    body:'{"PatientID" : "3", "DateTimeTaken" : "2023-01-01 07:00:00.000", "WeightInPounds": "106", "IfManualInput": "True"}'
  }).then((response) => response.json())
      .then((responseJson)=>{
        expect(responseJson.status_code).toBe(201);
      })

})

