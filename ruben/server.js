"use strict";
const express = require('express');

const app = express();

var routerGetData = new express.Router();
var routerSetData = new express.Router();

const model = {
  nodata: {
    msg: 'No model'
  }
};

app.use((req, res, next) => {
  req.model = model;
  next();
});

app.use((req, res, next) => {
  req.time = new Date();
  next();
});

app.use((req, res, next) => {
  console.log("REQUEST", req.time, req.url);
  next();
});

router.GetData.get('/', (req, res) => {
  res.type('json');
  if (model.data){
    res.json(model.data);
  } else {
    res.json
  }
  res.json(req.model.nodata);
});

routerSetData.use('/', (req, res, next) => {
  var accumJson = '';
  req.on('data', (data) => {
    accumJson += data.toString();
  });
  req.on('end', (req, res, next) => {
    try {
      var parsed = JSON.parse(accumJson);
      model.data = parsed;
      next();
    } catch(e){
      console.log(e);
      e.message = 'invalid json';
      e.statusCode = 422;
      next();
    }
  });
});

routerSetData.post('/', (req, res) => {
  res.type('json');
  res.json({
    msg: 'valid json',
    data: req.body
  });
})

app.use('/api', routerGetData);
app.use('/api', routerSetData);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({msg: err.message});
})

app.use(req, res) => {
  res.status(404).json({
    msg:'page not found';
  })
});

app.listen(3000, () => {console.log("up on 3000")});
