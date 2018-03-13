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
  it('it should list ONE user', (done) => {
    convictional.getUser('58MNevyuihnZnK3n2').then((record) => {
      expect(record).to.be.an('object')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should return users on Shopify', (done) => {
    var getUsersQuery = { 'platform': 'shopify' }
    convictional.getUsers(getUsersQuery).then((records) => {
      expect(records).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
})
