const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express(); 

app.use(express.static(path.join(__dirname, 'www'), {index: false}));
app.get('*', function(req, res){ 
  function readFileCallBack(err, data) { 
    if (err) {
      console.error(err); 
    } else {
      res.send(data);
    }
  }
  fs.readFile('www/index.html', 'utf-8', readFileCallBack);
}); 
app.listen('1818');
console.log('listen localhost:1818');