import 'react-native';
import {it, expect} from '@jest/globals';
import {
  getAccessibilityMode,
  setAccessibilityMode,
} from '../BackEndFunctionCall/userInfo';
import timeTableParser from "../BackEndFunctionCall/tableTimeParser";


it('update and Gets accessibility mode', async () => {
  await setAccessibilityMode(300000001, true).then(output => {
    expect(output).toBe('set successful');
  });

  await getAccessibilityMode(300000001).then(output => {
    expect(output).toStrictEqual(true);
  });
});

it('fail to get accessibility mode ', async () => {
  await expect(getAccessibilityMode(999999999)).rejects.toBe(
    'failed to get accessibility mode',
  );
});


//todo: create fail to update accessibility mode when applying user identification
