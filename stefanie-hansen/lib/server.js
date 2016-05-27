'use strict';

const express = require('express');
const app = express();
const router = require('./router');

app.use(router);

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
