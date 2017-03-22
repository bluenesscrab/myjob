var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_evnet',function(){
	console.log('some_evnet occured.');
});
setTimeout(function(){
	event.emit('some_evnet');
},1000);

var Event = require('events').EventEmitter;
var ev = new Event();
ev.on('some',function(){
	console.log('some occured.');
});
setTimeout(function(){
	ev.emit('some');
},2000);

