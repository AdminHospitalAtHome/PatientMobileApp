/*
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';
import {addWeight, getRecentWeight, getWeightCall} from '../BackEndFunctionCall/weightFunction';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// addWeight test
it('Post weight data', async () => {
  await addWeight(100000001, 200, true).then(output => {
    expect(output).toBe('add successful');
  });
});

it('Gets Weight Data Correctly', async () => {
  await getWeightCall(
    100000001,
    '2023-01-01 08:00:00.000',
    '2023-01-01 08:00:00.000',
  ).then(output => {
    expect(output).toStrictEqual([['01-01-2023\n3:00 AM', 190]]);
  });
});

it('Get Recent Weight Data Correctly', async() => {
  await getRecentWeight(
      100000001,
  ).then(res => {
    expect(res[0].WeightInPounds).toBe(200);
  expect(res[1].WeightInPounds).toBe(200);

  });
});

// it('Test Weight Trend Correctly', async() => {
//   await weightTrend(
//       100000001,
//   ).then(res => {
//     expect().toBe();
//   });
// });
