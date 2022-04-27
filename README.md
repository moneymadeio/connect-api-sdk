Moneymade Connect API official nodejs SDK

## Navigation

- [Navigation](#navigation)
- [Installation](#installation)
- [Get started](#get-started)
- [Pagination](#pagination)
- [User API](#user-api)
  - [User object](#user-object)
  - [User creation](#user-creation)
  - [User token creation](#user-token-creation)
  - [User retrieving](#user-retrieving)
  - [Connecting account](#connecting-account-to-user)
  - [Account object](#account-object)
  - [User account retrieving](#user-account-retrieving)
  - [User account removing](#user-account-removing)
  - [Account identity retrieving](#account-identity-retrieving)
  - [Account holdings retrieving](#account-holdings-retrieving)
- [Provider API](#provider-api)
  - [Provider object](#provider-object)
  - [Providers retrieving](#providers-retrieving)
  - [Provider retrieving by slug](#provider-retrieving-by-slug)
- [Currencies API](#currencies-api)
  - [Currency object](#currency-object)
  - [Currency retrieving](#currency-retrieving)
- [Transactions API](#transactions-api)
  - [Transaction Object](#transaction-object)
  - [Transaction retrieving](#transaction-retrieving)
- [Accounts API](#accounts-api)
  - [Account bank details Object](#account-bank-details-object)
  - [Accounts bank details](#accounts-bank-details)

## Installation

npm:
```console
$ npm install @moneymade/connect-api
```
yarn: 

```console
$ yarn add @moneymade/connect-api
```

## Get started

The package <b>@moneymade/connect-api</b> supports all MoneyMade-Connect-API endpoints.
SDK requires Secret key and Api key for initialisation. These keys are different for development/production environments. Make sure you use right keys per each your environment.

NOTE: don't put yout keys into a code. Use env variable for the best practice.

```typescript
import { MoneymadeSDK } from '@moneymade/connect-api';

const sdk = new MoneymadeSDK({
  secret: process.env.MONEYMADE_API_SECRET,
  apiKey: process.env.MONEYMADE_API_KEY,
});
```

SDK starts asynchronously, run init method to allow usage:

```typescript
  await sdk.init();
```


## Pagination

Some methods return paginated data: object contains data as array of retrieved entities and pagination info.

```json
{
  "pagination": {
    "offset": 0, // offset for entities to be skipped
    "limit": 200 // limit per request to be retrieved
  },
  "data": [] // array with data
}
```

Those method applies pagintation parameters as arguments to move page backward/forward. 

## User API
User API allows to manipulate with accounts data.
User is a container to put connected accounts and connect it via your internal user.

#### User object
User object contains data describes the user and connected accounts:

```json
{
  "id": "b80b1a13-82d5-4397-a1da-29b4452905ca", // user id
  "accounts": [ // connected accounts
    {
      "id": "1a4da820-49f0-4bf5-852b-8c2a28d4b51a", // account id
      "provider": { // provider info
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

#### User creation

Creating a new user requires token and account id recieved on frontend side after connection an account via connect widget.


```typescript
await moneymade.users.create({client_user_id: ''});
```

This method returns newly created [user object](#user-object) with first account. 

#### User token creation

Creating a new token for user.


```typescript
await moneymade.users.createSession('userId');
```

#### User retrieving

You should use user id from [user object](#user-object) to retrive previously create user you .

```typescript
await moneymade.users.getOne('userId');
```

Method returns [user object](#user-object) with stored accounts.

#### Connecting account to user

You need following parameters to connect account with existing user :
- token - temporary token you recive after connection by connect widget
- id - user id to connect with new account
- accountId - new account id you recive after connection by connect widget


```typescript
await sdk.users.addAccount(
    { id: 'some-user-id' },
    {
      account_id: 'new-account-id',
      token: 'token-value-here',
    },
  );
```

Method returns [user object](#user-object) with newly added account.

#### Account object

User contains accounts object. This object isn't populated via full account data (subaccount info).
Full [account object](#account-object) contains following data:

```json
 {
   "id": "cb928ffc-b8bf-4fb5-b0e7-4612de3307c5", // account id
   "provider": { // provider info
     "id": 8,
     "name": "Bitcoin Address",
     "slug": "bitcoin-address",
     "strategy": "keys",
     "logo": "https://bitcoin.org/img/icons/logotop.svg?1630339663"
   },
   "subaccounts": [ // subaccounts info
     {
       "name": "BTC", // account name
       "currency": "BTC", // root currency for account, equals to ticker for crypto 
       "balance": "5.1704304", // balance in currency 
       "type": "cryptocurrency", // balance type, pissible value: crypto, fiat, unknown
       "fiat_balance": 22670698, // amount in cents
       "balance_updated_at": "2021-09-23T13:36:10.128Z", // ISO date when balance was changed last time
       "updated_at": "2021-09-23T13:36:10.128Z" // last account sync ISO date
     }
   ]
 }
```

#### User account retrieving

[Account object](#account-object) is fetched by following method:

```typescript
await sdk.users.getAccount({
  userId: testUserId,
  accountId: testAccountId,
});

```

#### User account removing

Use `removeAccount` to remove account from user:

```typescript
await sdk.users.removeAccount({
  userId: 'some-user-id',
  accountId: 'some-account-id',
});
```

#### Account identity retrieving

Currently, it works only with plaid based accounts.
Check [plaid docs](https://plaid.com/docs/api/products/#identityget) for more info.

```typescript
  await moneymade.users.getAccountIdentity({
    userId: 'some-user-id',
    accountId: 'some-account-id',
  }
```

Method returns identity object with subaccount links:

```json
{
  "provider": { // provider info
    "id": 24,
    "name": "Tartan Bank",
    "slug": "tartan-bank",
    "strategy": "plaid",
    "logo": ""
  },
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
      "plaid_account_id": "uuid", // plaid native account id
      "subaccount_id": "uuid", //moneymade open-api subaccount id
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
      "type": "loan"
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
  }
}
```

#### Account holdings retrieving

Currently, it works only with plaid based accounts.
Check [plaid docs](https://plaid.com/docs/api/products/#identityget) for more info.

```typescript
await moneymade.users.getAccountHoldings({
  userId: 'some-user-id',
  accountId: 'some-account-id',
});
```

Method returns holdings object with subaccount links:

```json
{
   "provider": { // provider info
    "id": 24,
    "name": "Tartan Bank",
    "slug": "tartan-bank",
    "strategy": "plaid",
    "logo": ""
  }
  "accounts": [
    {
      "account_id": "e157a8cf-2a5a-40fa-b58b-67ee10f8522a", // moneymade open api account id
      "plaid_account_id": "K1l9Kn57RwtkGozMLqdDtp3Z8NoWW1tVn5Pqm", // plaid native account id
      "subaccount_id": "25eb10c4-dc93-40c7-8af7-d8d723617c58", // moneymade open api account id
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
      "type": "depository"
    }
  ],
  "holdings": [
    {
      "account_id": "e157a8cf-2a5a-40fa-b58b-67ee10f8522a", // moneymade open api account id
      "plaid_account_id": "xAQwGr78xLTqA7Jevzg4iLB43GdQQwunNQojL",  // plaid native account id
      "subaccount_id": "8102b8bd-c6ba-488f-a633-f68aaace70bb" // moneymade open api account id
      "cost_basis": 1,
      "institution_price": 1,
      "institution_price_as_of": null,
      "institution_value": 0.01,
      "iso_currency_code": "USD",
      "quantity": 0.01,
      "security_id": "d6ePmbPxgWCWmMVv66q9iPV94n91vMtov5Are",
      "unofficial_currency_code": null
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
  ]
}
```

## Provider API
#### Provider object

Provider object describes invest or finance institution.
Object contains following data:

```json
{
  "id": 1,
  "name": "Coinbase",
  "slug": "coinbase",
  "strategy": "oauth", 
  "connector": "coinbase",
  "description": "Buy and sell cryptocurrency. Coinbase is the easiest place to buy, sell, and manage your cryptocurrency portfolio.",
  "website": "https://www.coinbase.com",
  "tags": [],
  "logo": "https://firebasestorage.googleapis.com/v0/b/benchmark-media.appspot.com/o/logos%2F1598311540327_Screen%20Shot%202020-08-24%20at%204.25.31%20PM.png?alt=media"
  }
```

#### Providers retrieving

Use following method to fetch providers.

```typescript
  await moneymade.providers.getList()
```
  
Method returns array with [provider objects](#provider-object).
NOTE: Pagination will be added soon. (in Dec 5 2021).

#### Provider retrieving by slug

Use following method to fetch provider by slug.

```typescript
await moneymade.providers.getOne('coinbase');
```
Method returns [provider object](#provider-object).

## Currencies API
#### Currency object

Currency object describe currency and contains following data:

```json
{
  "currency": "ETH", // currency ticker
  "name": "Ethereum", // readable name 
  "type": "cryptocurrency", // currency type, equals to "fiat" for fiat currencies
  "logo": null // logo url, nullable
}
```


#### Currency retrieving

```typescript
await moneymade.currencies.getList();
```

Method returns array with [currency objects](#currency-object)

## Transactions API

#### Transaction Object

Transaction describes changing balance in subaccount and contains following data:

```json
{
  "id": "cd68c98c-6853-47e6-a48a-cc2c4362d971", // transaction id
  "subaccount_id": "edcddedb-f33f-42d4-a3d8-c38a58004b8a", // moneymade open api subaccount id 
  "transaction_id": "LS2BVV-LF7ZA-5HSTUK", // native transaction id
  "account_id": "c4312961-dbd9-4ff9-af43-926dc93b2cb7", // moneymade open api account id
  "amount": "2.76", // transaction amount
  "iso_currency_code": "EUR", // amount currency
  "categories": [], // array with categories
  "issued_at": "2021-08-24 06:04:01.336+00",
  "transaction_type": "sell", 
  "status": "completed",
  "created_at": "2021-11-29 11:42:36.814217+00",
  "updated_at": "2021-11-29 11:42:36.814217+00"
}
```

#### Transaction retrieving

Transaction data is returned as pages. Look at [pagination]() for more info. 

```typescript
await sdk.transactions.getList({
  userId: 'some-user-id',
  accountId: 'some-account-id',
});
```

Method returns paginated response with [transaction objects](#transaction-object)

## Accounts API

#### Account bank details Object

Accounts bank details object:

```json
{
  "accountNumber": "12321312",
  "holderName": "Holders name",
  "routingNumber": "24124124",
  "type": "bank",
  "balance": 0,
  "source": "plaid"
}
```

#### Accounts bank details

Get account's bank details

```typescript
await sdk.accounts.getBankDetails('some-account-id');
```

Method returns paginated response with [Account bank detail Object](#account-bank-details-object)