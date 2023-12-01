import 'react-native';
import {it, expect, jest} from '@jest/globals';
import {
  getAccessibilityMode,
  setAccessibilityMode,
} from '../BackEndFunctionCall/settingsPageFunctions';
// This is due to Azure's Free plan having occasional long spin up times if the API has not been called recently
jest.setTimeout(40000);

it('update and Gets accessibility mode', async () => {
  await setAccessibilityMode(true).then(output => {
    expect(output).toBe('set successful');
  });

  await getAccessibilityMode().then(output => {
    expect(output).toStrictEqual(true);
  });
});

// it('fail to get accessibility mode ', async () => {
//   await expect(getAccessibilityMode(999999999)).rejects.toBe(
//     false,
//   );
// });

//todo: create fail to update accessibility mode when applying user identification
