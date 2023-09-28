/*
* @format
*/
import 'react-native';

import {it, expect} from '@jest/globals';
import { addHeartRate, getHeartRate } from '../BackEndFunctionCall/heartRateFunction';



// Add Heart Rate test
it('Add Heart Rate Test', async () => {
  await addHeartRate(3, 269, true).then((output) => {
    expect(output).toBe('add successful')
  })
});


// Get Heart Rate Test
it('Gets Heart Rate Test', async () => {
  await getHeartRate(1, '2023-01-01 08:00:00.000', '2023-01-01 08:00:00.000')
  .then((output) => {
    expect(output).toStrictEqual([['01-01-2023', '3:00 AM', 98], 
                         ['01-01-2023', '3:00 AM', 97]])
  })
});