'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const jsonModelParser = require('../lib/jsonModelParser');
var MockReq = require('mock-req');
require('../server');

describe('jsonModelParser tests', () => {
  it('should receive a get request', (done) => {
    request('localhost:3000')
      .get('/drew')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('hello ther');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should receive a post request', (done) => {
    request('localhost:3000')
      .post('/drew')
      .send('{"test": "test"}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('valid data');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should error for bad path', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.body.msg).to.eql('page not found');
      done();
    });
  });

  it('should error for invalid JSON', (done) => {
    request('localhost:3000')
    .post('/drew')
    .send('booger')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(422);
      expect(res.body.msg).to.eql('invalid json');
      done();
    });
  });
});
