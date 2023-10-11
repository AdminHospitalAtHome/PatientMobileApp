/*
 * @format
 */
import 'react-native';

import {it, expect} from '@jest/globals';
import {
  addHeartRate,
  getHeartRate,
} from '../BackEndFunctionCall/heartRateFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// Add Heart Rate test

it('Adds and Gets Heart Rate', async () => {
  const startDateTime: string = new Date().toISOString();
  await addHeartRate(300000001, 76, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();

  await getHeartRate(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 76]]);
  });
});
