import 'react-native';

import {it, expect, jest} from '@jest/globals';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';
import {
  addSpirometry,
  addSpirometryAutomaticallyToServer,
  getRecentSpirometry,
  getSpirometry,
} from '../BackEndFunctionCall/spirometryFunction';

jest.setTimeout(40000);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

it('Add and Gets Spirometry', async () => {
  const startDateTime: string = new Date().toISOString();

  await addSpirometry(300000001, 4.12, 97, true).then(output => {
    expect(output).toBe('add successful');
  });

  const stopDateTime: string = new Date().toISOString();

  await getSpirometry(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 4.12, 97]]);
  });
});

it('Add to Spirometry Failure Test', async () => {
  await addSpirometry(999999999, 4.12, 98, true).catch(output => {
    expect(output).toBe('failed to add spirometry');
  });
});

it('Get Spirometry Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getSpirometry(999999999, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([]);
  });
});

it('Get Recent Spirometry', async () => {
  const startDateTime: string = new Date().toISOString();
  await addSpirometry(300000001, 4.12, 98, true).then(output => {
    expect(output).toBe('add successful');
  });

  const stopDateTime: string = new Date().toISOString();

  await getSpirometry(300000001, startDateTime, stopDateTime).then(output => {
    expect(getRecentSpirometry(output)).toBe('4.12 L');
  });
});

it('Get Recent Spirometry Failure', async () => {
  expect(getRecentSpirometry([])).toEqual('N/A');
});

it('Add and Get Spirometries', async () => {
  const startDateTime: string = new Date().toISOString();

  await addSpirometryAutomaticallyToServer(
    300000001,
    [4.12],
    [97],
    [startDateTime],
    true,
  ).then(output => {
    expect(output).toBe('add successful');
  });

  const stopDateTime: string = new Date().toISOString();

  await getSpirometry(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 4.12, 97]]);
  });
});
