## node 站点
	
	安装 express
	npm install express --save

app.js	 入口文件

	const express = require("express");
	const app = express();
	const http = require('http').Server(app);
	const path = require('path');
	const fs = require('fs');
	const conf = {
	  root:path.join(__dirname, 'www'),
	  port:80
	}//配置项
	
	//设置静态资源
	app.use(express.static( conf.root, {index: false}));
	
	let thing = function(req, res, next){
	  //console.log('something');
	  next(); 
	};
	
	let load = function(req, res){
	  //console.log('load');
	  function readFileCallBack(err, data) { 
	    if (err) {
	      console.error(err); 
	    } else {
	      res.send(data)
	    }
	  }
	  fs.readFile('www/index.html', 'utf-8', readFileCallBack);
	  ;
	}
	app.get('/', [thing,load]);
	
	app.use(express.static('www/static'));
	
	http.listen(conf.port, function(){
	  console.log(`listening on localhost:${conf.port}`);
	});
	

>
>  sudo node app.js
>
> sudo 获取root 才能监听 80 
> 

	|-- index.html
	|-- node_modules
	|-- logs/
	|-- app.js
	|-- www/
		|-- build
		|-- src
	

## www/

	cd www/
	npm install
	webpack -w


npm install vue-resource //处理 ajax








