import 'react-native';

import {it, expect, jest} from '@jest/globals';
import {
  getCommunicationId,
  getCommunicationToken,
} from '../BackEndFunctionCall/ChatFunctions/Message';

// This is due to Azure's Free plan having occasional long spin up times if the API has not been called recently
jest.setTimeout(40000);

// Replaces imports that are not needed for automatic testing with blank mocks
jest.mock('node-libs-react-native/globals', () => {});
jest.mock('react-native-url-polyfill/auto', () => {});
jest.mock('react-native-background-timer', () => {});

it('Get Communication ID', async () => {
  // This is a simple test, but we do not know that the communication ID will always be the same if
  // the database is reset next year. So this just checks that the users have a communication ID that
  // can be received correctly.
  await expect(getCommunicationId(100000001)).resolves.not.toBeUndefined();
  await expect(getCommunicationId(100001)).resolves.not.toBeUndefined();
  await expect(getCommunicationId(123456)).rejects.toBe(
    'failed to get communicationId',
  );
});

it('Get Communication Token', async () => {
  await getCommunicationId(100000001).then(async communicationID => {
    await expect(
      getCommunicationToken(communicationID),
    ).resolves.not.toBeUndefined();
  });

  await expect(getCommunicationToken('aa')).rejects.toBe('Error');
});
