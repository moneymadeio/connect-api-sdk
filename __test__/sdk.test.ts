import { MoneymadeSDK } from '../src/sdk';

const userId = process.env.TEST_USER_ID;
const sdk = new MoneymadeSDK({
  secret: process.env.TEST_SECRET,
  apiKey: process.env.TEST_API_KEY,
});

describe(`linkToken API`, () => {
  it(`should return token`, async () => {
    expect(await sdk.linkToken.getLinkToken(userId)).toEqual(expect.any(String));
  });
});
