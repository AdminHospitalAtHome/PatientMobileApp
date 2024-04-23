/*
 * @format
 */

import 'react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, expect, jest} from '@jest/globals';
import {
  addWeight,
  addWeightAutomatically,
  getRecentWeight,
  getWeightCall,
} from '../BackEndFunctionCall/weightFunction';

// Note: test renderer must be required after react-native.
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';
import {
  addHeartRateAutomatically,
  getHeartRate,
} from '../BackEndFunctionCall/heartRateFunction';

// This is due to Azure's Free plan having occasional long spin uptimes if the API has not been called recently
jest.setTimeout(40000);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

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
  await getWeightCall(300000001, startDateTime, stopDateTime).then(output => {
    expect(getRecentWeight(output)).toEqual('180 lbs');
  });
});

it('Get Recent Weight Failure', async () => {
  await expect(getRecentWeight([])).toEqual('N/A');
});

it('Add Weight Automatically', async () => {
  const startDateTime: string = new Date().toISOString();
  const dateTimeTaken = startDateTime.substring(0, startDateTime.length - 1);
  let exampleGoodXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-weight>\n' +
    '  <id>1553d4d9-76b1-48ba-8051-d9699aaab882</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>' +
    dateTimeTaken +
    '000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-14T07:38:16.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-14T14:38:18.000000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-14T07:38:18.000000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <value>78.6</value>\n' +
    '  <units>kg</units>\n' +
    '  <value-in-metric>78.6</value-in-metric>\n' +
    '  <value-in-us>173.3</value-in-us>\n' +
    '  <bc-fat-percent>18.8</bc-fat-percent>\n' +
    '  <bc-muscle-weight>60.7</bc-muscle-weight>\n' +
    '  <bc-water-percent>57.8</bc-water-percent>\n' +
    '  <bc-bones-weight>3.2</bc-bones-weight>\n' +
    '  <bc-amr>2883</bc-amr>\n' +
    '  <bc-metabolic-age>31</bc-metabolic-age>\n' +
    '  <bc-overall-rating>5</bc-overall-rating>\n' +
    '  <bcp-user-number>1</bcp-user-number>\n' +
    '  <bcp-height-in-mm>1700</bcp-height-in-mm>\n' +
    '  <bcp-age>34</bcp-age>\n' +
    '  <bcp-activity-level>1</bcp-activity-level>\n' +
    '  <bcp-gender>male</bcp-gender>\n' +
    '</measurements-weight>';
  const fakeSetState = () => {};
  const fakeSetAddSuccessVisible = () => {};
  await addWeightAutomatically(
    [exampleGoodXML],
    300000001,
    fakeSetAddSuccessVisible,
    fakeSetState,
    fakeSetState,
  ).then(async () => {
    const stopDateTime: string = new Date().toISOString();
    await getWeightCall(300000001, startDateTime, stopDateTime).then(
      (result: any[][]) => {
        expect(result).toStrictEqual([[timeTableParser(startDateTime), 173]]);
      },
    );
  });
});
