import { MoneymadeSDK } from '../../src/sdk';

export const testUserId = process.env.TEST_USER_ID;
export const testAccountId = process.env.TEST_ACCOUNT_ID;

export const sdk = new MoneymadeSDK({
  secret: process.env.TEST_SECRET,
  apiKey: process.env.TEST_API_KEY,
});
