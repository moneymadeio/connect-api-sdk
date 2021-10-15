import { sdk, testUserId, testAccountId } from './env';

describe(`user API`, () => {
  it(`should return user by id`, async () => {
    const data = await sdk.users.getOne(testUserId);

    expect(data).toEqual(expect.objectContaining({
      id: expect.any(String),
      accounts: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          provider: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            slug: expect.any(String),
            strategy: expect.any(String),
            logo: expect.any(String),
          }),
        })
      ]),
    }));
  });

  it(`should return user accoutn by userId and accountId`, async () => {
    const data = await sdk.users.getAccount({
      userId: testUserId,
      accountId: testAccountId,
    });

    expect(data).toEqual(expect.objectContaining({
      id: expect.any(String),
      provider: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        slug: expect.any(String),
        strategy: expect.any(String),
        logo: expect.any(String),
      }),
      subaccounts: expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          currency: expect.any(String),
          balance: expect.any(String),
          type: expect.any(String),
          fiat_balance: expect.any(String),
          balance_updated_at: expect.any(String),
          updated_at: expect.any(String),
        })
      ]),
    }));
  });
});

