'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);

    return this;
  }

  _createClass(Utils, [{
    key: 'getPathInfo',
    value: function getPathInfo(pathname) {
      var pathstr = _path2.default.sep + 'fe' + _path2.default.sep + '(?:release' + _path2.default.sep + ')?' + 'dev' + _path2.default.sep + '(.*)' + _path2.default.sep + '(pc|h5)' + _path2.default.sep + '(branches' + _path2.default.sep + '[^' + _path2.default.sep + ']+' + _path2.default.sep + '|trunk' + _path2.default.sep + ')?' + '([^' + _path2.default.sep + ']+)';
      var matches = pathname.match(new RegExp(pathstr.replace(/\\/g, '\\\\')));
      if (matches) {
        var root = _path2.default.join(pathname.substring(0, matches.index), 'fe');
        var trunk = matches[3] || '';
        root = _path2.default.join(root, trunk ? '' : 'release');
        return {
          rootPath: root,
          devPath: _path2.default.join(root, 'dev'),
          contextPath: _path2.default.join(root, trunk ? '../' : '../../', matches[0], 'src'),
          corePath: _path2.default.join(root, 'dev/core/', matches[2], trunk ? 'trunk' : '', matches[4], 'src'),
          port: matches[1],
          view: matches[2],
          trunk: trunk,
          version: matches[4]
        };
      } else {
        return null;
      }
    }
  }]);

  return Utils;
}();

exports.default = new Utils();

/*
  私有配置
  var root;
  if (process.platform === 'win32') {
    root = process.env.USERPROFILE || process.env.APPDATA || process.env.TMP || process.env.TEMP;
  } else {
    root = process.env.HOME || process.env.TMPDIR || '/tmp';
  }

  var config = module.exports = {
    cnpmHost: 'https://npm.taobao.org',
    cnpmRegistry: 'https://registry.npm.taobao.org',
    disturl: 'https://npm.taobao.org/mirrors/node', // download dist tarball for node-gyp
    iojsDisturl: 'https://npm.taobao.org/mirrors/iojs',
    cache: path.join(root, '.cnpm'),  //cache folder name
    userconfig: path.join(root, '.cnpmrc'),
    proxy: '',
  };

 */