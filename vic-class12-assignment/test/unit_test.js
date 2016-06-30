'use strict';

const chai = require('chai');
const expect = chai.expect;
const middleware = require(__dirname + '/../lib/middleware');
const fs = require('fs');

describe('middleware tests', () => {
  it('should read valid json', (done) => {
    let req = fs.createReadStream(__dirname + '/good_json.json');
    middleware(req, null, () => {
      expect(req.body.message).to.eql('test');
      done();
    });
  });
  it('should reject invalid json', (done) => {
    let req = fs.createReadStream(__dirname + '/bad_json.json');
    middleware(req, null, (err) => {
      expect(err.status).to.eql(422);
      expect(err.message).to.eql('invalid json');
      done();
    });
  });
})
