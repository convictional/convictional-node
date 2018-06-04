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
var orderEntry = {
  code: '123456',
  partner: 'convictional-dropshipper-us',
  date: '2018-01-28 16:46:13',
  items: [
    {
      'type': 'item',
      'title': 'Great Custom Product',
      'quantity': 2,
      'price': 9.99,
      'sku': '123GRPRODUCT',
      'vendor': 'convictional-wholesale',
      'properties': [
        {
          'type': 'custom_engraving',
          'data': 'We Love Dad!'
        }
      ],
      'grams': 200
    },
    {
      'type': 'item',
      'title': 'Great Standard Product',
      'quantity': 1,
      'price': 19.99,
      'sku': '35GRPRODUCT',
      'vendor': 'convictional-wholesale',
      'properties': [],
      'grams': 200
    }
  ],
  addresses: [
    {
      'type': 'shipping',
      'name': 'First Last',
      'company': 'Company, Inc',
      'phone': '800-555-5555',
      'city': 'Toronto',
      'zip': 'M5V 4B3',
      'state': 'Ontario',
      'country': 'Canada',
      'addressOne': '123 Toronto St.',
      'addressTwo': '#206'
    },
    {
      'type': 'billing',
      'name': 'First Last',
      'company': 'Company, Inc',
      'phone': '800-555-5555',
      'city': 'Toronto',
      'zip': 'M5V 4B3',
      'state': 'Ontario',
      'country': 'Canada',
      'addressOne': '123 Toronto St.',
      'addressTwo': '#206'
    }
  ]
}
var newOrder = { complete: true }
var anotherOrderEntry = {
  code: '123459',
  partner: 'convictional-dropshipper-ca',
  date: '2018-01-30 16:46:13',
  items: [
    {
      'type': 'item',
      'title': 'Great Standard Product',
      'quantity': 1,
      'price': 19.99,
      'sku': '35GRPRODUCT',
      'vendor': 'convictional-wholesale',
      'properties': [],
      'grams': 200
    }
  ],
  addresses: [
    {
      'type': 'shipping',
      'name': 'First Last',
      'company': 'Company, Inc',
      'phone': '800-555-5555',
      'city': 'Toronto',
      'zip': 'M5V 4B3',
      'state': 'Ontario',
      'country': 'Canada',
      'addressOne': '123 Waterloo St.',
      'addressTwo': '#705'
    }
  ]
}
var multiOrderEntry = []
multiOrderEntry.push(orderEntry)
multiOrderEntry.push(anotherOrderEntry)

describe('/orders', function () {
  it('it should create ONE order', (done) => {
    convictional.postOrder(orderEntry).then((record) => {
      id = record._id
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(orderEntry.code)
      expect(record).to.have.property('partner').equal(orderEntry.partner)
      expect(record).to.have.property('date').equal(orderEntry.date)
      expect(record).to.have.property('items').eql(orderEntry.items)
      expect(record).to.have.property('addresses').eql(orderEntry.addresses)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should return orders by date', (done) => {
    var getOrdersQuery = { 'updatedAfter': moment().subtract(365, 'days').format() }
    convictional.getOrders(getOrdersQuery).then((orders) => {
      expect(orders).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should list ONE order', (done) => {
    convictional.getOrder(id).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(orderEntry.code)
      expect(record).to.have.property('partner').equal(orderEntry.partner)
      expect(record).to.have.property('date').equal(orderEntry.date)
      expect(record).to.have.property('items').eql(orderEntry.items)
      expect(record).to.have.property('addresses').eql(orderEntry.addresses)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should list ALL orders', (done) => {
    var query = {}
    convictional.getOrders(query).then((record) => {
      expect(record).to.be.an('array')
      done()
    })
  })
  it('it should return second page', (done) => {
    var query = { 'page': 2, 'limit': 1 }
    convictional.getOrders(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    })
  })
  it('it should return single record', (done) => {
    var query = { 'limit': 1 }
    convictional.getOrders(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    })
  })
  it('it should count records', (done) => {
    var query = { 'count': true }
    convictional.getOrders(query).then((record) => {
      expect(record.count).to.be.a('number')
      done()
    })
  })
  it('it should update ONE order', (done) => {
    newOrder._id = id
    convictional.putOrder(newOrder).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(orderEntry.code)
      expect(record).to.have.property('partner').equal(orderEntry.partner)
      expect(record).to.have.property('date').equal(orderEntry.date)
      expect(record).to.have.property('items').eql(orderEntry.items)
      expect(record).to.have.property('addresses').eql(orderEntry.addresses)
      expect(record).to.have.property('complete').equal(newOrder.complete)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should delete ONE order', (done) => {
    convictional.deleteOrder(id).then((record) => {
      expect(record).eql({Deleted: 1})
      done()
    })
  })
})
