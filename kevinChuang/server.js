/*jshint esversion:6*/
/*eslint-env es6*/

const express = require('express');
const app = express();
const parser = require('./lib/parser');

var parseData = express.Router();

var jar = {message:'No cookies in the jar!'};

// Peek at the cookie
app.get('/cookies',(req,res)=>{
  res.json(jar);
});

// Store the cookie
parseData.use(parser);
parseData.post('/cookies',(req,res)=>{
  if(req.body.cookie === jar.cookie){
    return res.send('No need for another ' + req.body.cookie + ' cookie!');
  }

  if(jar.cookie !== undefined){
    return res.send('There is a ' + jar.cookie + ' cookie there already.');
  }

  jar = req.body;
  console.log('Received ' + JSON.stringify(req.body));
  res.send(req.body.cookie + ' cookie received!');
});

// Update the cookie
parseData.put('/cookies/',(req,res)=> {
  if(req.body.cookie === jar.cookie){
    return res.send('A '+ jar.cookie + ' cookie is already there');
  }

  if(jar.cookie === undefined) {
    return res.send('There are no cookies in here!');
  }
  var currentCookie = jar.cookie;
  jar.cookie = req.body.cookie;
  res.send(currentCookie + ' cookie switched out for ' + req.body.cookie);
});

// Nom nom the cookie
app.delete('/cookies/:id',(req,res)=> {
  if(req.params.id === jar.cookie){
    jar = {message:'no more cookies!'};
    return res.send('The ' + req.params.id + ' cookie has been eaten!');
  }

  return res.send('There are no '+ req.params.id + ' cookies there!');
});

app.use('/', parseData);
app.use((err,req,res,next)=> {
  res.status(err.statusCode || 500).json({
    message: err.message
  });
});

app.use((req,res)=> {
  res.status(404).json({
    message: 'Page not found'
  });
});

app.listen(3000,()=> console.log('listening on port 3000'));
