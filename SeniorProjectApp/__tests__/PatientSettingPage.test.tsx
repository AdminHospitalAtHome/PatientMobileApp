import 'react-native';
import {it, expect, jest} from '@jest/globals';
import {
  getAccessibilityMode,
  setAccessibilityMode,
} from '../BackEndFunctionCall/settingsPageFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

it('update and Gets accessibility mode', async () => {
  await setAccessibilityMode(true);
  expect(AsyncStorage.setItem).toBeCalledWith('AccessibilityMode?', 'true');
  await getAccessibilityMode().then(res => {
    expect(res).toBe(true);
  });
  await setAccessibilityMode(false);
  await getAccessibilityMode().then(res => {
    expect(res).toBe(false);
  });
});
//todo: create fail to update accessibility mode when applying user identification
