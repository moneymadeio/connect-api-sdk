import Axios from 'axios';
import * as api from './api';

export class MoneymadeSDK {
  linkToken: api.LinkTokenAPI;

  constructor(config: MoneymadeSDK.Config) {
    const axios = Axios.create({
      baseURL: 'https://mm-connect-account-api-dot-moneymade-connect-stage.uc.r.appspot.com/api/v1',
      headers: {
        ['x-mm-api-key']: config.apiKey,
        ['content-type']: 'application/json',
      },
    });

    // TODO: add signature interceptor
    this.linkToken = new api.LinkTokenAPI(axios);
  }  
}

export namespace MoneymadeSDK {
  export interface Config {
    secret: string;
    apiKey: string;  
  }
}
