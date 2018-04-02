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
var productEntry = {
  code: '12345',
  active: true,
  bodyHtml: '<p>Great product!</p>',
  images: [
    { 'src': 'https://cdn.convictional.com/123abc' },
    { 'src': 'https://cdn.convictional.com/987zyx' }
  ],
  tags: ['Toronto', 'Beauty', 'Mens'],
  title: 'Great product',
  type: 'item',
  variants: [
    {
      'sku': '321',
      'title': 'Great variant',
      'inventory_quantity': '3',
      'product': 19.99
    }
  ],
  vendor: 'Convictional Wholesale'
}
var newProduct = { active: false }
var anotherProductEntry = {
  code: '12348',
  active: true,
  bodyHtml: '<p>Great product!</p>',
  images: [
    { 'src': 'https://cdn.convictional.com/123abc' },
    { 'src': 'https://cdn.convictional.com/987zyx' }
  ],
  tags: ['Toronto', 'Beauty', 'Mens'],
  title: 'Greater product',
  type: 'item',
  variants: [
    {
      'sku': '123',
      'title': 'Great variant',
      'inventory_quantity': '8',
      'product': 9.99
    }
  ],
  vendor: 'Convictional Wholesale'
}
var multiProductEntry = []
multiProductEntry.push(productEntry)
multiProductEntry.push(anotherProductEntry)

describe('/products', function () {
  it('it should create ONE product', (done) => {
    convictional.postProduct(productEntry).then((record) => {
      id = record._id
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(productEntry.code)
      expect(record).to.have.property('active').equal(true)
      expect(record).to.have.property('bodyHtml').equal(productEntry.bodyHtml)
      expect(record).to.have.property('images').eql(productEntry.images)
      expect(record).to.have.property('tags').eql(productEntry.tags)
      expect(record).to.have.property('title').equal(productEntry.title)
      expect(record).to.have.property('type').equal(productEntry.type)
      expect(record).to.have.property('variants').eql(productEntry.variants)
      expect(record).to.have.property('vendor').equal(productEntry.vendor)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should create MANY products', (done) => {
    convictional.postProducts(multiProductEntry).then((record) => {
      var objectIds = record
      ids = Object.keys(objectIds).map(key => {
        return objectIds[key]
      })
      expect(Object.keys(record).length).to.eql(2)
      done()
    })
  })
  it('it should return products by date', (done) => {
    var getProductsQuery = { 'updatedAfter': moment().subtract(30, 'days').format() }
    convictional.getProducts(getProductsQuery).then((products) => {
      expect(products).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  }).timeout(10000)
  it('it should list ONE product', (done) => {
    convictional.getProduct(id).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(productEntry.code)
      expect(record).to.have.property('active').equal(true)
      expect(record).to.have.property('bodyHtml').equal(productEntry.bodyHtml)
      expect(record).to.have.property('images').eql(productEntry.images)
      expect(record).to.have.property('tags').eql(productEntry.tags)
      expect(record).to.have.property('title').equal(productEntry.title)
      expect(record).to.have.property('type').equal(productEntry.type)
      expect(record).to.have.property('variants').eql(productEntry.variants)
      expect(record).to.have.property('vendor').equal(productEntry.vendor)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    })
  })
  it('it should list ALL products', (done) => {
    var query = {}
    convictional.getProducts(query).then((record) => {
      expect(record).to.be.an('array')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should find product by SKU', (done) => {
    var query = { sku: 123 }
    convictional.getProducts(query).then((record) => {
      expect(record).to.be.an('array')
      expect(record.length).to.eql(1)
      var product = record[0]
      expect(product).to.be.an('object')
      expect(product).to.have.property('images')
      expect(product).to.have.property('tags')
      expect(product).to.have.property('variants')
      expect(product).to.have.property('_id')
      expect(product).to.have.property('code')
      expect(product).to.have.property('active')
      expect(product).to.have.property('bodyHtml')
      expect(product).to.have.property('title')
      expect(product).to.have.property('type')
      expect(product).to.have.property('vendor')
      expect(product).to.have.property('created')
      expect(product).to.have.property('updated')
      expect(product).to.have.property('companyId')
      expect(product.variants[0].sku).to.eql('123')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should return second page', (done) => {
    var query = { 'page': 2, 'limit': 1 }
    convictional.getProducts(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should return single record', (done) => {
    var query = { 'limit': 1 }
    convictional.getProducts(query).then((record) => {
      expect(record.length).to.equal(1)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should count records', (done) => {
    var query = { 'count': true }
    convictional.getProducts(query).then((record) => {
      expect(record.count).to.be.a('number')
      done()
    }).catch((error) => { done(error) })
  })
  it('it should update ONE product', (done) => {
    newProduct._id = id
    convictional.putProduct(newProduct).then((record) => {
      expect(record).to.have.property('_id').equal(id)
      expect(record).to.have.property('created')
      expect(record).to.have.property('updated')
      expect(record).to.have.property('code').equal(productEntry.code)
      expect(record).to.have.property('active').equal(false)
      expect(record).to.have.property('bodyHtml').equal(productEntry.bodyHtml)
      expect(record).to.have.property('images').eql(productEntry.images)
      expect(record).to.have.property('tags').eql(productEntry.tags)
      expect(record).to.have.property('title').equal(productEntry.title)
      expect(record).to.have.property('type').equal(productEntry.type)
      expect(record).to.have.property('variants').eql(productEntry.variants)
      expect(record).to.have.property('vendor').equal(productEntry.vendor)
      expect(record).to.have.property('companyId').equal(companyId)
      done()
    }).catch((error) => { done(error) })
  })
  it('it should update MANY products', (done) => {
    var newProducts = []
    var newProduct = { title: 'Greatest product of all time' }
    newProduct.id = ids[0]
    newProducts.push(newProduct)
    var newProductAlt = { title: 'Beyonce product' }
    newProductAlt.id = ids[1]
    newProducts.push(newProductAlt)
    convictional.putProducts(newProducts).then((record) => {
      expect(record).eql({Modified: 2})
      done()
    }).catch((error) => { done(error) })
  })

  it('it should delete ONE product', (done) => {
    convictional.deleteProduct(id).then((record) => {
      expect(record).eql({Deleted: 1})
      done()
    }).catch((error) => { done(error) })
  })
  it('it should delete MANY products', (done) => {
    convictional.deleteProducts(ids).then((record) => {
      expect(record).eql({Deleted: 2})
      done()
    }).catch((error) => { done(error) })
  })
})
