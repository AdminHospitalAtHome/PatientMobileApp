/*
 * @format
 */
import 'react-native';

import {it, expect, jest} from '@jest/globals';
import {
  addHeartRate,
  getHeartRate,
  getRecentHeartRate,
} from '../BackEndFunctionCall/heartRateFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// This is due to Azure's Free plan having occasional long spin up times if the API has not been called recently
jest.setTimeout(40000);
// Add Heart Rate test

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

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

it('Add to Heart Rate Failure Test', async () => {
  await addHeartRate(999999999, 121, true).catch(output => {
    expect(output).toBe('failed to add heart rate');
  });
});

it('Get Heart Rate Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getHeartRate(999999999, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([]);
  });
});

it('Get Recent HeartRate', async () => {
  const startDateTime: string = new Date().toISOString();
  await addHeartRate(300000001, 76, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();
  await getHeartRate(300000001, startDateTime, stopDateTime).then(output => {
    expect(getRecentHeartRate(output)).toEqual('76 BPM');
  })
});

it('Get Recent HeartRate Failure', () => {
  expect(getRecentHeartRate([])).toEqual('N/A');
});
