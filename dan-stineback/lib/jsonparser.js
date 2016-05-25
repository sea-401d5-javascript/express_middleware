"use strict";

module.exports = (req, res, next)=>{
   var sumJson = '';
   req.on('data', (data)=> {
     sumJson += data.toString();
   });
   req.on('end', () => {
     try {
       req.body = JSON.parse(sumJson);
       console.log(req.body);
       console.log('POST sent');
       next();
     } catch (err){
      res.status(422).send({msg: 'invalid JSON'});
      res.end();
      next(err);
     }
   });
 };
