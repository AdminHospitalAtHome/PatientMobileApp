/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

// Test UploadWeight API
// Refrence: https://aboutreact.com/react-native-http-networking/
it('Upload Data to UploadWeight correctly', () => {
  fetch('https://hospital-at-home.azurewebsites.net/api/uploadWeight?code=a_i9B0rOEP4VLleK5_AR3HUo_B3sWT-ghKnyUVPtGeaaAzFu-gQYIw==', {
    method: 'POST',
    body: '{"PatientID":"1", "DateTimeTaken": "2023-9-20 08:00:00.000", "WeightInPounds":200, "IfManualInput":1}'
  }).then((response) => response.json())
  .then((responseJson) => {
    expect(responseJson.status_code).toBe(200);
  })
});