/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _alert = __webpack_require__(5);

var _alert2 = _interopRequireDefault(_alert);

var _index = __webpack_require__(2);

var _index2 = _interopRequireDefault(_index);

var _layer = __webpack_require__(6);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import LocalCity from '../../components/localCity/index.js';

document.write('<div class="index"><p>index.js</p>' + (0, _alert2.default)() + '</div>');

_index2.default.init();

var layer = new _layer2.default();
var str = layer.tpl({
  name: 'jeson',
  arr: ['张三', '李四', '王五', '赵六']
});
console.log(str);

//LocalCity.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

var _alert = __webpack_require__(4);

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {

    var alert = new _alert2.default();
    var html = alert.tpl({
      name: 'jeson',
      arr: ['张三', '李四', '王五', '赵六']
    });
    document.write(html);

    // let alert = new Alert();
    // console.log(alert)
    // let html = alert.tpl({ //此时lay.tpl是一个函数，函数执行并传参
    //   name: 'jeson',
    //   arr: ['张三', '李四', '王五', '赵六']
    // });


    // let html = Alert.tpl({
    //   name:'inde - > alert',
    //   arr:['张三', '李四', '王五', '赵六']
    // })
    // document.write(html);
    // document.write('end alert init');
    // let html = Alert.tpl({
    //   name:'inde - > alert',
    //   arr:['张三', '李四', '王五', '赵六']
    // })
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = __webpack_require__(5);

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function alert() {
  return {
    name: 'alert',
    tpl: _alert2.default
  };
};

exports.default = alert;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/zhangsen/git/myjob/webpack/v4-1/src/components/alert/alert.ejs'\n    at Error (native)");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layer = __webpack_require__(7);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function layer() {
    return {
        name: 'layer',
        tpl: _layer2.default
    };
};
exports.default = layer;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (data) {
var __t, __p = '';
__p += '<div>\n    <div>this is <%= name %></div>\n    <% for(let i=0;i<arr.length;i++){ %>\n\n        <%= arr[i]  %>\n\n    <% } %>\n</div>';
return __p
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);