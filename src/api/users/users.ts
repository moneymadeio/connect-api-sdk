import { API } from '../../core/api-entity';

export class Users extends API {
  entityUrl = 'users';

  async create(account: Users.CreateUserPayload) {
    return this.request({
      method: 'POST',
      data: account,
    });
  }

  async getOne(userId: string) {
    return this.request({ url: userId });
  }
  
  async removeAccount({ userId, accountId }: Users.AccountQuery) {
    return this.request({
      url: `${userId}/accounts/${accountId}`,
      method: 'DELETE',
    });
  }

  async getAccount({ userId, accountId }: Users.AccountQuery) {
    return this.request({ url: `${userId}/accounts/${accountId}` });
  }
}

export namespace Users {
  export interface CreateUserPayload {
    account_id: string;
    token: string;
  }

  export interface AccountQuery {
    userId: string;
    accountId: string;
  }
}
