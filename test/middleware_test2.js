'use strict';
const jsonModelParser = require('../lib/jsonModelParser');
var MockReq = require('mock-req');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
var res = {};

describe('tests for jsonModelParser', () => {
  it('should parse JSON', (done) => {

    var req = new MockReq({
      method: 'POST',
      url: '/'
    })

    let data = {will:"work"}
    req.write(data);
    req.end();
    jsonModelParser(req, res, function(e)  {
      if(e) {
        done(e);
      } else {
        expect(req.body).to.eql(data)
        done();
      }
    });
  });

  it('error on non JSON', (done) => {

    var req = new MockReq({
      method: 'POST',
      url: '/'
    })

    let data = ("work")
    req.write(data);
    req.end();
    jsonModelParser(req, res, function(e)  {
      if(e) {
        expect(e.message).to.eql('invalid json')
        expect(e.statusCode).to.eql(422)
        done();
      } else {
        done(new Error('JSON worked'));
      }
    });
  });
})
