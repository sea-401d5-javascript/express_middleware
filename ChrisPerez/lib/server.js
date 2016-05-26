'use strict';

const express = require('express');
const app = express();
const jsonParser = require(__dirname + '/jsonParser');

app.use('/', jsonParser);

app.post('/', (req, res)=>{
  console.log(req.body);
  res.send('JSON parsed');
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    msg: err.message
  });
})

module.exports = app.listen(3000, ()=>{console.log('Server up on THREE THOUSAND!')});
