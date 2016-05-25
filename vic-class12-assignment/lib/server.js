'use strict'

const express = require('express');
const middleware = require(__dirname + '/middleware');
const app = express();

var routerGetData = new express.Router();
var routerSetData = new express.Router();

app.use(middleware);
app.post('/articles', (req, res) => {
  console.log(req.body);
  var test = JSON.stringify(req.body);
  res.write(test);
  res.end();
});

app.listen(3000, function() {console.log('listening on port 3000')});
