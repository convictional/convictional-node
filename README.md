# Introduction

This is the Node.JS client library for the Convictional Commerce API.

For more documentation, please visit our docs site [here](http://docs.convictional.com).

This is the best way to build apps on Convictional. This library offers complete test coverage across all RPC and REST endpoints and is used in production for all integration work that we do.

The library will be updated as the API changes so ensure you keep it up to date.

To install, type: 
`npm install convictional`

To test, run:
`npm run test`

## Config

You can optionally pass configurations like your API key or API URL in like so:

```javascript
// Top of your file with all your requires:
var convictional = require('convictional')({
  'apiKey': '86e7ccdc-55b5-4066-a79f-7a1e0e59c690'
})

// ... later where you want to use it:
var orderId = '5a692f658f6d524e8282dac7'
convictional.getOrder(orderId).then((order) => {
  // Do stuff with order
}).catch((error) => { console.error(error) })
```

Or you can pass configurations on a call-specific basis:

```javascript
// Top of your file with all your requires:
var convictional = require('convictional')

// ... later where you want to use it:
var apiKey = '86e7ccdc-55b5-4066-a79f-7a1e0e59c690'
var orderId = '5a692f658f6d524e8282dac7'
convictional.getOrder(orderId, apiKey).then((order) => {
  // Do stuff with order
}).catch((error) => { console.error })
```

## Methods

* Methods start with the HTTP method and end with the resource: getOrders, postProducts, etc.
* The first parameter is a string, object or array with the payload for the request.
* The optional second parameter is the API key for the account you are using.
* The optional third parameter is the API URL, defaults to main API url: https://api.convictional.com.
* All methods return promises, so you must use then/catch verbs to handle them.

### Method usage example

```javascript
var query = { 'shipped': false }
getOrders(query)
.then((orders) => { // Do stuff with [orders] })
.catch((error) => { console.error(error) })
```

### List of methods

##### Actions (RPC)

* `sync(method)` - GET (runs and queues) one method, by method name
* `translate(doc)` - POST (translate) one document, by document
* `invite(email)` - POST (invites) one partner, by partner

##### Orders (REST)

* `getOrder(id)` - GET (read) one order, by ID
* `getOrders(query)` - GET (read) many orders, by query
* `postOrder(order)` - POST (create) one new order, by order object
* `putOrder(order)` - PUT (update) one order, by order object
* `putOrders(orders)` - PUT (update) many orders, by array of orders
* `deleteOrder(id)` - DELETE (delete) one order, by ID

##### Products (REST)

* `getProduct(id)` - GET (read) one product, by ID
* `getProducts(query)` - GET (read) many products, by query
* `postProduct(product)` - POST (create) one new product, by product object
* `putProduct(product)` - PUT (update) one product, by product object
* `putProducts(products)` - PUT (update) many products, by array of products
* `deleteProduct(id)` - DELETE (delete) one product, by ID

##### Partners (REST)

* `getPartner(id)` - GET (read) one partner, by ID
* `getPartners(query)` - GET (read) many partners, by query
* `postPartner(partner)` - POST (create) one new partner, by partner object
* `putPartner(partner)` - PUT (update) one partner, by partner object
* `putPartners(partners)` - PUT (update) many partners, by array of partners
* `deletePartner(id)` - DELETE (delete) one partner, by ID

##### Prices (REST)

* `getPrice(id)` - GET (read) one price, by ID
* `getPrices(query)` - GET (read) many prices, by query
* `postPrice(price)` - POST (create) one new price, by price object
* `putPrice(price)` - PUT (update) one price, by price object
* `putPrices(prices)` - PUT (update) many prices, by array of prices
* `deletePrice(id)` - DELETE (delete) one price, by ID

##### Logs (REST)

* `getLog(id)` - GET (read) one log, by ID
* `getLogs(query)` - GET (read) many logs, by query
* `postLog(log)` - POST (create) one new log, by log object
* `putLog(log)` - PUT (update) one log, by log object
* `putLogs(logs)` - PUT (update) many logs, by array of logs
* `deleteLog(id)` - DELETE (delete) one log, by ID

## Changelog

## 1.5.7 - 2018-06-12

* Adding programmatic unsubscribe.

## 1.5.6 - 2018-06-04

* Removing all bulk create endpoints.

## 1.5.4 - 2018-05-26

* Removing all bulk delete endpoints.

## 1.5.3 - 2018-05-23

* Removing partner "code" field.

## 1.4.8 - 2018-05-03

* Running all tests via new test database (mostly <100ms)
* Bringing to semver parity with other services.

## 1.2.2 - 2018-04-12

* Add user offboarding

## 1.2.1 - 2018-04-02

* Improving test coverage for date-based queries

## 1.2.0 - 2018-04-02

* Adding support for API.getProducts({ sku: abc })
* Adding test coverage for getProducts by SKU (passing)

## 1.1.9 - 2018-03-14

* Changing approach to invite partner to accomodate billing on/off

## 1.1.8 - 2018-03-13

* Updating README.md

## 1.1.7 - 2018-03-13

* Complete test coverage for entire API and internal library
* Convering the response from deleteOne calls to JSON properly

## 1.1.6 - 2018-03-12

* Adding additional test coverage for logs, orders, partners, products and translate
* Adding test coverage for using limit and page in query

## 1.1.5 - 2018-03-12

* Specifying the splice length for bulk calls

## 1.1.4 - 2018-03-06

* Changing bulk post/put "count" to no longer +1

## 1.1.3 - 2018-03-06

* Add a user onboarding email notifications

## 1.1.2 - 2018-03-06

* Switching README

## 1.1.0 - 2018-03-06

* Adding methods to manage users.

## 1.1.0 - 2018-03-06

* Supports JSON object queries instead of string containing params already encoded.

## 1.0.12 - 2018-03-05

* Fixing a bug involved getPartners.

## 1.0.10 - 2018-03-05

* Add support for invite, sync and translate endpoints.

## 1.0.9 - 2018-03-03

* Add support for passing configuration variables.