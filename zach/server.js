'use strict';

const express = require('express');
const jsonModelParser = require('./lib/parser');

const app = express();

let routerGetData = new express.Router();
let routerSetData = new express.Router();

const model = {
  nodata: {
    msg: "No model"
  }
}

app.use((req, res, next) => {
  req.model = model;
  next();
})

routerGetData.get('/', (req, res) => {
  res.type("json");
  if(req.model.data) {
    res.json(req.model.data);
  } else {
    res.json(req.model.nodata);
  }
});

routerSetData.use(jsonModelParser);

routerSetData.post('/', (req, res) => {
  res.type('json');
  res.json({
    msg: 'valid json',
    data: req.model.data
  });
})

app.use('/api', routerGetData);
app.use('/api', routerSetData);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    msg: err.message
  });
})

app.use((req, res) => {
  res.status(404).json({
    msg: "page not found"
  });
})

app.listen(3000, () => {
  console.log('server up on 3000')
})
