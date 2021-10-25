import { sdk, testAccountId, testUserId } from './env';

describe('transactions API', () => {
  describe('getList', () => {
    it('should return data', async () => {
      const trs = await sdk.transactions.getList({
        userId: testUserId,
        accountId: testAccountId,
      });

      expect(trs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            account_id: expect.any(String),
            amount: expect.any(Number),
            iso_currency_code: expect.any(String),
            categories: [],
            status: expect.any(String),
            transaction_type: expect.any(String),
            subaccount_id: expect.any(String),
            issued_at: expect.any(String),
            transaction_id: expect.any(String),
          }),
        ]),
      );
    });
  });
});