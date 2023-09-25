/*
* @format
*/
import 'react-native';

import {it, expect} from '@jest/globals';
import { addBloodPressure, getBloodPressure } from '../BackEndFunctionCall/bloodPressureFunction';
import { getHeartRate } from '../BackEndFunctionCall/heartRateFunction';



// Add Heart Rate test
it('Add Heart Rate Test', () => {
  addBloodPressure(3, 120, 80, true).then((output) => {
    expect(output).toBe('add successful')
  })
});


// Get Heart Rate Test
it('Gets Heart Rate Test', () => {
  getHeartRate(1, '2023-01-01 08:00:00.000', '2023-01-01 08:00:00.000')
  .then((output) => {
    expect(output).toBe([['01-01-2023', '8:00 AM', 98], 
                         ['01-01-2023', '8:00 AM', 97]])
  })
});