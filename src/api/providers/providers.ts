import { API } from '../../core/api-entity';

export class Providers extends API {
  entityUrl = 'providers';

  async getList(queryParams?: Providers.GetProvidersRequest): Promise<Providers.ProvidersResponse> {   
    const params = {
      limit: queryParams?.limit || 25,
      offset: queryParams?.offset || 0,
    };

    return this.request({ params });
  }

  async getOne(id: number): Promise<Providers.Provider> {
    return this.request({ url: id.toString() });
  }
}

export namespace Providers {
  export enum ProviderStrategy {
    Oauth = 'oauth',
    Keys = 'keys',
    WalletConnect = 'walletconnect',
    Address = 'address',
  }

  export type GetProvidersRequest = API.PaginatedRequest;

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
