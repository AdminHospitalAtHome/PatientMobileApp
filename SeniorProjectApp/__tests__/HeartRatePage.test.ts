/*
 * @format
 */
import 'react-native';

import {it, expect, jest} from '@jest/globals';
import {
  addHeartRate,
  addHeartRateAutomatically,
  getHeartRate,
  getRecentHeartRate,
} from '../BackEndFunctionCall/heartRateFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// This is due to Azure's Free plan having occasional long spin uptimes if the API has not been called recently
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
  });
});

it('Get Recent HeartRate Failure', () => {
  expect(getRecentHeartRate([])).toEqual('N/A');
});

it('Add Heart Rate Automatically', async () => {
  const startDateTime: string = new Date().toISOString();
  const dateTimeTaken = startDateTime.substring(0, startDateTime.length - 1);
  let exampleGoodXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-bloodpressure>\n' +
    '  <id>c402e177-95c9-493b-b12f-7b4ef42d0add</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>' +
    dateTimeTaken +
    '000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-11T07:21:00.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-11T14:21:03.098145000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-11T07:21:03.098145000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <systolic>121</systolic>\n' +
    '  <diastolic>81</diastolic>\n' +
    '  <pulse>81</pulse>\n' +
    '  <predefined-tags-str>measured_arm_left, body_position_sitting</predefined-tags-str>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <sensor>\n' +
    '    <name>com.taidoc.taidocbus.bp</name>\n' +
    '    <serial>3128213440001333</serial>\n' +
    '    <address>8C:DE:52:30:55:94</address>\n' +
    '    <manufacturer>TaiDoc</manufacturer>\n' +
    '    <model>3128</model>\n' +
    '    <device-db-title>TD-3128</device-db-title>\n' +
    '    <device-db-id>95</device-db-id>\n' +
    '  </sensor>\n' +
    '</measurements-bloodpressure>';
  const fakeSetState = () => {};
  const fakeSetAddSuccessVisible = () => {};
  await addHeartRateAutomatically(
    [exampleGoodXML],
    300000001,
    fakeSetAddSuccessVisible,
    fakeSetState,
    fakeSetState,
  ).then(async () => {
    const stopDateTime: string = new Date().toISOString();
    await getHeartRate(300000001, startDateTime, stopDateTime).then(
      (result: any[][]) => {
        expect(result).toStrictEqual([[timeTableParser(startDateTime), 81]]);
      },
    );
  });
});
