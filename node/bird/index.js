const express = require("express");
const app = express();
const http = require('http').Server(app);
const path = require('path');
const fs = require('fs');
const conf = {
  root:path.join(__dirname, 'www'),
  port:8080,
  mongodb:'mongodb://localhost:27017/admin'
  //mongodb:'mongodb://username:password@localhost:27017/user',
}

//设置静态资源
app.use(express.static( conf.root, {index: false}));

var  mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
// var  db = new mongodb.Db(conf.mongoUser, server, {capped:false});
// //连接db
// db.open(function(err, db){
//   if(!err){
//     console.log('connect db');

//     db.createCollection(conf.mongoUser, {capped:false}, function(err, collection){
//       if(err){
//           console.log(err);
//       }else{
//         // 查询数据
//         var tmp1 = {name:'zhang5'};
//         var tmp2 = {name:'zhang15'};
//         collection.insert([tmp1,tmp2],{capped:false},function(err,result){
//           console.log('指定查询：', result);
//         }); 
//         collection.find().toArray(function(err,docs){
//           console.log('输出数组形式 查找全部', docs);
//         }); 
//         collection.findOne(function(err,doc){
//           console.log('只查找一个', doc);
//         }); 
//       }
//     });
//   }else{
//     console.log(err);
//   }
// });



// MongoClient.connect(conf.mongodb).then(function (database) {
//   return new Promise((resolve,reject) => {
    
//   });
//   console.log('data',database);
//   if(true){
//     reject();
//   } else {
//     resolve();
//   }
// }).catch(reject);


var selectData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('admin');
  collection.find().toArray(function(err, result) {
    if(err){
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}
MongoClient.connect(conf.mongodb, function(err, db) {
  console.log("连接成功！");
  selectData(db, function(result) {
    console.log(result);
    db.close();
  });
});





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
}


app.get('/', [thing,load]);

app.use(express.static('www'));

http.listen(conf.port, function(){
  console.log(`listening on localhost:${conf.port}`);
});



