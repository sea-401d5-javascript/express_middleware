'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const middleware = require('../lib/middleware');
require('../lib/server');
const Readable = require('stream').Readable;
let requestObj;

describe('Middleware tests', () => {

  describe('Unit tests', () => {

    before('obtain request object from middleware after valid JSON sent', (done) => {
      // test input for middleware
      let reqStream = new Readable;
      reqStream.push('{"message":"test"}');
      reqStream.push(null);

      let res = {};
      middleware.parse(reqStream, res);
      requestObj = middleware.requestObj;
      done();
    });

    it('should parse JSON and attach it to the request body', () => {
      expect(requestObj.body).to.eql({message: 'test'});
      expect(requestObj.status).to.eql(200);
    });

    before('obtain request object from middleware after invalid JSON sent', (done) => {
      // test input for middleware
      let reqStream2 = new Readable;
      reqStream2.push('test message');
      reqStream2.push(null);

      let res = {};
      middleware.parse(reqStream2, res);
      requestObj = middleware.requestObj;
      done();
    });

    it('should return an error message attached to the request body if valid JSON is not sent', () => {
      expect(requestObj.err).to.eql({Message: 'invalid json'});
      expect(requestObj.statusErr).to.eql(400);
    });
  });


  describe('Integration tests', () => {

    it('should respond without errors', (done) => {
      request('localhost:3000')
          .post('/')
          .send({"test":"test"})
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            done();
          });
    });

    it('should respond with parsed JSON attached to the response body after an actual request', (done) => {
      request('localhost:3000')
          .post('/')
          .send({"test":"test"})
          .end((err, res) => {
            expect(res.body).to.eql({test:'test'});
            expect(res).to.have.status(200);
            done();
          });
    });

    it('should respond with an error attached to the response body after invalid JSON is sent with an actual request', (done) => {
      request('localhost:3000')
          .post('/')
          .send('not json')
          .end((err, res) => {
            expect(res.body).to.eql({Message:'invalid json'});
            expect(res).to.have.status(400);
            done();
          });
    });

    it('should respond to any request other than a POST or PUT with an error', (done) => {
      request('localhost:3000')
          .get('/')
          .end((err, res) => {
            expect(res.text).to.eql('Not Found');
            expect(res).to.have.status(404);
            done();
          });
    });
  });
});
