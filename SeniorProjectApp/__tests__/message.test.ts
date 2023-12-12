import 'react-native';

import {it, expect, jest} from '@jest/globals';
import {getChatThread} from '../BackEndFunctionCall/ChatFunctions/Message';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// This is due to Azure's Free plan having occasional long spin up times if the API has not been called recently
jest.setTimeout(40000);

it('Get User Chat Thread', async () => {
  await getChatThread("8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-22ff-fd2a-9c32-8e3a0d00150e").then(output => {
    expect(output[0].ThreadId).toBe('19:setHmDuPbRwyCC-MR-2DQxJjEL3dhFRbF5XQgoTDhJE1@thread.v2');
  });

  // await getChatThread("8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-2273-6bd9-6331-8e3a0d00c230").then(output => {
  //   expect(output).rejects.toThrow("no thread found");
  // });
});
