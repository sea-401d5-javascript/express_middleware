"use strict";

module.exports = (req, res, next)=>{
   var sumJson = '';
   req.on('data', (data)=> {
     sumJson += data.toString();
     console.log('sumJson', sumJson);
   });
   req.on('end', () => {
     try {
       let parsed = JSON.parse(sumJson);
       req.body = parsed;
       console.log('req.body', req.body);
       next();
     } catch (err){
      err.message = 'invalid JSON';
      err.statusCode = 422;
      return next(err);
     }
   });
 };
