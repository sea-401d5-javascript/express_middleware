'use strict';

const express = require('express');
const app = express();
const jsonParser = require('./lib/jsonParser.js')


var jsonRouter = new express.Router();


jsonRouter.use(jsonParser);

jsonRouter.post('/', (req,res) => {
  res.type('json');
  res.json({message:'valid json', data:req.body})
})


app.use('/homework', jsonRouter);

app.get('/*', (req,res) => {
  res.status(422).send('not found' + '\n')
})

app.listen(3000, () => console.log('listening on 3000'))
