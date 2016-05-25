'use strict'
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const request = chai.request
const jsonParser = require('../lib/jsonParser.js')
const Readable = require('stream').Readable
require('../server.js')


describe('HTTP TEST', () => {
  it('should send back json message', (done) => {
    request('localhost:3000')
    .post('/homework')
    .send('{"msg":"testing working"}')
    .end((err,res) => {
      expect(err).to.eql(null)
      expect(res.body).to.eql({message:'valid json', data:{msg:'testing working'}})

      done();
    })
  })
  it('should send back error message', (done) => {
    request('localhost:3000')
    .get('/error')
    .end((err,res) => {
      expect(res.status).to.eql(422)
      expect(res.text).to.eql('not found' + '\n')
      done();
    })
  })
})

describe('Unit Test', () => {
  let req;
  let req2;
  it('passing in valid json should return parse ', () => {
      req = new Readable();
      req.push('{"msg":"unit test"}')
      req.push(null)

      jsonParser(req, {}, () => {
        console.log(req.body)
        expect(req.body).to.eql(3)

      })
    })

  // it('should return error message when pass in invalid json', () => {
  //   req2 = new Readable();
  //   req2.push('{"msg":"not working}')
  //   req2.push(null)
  //
  //   jsonParser(req2, {}, (error) => {
  //     console.log(error.message)
  //     expect(error.message).to.eql('invalid json' + '\n')
  //
  //   })
  // })
})
