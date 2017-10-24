'use strict';

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _cliTableZh = require('cli-table-zh');

var _cliTableZh2 = _interopRequireDefault(_cliTableZh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Dev from './dev.js';

var argv = (0, _minimist2.default)(process.argv.slice(2));

if (argv.v || argv.version) {
  console.log(_package2.default.version);
  process.exit(0);
}

if (argv.w || argv.watch) {
  options.watch = true;
}

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

// let options = {
//   toolsVersion: packageInfo.version,
//   watch: false,
//   currentPath: '', // 当前路径
//   contextPath:''   // 工作目录/src/page/
// };//参数
console.log('argv', argv);
console.log('options');

// switch ( argv._.shift(0) ) {
//   case 'dev':
//     new Dev();
//     break;
//   case 'pro':
//     new Pro();
//     break;
//   default:
//     console.error('>> invalid arguments: ' + action);
// }