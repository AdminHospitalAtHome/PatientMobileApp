import 'react-native';
import {it, expect} from '@jest/globals';
import {
  getAccessibilityMode,
  setAccessbilityMode,
} from '../BackEndFunctionCall/userInfo';

//todo: add setFalse test right before and test together
it('Get Accessbility Mode - Flase', async (): Promise<void> =>
  await getAccessibilityMode(100000001).then(res => expect(res[0].IfAccessibilityMode).toBe(false)));

it('Get Accessbility Mode - Flase', async (): Promise<void> =>
  await getAccessibilityMode(200000001).then(res => expect(res[0].IfAccessibilityMode).toBe(true)));
