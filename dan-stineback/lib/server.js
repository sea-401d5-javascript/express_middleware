'use strict';
const express = require('express');
const app = express();
const jsonParser = require(__dirname + '/jsonParser');


app.use('/zoots', jsonParser);

app.post('/zoots', (req, res) => {
  res.send('JSON parsed');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({msg: err.message});
});


module.exports = exports = app.listen(3000, () => {
  console.log('server up on 3000');
});
