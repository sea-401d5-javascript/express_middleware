'use strict';

/*
need to parse json
-good json
-bad json
*/

const chai = require('chai')
const expect = chai.expect;
const fs = require('fs')
const jsonParser = require(__dirname + '/../lib/jsonParser.js');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;

describe('middleware unit tests', ()=>{
  it('should read good JSON', (done)=>{
    let req = fs.createReadStream(__dirname + '/good.json');
    jsonParser(req, null, ()=>{
      expect(req.body.message).to.eql('test');
      done();
    })
  })
  it('should read bad JSON and throw an error', ()=>{
    let req = fs.createReadStream(__dirname + '/bad.json');
    jsonParser(req, null, (err)=>{
      expect(req.err.message).to.eql('invalid Jason');
      expect(req.err.statusCode).to.eql(422);
      done();
    })
  })
})

describe('middleware integration tests', ()=>{
  it('should read good JSON', (done)=>{
    require(__dirname + '/../lib/server');
    request('localhost:3000')
      .post('/')
      .send({message:'test2'})
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res.text).to.eql('JSON parsed')
        done();
      })
  })
  it('should read bad JSON and throw an error', (done)=>{
    require(__dirname + '/../lib/server');
    request('localhost:3000')
      .post('/')
      .send("message:test2'}")
      .end((err, res)=>{
        expect(err).to.have.status(422);
        expect(res.body.msg).to.eql('invalid Jason');
        done();
      })
  })
})
