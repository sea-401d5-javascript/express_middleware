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

  it('should parse incoming JSON',(done)=> {
    var data = new stream.Readable();
    data.push('{"test":"testText"}');
    console.log(parser(data));
  });
});
