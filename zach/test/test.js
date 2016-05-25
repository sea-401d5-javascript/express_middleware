'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
const fs = require('fs');
chai.use(chaiHTTP);
// const server = require(__dirname + '/../server.js');
const Readable = require('stream').Readable;
const parser = require(__dirname + '/../lib/parser.js');
let reqStream;
let erStream;


describe('Middleware-Unit Testing', () => {
  it('passing valid json into the middleware should return valid json', () => {
    reqStream = new Readable();
    reqStream.push('{"message": "test"}');
    reqStream.push(null);
    parser(reqStream, {}, () => {
      expect(reqStream.body).to.eql({message: "test"});
    })
  })
  it('passing invalid json into the middleware should return an invalid json err', () => {
    erStream = new Readable();
    erStream.push('{"message: invalidjson"}');
    erStream.push(null);
    parser(erStream, {}, (e) => {
      expect(e.message).to.eql('invalid json');
    })
  })
})

describe('Middleware Integration Testing', () => {
  before('open server', (done) => {
    const server = require(__dirname + '/../server.js');
    done();
  })
  it('passing in a valid json object should return our message and data', (done) => {
    chai.request('http://localhost:3000')
      .post('/api')
      .send('{"message": "iamatest"}')
      .end((err, res) => {
        expect(res.body).to.eql({msg: 'valid json', data: {"message": "iamatest"}});
        done();
      })
  })
  it('passing in an invalid json object should return an error message', (done) => {
    chai.request('http://localhost:3000')
      .post('/api')
      .send('{"message: iaminvalid"}')
      .end((err, res) => {
        expect(res.statusCode).to.eql(422);
        expect(res.body).to.eql({msg: 'invalid json'})
        done();
      })
  })

})
