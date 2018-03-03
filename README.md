## Introduction
This is the the Node.JS client library for the Convictional Commerce API.

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
var query = '?shipped=false'
getOrders(query)
.then((orders) => { console.log(orders) })
.catch((error) => { console.error(error) })
```

#### Method naming examples:
* `getOrder(id)` - GET (read) one order, by ID
* `getOrders(query)` - GET (read) many orders, by query
* `postOrder(order)` - POST (create) one new order, by order object
* `postOrders(orders)` - POST (create) many new orders, by array of orders
* `putOrder(order)` - PUT (update) one order, by order object
* `putOrders(orders)` - PUT (update) many orders, by array of orders
* `deleteOrder(id)` - DELETE (delete) one order, by ID
* `deleteOrders(ids)` - DELETE (delete) many orders, by array of IDs