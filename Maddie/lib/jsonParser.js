'use strict'

module.exports = (req,res,next) => {
  var getJson = '';
  req.on('data', (data) => {
    getJson += data.toString();
  });
  req.on('end', () => {
    try{
      var parsedJSON = JSON.parse(getJson);
      req.body = parsedJSON
      next();
    } catch (error) {
      error.message = 'invalid json' + '\n'
      res.send(error.message)
    }
  })
}
