/*jshint esversion:6*/
/*eslint-env es6*/

const http = require('http');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const expect = chai.expect;
const parser = require('../lib/parser');
const fs = require('fs');
const stream = require('stream');

describe('Unit testing', ()=> {

  it('should be a function',()=> {
    expect(typeof parser).to.eql('function');
  });

  it('should parse incoming valid JSON',(done)=> {
    var req = fs.createReadStream(__dirname + '/goodJson.json');
    parser(req,null,()=> {
      expect(req.body.message).to.eql('test');
      done();
    });
  });

  it('should error with incoming invalid JSON',(done)=> {
    var req = fs.createReadStream(__dirname + '/badJson.json');
    parser(req,null,(e)=>{
      expect(e.message).to.eql('invalid Jayson');
      done();
    });
  });
});
