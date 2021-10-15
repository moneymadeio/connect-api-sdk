import * as crypto from 'crypto';

export interface SignatureComponents {
  secretKey: string;
  body: any;
  requestUrl: string;
  timestamp: number;
}

export const makeSign = (params: SignatureComponents) => {
  const { requestUrl, timestamp } = params;
  const bodyPayload = params.body ? JSON.stringify(params.body) : '';
  const hmacBody = timestamp + requestUrl + bodyPayload;
 
  return crypto
    .createHmac('sha256', params.secretKey)
    .update(Buffer.from(hmacBody))
    .digest('hex');
}
