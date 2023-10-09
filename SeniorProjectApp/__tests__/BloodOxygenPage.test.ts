/*
 * @format
 */

import 'react-native';

import {it, expect} from '@jest/globals';
import {
  addBloodOxygen,
  getBloodOxygen,
} from '../BackEndFunctionCall/bloodOxygenFunction';

// Add Blood Pressure test
it('Add Blood Oxygen Test', async () => {
  await addBloodOxygen(300000001, 98, true).then(output => {
    expect(output).toBe('add successful');
  });
});

it('Get Blood Oxygen Test', async () => {
  await getBloodOxygen(
    100000001,
    '2023-01-01T08:00:00.000',
    '2023-01-03T08:00:00.000',
  ).then(output => {
    expect(output).toStrictEqual([
      ['01-01-2023\n3:00 AM', 98],
      ['01-02-2023\n3:00 AM', 97],
      ['01-03-2023\n3:00 AM', 97],
    ]);
  });
});
