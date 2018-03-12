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

describe('/partners', () => {
  it('it should return partners from this year', (done) => {
    var getPartnersQuery = { 'updatedAfter': moment().subtract(365, 'days') }
    convictional.getPartners(getPartnersQuery).then((partners) => {
      expect(partners).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
})
