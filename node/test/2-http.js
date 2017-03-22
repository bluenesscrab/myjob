
// var http = require('http'); 
// var fs = require('fs');
// http.createServer(function(req,res){
// 	  res.writeHead(200, {'Content-Type': 'text/html'});  
// 	  var data = fs.readFileSync('file.html', 'utf-8'); 
// 	  res.write(data||'nodata');
// 	  res.end(); 
// }).listen(1000,'127.0.0.1');

var http = require('http'); 
var fs = require('fs');
function readFileCallBack(err, data) { 
	if (err) {
		console.error(err); 
	} else {
    http.createServer(function(req,res){
			res.writeHead(200, {'Content-Type': 'text/html'}); 
			res.write(data||'nodata');
			res.end(); 
		}).listen(2000,'127.0.0.1');
  }
}
var data = fs.readFile('file.html', 'utf-8', readFileCallBack); 


