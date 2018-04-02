require('dotenv').config()
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var chai = require('chai')
var expect = chai.expect
var convictional = require('../lib/api.js')({
  apiUrl: process.env.API_URL,
  adminKey: process.env.ADMIN_KEY,
  apiKey: process.env.API_KEY
})
var methods = ['getOrders', 'getOrderUpdates', 'postOrders', 'postOrderUpdates', 'postProducts', 'postProductUpdates', 'getProducts', 'getProductUpdates', 'postInvoices']

describe('/sync', () => {
  methods.forEach((method) => {
    it('it should sync: ' + method, (done) => {
      convictional.sync(method).then((result) => {
        expect(result).to.equal('Successfully pushed ' + method + ' to queue.')
        done()
      }).catch((error) => { done(error) })
    })
  })
})
