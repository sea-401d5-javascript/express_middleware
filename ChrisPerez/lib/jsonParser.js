'use strict';

module.exports = (req, res, next)=>{
  let jsonCollector = '';
  req.on('data', (data)=>{
    jsonCollector += data.toString();
  });
  req.on('end',()=>{
    try{
      let parsed = JSON.parse(jsonCollector);
      req.body = parsed;
      next();
    } catch (err) {
      err.statusCode = 422;
      err.message = 'invalid Jason';
      next(err);
    }
  })
}

//NOTES:
//req is a readable stream
//here, res is nothing... this function does not care about res. might as well be null
//next is a function, and in once instance it may take an object as an argument
