SDK initialization:

```
import { MoneymadeSDK } from '@moneymade/connect-api';

const moneymade = new MoneymadeSDK({
  apiKey: 'API_KEY',
  secret: 'SECRET',
});

moneymade.init(); // don't forget to run init method
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


      4. ###### Get account identity:
          ```await moneymade.users.getAccountIdentity({ userId: '', accountId: '' })```
          Method returns identity object:
          
          ```
          {
            "accounts": [
              {
                "account_id": "uuid",
                "balances": {
                  "available": null,
                  "current": 56302.06,
                  "iso_currency_code": "USD",
                  "limit": null,
                  "unofficial_currency_code": null
                },
                "mask": "8888",
                "name": "Plaid Mortgage",
                "official_name": null,
                "owners": [
                  {
                    "addresses": [
                      {
                        "data": {
                          "city": "Malakoff",
                          "country": "US",
                          "postal_code": "14236",
                          "region": "NY",
                          "street": "2992 Cameron Road"
                        },
                        "primary": true
                      }
                    ],
                    "emails": [
                      {
                        "data": "accountholder0@example.com",
                        "primary": true,
                        "type": "primary"
                      }
                    ],
                    "names": [
                      "Alberta Bobbeth Charleson"
                    ],
                    "phone_numbers": [
                      {
                        "data": "1112223333",
                        "primary": false,
                        "type": "home"
                      }
                    ]
                  }
                ],
                "subtype": "mortgage",
                "type": "loan",
                "plaid_account_id": "",
                "subaccount_id": "uuid"
              }
            ],
            "item": {
              "available_products": [
                "assets",
                "auth",
                "balance",
                "credit_details",
                "income",
                "investments",
                "liabilities"
              ],
              "billed_products": [
                "identity",
                "transactions"
              ],
              "consent_expiration_time": null,
              "error": null,
              "institution_id": "ins_109511",
              "item_id": "LLqyrV5eMGTgv6B1qKAkiXzQjBa1g9iPBr38m",
              "products": [
                "assets",
                "identity",
                "transactions"
              ],
              "update_type": "background",
              "webhook": ""
            },
            "provider": {
              "id": 24,
              "name": "Tartan Bank",
              "slug": "tartan-bank",
              "strategy": "plaid",
              "logo": ""
            }
          }
          ```

      4. ###### Get account holdings:
          ```await moneymade.users.getAccountHoldings({ userId: '', accountId: '' })```
          Method returns holdings object:
          
          ```
          {
            "accounts": [
              {
                "account_id": "e157a8cf-2a5a-40fa-b58b-67ee10f8522a",
                "balances": {
                  "available": 100,
                  "current": 110,
                  "iso_currency_code": "USD",
                  "limit": null,
                  "unofficial_currency_code": null
                },
                "mask": "0000",
                "name": "Plaid Checking",
                "official_name": "Plaid Gold Standard 0% Interest Checking",
                "subtype": "checking",
                "type": "depository",
                "plaid_account_id": "K1l9Kn57RwtkGozMLqdDtp3Z8NoWW1tVn5Pqm",
                "subaccount_id": "25eb10c4-dc93-40c7-8af7-d8d723617c58"
              }
            ],
            "holdings": [
              {
                "account_id": "e157a8cf-2a5a-40fa-b58b-67ee10f8522a",
                "cost_basis": 1,
                "institution_price": 1,
                "institution_price_as_of": null,
                "institution_value": 0.01,
                "iso_currency_code": "USD",
                "quantity": 0.01,
                "security_id": "d6ePmbPxgWCWmMVv66q9iPV94n91vMtov5Are",
                "unofficial_currency_code": null,
                "plaid_account_id": "xAQwGr78xLTqA7Jevzg4iLB43GdQQwunNQojL",
                "subaccount_id": "8102b8bd-c6ba-488f-a633-f68aaace70bb"
              }
            ],
            "item": {
              "available_products": [
                "assets",
                "auth",
                "balance",
                "credit_details",
                "income",
                "liabilities"
              ],
              "billed_products": [
                "identity",
                "investments",
                "transactions"
              ],
              "consent_expiration_time": null,
              "error": null,
              "institution_id": "ins_109511",
              "item_id": "LLqyrV5eMGTgv6B1qKAkiXzQjBa1g9iPBr38m",
              "products": [
                "assets",
                "identity",
                "investments",
                "transactions"
              ],
              "update_type": "background",
              "webhook": ""
            },
            "securities": [
              {
                "close_price": 28.17,
                "close_price_as_of": "2021-11-17",
                "cusip": "00769G543",
                "institution_id": null,
                "institution_security_id": null,
                "is_cash_equivalent": false,
                "isin": "US00769G5430",
                "iso_currency_code": "USD",
                "name": "Cambiar International Equity Instl",
                "proxy_security_id": null,
                "security_id": "3AVe95eyPjHRlGaLdknRsEZ3GM3gq4TGzeM9l",
                "sedol": "B97GLL1",
                "ticker_symbol": "CAMYX",
                "type": "mutual fund",
                "unofficial_currency_code": null
              }
            ],
            "provider": {
              "id": 24,
              "name": "Tartan Bank",
              "slug": "tartan-bank",
              "strategy": "plaid",
              "logo": ""
            }
          }
          ```

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

