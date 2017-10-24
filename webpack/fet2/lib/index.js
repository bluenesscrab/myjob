'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _cliTableZh = require('cli-table-zh');

var _cliTableZh2 = _interopRequireDefault(_cliTableZh);

var _dev = require('./dev.js');

var _dev2 = _interopRequireDefault(_dev);

var _pro = require('./pro.js');

var _pro2 = _interopRequireDefault(_pro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var argv = (0, _minimist2.default)(process.argv.slice(2));

var options = {
  toolsName: 'fet2',
  toolsVersion: _package2.default.version,
  watch: false,
  root: _path2.default.join(process.cwd()), // 当前路径
  currentPath: '' // 工作路径
}; //参数

if (argv.v || argv.version) {
  console.log(options.version);
  process.exit(0);
}

if (argv.w || argv.watch) {
  options.watch = true;
}

console.log('\n\n\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 ' + options.toolsName + ' \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\n');

if (argv.h || argv.help) {

  console.log('语法：');
  var table = new _cliTableZh2.default();
  table.push(_defineProperty({}, options.toolsName, '<dev|pro> <path> --watch'));
  console.log(table.toString());

  console.log('参数：');
  table = new _cliTableZh2.default();
  table.push({
    'dev': '编译开发版本不产生版本号'
  });
  table.push({
    'pro': '编译生产版本产生版本号'
  });
  table.push({
    '<path>': '需要编译的目录'
  });
  table.push({
    '-w --watch': '是否监听文件变化'
  });
  console.log(table.toString());
  process.exit(0);
}

if (argv._.length < 1) {
  console.error('>> arguments not enough.');
  process.exit(0);
}

var action = argv._.shift(0);
var workPath = argv._.shift(1);
if (workPath) {
  options.currentPath = _path2.default.join(options.root, workPath);
} else {
  console.error('>> error: <path> is Required');
  process.exit(0);
}
switch (action.toLowerCase()) {
  case 'dev':
    new _dev2.default(options);
    break;
  case 'pro':
    new _pro2.default(options);
    break;
  default:
    console.error('>> error: invalid arguments: ' + action);
}