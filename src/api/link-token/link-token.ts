import { API } from '../../core/api-entity';

export class LinkTokenAPI extends API {
  async getLinkToken(userId: string): Promise<string> {
    return this.client
      .request({
        url: 'link-tokens',
        method: 'POST',
        data: { user_id: userId },
      })
      .then(res => res.data.token);
  }
}
