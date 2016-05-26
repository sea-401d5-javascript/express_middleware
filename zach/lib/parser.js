'use strict';

module.exports = function(req, res, next) {
  let accumJson = '';
  req.on('data', (data) => {
    accumJson +=data.toString();
  })
  req.on('end', () => {
    try {
      var parsed = JSON.parse(accumJson);
      req.body = parsed;
      req.model.data = parsed;
      next();
    } catch (e) {
      e.message = 'invalid json';
      e.statusCode = 422;
      next(e);
    }
  })
}
