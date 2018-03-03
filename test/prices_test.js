require('dotenv').config()
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect
const convictional = require('../lib/api.js')({
  apiUrl: process.env.API_URL,
  adminKey: process.env.ADMIN_KEY,
  apiKey: process.env.API_KEY
})

describe('/prices', () => {
  it('it should return prices that are active', (done) => {
    var getPricesQuery = '?active=true'
    convictional.getPrices(getPricesQuery).then((prices) => {
      expect(prices).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
})
