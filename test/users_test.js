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

describe('/users', function () {
  it('it should return users on Shopify', (done) => {
    var getUsersQuery = { 'platform': 'shopify' }
    convictional.getUsers(getUsersQuery).then((users) => {
      expect(users).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
})
