import { sdk, testUserId, testAccountId, connectTestAccount } from './env';

describe(`user API`, () => {
  beforeAll(async () => {
    await sdk.init();
  });

  describe('create user', () => {
    let accountId;

    beforeAll(async () => {
      accountId = await connectTestAccount();
    });

    describe('should',  () => {
      it('return new user',  async () => {
        const user = await sdk.users.create(
          { account_id: accountId, token: 'temporary empty' },
        );

        expect(user).toEqual({
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
        });
      });
    });
  });

  describe('add/remove account to existing user', () => {
    let accountId;

    beforeAll(async () => {
      accountId = await connectTestAccount();
    });

    describe('should',  () => {
      it('return account',  async () => {
        const account = await sdk.users.addAccount(
          { id: testUserId, accounts: [] },
          { account_id: accountId, token: 'temporary empty' },
        );

        expect(account).toEqual({
          id: expect.any(String),
          provider_id: expect.any(Number),
          user_id: expect.any(String),
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
            }),
          ]),
        });
      });
    });

    afterAll(async () => {
      await sdk.users.removeAccount({ userId: testUserId, accountId });
    });
  });

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

  it(`should return user account by userId and accountId`, async () => {
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
