import axios from 'axios';
import { io } from 'socket.io-client';
import { sdk } from './sdk';

const connectData = JSON.parse(process.env.TEST_CONNECTION_DATA);
const testClientKey = process.env.TEST_CLIENT_KEY;
const testProviderId = process.env.TEST_PROVIDER_ID;

export const connectTestAccount = () => {
  return new Promise<string>(async (resolve, reject) => {
    const { ws_api_url, base_api_url } = await sdk.getProjectUrls();
    
    try {
      const { data: { token } } = await axios.post(
        `${base_api_url}/api/v1/accounts`,
        connectData,
        { params: { client_key: testClientKey, provider_id: testProviderId }},
      );

      const socket = io(
        ws_api_url,
        {
          transports: ['polling'],
          auth: { token },
        },
      );

      const rejectTimeout = setTimeout(
        () => reject('Timeout for CONNECTION_SUCCESS failed'),
        5000,
      );
      
      socket.on('STATUS', (data) => {
        if (data.status === 'CONNECTION_SUCCESS') {
          clearTimeout(rejectTimeout);
          resolve(data.account_id);
          socket.disconnect();
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
