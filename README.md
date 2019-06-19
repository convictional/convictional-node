# Introduction

This is the Node.JS client library for the [Convictional](https://convictional.com) API.

For more documentation, please visit [our docs site](https://docs.convictional.com). If you have any other questions, visit [our support site](https://support.convictional.com).

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
* The optional third parameter is the API URL, defaults to main API url: `https://api.convictional.com`.
* All methods return promises, so you must use then/catch verbs to handle them.

### Method usage example

```javascript
var query = { 'shipped': false }
getOrders(query)
.then((orders) => { // Do stuff with [orders] })
.catch((error) => { console.error(error) })
```

### List of methods

#### Actions (RPC)

* `sync(method)` - GET (runs and queues) one method, by method name
* `translate(doc)` - POST (translate) one document, by document
* `invite(email)` - POST (invites) one partner, by partner
* `quickOrder(order)` - POST (orders) an order by partner

#### Orders (REST)

* `getOrder(id)` - GET (read) one order, by ID
* `getOrders(query)` - GET (read) many orders, by query
* `postOrder(order)` - POST (create) one new order, by order object
* `putOrder(order)` - PUT (update) one order, by order object
* `putOrders(orders)` - PUT (update) many orders, by array of orders
* `deleteOrder(id)` - DELETE (delete) one order, by ID

#### Products (REST)

* `getProduct(id)` - GET (read) one product, by ID
* `getProducts(query)` - GET (read) many products, by query
* `postProduct(product)` - POST (create) one new product, by product object
* `putProduct(product)` - PUT (update) one product, by product object
* `putProducts(products)` - PUT (update) many products, by array of products
* `deleteProduct(id)` - DELETE (delete) one product, by ID

#### Partners (REST)

* `getPartner(id)` - GET (read) one partner, by ID
* `getPartners(query)` - GET (read) many partners, by query
* `postPartner(partner)` - POST (create) one new partner, by partner object
* `putPartner(partner)` - PUT (update) one partner, by partner object
* `putPartners(partners)` - PUT (update) many partners, by array of partners
* `deletePartner(id)` - DELETE (delete) one partner, by ID

#### Prices (REST)

* `getPrice(id)` - GET (read) one price, by ID
* `getPrices(query)` - GET (read) many prices, by query
* `postPrice(price)` - POST (create) one new price, by price object
* `putPrice(price)` - PUT (update) one price, by price object
* `putPrices(prices)` - PUT (update) many prices, by array of prices
* `deletePrice(id)` - DELETE (delete) one price, by ID
