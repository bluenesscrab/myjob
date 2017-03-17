'use strict';
//require('core-js');

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPath = require('fs-path');

var _fsPath2 = _interopRequireDefault(_fsPath);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _cliTableZh = require('cli-table-zh');

var _cliTableZh2 = _interopRequireDefault(_cliTableZh);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _fetUtils = require('./lib/fet-utils');

var _fetUtils2 = _interopRequireDefault(_fetUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//cnpm set registry http://registry.cnpm.lietou.com

var commondTitle = _safe2.default.rainbow('\n\t---------- Fet Init Tools v' + _package2.default.version + ' ----------\n');

var pack = function () {
  function pack(argv) {
    _classCallCheck(this, pack);

    this._argv = argv;
    this.init();
    return this;
  }

  _createClass(pack, [{
    key: 'init',
    value: function init() {
      var argv = this._argv;
      // 获取当前工作目录 currentPath
      var currentPath = '';
      if (argv.h || argv.help) {
        this.help();
      }
      if (!(argv._ && Array.isArray(argv._) && argv._.length > 0)) {
        this.help();
      }
      currentPath = argv._[0];
      if (!_path2.default.isAbsolute(currentPath)) {
        currentPath = _path2.default.join(process.cwd(), currentPath);
      }
      // 目录信息
      var pathInfo = _fetUtils2.default.getPathInfo(currentPath);
      if (pathInfo === null) {
        console.error(_safe2.default.white.bgRed('当前工作目录 ' + currentPath + ' 不合法！'));
        process.exit(0);
      }
      Object.assign(this, pathInfo);
      console.log(commondTitle);
      var table = new _cliTableZh2.default();
      table.push({
        '业务端': this.port
      }, {
        '类型': this.view
      }, {
        '分支': this.trunk
      }, {
        '版本': this.version
      }, {
        '项目根目录': this.rootPath
      }, {
        '当前工作目录': this.contextPath
      });
      console.log(table.toString());
      this.initFiles();
      return this;
    }
  }, {
    key: 'initFiles',
    value: function initFiles() {
      Promise.resolve().then(this._checkWorkFolder.bind(this)).then(this._initFolder.bind(this)).then(this._buildPackageJson.bind(this)).catch(function (err) {
        console.log(err.stack);
      });
    }
  }, {
    key: '_checkWorkFolder',
    value: function _checkWorkFolder() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var projectPath = _path2.default.join(_this.contextPath, '../../');
        _fs2.default.exists(projectPath, function (exists) {
          if (!exists) {
            reject(new Error('工作目录 ' + projectPath + ' 不存在或不合法！'));
          } else {
            resolve();
          }
        });
      });
    }
  }, {
    key: '_initFolder',
    value: function _initFolder() {
      var _this2 = this;

      var promises = ['js', 'js/lib', 'js/pages', 'tpls', 'css', 'images', 'images/icons', 'images/icons/spritesify', 'images/pages', 'images/tpls', 'images/plugins', '../build', '../static', '../static/css', '../static/js', '../static/images'].map(function (v) {
        return new Promise(function (resolve, reject) {
          _fsPath2.default.mkdir(_path2.default.join(_this2.contextPath, v), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
      return Promise.all(promises);
    }
  }, {
    key: '_buildPackageJson',
    value: function _buildPackageJson() {
      var _this3 = this;

      var packagePath = _path2.default.join(this.contextPath, 'package.json');
      return new Promise(function (resolve, reject) {
        _fs2.default.exists(packagePath, function (exists) {
          if (!exists) {
            var content = '{\n  "name": "@liepin/module_' + _this3.port + '_' + _this3.view + '_' + _this3.version + '",\n  "version": "1.0.0",\n  "description": "package.json for ' + _this3.port + ' ' + _this3.view + '",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "repository": {\n    "url": "http://cnpm.lietou.com/",\n    "type": "git"\n  },\n  "author": "chenbl@liepin.com",\n  "license": "MIT",\n  "dependencies": {}\n}';
            _fs2.default.writeFile(packagePath, content, 'utf-8');
            console.log('building ' + packagePath);
          }
          resolve();
        });
      });
    }
  }, {
    key: 'help',
    value: function help() {
      var table;
      console.log(commondTitle);
      console.log('语法：');
      table = new _cliTableZh2.default({
        head: ['fet pack <path> --watch']
      });
      console.log(table.toString());
      console.log('参数：');
      table = new _cliTableZh2.default();
      table.push({
        '<path>': '需要编译的目录'
      }, {
        '-w --watch': '是否监听文件变化'
      });
      console.log(table.toString());
      process.exit(0);
    }
  }]);

  return pack;
}();

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


exports.default = pack;