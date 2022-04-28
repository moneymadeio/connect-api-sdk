import { sdk, testAccountId } from './env';

export interface CustomMatchers<R = unknown> {
  toBeTypeOrNull(argument: any): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

describe(`account API`, () => {
  beforeAll(async () => {
    expect.extend({
      toBeTypeOrNull(received, expected) {
        if (received === null) {
          return {
            pass: true,
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }

        if (expected == String) {
          return {
            pass: typeof received == 'string' || received instanceof String,
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }

        if (expected == Number) {
          return {
            pass: typeof received == 'number' || received instanceof Number,
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }

        if (expected == Function) {
          return {
            pass: typeof received == 'function' || received instanceof Function,
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }

        if (expected == Object) {
          return {
            pass: received !== null && typeof received == 'object',
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }

        if (expected == Boolean) {
          return {
            pass: typeof received == 'boolean',
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }

        /* jshint -W122 */
        /* global Symbol */
        if (typeof Symbol != 'undefined' && this.expectedObject == Symbol) {
          return {
            pass: typeof received == 'symbol',
            message: () =>
              `expected null or instance of ${this.utils.printExpected(
                expected,
              )}, but received ${this.utils.printReceived(received)}`,
          };
        }
        /* jshint +W122 */

        return {
          pass: received instanceof expected,
          message: () =>
            `expected null or instance of ${this.utils.printExpected(
              expected,
            )}, but received ${this.utils.printReceived(received)}`,
        };
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
            accountNumber: expect.any(String),
            holderName: expect.any(String),
            routingNumber: expect.any(String),
            type: expect.any(String),
            balance: expect.toBeTypeOrNull(Number),
            source: expect.any(String),
          }),
        ])
      );
    });
  });
});
