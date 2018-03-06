## Introduction
This is the Node.JS client library for the Convictional Commerce API.

For more documentation, please visit our docs site [here](http://docs.convictional.com).

To install, type: 
`npm install convictional`

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
  console.log(order)
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
  console.log(order)
}).catch((error) => { console.error })
```

## Methods
* Methods start with the HTTP method and end with the resource: getOrders, postProducts, etc.
* The first parameter is a string, object or array with the payload for the request.
* The optional second parameter is the API key for the account you are using.
* The optional third parameter is the API URL, defaults to main API url: https://api.convictional.com.
* All methods return promises, so you must use then/catch verbs to handle them.

#### Method usage example:
```javascript
var query = { 'shipped': false }
getOrders(query)
.then((orders) => { console.log(orders) })
.catch((error) => { console.error(error) })
```

#### List of methods:
** Actions (RPC) **
* `sync(method)` - GET (runs and queues) one method, by method name
* `translate(doc)` - POST (translate) one document, by document

** Orders (REST) **
* `getOrder(id)` - GET (read) one order, by ID
* `getOrders(query)` - GET (read) many orders, by query
* `postOrder(order)` - POST (create) one new order, by order object
* `postOrders(orders)` - POST (create) many new orders, by array of orders
* `putOrder(order)` - PUT (update) one order, by order object
* `putOrders(orders)` - PUT (update) many orders, by array of orders
* `deleteOrder(id)` - DELETE (delete) one order, by ID
* `deleteOrders(ids)` - DELETE (delete) many orders, by array of IDs

** Products (REST) **
* `getProduct(id)` - GET (read) one product, by ID
* `getProducts(query)` - GET (read) many products, by query
* `postProduct(product)` - POST (create) one new product, by product object
* `postProducts(products)` - POST (create) many new products, by array of products
* `putProduct(product)` - PUT (update) one product, by product object
* `putProducts(products)` - PUT (update) many products, by array of products
* `deleteProduct(id)` - DELETE (delete) one product, by ID
* `deleteProducts(ids)` - DELETE (delete) many products, by array of IDs

** Partners (REST) **
* `getPartner(id)` - GET (read) one partner, by ID
* `getPartners(query)` - GET (read) many partners, by query
* `postPartner(partner)` - POST (create) one new partner, by partner object
* `postPartners(partners)` - POST (create) many new partners, by array of partners
* `putPartner(partner)` - PUT (update) one partner, by partner object
* `putPartners(partners)` - PUT (update) many partners, by array of partners
* `deletePartner(id)` - DELETE (delete) one partner, by ID
* `deletePartners(ids)` - DELETE (delete) many partners, by array of IDs

** Prices (REST) **
* `getPrice(id)` - GET (read) one price, by ID
* `getPrices(query)` - GET (read) many prices, by query
* `postPrice(price)` - POST (create) one new price, by price object
* `postPrices(prices)` - POST (create) many new prices, by array of prices
* `putPrice(price)` - PUT (update) one price, by price object
* `putPrices(prices)` - PUT (update) many prices, by array of prices
* `deletePrice(id)` - DELETE (delete) one price, by ID
* `deletePrices(ids)` - DELETE (delete) many prices, by array of IDs

** Logs (REST) **
* `getLog(id)` - GET (read) one log, by ID
* `getLogs(query)` - GET (read) many logs, by query
* `postLog(log)` - POST (create) one new log, by log object
* `postLogs(logs)` - POST (create) many new logs, by array of logs
* `putLog(log)` - PUT (update) one log, by log object
* `putLogs(logs)` - PUT (update) many logs, by array of logs
* `deleteLog(id)` - DELETE (delete) one log, by ID
* `deleteLogs(ids)` - DELETE (delete) many logs, by array of IDs

** Users (REST) (Admin-only) **
* `getUser(id)` - GET (read) one user, by ID
* `getUsers(query)` - GET (read) many users, by query
* `postUser(user)` - POST (create) one new user, by user object
* `postUsers(users)` - POST (create) many new users, by array of users
* `putUser(user)` - PUT (update) one user, by user object
* `putUsers(users)` - PUT (update) many users, by array of users
* `deleteUser(id)` - DELETE (delete) one user, by ID
* `deleteUsers(ids)` - DELETE (delete) many users, by array of IDs