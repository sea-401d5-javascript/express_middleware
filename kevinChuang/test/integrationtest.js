/*jshint esversion:6*/
/*eslint-env es6*/

const http = require('http');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const expect = chai.expect;
const parser = require('../lib/parser');
const request = chai.request;
require('../server');

describe('Initial PUT',()=> {
  it('should reject PUTting before POSTing',(done)=> {
    request('localhost:3000')
    .put('/cookies')
    .send('{"cookie":"snickerdoodle"}')
    .end((req,res)=> {
      expect(res.text).to.eql('There are no cookies in here!');
      done();
    });
  });
});

describe('POST middleware',()=> {

  it('should take a POST request and respond',(done)=> {
    request('localhost:3000')
    .post('/cookies')
    .send('{"cookie":"chocolate"}')
    .end((req,res)=> {
      expect(res.text).to.eql('chocolate cookie received!');
      done();
    });
  });

  it('should alert user if cookie posted is the same',(done)=> {
    request('localhost:3000')
    .post('/cookies')
    .send('{"cookie":"chocolate"}')
    .end((req,res)=> {
      expect(res.text).to.eql('No need for another chocolate cookie!');
      done();
    });
  });

  it('should notify what cookie is already there if posting another kind',(done)=> {
    request('localhost:3000')
    .post('/cookies')
    .send('{"cookie":"snickerdoodle"}')
    .end((req,res)=> {
      expect(res.text).to.eql('There is a chocolate cookie there already.');
      done();
    });
  });
});

describe('PUTing after POSTing data',()=> {
  it('should notify user the same cookie is inside',(done)=> {
    request('localhost:3000')
    .put('/cookies')
    .send('{"cookie":"chocolate"}')
    .end((req,res)=> {
      expect(res.text).to.eql('A chocolate cookie is already there');
      done();
    });
  });

  it('should replace the cookie currently inside with the new cookie', (done)=> {
    request('localhost:3000')
    .put('/cookies')
    .send('{"cookie":"snickerdoodle"}')
    .end((req,res)=> {
      expect(res.text).to.eql('chocolate cookie switched out for snickerdoodle');
      done();
    });
  });
});
