/*
 * @format
 */

import 'react-native';

import {it, expect, jest} from '@jest/globals';
import {
  addBloodOxygen,
  addBloodOxygenAutomatically,
  getBloodOxygen,
  getRecentBloodOxygen,
} from '../BackEndFunctionCall/bloodOxygenFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// This is due to Azure's Free plan having occasional long spin-up times if the API has not been called recently
jest.setTimeout(40000);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

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

it('Get Recent Blood Oxygen', async () => {
  await addBloodOxygen(300000001, 98, true).then(output => {
    expect(output).toBe('add successful');
  });
  await expect(getRecentBloodOxygen(300000001)).resolves.toBe('98%');
});

it('Get Recent Blood Oxygen Failure', async () => {
  await expect(getRecentBloodOxygen(999999999)).resolves.toEqual('N/A');
});

it('Add Blood Oxygen Automatically', async () => {
  const startDateTime: string = new Date().toISOString();
  const dateTimeTaken = startDateTime.substring(0, startDateTime.length - 1);
  let exampleGoodXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-oxygen-stream>\n' +
    '  <id>86735ebc-d752-4110-89f6-e06d5519e9d2</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>' +
    dateTimeTaken +
    '000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-09T11:10:09.751000000-05:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-18000</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-09T16:10:09.751000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-09T11:10:09.751000000-05:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-18000</client-received-at-utc-offset>\n' +
    '  <measurement-duration>20001</measurement-duration>\n' +
    '  <spo2-min>95</spo2-min>\n' +
    '  <spo2-max>98</spo2-max>\n' +
    '  <spo2-last>96</spo2-last>\n' +
    '  <spo2-average>95.35</spo2-average>\n' +
    '  <pulse-min>96</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-last>98</pulse-last>\n' +
    '  <pulse-average>100.1</pulse-average>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>d43f3553-3732-4145-a8ec-f5e05c95a019</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>20001</end>\n' +
    '      <oxygen>{"regular":{"waveform":{"values":[]}},"irregular":{"spo2":[96,56,95,1059,96,2060,96,3044,96,4045,96,5047,95,6072,95,7047,95,8047,95,9048,95,10046,95,11046,95,12058,96,13046,95,14061,95,15047,95,16047,95,17048,95,18056,96,19058],"pulse":[101,56,100,1059,100,2060,100,3044,101,4045,101,5047,102,6069,102,7047,102,8046,101,9047,100,10045,100,11045,99,12058,99,13046,99,14060,99,15046,99,16046,99,17048,99,18056,99,19058],"pulse_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6069,255,7047,255,8046,255,9047,255,10045,255,11045,255,12058,255,13046,255,14060,255,15046,255,16046,255,17048,255,18056,255,19058],"spo2_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6072,255,7047,255,8047,255,9048,255,10046,255,11046,255,12058,255,13046,255,14061,255,15047,255,16047,255,17048,255,18056,255,19058]}}</oxygen>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-oxygen-stream>\n';
  const fakeSetState = () => {};
  const fakeSetAddSuccessVisible = () => {};
  await addBloodOxygenAutomatically(
    [exampleGoodXML],
    300000001,
    fakeSetAddSuccessVisible,
    fakeSetState,
    fakeSetState,
  ).then(async () => {
    const stopDateTime: string = new Date().toISOString();
    await getBloodOxygen(300000001, startDateTime, stopDateTime).then(
      (result: any[][]) => {
        expect(result).toStrictEqual([[timeTableParser(startDateTime), 95]]);
      },
    );
  });
});
