/*
 * @format
 */

import 'react-native';

import {it, expect} from '@jest/globals';
import {
  addBloodOxygen,
  getBloodOxygen,
} from '../BackEndFunctionCall/bloodOxygenFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

it('Adds and Gets Blood Oxygen', async () => {
  const startDateTime: string = new Date().toISOString();
  await addBloodOxygen(300000001, 98, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();

  await getBloodOxygen(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 98]]);
  });
});
