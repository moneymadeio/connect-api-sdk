import * as crypto from 'crypto';

export interface SignatureComponents {
  secretKey: string;
  apiKey: string;
  body: any;
  nonce: number;
}

export const makeSign = (params: SignatureComponents) => {
  const { apiKey, nonce } = params;
  const bodyPayloadBuffer = Buffer.from(JSON.stringify(params.body));
  const hmacBody = `${apiKey}${nonce}${bodyPayloadBuffer}${nonce}${apiKey}`;
  
  return crypto
    .createHmac('sha256', params.secretKey)
    .update(hmacBody)
    .digest('hex');
}
