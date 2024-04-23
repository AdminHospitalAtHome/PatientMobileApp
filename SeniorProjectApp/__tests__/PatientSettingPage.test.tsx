import 'react-native';
import {it, expect, jest} from '@jest/globals';
import {
  getAccessibilityMode,
  setAccessibilityMode,
} from '../BackEndFunctionCall/settingsPageFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// This is due to Azure's Free plan having occasional long spin up times if the API has not been called recently

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

// it('fail to get accessibility mode ', async () => {
//   await expect(getAccessibilityMode(999999999)).rejects.toBe(
//     false,
//   );
// });

//todo: create fail to update accessibility mode when applying user identification
