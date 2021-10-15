import { AxiosInstance, AxiosRequestConfig } from 'axios';
export abstract class API {
  protected abstract entityUrl: string; 
  
  protected request(req: AxiosRequestConfig) {
    req.url = `${this.entityUrl}${req.url ? '/' + req.url : '' }`;

    return this
      .client
      .request(req)
      .then(({ data }) => data);
  }

  constructor(private client: AxiosInstance) {}
}

export namespace API {
  export interface PageResponse<T> {
    data: T[];
  }
}