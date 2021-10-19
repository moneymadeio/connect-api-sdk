import axios from 'axios';
import { io } from 'socket.io-client';
import { BASE_API_URL } from '../../src/sdk';

const connectData = JSON.parse(process.env.TEST_CONNECTION_DATA);
const testClientKey = process.env.TEST_CLIENT_KEY;
const testProviderId = process.env.TEST_PROVIDER_ID;

export const connectTestAccount = () => {
  return new Promise<string>(async (resolve, reject) => {
    const { data: { token } } = await axios.post(
      `${BASE_API_URL}/v1/accounts`,
      connectData,
      { params: { client_key: testClientKey, provider_id: testProviderId }},
    );

    const socket = io(
      process.env.TEST_TOKEN_API_URL,
      {
        transports: ['polling'],
        auth: { token },
      },
    );

    socket.on('STATUS', (data) => {
      if (data.status === 'CONNECTION_SUCCESS') {
        resolve(data.account_id);
      } else {
        reject('Connection failed');
      } 
      
      socket.disconnect();
    });
  });
};
