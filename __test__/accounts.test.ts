import { sdk, testAccountId } from './env';

interface CustomMatchers<R = unknown> {
  toBeTypeOrNull(arg: any): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
  }
}

describe(`account API`, () => {
  beforeAll(async () => {
    expect.extend({
      toBeTypeOrNull(received, argument) {
        if (received === null) {
          return {
            message: () => `Ok`,
            pass: true,
          };
        } else {
          return {
            message: () =>
              `expected ${received} to be ${argument} type or null`,
            pass: false,
          };
        }
      },
    });

    await sdk.init();
  });

  describe('should return account bank details', () => {
    it('return bank details', async () => {
      const data = await sdk.accounts.getBankDetails(testAccountId);

      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            account_number: expect.any(String),
            holder_name: expect.any(String),
            routing_number: expect.any(String),
            type: expect.any(String),
            balance: expect.any(Number),
            source: expect.any(String),
          }),
        ])
      );
    });
  });

  describe('should return account holdings', () => {
    it('return accounts holdings', async () => {
      const data = await sdk.accounts.getHoldings(testAccountId);

      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            account_id: expect.any(String),
            subaccount_id: expect.any(String),
            ticker: expect.any(String),
            name: expect.any(String),
            isin: expect.toBeTypeOrNull(String),
            type: expect.any(String),
            amount:  expect.any(Number),
            current_price:  expect.toBeTypeOrNull(Number),
            current_amount_price:  expect.any(Number),
          }),
        ])
      );
    });
  });
});
