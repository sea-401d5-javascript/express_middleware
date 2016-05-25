'use strict';
const fs = require('fs');
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + '/../lib/server');
const jsonparser = require(__dirname + '/../lib/jsonparser');

require(__dirname + '/../index');

describe('unit testing', () => {
  let badJson = fs.createReadStream(__dirname + '/good.json');
  let goodJson = fs.createReadStream(__dirname + '/bad.json');
  function worked() {
    return 'worked';
  }
it('should test bad JSON ', (done) => {
  request('localhost: 3000')
    .post('/')
    .send(badJson)
    .end((err, req, res, worked) => {
      expect(err.message).to.eql('invalid JSON');
      expect(err.statusCode).to.eql(422);
      done();
    });
});
it('should test goog JSON', (done) => {
  request('localhost: 3000')
    .post('/')
    .send(goodJson)
    .end((req, res, worked) => {
      expect(res.text).to.eql(goodJson);
      done();
    });
});
});


// describe('integration testing', () => {
//
//
// });
