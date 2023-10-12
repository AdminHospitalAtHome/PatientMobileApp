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

it('Add to Blood Oxygen Failure Test', async () => {
  await addBloodOxygen(999999999, 98, true).catch(output => {
    expect(output).toBe('failed to add blood oxygen');
  });
});

it('Get Blood Oxygen Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getBloodOxygen(999999999, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([]);
  });
});
