'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _cliTableZh = require('cli-table-zh');

var _cliTableZh2 = _interopRequireDefault(_cliTableZh);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var argv = (0, _minimist2.default)(process.argv.slice(2));

var options = {
  watch: false
}; //参数

console.log(argv);

if (argv.v || argv.version) {
  console.log(_package2.default.version);
  process.exit(0);
}

// if(argv.w || argv.watch) {
//   options.watch = true;
// }

console.log('\n\n———————————————— fet2 ————————————————\n');
if (argv.h || argv.help) {

  console.log('语法：');
  var table = new _cliTableZh2.default();
  table.push({
    'fet2': '<path> --watch'
  });
  console.log(table.toString());

  console.log('参数：');
  table = new _cliTableZh2.default();
  table.push({
    '<path>': '需要编译的目录'
  });
  console.log(table.toString());

  console.log('-w --watch: 是否监听文件变化');
  process.exit(0);
}

if (argv._.length < 1) {
  console.error('>> arguments not enough.');
  process.exit(0);
}

var Build = function () {
  function Build() {
    _classCallCheck(this, Build);

    this.init();
    return this;
  }

  _createClass(Build, [{
    key: 'init',
    value: function init() {

      (0, _webpack2.default)({
        entry: {
          index: "/Users/zhangsen/git/myjob/webpack/v4/fet2/test/index.js"
        },
        output: {
          path: "/Users/zhangsen/git/myjob/webpack/v4/fet2/asset", //打包后的文件存放的地方
          filename: "[name].js" //打包后输出文件的文件名
        },
        module: {
          loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: { presets: ['es2015', 'babel-preset-stage-0'] }
          }]
        },
        watch: true
      }, function () {
        console.log('-watch-');
      });
    }
  }]);

  return Build;
}();

switch (argv._.shift(0)) {
  case 'build':
    new Build();
    break;
  default:
    console.error('>> invalid arguments: ' + action);
}