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

describe('/logs', () => {
  it('it should return logs from this week', (done) => {
    var getLogsQuery = { 'updatedAfter': moment().subtract(7, 'days') }
    convictional.getLogs(getLogsQuery).then((logs) => {
      expect(logs).to.be.an('array')
      expect(logs[0]).to.have.property('_id')
      expect(logs[0]).to.have.property('description')
      expect(logs[0]).to.have.property('companyId')
      expect(logs[0]).to.have.property('created')
      expect(logs[0]).to.have.property('updated')
      done()
    }).catch((error) => { done(error) })
  })
})
