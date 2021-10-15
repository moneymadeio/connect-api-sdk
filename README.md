SDK initialization:

```
import { MoneymadeSDK } from '@moneymade/connect-api';

const moneymade = new MoneymadeSDK({
  apiKey: 'API_KEY',
  secret: 'SECRET',
});
```

### Usage:
  1. ##### User API:
      1. ###### Create user with first account:
      
          ```await moneymade.users.create({token: '', account_id: ''})```
          
          token = token you get via onSuccess hook of connect widget
          account_id = account_id you get via onSuccess hook of connect widget

          Method returns user object with first account:

          ```
          {
              "id": "b80b1a13-82d5-4397-a1da-29b4452905ca",
              "accounts": [
                {
                  "id": "1a4da820-49f0-4bf5-852b-8c2a28d4b51a",
                  "provider": {
                    "id": 9,
                    "name": "Ethereum Address",
                    "slug": "ethereum-address",
                    "strategy": "keys",
                    "logo": "https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
                  }
                }
              ]
            }
          ```
      
      2. ###### Get user by id:
          
          ```await moneymade.users.getOne('userId')```

          Method returns user object with accounts array:

          ```
          {
              "id": "b80b1a13-82d5-4397-a1da-29b4452905ca",
              "accounts": [
                {
                  "id": "1a4da820-49f0-4bf5-852b-8c2a28d4b51a",
                  "provider": {
                    "id": 9,
                    "name": "Ethereum Address",
                    "slug": "ethereum-address",
                    "strategy": "keys",
                    "logo": "https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
                  }
                },
                {
                  "id": "cb928ffc-b8bf-4fb5-b0e7-4612de3307c5",
                  "provider": {
                    "id": 8,
                    "name": "Bitcoin Address",
                    "slug": "bitcoin-address",
                    "strategy": "keys",
                    "logo": "https://bitcoin.org/img/icons/logotop.svg?1630339663"
                  }
                }
              ]
          }
          ```
      3. ###### Get user account:
          Get user account objecct with subaccounts by userId and accountId

          ```await moneymade.users.getAccount({ userId: '', accountId: '' })```

          Method returns account object with provider info and subaccounts:

          ```
            {
              "id": "cb928ffc-b8bf-4fb5-b0e7-4612de3307c5",
              "provider": {
                "id": 8,
                "name": "Bitcoin Address",
                "slug": "bitcoin-address",
                "strategy": "keys",
                "logo": "https://bitcoin.org/img/icons/logotop.svg?1630339663"
              },
              "subaccounts": [
                {
                  "name": "BTC",
                  "currency": "BTC",
                  "balance": "5.1704304",
                  "type": "cryptocurrency",
                  "fiat_balance": "22670698",
                  "balance_updated_at": "2021-09-23T13:36:10.128Z",
                  "updated_at": "2021-09-23T13:36:10.128Z"
                }
              ]
            }
          ```

      3. ###### Remove user account:
          ```await moneymade.users.removeAccount({ userId: '', accountId: '' })```

          Method removes account from user. Returns void.

  2. ##### Providers API:
      1. ###### Get providers list:

          ```await moneymade.providers.getList()```
  
          Method returns array with providers:
          
          ```
          [
            {
              id: 1,
              name: 'Coinbase',
              slug: 'coinbase',
              strategy: 'oauth',
              connector: 'coinbase',
              description: 'Buy and sell cryptocurrency. Coinbase is the easiest place to buy, sell, and manage your cryptocurrency portfolio.',
              website: 'https://www.coinbase.com',
              tags: [],
              logo: 'https://firebasestorage.googleapis.com/v0/b/benchmark-media.appspot.com/o/logos%2F1598311540327_Screen%20Shot%202020-08-24%20at%204.25.31%20PM.png?alt=media'
            }
          ]
          ```
      2. ###### Get provider by slug:

          ```await moneymade.providers.getOne('coinbase')```

          Method returns provider object:

          ```
          {
            id: 1,
            name: 'Coinbase',
            slug: 'coinbase',
            strategy: 'oauth',
            connector: 'coinbase',
            description: 'Buy and sell cryptocurrency. Coinbase is the easiest place to buy, sell, and manage your cryptocurrency portfolio.',
            website: 'https://www.coinbase.com',
            tags: [],
            logo: 'https://firebasestorage.googleapis.com/v0/b/benchmark-media.appspot.com/o/logos%2F1598311540327_Screen%20Shot%202020-08-24%20at%204.25.31%20PM.png?alt=media'
          }  
          ```

    3. ##### Currencies API:
          ```await moneymade.currencies.getList()```

          Method returns currencies list:
  
          ```
          {
            data: [
              {
                id: 1,
                currency: '1INCH',
                name: '1inch',
                type: 'cryptocurrency',
                logo: null
              },
              {
                id: 2,
                currency: 'AAVE',
                name: 'Aave',
                type: 'cryptocurrency',
                logo: null
              }
            ]
          }
          ```

