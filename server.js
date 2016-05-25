'use strict';

const express = require('express');
const app = express();
const jsonModelParser = require('./lib/jsonModelParser');

var routerGetData = new express.Router();
var routerSetData = new express.Router();
var fileRouter = new express.Router();

const model = {
  data: {
    msg: "hello ther"
  },

  nodata: {
    msg: "No model"
  }
};


app.use((req, res, next) => {
  req.model = model;
  next();
});


routerSetData.use(jsonModelParser);

routerGetData.get('/', (req, res) => {
  res.type('json');
  if (req.model.data) {
    res.send(req.model.data);
  } else {
    res.send(req.model.nodata);
  }
});

routerSetData.post('/', (req, res) => {
  res.type('json');
  res.json({
    msg: 'valid data',
    data: req.body
  });
})

app.use('/drew', routerGetData);
app.use('/drew', routerSetData);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    msg: err.message
  });
});

app.use((req, res) => {
  res.status(404).json({
    msg: 'page not found'
  });
});

app.listen(3000, () => console.log('server up on 3000'));
