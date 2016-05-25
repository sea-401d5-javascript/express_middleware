'use strict'

const fs = require('fs');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const server = require(__dirname + '/../lib/server');

require('../index');

describe('Testing middleware', () => {
  it('should catch err when invalid json', (done) => {
    request('localhost:3000')
    .post('/articles')
    .send('{"article": "awesome"}')
    .end((err, res) => {
      console.log('is this working?');
      expect(err).to.be.null;
      expect(res.text).to.eql('{"article":"awesome"}');
      done();
    });
  });
});
