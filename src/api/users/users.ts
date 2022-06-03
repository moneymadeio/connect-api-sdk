import { API } from '../../core/api-entity';
import { Providers } from '../providers';

export class Users extends API {
  entityUrl = 'users';

  checkIds(userId: string, clientUserId: string){
    if(!userId && !clientUserId)
      throw new Error('userId or clientUserId is required');
  }
  
  async create(account: Users.CreateUserPayload): Promise<Users.User> {
    return this.request({
      method: 'POST',
      data: account,
    })
  }
  
  async createSession(userId: string, scopes?: Users.Scope[]): Promise<Users.UserSession> {
    return this.request({
      url: `${userId}/sessions`,
      method: 'POST',
      ...(scopes &&  { data : { scopes } }),
    });
  }

  async getOne(userId?: string, clientUserId?: string): Promise<Users.User> {
    this.checkIds(userId, clientUserId);

    return this.request({ url: clientUserId ? clientUserId : userId });
  }

  async addAccount(
    user: Pick<Users.User, 'id' | 'clientUserId'> | Users.User,
    account: Users.CreateUserPayload,
  ): Promise<Users.Account> {
    this.checkIds(user.id, user.clientUserId);

    return this.request({
      url: `${user?.clientUserId || user?.id}/accounts`,
      method: 'POST',
      data: account,
    });
  }
  
  async removeAccount({ userId, accountId, clientUserId }: Users.AccountQuery): Promise<void> {
    this.checkIds(userId, clientUserId);

    return this.request({
      url: `${clientUserId ? clientUserId : userId}/accounts/${accountId}`,
      method: 'DELETE',
    });
  }

  async getAccountIdentity({ userId, accountId, clientUserId }: Users.AccountQuery): Promise<Users.Identity> {
    this.checkIds(userId, clientUserId);

    return this.request({ url: `${clientUserId ? clientUserId : userId}/accounts/${accountId}/identity` });
  }

  async getAccountHoldings({ userId, accountId, clientUserId }: Users.AccountQuery): Promise<Users.Holdings> {
    this.checkIds(userId, clientUserId);

    return this.request({ url: `${clientUserId ? clientUserId : userId}/accounts/${accountId}/investments/holdings` });
  }

  async getAccount({ userId, accountId, clientUserId }: Users.AccountQuery): Promise<Users.Account> {
    this.checkIds(userId, clientUserId);

    return this.request({ url: `${clientUserId ? clientUserId : userId}/accounts/${accountId}` });
  }
}

export namespace Users {
  export interface CreateUserPayload {
    email: string;
    client_user_id: string;
  }

  export interface Subaccount {
    id: string;
    name: string;
    currency: string;
    balance: string;
    type: string;
    fiat_balance: number;
    balance_updated_at: string;
    updated_at: string;
  }

  export interface Account {
    id: string;
    provider: Providers.Provider;
    subaccounts: Subaccount[];
  }
  
  export interface UserSession {
    token: string;
    expires_at: string;
  }

  export enum Scope {
    All = '*',
    Accounts = 'accounts',
    AccountsBanking = 'accounts:banking',
    AccountsTransactions = 'accounts:transactions',
    AccountsHoldings = 'accounts:holdings',
    AccountsBalances = 'accounts:balances',
  }

  export interface User {
    id: string;
    clientUserId?: string;
    accounts: { id: string; provider: Providers.Provider }[];
  }

  export interface AccountQuery {
    userId: string;
    clientUserId?: string;
    accountId: string;
  }

  export interface Email {
    data: string;
    primary: boolean;
    type: string;
  }

  export interface Address {
    data: {
      city: string;
      country: string;
      postal_code: string;
      region: string;
      street: string;
    },
    primary: boolean;
  }

  export interface PhoneNumber {
    data: string;
    primary: boolean;
    type: string;
  }

  export interface Owner {
    emails: Email[];
    addresses: Address[];
    names: string[];
    phone_numbers: PhoneNumber[];
  }

  export interface AccountBalance {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: number;
    unofficial_currency_code: string;
  }

  export interface IdentityAccountInfo {
    account_id: string;
    subaccount_id: string;
    balances: AccountBalance;
    type: string;
    subtype: string;
    owners: Owner[];
    plaid_account_id: string;
  }

  export interface Identity {
    accounts: IdentityAccountInfo[];
    provider: {
      id: number;
      name: string;
      slug: string;
      strategy: string;
      logo: string;
    };
  };

  export interface Holding {
    account_id: string;
    cost_basis: number;
    institution_price: number;
    institution_price_as_of: number;
    institution_value: number;
    iso_currency_code: string;
    quantity: number;
    security_id: string;
    unofficial_currency_code: string;
    plaid_account_id: string;
    subaccount_id: string;
  }

  export interface Security {
    close_price: number;
    close_price_as_of: string;
    cusip: string;
    institution_id: string;
    institution_security_id: string;
    is_cash_equivalent: boolean;
    isin: string;
    iso_currency_code: string;
    name: string;
    proxy_security_id: string;
    security_id: string;
    sedol: string;
    ticker_symbol: string;
    type: string;
    unofficial_currency_code: string;
  }

  export interface Holdings {
    accounts: IdentityAccountInfo[];
    holdings: Holding[];
    securities: Security[];
    provider: {
      id: number;
      name: string;
      slug: string;
      strategy: string;
      logo: string;
    };
  }
}
