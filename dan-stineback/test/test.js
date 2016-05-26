'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const jsonParser = require(__dirname + '/../lib/jsonParser');



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
