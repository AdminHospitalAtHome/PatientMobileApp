import {it, expect, jest} from '@jest/globals';
import {getUserToken} from '../BackEndFunctionCall/getUserToken';

jest.setTimeout(40000);

const providerUserId = `8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-2273-6bd9-6331-8e3a0d00c230`;
it('Get User Token Test', async () => {
  await getUserToken(providerUserId).then(output => {
    const expected = {
      userId: expect.any(String),
      token: expect.any(String),
      expiresOn: expect.any(String),
    };

    expect(expected).toMatchObject(output);
  });
});
