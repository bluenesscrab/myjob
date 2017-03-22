// var http = require('http');
// var querystring = require('querystring');
// var server = http.createServer(function(req, res) {
// 	var post = '';
// 	req.on('data', function(chunk) { 
// 		post += chunk;
// 	});
// 	req.on('end', function() {
// 		post = querystring.parse(post);
// 	  res.write(post.title);
// 	  res.write('\n');
// 	  res.write(post.text);
// 	  res.end();
// 	});
// }).listen(3333,'127.0.0.1');

var express = require('express');
var app = express.createServer(); 
app.use(express.bodyParser()); 
app.all('/', function(req, res) {
  res.send(req.body.title + req.body.text);
});
app.listen(3333);

