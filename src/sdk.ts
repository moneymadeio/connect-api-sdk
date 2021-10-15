import Axios, { AxiosInstance } from 'axios';

import * as api from './api';
import { makeSign } from './core/signature';

const { DEVELOPMENT_URL } = process.env;
const BASE_API_URL = DEVELOPMENT_URL || 'https://stage-connect-api.moneymade.io/api';

export class MoneymadeSDK {
  private axios: AxiosInstance;
  
  currencies: api.Currencies;
  users: api.Users;
  providers: api.Providers;

  constructor(config: MoneymadeSDK.Config) {
    this.axios = Axios.create({
      baseURL: `${BASE_API_URL}/${config.apiVersion || 'v1'}`,
      headers: {
        ['x-mm-api-key']: config.apiKey,
        ['content-type']: 'application/json',
      },
    });

    this.axios.interceptors.request.use(
      (request) => {
        const timestamp = Date.now();

        request.headers['x-mm-api-key'] = config.apiKey;
        request.headers['x-mm-request-timestamp'] = timestamp;
        request.headers['x-mm-request-signature'] = makeSign({
          secretKey: config.secret,
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
  }
}

export namespace MoneymadeSDK {
  export interface Config {
    secret: string;
    apiKey: string;
    apiVersion?: string;
  }
}
