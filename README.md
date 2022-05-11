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
  - [Account object](#account-object)
  - [User account retrieving](#user-account-retrieving)
  - [User account removing](#user-account-removing)
- [Accounts API](#accounts-api)
  - [Account bank details object](#account-bank-details-object)
  - [Accounts bank details](#accounts-bank-details)
  - [Account holdings object](#account-holdings-object)
  - [Accounts retrieve holdings](#accounts-retrieve-holdings)
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
- [Webhooks API](#webhooks-api)
  - [Webhook Object](#webhook-object)
  - [Webhook creation](#webhook-creation)
  - [Webhooks retrieving](#webhooks-retrieving)
  - [Webhook retrieving](#webhook-retrieving)
  - [Webhook deleting](#webhook-deleting)

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

Creating a new user requires client_user_id (it might be your internal user id) and optional email.


```typescript
await moneymade.users.create({ client_user_id: 'you-internal-user-id' });
```

This method returns newly created [user object](#user-object). 

#### User token creation

Creating a new token for user. This token is used by widget only.

```typescript
// you can use userId from User Object or your internal user id
// (if internal user id was used as client_user_id on user creation)
await moneymade.users.createSession('userId'); 
```

Optionally, you can pass array of "scopes" as the second parameter
scopes values are: "*", "accounts", "accounts:banking", "accounts:transactions", "accounts:holdings", "accounts:balances"


```typescript
// you can use userId from User Object or your internal user id
// (if internal user id was used as client_user_id on user creation)
await moneymade.users.createSession('userId', ["accounts", "banking"]); 
```

#### User retrieving

You should use user id from [user object](#user-object) to retrive previously created user.

```typescript
await moneymade.users.getOne('userId');
```

Method returns [user object](#user-object) with stored accounts.

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

## Accounts API

#### Account bank details object

Accounts bank details object:

```json
{
  "account_number": "12321312",
  "holder_name": "Holders name",
  "routing_number": "24124124",
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

Method returns response with array of [Account bank detail Object](#account-bank-details-object)


#### Account holdings object

Accounts holding object:

```json
{
  "account_id": "test-account-id",
  "subaccount_id": "test-subaccount-id",
  "ticker": "Ticker",
  "name": "Name",
  "isin": "",
  "type": "bank",
  "amount": 0,
  "current_price":0,
  "current_amount_price":0
}
```

#### Accounts retrieve holdings

Get account's holdings

```typescript
await sdk.accounts.getHoldings('some-account-id');
```

Method returns response with array of [Account holdings object](#account-holdings-object)

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

## Webhooks API


#### Webhook Object

Webhook object contains following data:

```json
{
  "id": "cd68c98c-6853-47e6-a48a-cc2c4362d971", // webhook id
  "url": "http://exaple.com", // url for webhook
}
```


#### Webhook creation

Webhook creation method requires "url" parameter.

```typescript
await sdk.webhooks.create('some url');
```

Method returns response with [webhook object](#webhook-object)


#### Webhooks retrieving

Webhooks retrieving method requires no parameters.

```typescript
await sdk.webhooks.getList();
```

Method returns response with array of [webhook objects](#webhook-object)


#### Webhook retrieving

Webhook retrieving method requires "id" parameter of webhook.

```typescript
await sdk.webhooks.getOne('some-webhook-id');
```

Method returns response with [webhook object](#webhook-object)


#### Webhook deleting

Webhook deleting method requires "id" parameter of webhook.

```typescript
await sdk.webhooks.deleteWebhook('some-webhook-id');
```

Method returns 200 status code if successfully deleted