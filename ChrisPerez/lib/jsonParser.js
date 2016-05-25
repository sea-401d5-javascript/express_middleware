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
      err.message = 'invalid JSON';
      err.statusCode = 422;
      next(err);
    }
  })
}
