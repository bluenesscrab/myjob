'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Help = function () {
  function Help(argv) {
    _classCallCheck(this, Help);

    this.init(argv);
  }

  _createClass(Help, [{
    key: 'init',
    value: function init(argv) {
      console.log('Usage: ' + _package2.default.name + ' ' + _package2.default.version + ' <command>');
      console.log('where <command> is one of:');

      console.log(argv);
      console.log('-v --version   version');
      console.log('-h --help   help');
    }
  }]);

  return Help;
}();

exports.default = Help;