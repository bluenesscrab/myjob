// var fs= require('fs');
// data = fs.readFileSync('file.html','utf-8');
// console.log(data);
// console.log("[同步方式]按顺序先执行 data 再执行这一句");


// var fs = require("fs");
// fs.readFile('file.html','utf-8',function(err,data){
//    if(err){
//         console.error(err);
//    }else{
//         console.log(data);
//    }
// });
// console.log("[异步方式]按顺序先执行 这一句 再执行 data");


function readFileCallBack(err, data) { 
	if (err) {
		console.error(err); 
	} else {
    console.log(data);
  }
}
var fs = require('fs');
fs.readFile('file.html', 'utf-8', readFileCallBack); 
console.log('异步方式]readFile 第三个参数为回掉函数');