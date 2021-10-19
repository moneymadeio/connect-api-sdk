import { API } from '../../core/api-entity';

export class Providers extends API {
  entityUrl = 'providers';

  async getList(): Promise<Providers.ProvidersResponse> {
    return this.request({});
  }

  async getOne(slug: string): Promise<Providers.Provider> {
    return this.request({ url: slug });
  }
}

export namespace Providers {
  export enum ProviderStrategy {
    Oauth = 'oauth',
    Keys = 'keys',
    WalletConnect = 'walletconnect',
    Address = 'address',
  }

  export type ProvidersResponse = API.PageResponse<Provider>;

  export interface Provider {
    id: number;
    name: string;
    slug: string;
    strategy: ProviderStrategy;
    description: string;
    website: string;
    tags: string[];
  }
}
