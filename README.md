## Introduction

This is the the Node.JS client library for the Convictional Commerce API.

For more documentation, please visit our docs site [here](http://docs.convictional.com).

To install, type: 
`npm install convictional`

## Usage

```javascript
// Top of your file with other imports...
var convictional = require('convictional')

// ...later in the file, where you want to use it:
var orderId = '5a692f658f6d524e8282dac7'
var apiKey = 'your_convictional_api_key'

convictional.getOrder(orderId, apiKey).then((order) => {
  // Do something with the order...
}).catch((error) => { console.error(error) })
```

## Methods

* Methods start with the HTTP method and end with the resource.
* The first parameter is a string, object or array with the payload.
* The second parameter is the API key for the account you are using.
* All methods return promises, so you must use then/catch verbs.

For example:
getOrders.then((order) => { // do something with order })