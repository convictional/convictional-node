## Introduction

This is the the Node.JS client library for the Convictional Commerce API.

For more documentation, please visit our docs site [here](http://docs.convictional.com).

To install, type: 
`npm install convictional`

## Usage

```
// Top of your file, with the other imports:
var convictional = require('convictional')
...
// Later in the file, where you want to use it:
var orderId = '5a692f658f6d524e8282dac7'
var apiKey = 'your_convictional_api_key'

convictional.getOrder(orderId, apiKey).then((order) => {
  // Do something with the order...
}).catch((error) => { console.error(error) })

```