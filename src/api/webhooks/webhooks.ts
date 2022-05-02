import { API } from '../../core/api-entity';

export class Webhooks extends API {
  entityUrl = 'webhooks';

  create(url: string): Promise<Webhooks.Webhook> {
    return this.request({
      method: 'POST',
      data: {
        url
      }
    });
  }
  
  getWebhooks(): Promise<Webhooks.Webhook[]> {
    return this.request({
      method: 'GET',
    });
  }
 
  getWebhook(id: string): Promise<Webhooks.Webhook> {
    return this.request({
      url: `${id}`,
      method: 'GET',
    }).catch( err => {
      console.log(err);
      
    });
  }
 
  deleteWebhook(id: string) {
    return this.request({
      url: `${id}`,
      method: 'DELETE',
    });
  }
}

export namespace Webhooks {
  export interface Webhook {
    id: string;
    url: string;
  }
}
