'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const router = express.Router();
module.exports = router;

router.use(middleware.parse);

router.post('*', (req, res) => {
  res.status(req.status).send(req.body);
}).put('*', (req, res) => {
  res.status(req.status).send(req.body);
});
