/*
 * @format
 */

import 'react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, expect, jest} from '@jest/globals';
import {
  addWeight,
  getRecentWeight,
  getWeightCall,
} from '../BackEndFunctionCall/weightFunction';

// Note: test renderer must be required after react-native.
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// This is due to Azure's Free plan having occasional long spin uptimes if the API has not been called recently
jest.setTimeout(40000);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

it('Adds and Gets Weight', async () => {
  const startDateTime: string = new Date().toISOString();
  await addWeight(300000001, 180, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();

  await getWeightCall(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 180]]);
  });
});

it('Add to Weight Failure Test', async () => {
  await addWeight(999999999, 199, true).catch(output => {
    expect(output).toBe('failed to add weight');
  });
});

it('Get Weight Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getWeightCall(999999999, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([]);
  });
});

it('Get Recent Weight', async () => {
  const startDateTime: string = new Date().toISOString();
  await addWeight(300000001, 180, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();
  //await expect(getRecentWeight(300000001)).resolves.toBe('180 lbs');
  await getWeightCall(300000001, startDateTime, stopDateTime).then(output => {
    expect(getRecentWeight(output)).toEqual('180 lbs');
  });
});

it('Get Recent Weight Failure', async () => {
  await expect(getRecentWeight([])).resolves.toEqual('N/A');
});
