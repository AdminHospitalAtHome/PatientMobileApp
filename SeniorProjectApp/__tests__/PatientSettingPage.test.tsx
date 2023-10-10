import 'react-native';
import {it, expect} from '@jest/globals';
import {
  getAccessbilityMode,
  setAccessbilityMode,
} from '../BackEndFunctionCall/userInfo';

//todo: add setFalse test right before and test together
it('Get Accessbility Mode - Flase', async (): Promise<void> =>
  await getAccessbilityMode(100000001).then(res => expect(res).toBe(false)));

it('Get Accessbility Mode - Flase', async (): Promise<void> =>
  await getAccessbilityMode(200000001).then(res => expect(res).toBe(true)));
