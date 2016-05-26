'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const jsonParser = require(__dirname + '/../lib/jsonParser');
const chai = require('chai')
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;



describe('json parser test', () => {
  it('should read valid json', (done)=>{
    let req = fs.createReadStream(__dirname + '/good.json');
    jsonParser(req, null, () =>{
      expect(req.body.message).to.eql('test');
      done();
    });
  });
  it('should reject invalid json', (done)=>{
    let req = fs.createReadStream(__dirname + '/bad.json');
    jsonParser(req, null, (err) =>{
      expect(err.message).to.eql('invalid JSON');
      expect(err.statusCode).to.eql(422);
      done();
  });
});
});

describe('should run integration tests', ()=>{
  it('should read good JSON', (done)=>{
   require(__dirname + '/../lib/server');
   request('localhost:3000')
      .post('/zoots')
       .send({message:'test2'})
       .end((err, res)=>{
         expect(err).to.eql(null);
         expect(res.text).to.eql('JSON parsed')
         done();
       });
   });
   it('should read bad JSON', (done)=>{
     require(__dirname + '/../lib/server');
     request('localhost:3000')
       .post('/zoots')
       .send("message:test2'}")
       .end((err, res)=>{
         expect(err).to.have.status(422);
         expect(res.body.msg).to.eql('invalid JSON');
         done();
       });
   });
 });
