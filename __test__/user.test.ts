import { sdk, testUserId, testUserClientId, testAccountId, connectTestAccount, testPlaidAccountId, testEmail } from './env';
import { Users } from '../src/api/users';

describe(`user API`, () => {
  beforeAll(async () => {
    await sdk.init();
  });

  describe('create user', () => {
    describe('should',  () => {
      it('return new user',  async () => {
        const user = await sdk.users.create(
          { email: testEmail, client_user_id: testUserClientId },
        );

        expect(user).toEqual({
          id: expect.any(String),
          client_user_id: expect.any(String),
          accounts: [],
        });
      });
    });
  });

  it(`should return user access token`, async () => {
    const data = await sdk.users.createSession(testUserId);
    
    expect(data).toEqual(expect.objectContaining({
      token: expect.any(String),
      expires_at: expect.any(String),
    }));
  });
  
  it(`should create user token with scopes`, async () => {
    const data = await sdk.users.createSession(
      testUserId, 
      [ 
        Users.Scope.Accounts, 
        Users.Scope.AccountsBanking 
      ]
    );
    
    expect(data).toEqual(expect.objectContaining({
      token: expect.any(String),
      expires_at: expect.any(String),
    }));
  });

  describe('add/remove account to existing user', () => {
    let accountId;

    beforeAll(async () => {
      accountId = await connectTestAccount();
    });

    describe('should',  () => {
      it('return account',  async () => {
        const account = await sdk.users.addAccount(
          { id: testUserId },
          { email: testEmail, client_user_id: testUserClientId },
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
              id: expect.any(String),
              name: expect.any(String),
              currency: expect.any(String),
              balance: expect.any(String),
              type: expect.any(String),
              fiat_balance: expect.any(Number),
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
  
  it(`should return user by clientUserId`, async () => {
    const data = await sdk.users.getOne(null,testUserClientId);  

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
          id: expect.any(String),
          name: expect.any(String),
          currency: expect.any(String),
          balance: expect.any(String),
          type: expect.any(String),
          fiat_balance: expect.any(Number),
          balance_updated_at: expect.any(String),
          updated_at: expect.any(String),
        })
      ]),
    }));
  });

  if (testPlaidAccountId) {
    it(`should return account holdings by userId and accountId`, async () => {
      const holdings = await sdk.users.getAccountHoldings({
        userId: testUserId,
        accountId: testPlaidAccountId,
      });

      expect(holdings).toEqual(
        expect.objectContaining({
          accounts: expect.arrayContaining([
            expect.objectContaining({
              account_id: expect.any(String),
              mask: expect.any(String),
              name: expect.any(String),
              official_name: expect.any(String),
              subtype: expect.any(String),
              type: expect.any(String),
              plaid_account_id: expect.any(String),
              subaccount_id: expect.any(String),
            }),
          ]),
        }),
      );
    });
  }
});
