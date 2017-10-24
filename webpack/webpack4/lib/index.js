'use strict';

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _pack = require('./pack');

var _pack2 = _interopRequireDefault(_pack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));

if (argv.v) {
  console.log(_package2.default.version);
  process.exit(0);
}
if (argv.h || argv.help) {
  new _help2.default(argv);
  process.exit(0);
}

var action = argv._.shift(0);
switch (action) {
  case 'pack':
    new _pack2.default(argv);
    break;

}