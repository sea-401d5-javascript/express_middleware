const fs = require('fs')
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const request = chai.request
const jsonParser = require('../lib/jsonParser.js')
require('../server.js')

describe('HTTP TEST', () => {
  it('should send back json message', (done) => {
    request('localhost:3000')
    .post('/homework')
    .send('{"msg":"testing working"}')
    .end((err,res) => {
      expect(err).to.eql(null)
      console.log(JSON.parse(res.text))
      expect(JSON.parse(res.text)).to.eql(JSON.parse({message:'valid json', data:{msg:"testing working"}}))
      done();
    })
  })
})
