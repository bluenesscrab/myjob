var express = require("express");

//数据库连接
var mongoose =require("./config/mongoose.js");
var db=mongoose();

var app=express();
var path = require('path');

var index =require('./routes/index');
var admin = require('./routes/admin');

var bodyParser = require('body-parser');

//将表单数据格式化
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}))

//设置模板引擎
app.set("view engine",'jade');
app.set('views','./views/pages');

//设置静态资源
app.use(express.static(path.join(__dirname, './public')));


//路由设置
app.use("/",index);
app.use("/admin",admin);




app.listen(3000,function(){
    console.log("请访问http://localhost:3000");
});