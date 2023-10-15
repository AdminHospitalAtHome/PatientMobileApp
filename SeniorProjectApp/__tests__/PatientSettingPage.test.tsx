import 'react-native';
import {it, expect} from '@jest/globals';
import {
  getAccessibilityMode,
  setAccessibilityMode,
} from '../BackEndFunctionCall/userInfo';


it('Set Accessibility to false', async (): Promise<void> => {
  await setAccessibilityMode(300000001, false).then

});
it('Get Accessbility Mode - Flase', async (): Promise<void> =>
  await getAccessibilityMode(300000001).then(res => expect(res[0].IfAccessibilityMode).toBe(false)));



it('Get Accessbility Mode - Flase', async (): Promise<void> =>
  await getAccessibilityMode(300000001).then(res => expect(res[0].IfAccessibilityMode).toBe(true)));
