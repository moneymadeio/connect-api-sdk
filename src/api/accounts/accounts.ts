import { API } from "../../core/api-entity";

export class Accounts extends API {
  entityUrl = "providers";

  async getBankDetails(accountId: string): Promise<Accounts.BankDetails[]> {
    return this.request({
      url: `${accountId}/bank-details`,
      method: "GET",
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
}
