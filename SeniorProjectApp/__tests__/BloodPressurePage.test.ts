/*
 * @format
 */

import 'react-native';

import {it, expect, jest} from '@jest/globals';
import {
  addBloodPressure,
  addBloodPressureAutomatically,
  addBloodPressureAutomaticallyToServer,
  getBloodPressure,
  getRecentBloodPressure,
} from '../BackEndFunctionCall/bloodPressureFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';
import {addSpirometryAutomaticallyToServer} from '../BackEndFunctionCall/spirometryFunction';

// This is due to Azure's Free plan having occasional long spin up times if the API has not been called recently
jest.setTimeout(40000);
// Add Blood Pressure test
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

it('Adds and Gets Blood Pressure', async () => {
  const startDateTime: string = new Date().toISOString();
  await addBloodPressure(300000001, 120, 80, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();

  await getBloodPressure(300000001, startDateTime, stopDateTime).then(
    output => {
      expect(output).toStrictEqual([[timeTableParser(startDateTime), 120, 80]]);
    },
  );
});

it('Add to Blood Pressure Failure Test', async () => {
  await addBloodPressure(999999999, 121, 81, true).catch(output => {
    expect(output).toBe('failed to add blood pressure');
  });
});

it('Get Blood Oxygen Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getBloodPressure(999999999, startDateTime, stopDateTime).then(
    output => {
      expect(output).toStrictEqual([]);
    },
  );
});

it('Get Recent Blood Pressure', async () => {
  expect(
    getRecentBloodPressure(
      [
        ['DateTime', '123', '81'],
        ['DateTime', '122', '82'],
        ['DateTime', '121', '81'],
      ],
      'Systolic',
    ),
  ).toEqual('121');
  expect(
    getRecentBloodPressure(
      [
        ['DateTime', '123', '83'],
        ['DateTime', '122', '82'],
        ['DateTime', '121', '81'],
      ],
      'Diastolic',
    ),
  ).toEqual('81');
  expect(getRecentBloodPressure([], 'Diastolic')).toEqual('N/A');
});

it('Add Blood Pressure Automatically', async () => {
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
  await addBloodPressureAutomatically(
    [exampleGoodXML],
    300000001,
    fakeSetAddSuccessVisible,
    fakeSetState,
    fakeSetState,
  ).then(async () => {
    const stopDateTime: string = new Date().toISOString();
    await getBloodPressure(300000001, startDateTime, stopDateTime).then(
      (result: any[][]) => {
        expect(result).toStrictEqual([
          [timeTableParser(startDateTime), 121, 81],
        ]);
      },
    );
  });
});
