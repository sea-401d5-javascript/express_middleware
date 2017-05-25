'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
require('../server');

describe('INTEGRATION TEST: SuperJSONparser should', function () {
  it('super return a super error for non JSON', function (done) {
    let payload = {
      message: 'test message'
    };
    request('localhost:3000')
      .post('/api')
      .send(payload)
      .end(function (err, res) {
        //console.log(err);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"Message": "POST received"}');
        done();
      });
  });

  it('super return a super error for non JSON', function (done) {
    let payload = 'dsfa';
    request('localhost:3000')
      .post('/api')
      .send(payload)
      .end(function (err, res) {
        expect(err).to.have.status(422);
        done();
      });
  });
});
