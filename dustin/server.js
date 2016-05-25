'use strict';
const express = require('express');
const superJSONparser = require('./lib/superJSONparser');
const app = express();

var apiRouter = new express.Router();

apiRouter.use(superJSONparser);

apiRouter.post('/', (req, res, next) => {
  res.send('{"Message": "POST received"}');
  res.end();
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({
    msg: 'page not found'
  });
});

app.listen(3000, () => {
  console.log('server up on 3000');
});
