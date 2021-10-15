import { API } from '../../core/api-entity';

export class Currencies extends API {
  entityUrl = 'currencies';

  getList(): Promise<Currencies.CurrenciesResponse> {
    return this.request({});
  }
}

export namespace Currencies {
  export interface Currency {
    id: 0,
    currency: string;
    name: string;
    type: 'cryptocurrency' | 'fiat';
    logo: string;
  }

  export type CurrenciesResponse = API.PageResponse<Currency>;
}
