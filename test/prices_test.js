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

describe('/prices', () => {
  it('it should return prices that are active', (done) => {
    var getPricesQuery = { 'active': true }
    convictional.getPrices(getPricesQuery).then((prices) => {
      expect(prices).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
})
