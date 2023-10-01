/*
 * @format
 */

import 'react-native';

import {it, expect} from '@jest/globals';
import {
  addBloodPressure,
  getBloodPressure,
} from '../BackEndFunctionCall/bloodPressureFunction';

// Add Blood Pressure test
it('Add Blood Pressure Test', () => {
  addBloodPressure(3, 120, 80, true).then(output => {
    expect(output).toBe('add successful');
  });
});

// Get Blood Pressure Test
it('Gets Blood Pressure Test', () => {
  getBloodPressure(
    1,
    '2023-01-01 08:00:00.000',
    '2023-01-01 08:00:00.000',
  ).then(output => {
    expect(output).toBe([['01-01-2023\n8:00 AM', 130, 71]]);
  });
});
