/*jshint esversion:6*/
/*eslint-env es6*/

exports = module.exports = (req,res,next) => {
  var payload = exports.payload = '';
  req.on('data',(data)=> {
    payload += data.toString();
  });

  req.on('end',()=> {
    try {
      var parsedLoad = JSON.parse(payload);
      req.body = parsedLoad;
    } catch (e) {
      e.message = 'invalid Jayson';
      e.statusCode = 422;
      next(e);
    }
    next();
  });
};
