'use strict';

const chai = require('chai');
const fs = require('fs');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../index.js');

describe('Unit testing for middleware', ()=>{
  let badJSON = fs.createReadStream(__dirname + '/bad.json');
  let goodJSON = fs.createReadStream(__dirname + '/good.json');
  function itWorked(){
    return 'it worked';
  };
  it('should test bad JSON', (done)=>{
    request('localhost:3000')
      .post('/')
      .send(badJSON)
      .end((err, req, res, itWorked)=>{
        expect(err.message).to.eql('invalid JSON');
        expect(err.statusCode).to.eql(422);
        done()
      })
  })
  it('should parse good JSON', (done)=>{
    request('localhost:3000')
      .post('/')
      .send(goodJSON)
      .end((err, req, res, itWorked)=>{
        expect(res.text).to.eql(goodJSON);
        done();
      })
  })



})

// describe('Integration testing for middleware', ()=>{
//   it('should ')
//
// })
