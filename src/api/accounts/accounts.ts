import { API } from "../../core/api-entity";

export class Accounts extends API {
  entityUrl = 'accounts';

  async getBankDetails(accountId: string): Promise<Accounts.BankDetails[]> {
    return this.request({
      url: `${accountId}/bank-details`,
      method: 'GET',
    });
  }

  async getHoldings(accountId: string): Promise<Accounts.Holding[]> {
    return this.request({
      url: `${accountId}/holdings`,
      method: 'GET',
    });
  }
}

export namespace Accounts {
  export interface BankDetails {
    accountNumber: string;
    holderName: string;
    routingNumber: string;
    type: string;
    balance: number;
    source: string;
  }

  export interface Holding {
    account_id: string;
    subaccount_id: string;
    ticker: string;
    name: string;
    isin: string;
    type: string;
    amount: number;
    current_price: number;
    current_amount_price: number;
  }
}
