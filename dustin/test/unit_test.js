'use strict';
const superJSONparser = require('../lib/superJSONparser');
var MockReq = require('mock-req');
const expect = require('chai').expect;
var res = {};

describe('UNIT TEST: SuperJSONparser should', function () {
  it('super parse good JSON', function (done) {

    var req = new MockReq({
      method: 'POST',
      url: '/'
    });
    let payload = {
      hello: 'test'
    };
    req.write(payload);
    req.end();

    superJSONparser(req, res, function (e) {
      if (e) {
        done(e);
      } else {
        expect(req.body).to.eql(payload);
        done();
      }
    });
  });

  it('super return a super error for non JSON', function (done) {

    var req = new MockReq({
      method: 'POST',
      url: '/'
    });

    let payload = ('adfasd');
    req.write(payload);
    req.end();

    superJSONparser(req, res, function (e) {
      if (e) {
        expect(e.message).to.eql('Invalid JSON');
        expect(e.statusCode).to.equal(422);
        done();
      } else {
        //error
        done(new Error('Got good JSON'));
      }
    });
  });
});
