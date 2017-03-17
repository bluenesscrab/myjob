'use strict';

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _Pack = require('./Pack');

var _Pack2 = _interopRequireDefault(_Pack);

var _Init = require('./Init');

var _Init2 = _interopRequireDefault(_Init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));

if (argv.v) {
  console.log(_package2.default.version);
  process.exit(0);
}
if (argv._.length < 1) {
  console.error('>> arguments not enough.');
  process.exit(0);
}
var action = argv._.shift(0);

switch (action) {
  case 'pack':
    new _Pack2.default(argv);
    break;
  case 'init':
    new _Init2.default(argv);
    break;
  default:
    console.error('>> invalid arguments: ' + action);
}