import { API } from '../../core/api-entity';

export class Transactions extends API {
  protected entityUrl = 'users';
  
  async getList(queryParams: Transactions.GetTransactionsRequest) {
    const { accountId, userId, ticker, offset, limit } = queryParams;
    const params = {
      ticker,
      limit: limit || 25,
      offset: offset || 0,
    };

    return this.request({
      url: `${userId}/accounts/${accountId}/transactions`,
      params,
    });
  }
}

export namespace Transactions {
  export interface GetTransactionsRequest extends API.PaginatedRequest {
    userId: string;
    accountId: string;
    ticker?: string[];
  }

  export enum TransactionStatus {
    PENDING = 'pending',
    FINISHED = 'finished',
  }
  
  export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    REFUND = 'refund',
  }
  
  export interface Transaction {
    account_id: string;
    subaccount_id: string;
    amount: number;
    iso_currency_code: string;
    categories: string[];
    issued_at: Date;
    transaction_id: string;
    transaction_type: TransactionType;
    status: TransactionStatus;
  }
}
