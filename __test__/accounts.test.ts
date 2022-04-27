import { sdk, testAccountId } from './env';

describe(`account API`, () => {
  beforeAll(async () => {
    await sdk.init();
  });

  describe('should return account bank details', () => {
    it('return bank details', async () => {
      const data = await sdk.accounts.getBankDetails(testAccountId);

      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            accountNumber: expect.any(String),
            holderName: expect.any(String),
            routingNumber: expect.any(String),
            type: expect.any(String),
            balance: expect.any(Number),
            source: expect.any(String),
          }),
        ])
      );
    });
  });
});
