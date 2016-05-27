'use strict';

// for testing
let requestObj = exports.requestObj = {};

exports.parse = function jsonParser(req, res, next) {
  let dataBody = '';
  req.on('data', (data) => {
    dataBody += data.toString();
  });
  req.on('end', () => {
    try {
      req.body = requestObj.body = JSON.parse(dataBody);
      req.status = requestObj.status = 200;
      if (next) next();
    } catch(err) {
      console.log('Error', err);
      req.body = requestObj.err = {"Message":"invalid json"};
      req.status = requestObj.statusErr = 400;
      if (next) next();
    }
  });
};
