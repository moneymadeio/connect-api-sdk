import { API } from '../../core/api-entity';
import { Providers } from '../providers';

export class Users extends API {
  entityUrl = 'users';

  async create(account: Users.CreateUserPayload): Promise<Users.User> {
    return this.request({
      method: 'POST',
      data: account,
    });
  }

  async getOne(userId: string): Promise<Users.User> {
    return this.request({ url: userId });
  }

  async addAccount(user: Users.User, account: Users.CreateUserPayload): Promise<Users.Account> {
    return this.request({
      url: `${user.id}/accounts`,
      method: 'POST',
      data: account,
    });
  }
  
  async removeAccount({ userId, accountId }: Users.AccountQuery): Promise<void> {
    return this.request({
      url: `${userId}/accounts/${accountId}`,
      method: 'DELETE',
    });
  }

  async getAccount({ userId, accountId }: Users.AccountQuery): Promise<Users.Account> {
    return this.request({ url: `${userId}/accounts/${accountId}` });
  }
}

export namespace Users {
  export interface CreateUserPayload {
    account_id: string;
    token: string;
  }

  export interface Subaccount {
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

  export interface User {
    id: string;
    accounts: { id: string; provider: Providers.Provider }[];
  }

  export interface AccountQuery {
    userId: string;
    accountId: string;
  }
}
