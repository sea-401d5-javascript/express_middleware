"use strict";

module.exports = (req, res, next) =>{
  var body = '';
  req.on('data', (data) => {
    body += data.toString();
  });
  req.on('end', () => {
    try {
      var parsed = JSON.parse(body);
      req.body = parsed;

    } catch (e) {
      e.message = 'Invalid JSON';
      e.statusCode = 422;
      return next(e);
    }
    next();
  });
}
