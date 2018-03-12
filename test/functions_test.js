require('dotenv').config()
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var chai = require('chai')
var expect = chai.expect
var lib = require('../lib/functions.js')

describe('functions', () => {
  it('convertParams: should convert JSON to URL encoded params', (done) => {
    var params = { 'updatedAfter': '2018-03-08T22:21:09.394Z' }
    var newParams = lib.convertParams(params)
    expect(newParams.indexOf('?')).to.equal(0)
    expect(newParams.indexOf(' ')).to.equal(-1)
    expect(newParams.indexOf('=')).to.equal(13)
    done()
  })
  it('convertParams: should convert limit and skip appropriately', (done) => {
    var params = { 'limit': 10, 'page': 10 }
    var newParams = lib.convertParams(params)
    expect(newParams.indexOf('?')).to.equal(0)
    expect(newParams.indexOf('&')).to.equal(9)
    done()
  })
  it('getSpliceLength: should return the length to splice of array', (done) => {
    var length
    length = lib.getSpliceLength(100)
    expect(length).to.equal(100)
    length = lib.getSpliceLength(101)
    expect(length).to.equal(100)
    length = lib.getSpliceLength(199)
    expect(length).to.equal(100)
    length = lib.getSpliceLength(2000)
    expect(length).to.equal(100)
    length = lib.getSpliceLength(0)
    expect(length).to.equal(0)
    length = lib.getSpliceLength(1)
    expect(length).to.equal(1)
    length = lib.getSpliceLength(99)
    expect(length).to.equal(99)
    done()
  })
})
