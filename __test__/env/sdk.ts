import { MoneymadeSDK } from '../../src/sdk';

export const testUserId = process.env.TEST_USER_ID;
export const testUserClientId = process.env.TEST_CLIENT_USER_ID;
export const testAccountId = process.env.TEST_ACCOUNT_ID;
export const testPlaidAccountId = process.env.TEST_PLAID_ACCOUNT_ID;
export const testEmail = process.env.TEST_EMAIL;
export const testUrl = process.env.TEST_URL;
export const testWebhookId = process.env.TEST_WEBHOOK_ID;

export const sdk = new MoneymadeSDK({
  secret: process.env.TEST_SECRET,
  apiKey: process.env.TEST_API_KEY,
});
