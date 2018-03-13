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
var partnerEntry = {
  code: '12345',
  email: 'capartner@example.com',
  priceList: 'Price List for Canada',
  relationship: 'child'
}
var newPartner = {
  email: 'newemail@convictional.com',
  active: true
}
var anotherPartnerEntry = {
  code: '987654',
  email: 'uspartner@example.com',
  priceList: 'Price List for USA',
  relationship: 'parent'
}
var multiPartnerEntry = []
multiPartnerEntry.push(partnerEntry)
multiPartnerEntry.push(anotherPartnerEntry)

describe('/partners', function () {
  it('it should create ONE partner', (done) => {
    convictional.postPartner(partnerEntry).then((record) => {
      id = record._id
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(partnerEntry.code)
      expect(record).to.have.property('email').equal(partnerEntry.email)
      expect(record).to.have.property('priceList').equal(partnerEntry.priceList)
      expect(record).to.have.property('relationship').equal(partnerEntry.relationship)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should create MANY partners', (done) => {
    convictional.postPartners(multiPartnerEntry).then((record) => {
      var objectIds = record
      ids = Object.keys(objectIds).map(key => {
        return objectIds[key]
      })
      expect(Object.keys(record).length).to.eql(2)
      done()
    })
  })
  it('it should return partners from this year', (done) => {
    var getPartnersQuery = { 'updatedAfter': moment().subtract(365, 'days') }
    convictional.getPartners(getPartnersQuery).then((partners) => {
      expect(partners).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should list ONE partner', (done) => {
    convictional.getPartner(id).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(partnerEntry.code)
      expect(record).to.have.property('email').equal(partnerEntry.email)
      expect(record).to.have.property('priceList').equal(partnerEntry.priceList)
      expect(record).to.have.property('relationship').equal(partnerEntry.relationship)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should list ALL partners', (done) => {
    var query = {}
    convictional.getPartners(query).then((record) => {
      expect(record).to.be.an('array')
      done()
    })
  })
  it('it should return second page', (done) => {
    var query = { 'page': 2, 'limit': 1 }
    convictional.getPartners(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    })
  })
  it('it should return single record', (done) => {
    var query = { 'limit': 1 }
    convictional.getPartners(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    })
  })
  it('it should count records', (done) => {
    var query = { 'count': true }
    convictional.getPartners(query).then((record) => {
      expect(record.count).to.be.a('number')
      done()
    })
  })
  it('it should update ONE partner', (done) => {
    newPartner._id = id
    convictional.putPartner(newPartner).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(partnerEntry.code)
      expect(record).to.have.property('email').equal(newPartner.email)
      expect(record).to.have.property('active').equal(newPartner.active)
      expect(record).to.have.property('priceList').equal(partnerEntry.priceList)
      expect(record).to.have.property('relationship').equal(partnerEntry.relationship)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should update MANY partners', (done) => {
    var newPartners = []
    var newPartner = { email: 'test@convictional.com' }
    newPartner.id = ids[0]
    newPartners.push(newPartner)
    var newPartnerAlt = { email: 'convictional@test.com' }
    newPartnerAlt.id = ids[1]
    newPartners.push(newPartnerAlt)
    convictional.putPartners(newPartners).then((record) => {
      expect(record).eql({Modified: 2})
      done()
    })
  })
  it('it should delete ONE partner', (done) => {
    convictional.deletePartner(id).then((record) => {
      expect(record).eql({Deleted: 1})
      done()
    })
  })
  it('it should delete MANY partners', (done) => {
    convictional.deletePartners(ids).then((record) => {
      expect(record).eql({Deleted: 2})
      done()
    })
  })
})
