'use strict'

module.exports = (req, res, next) => {
  var addChunks = '';
  req.on('data', (data) => {
    addChunks += data.toString();
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(addChunks);
    }
    catch(err) {
      err.message = 'invalid json'
      err.status = 422;
      console.log(err.message, err.status);
      return next(err);
    }
    next();
  });
}
