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
var companyId = 'test'
var id
var ids = []
var priceEntry = {
  code: '12346',
  listName: 'Price List for Canada',
  startDate: '2018/01/01 00:00:00',
  endDate: '2018/01/31 23:59:59',
  currencyName: 'CAD',
  conversion: 1,
  markup: 100,
  rounding: '99',
  list: [
    {
      'code': '123',
      'price': 9.99,
      'markup': 10,
      'type': 'fixed'
    },
    {
      'code': '321',
      'price': 19.99,
      'markup': 120,
      'type': 'percent'
    }
  ]
}
var newPrice = { markup: 120, conversion: 2, currencyName: 'USD' }
var anotherPriceEntry = {
  code: '12543',
  listName: 'Price List for USA',
  startDate: '2018/01/01 00:00:00',
  endDate: '2018/01/31 23:59:59',
  currencyName: 'CAD',
  conversion: 1.2,
  markup: 120,
  rounding: '00',
  list: [
    {
      'code': '456',
      'price': 9.99,
      'markup': 10,
      'type': 'fixed'
    },
    {
      'code': '999',
      'price': 19.99,
      'markup': 120,
      'type': 'percent'
    }
  ]
}
var multiPriceEntry = []
multiPriceEntry.push(priceEntry)
multiPriceEntry.push(anotherPriceEntry)

describe('/prices', function () {
  it('it should create ONE price', (done) => {
    convictional.postPrice(priceEntry).then((record) => {
      id = record._id
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(priceEntry.code)
      expect(record).to.have.property('listName').equal(priceEntry.listName)
      expect(record).to.have.property('startDate').equal(priceEntry.startDate)
      expect(record).to.have.property('endDate').equal(priceEntry.endDate)
      expect(record).to.have.property('currencyName').equal(priceEntry.currencyName)
      expect(record).to.have.property('conversion').equal(priceEntry.conversion)
      expect(record).to.have.property('markup').equal(priceEntry.markup)
      expect(record).to.have.property('rounding').equal(priceEntry.rounding)
      expect(record).to.have.property('list').eql(priceEntry.list)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should list ONE price', (done) => {
    convictional.getPrice(id).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(priceEntry.code)
      expect(record).to.have.property('listName').equal(priceEntry.listName)
      expect(record).to.have.property('startDate').equal(priceEntry.startDate)
      expect(record).to.have.property('endDate').equal(priceEntry.endDate)
      expect(record).to.have.property('currencyName').equal(priceEntry.currencyName)
      expect(record).to.have.property('conversion').equal(priceEntry.conversion)
      expect(record).to.have.property('markup').equal(priceEntry.markup)
      expect(record).to.have.property('rounding').equal(priceEntry.rounding)
      expect(record).to.have.property('list').eql(priceEntry.list)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should return prices by status', (done) => {
    var getPricesQuery = { 'active': true }
    convictional.getPrices(getPricesQuery).then((prices) => {
      expect(prices).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should list ALL prices', (done) => {
    var query = {}
    convictional.getPrices(query).then((record) => {
      expect(record).to.be.an('array')
      done()
    })
  })
  it('it should return second page', (done) => {
    var query = { 'page': 2, 'limit': 1 }
    convictional.getPrices(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    })
  })
  it('it should return single record', (done) => {
    var query = { 'limit': 1 }
    convictional.getPrices(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    })
  })
  it('it should count records', (done) => {
    var query = { 'count': true }
    convictional.getPrices(query).then((record) => {
      expect(record.count).to.be.a('number')
      done()
    })
  })
  it('it should update ONE price', (done) => {
    newPrice._id = id
    convictional.putPrice(newPrice).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(priceEntry.code)
      expect(record).to.have.property('listName').equal(priceEntry.listName)
      expect(record).to.have.property('startDate').equal(priceEntry.startDate)
      expect(record).to.have.property('endDate').equal(priceEntry.endDate)
      expect(record).to.have.property('currencyName').equal(newPrice.currencyName)
      expect(record).to.have.property('conversion').equal(newPrice.conversion)
      expect(record).to.have.property('markup').equal(newPrice.markup)
      expect(record).to.have.property('rounding').equal(priceEntry.rounding)
      expect(record).to.have.property('list').eql(priceEntry.list)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should delete ONE price', (done) => {
    convictional.deletePrice(id).then((record) => {
      expect(record).eql({Deleted: 1})
      done()
    })
  })
})
