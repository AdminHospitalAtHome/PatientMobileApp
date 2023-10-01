/*
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';
import {getWeightCall} from '../BackEndFunctionCall/weightFunction';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// addWeight test
it('Post weight data', () => {
  fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight', {
    method: 'POST',
    body: `{"PatientID" : 3, "DateTimeTaken" : "2023-07-12 07:00:00.000", "WeightInPounds": 145, "IfManualInput": true}`,
  })
    .then(response => response.json())
    .then(responseJson => {
      expect(responseJson.status_code).toBe(201);
    });
});

it('Gets Weight Data Correctly', () => {
  getWeightCall(1, '2023-01-01 08:00:00.000', '2023-01-01 08:00:00.000').then(
    output => {
      expect(output).toBe([['01-01-2023\n8:00 AM', 190.2]]);
    },
  );
});
