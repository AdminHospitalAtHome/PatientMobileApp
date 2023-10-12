/*
 * @format
 */

import 'react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, expect} from '@jest/globals';
import {
  addWeight,
  getRecentWeight,
  getWeightCall,
} from '../BackEndFunctionCall/weightFunction';

// Note: test renderer must be required after react-native.
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// addWeight tes

it('Get Recent Weight Data Correctly', async () => {
  let num1 = Math.floor(Math.random() * 100 + 101);
  let num2 = Math.floor(Math.random() * 100 + 101);
  await addWeight(300000001, num1, true).then(output => {
    expect(output).toBe('add successful');
  });
  await addWeight(300000001, num2, true).then(output => {
    expect(output).toBe('add successful');
  });
  await getRecentWeight(300000001).then(res => {
    expect(res[0].WeightInPounds).toBe(num2);
    expect(res[1].WeightInPounds).toBe(num1);
  });
});

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
