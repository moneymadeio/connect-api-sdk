import Axios, { AxiosInstance } from 'axios';

import * as api from './api';
import { makeSign } from './core/signature';

const { DEVELOPMENT_URL } = process.env;
export const PROJECT_API_URL = DEVELOPMENT_URL || 'https://project-api-dot-moneymade-connect.uc.r.appspot.com';

export class MoneymadeSDK {
  private axios: AxiosInstance;
  
  currencies: api.Currencies;
  users: api.Users;
  providers: api.Providers;
  transactions: api.Transactions;
  accounts: api.Accounts;
  webhooks: api.Webhooks;

  constructor(private config: MoneymadeSDK.Config) {}

  async getProjectUrls() {
    const { apiKey } = this.config;
    const { data } = await Axios.get(
      `${PROJECT_API_URL}/api/v1/environment`,
      { headers: { ['api-key']: apiKey } },
    );

    return {
      base_api_url: data.account_api_url,
      ws_api_url: data.ws_api_url,
    }
  }

  async init(): Promise<MoneymadeSDK> {
    // const { base_api_url } = await this.getProjectUrls();

    this.axios = Axios.create({
      // baseURL: `${base_api_url}/api/${this.config.apiVersion || 'v1'}`,
      baseURL: `http://localhost:3019/api/v1`,
      headers: {
        ['x-mm-api-key']: this.config.apiKey,
        ['content-type']: 'application/json',
      },
    });

    this.axios.interceptors.request.use(
      (request) => {
        const timestamp = Date.now();

        if(request.url.endsWith('users') || request.url.endsWith('sessions')) {
          request.baseURL = request.baseURL.replace('v1', 'v2');
        }

        request.headers['x-mm-api-key'] = this.config.apiKey;
        request.headers['x-mm-request-timestamp'] = timestamp;
        request.headers['x-mm-request-signature'] = makeSign({
          secretKey: this.config.secret,
          timestamp,
          requestUrl: `${request.baseURL}/${request.url}`,
          body: request.data ? request.data : '',
        });
        
        return request;
      },
    );

    this.currencies = new api.Currencies(this.axios);
    this.users = new api.Users(this.axios);
    this.providers = new api.Providers(this.axios);
    this.transactions = new api.Transactions(this.axios);
    this.accounts = new api.Accounts(this.axios);
    this.webhooks = new api.Webhooks(this.axios);

    return this;
  }
}

export namespace MoneymadeSDK {
  export interface Config {
    secret: string;
    apiKey: string;
    apiVersion?: string;
  }
}
