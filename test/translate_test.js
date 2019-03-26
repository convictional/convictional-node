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

var goodDoc = 'ISA*00*          *00*          *08*9251750000     *08*1234567890     *030627*1304*U*00401*000001403*0*P*>~GS*PO*8019721193*1234567890*20030627*1304*1403*X*004010~ST*850*01403001~BEG*00*SA*548177**20030627~REF*AN*547794~PER*BD*JOHN JONES*TE*5552225555~FOB*PB~DTM*002*20030705~DTM*118*20030704~PKG******01~TD5****H*OUR CR/T~N9*AH*548177~N1*ST*SAFEWAYINC*9*0091372092527~N2*Tracy Produce~N3*16900 West Schulte Road~N4*Tracy*CA*95376~N1*BT*SAFEWAY INC*9*0091372091700~N2*NATIONAL SERVICES CENTER~N3*P.O. BOX 29093~N4*PHOENIX*AZ*85038~N1*VN*BEST SUPPLIER INC.*9*1234567890000~N3*P.O. BOX 11111~N4*LOS ALAMITOS*CA*90001~PO1**10*CA*12.5**UA*042040304101*IN*20403041*VN*22222~CTP*RS*FCP*12.5~PID*F*08***ITEM DESCRIPTION 1/10LB~SAC*A*B280***20.00***2.00****02~CTT*1**120*LB~SE*30*01403001~GE*1*1403~IEA*1*000001403~'

describe('/translate', function () {
  it('it should translate document', (done) => {
    convictional.translate(goodDoc).then((newDoc) => {
      expect(newDoc).to.be.an('object')
      done()
    }).catch((error) => { done(error) })
  })
})
