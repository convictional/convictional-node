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
var companyId = 'test'
var id
var ids = []
var logEntry = {
  description: 'This is a test log',
  companyId: companyId
}
var anotherLogEntry = {
  description: 'This is another test log',
  companyId: companyId
}
var newLog = { description: 'This is log' }
var multiLogEntry = []
multiLogEntry.push(logEntry)
multiLogEntry.push(anotherLogEntry)

describe('/logs', () => {
  it('it should create ONE log', (done) => {
    convictional.postLog(logEntry).then((record) => {
      id = record._id
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('description').equal(logEntry.description)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should create MANY logs', (done) => {
    convictional.postLogs(multiLogEntry).then((records) => {
      var objectIds = records
      ids = Object.keys(objectIds).map(key => {
        return objectIds[key]
      })
      expect(Object.keys(records).length).to.eql(2)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should return logs by date', (done) => {
    var getLogsQuery = { 'updatedAfter': moment().subtract(7, 'days') }
    convictional.getLogs(getLogsQuery).then((logs) => {
      expect(logs).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should list ONE log', (done) => {
    convictional.getLog(id).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('description').equal(logEntry.description)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should list ALL logs', (done) => {
    convictional.getLogs({}).then((records) => {
      expect(records).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should return second page', (done) => {
    var getLogQuery = { 'page': 2, 'limit': 1 }
    convictional.getLogs(getLogQuery).then((records) => {
      expect(records.length).to.equal(1)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should return single record', (done) => {
    var getLogQuery = { 'limit': 1 }
    convictional.getLogs(getLogQuery).then((records) => {
      expect(records.length).to.equal(1)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should count records', (done) => {
    var getLogQuery = { 'count': true }
    convictional.getLogs(getLogQuery).then((records) => {
      expect(records.count).to.be.a('number')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should update ONE log', (done) => {
    newLog._id = id
    convictional.putLog(newLog).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('description').equal('This is log')
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should update MANY logs', (done) => {
    var newLogs = []
    var newLog = { description: 'This is totally different' }
    newLog.id = ids[0]
    newLogs.push(newLog)
    var newLogAlt = { description: 'Not even the same description!' }
    newLogAlt.id = ids[1]
    newLogs.push(newLogAlt)
    convictional.putLogs(multiLogEntry).then((records) => {
      expect(records).eql({Modified: 2})
      done()
    }).catch((error) => { done(error) })
  })
  it('it should delete ONE log', (done) => {
    convictional.deleteLog(id).then((records) => {
      expect(records).eql({Deleted: 1})
      done()
    }).catch((error) => { done(error) })
  })
  it('it should delete MANY logs', (done) => {
    convictional.deleteLogs(ids).then((records) => {
      expect(records).eql({Deleted: 2})
      done()
    }).catch((error) => { done(error) })
  })
})
