require('dotenv').config()
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var chai = require('chai')
var expect = chai.expect
var moment = require('moment')
var convictional = require('../lib/api.js')({
  apiUrl: process.env.API_URL,
  adminKey: process.env.ADMIN_KEY,
  apiKey: process.env.API_KEY
})

describe('/products', () => {
  it('it should return products from this year', (done) => {
    var getProductsQuery = { 'updatedAfter': moment().subtract(365, 'days') }
    convictional.getProducts(getProductsQuery).then((products) => {
      expect(products).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  }).timeout(10000)
})
