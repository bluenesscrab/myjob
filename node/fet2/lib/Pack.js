'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/* postCSS依赖*/


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _cliTableZh = require('cli-table-zh');

var _cliTableZh2 = _interopRequireDefault(_cliTableZh);

var _fsPath = require('fs-path');

var _fsPath2 = _interopRequireDefault(_fsPath);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _fetUtils = require('./lib/fet-utils');

var _fetUtils2 = _interopRequireDefault(_fetUtils);

var _extractTextPlusWebpackPlugin = require('extract-text-plus-webpack-plugin');

var _extractTextPlusWebpackPlugin2 = _interopRequireDefault(_extractTextPlusWebpackPlugin);

var _postcssLp = require('postcss-lp');

var _postcssLp2 = _interopRequireDefault(_postcssLp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commondTitle = _safe2.default.rainbow('\n\t---------- Fet Pack Tools v' + _package2.default.version + ' ----------\n');

var pack = function () {
  function pack(argv) {
    _classCallCheck(this, pack);

    this._argv = argv;
    this.watch = false;
    this.currentPath = ''; // 当前路径
    this.rootPath = ''; // 项目根目录
    this.contextPath = ''; // 当前工作目录
    this.devPath = ''; // 业务端根目录
    this.corePath = ''; // 核心目录
    this.basicPaths = []; // 查询有效目录，包括dev和core
    this.port = ''; // 业务端
    this.view = ''; // 端口，pc 或 h5
    this.trunk = ''; // 分支信息，trunk 或 branches
    this.version = ''; // 版本，v3
    this.devDirectories = []; // 所有业务端目录路径
    this.init();
    this.pack();
    return this;
  }

  _createClass(pack, [{
    key: 'init',
    value: function init() {
      var _this = this;

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
      // 获取监听模式 watch
      if (argv.watch || argv.w) {
        this.watch = true;
      }
      // 目录信息
      var pathInfo = _fetUtils2.default.getPathInfo(currentPath);
      if (pathInfo === null) {
        console.error(_safe2.default.white.bgRed('当前工作目录 ' + currentPath + ' 不合法！'));
        process.exit(0);
      }
      Object.assign(this, pathInfo);
      this.basicPaths = [this.contextPath, this.corePath];
      this.devDirectories = this._getDevList(this.devPath).map(function (v) {
        return _path2.default.join(_this.devPath, v, _this.view, _this.trunk ? 'trunk' : '', _this.version, 'src');
      });
      this.currentPath = currentPath;
      return this;
    }
  }, {
    key: 'pack',
    value: function pack() {
      var _this2 = this;

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
        '公共路径': this.corePath
      }, {
        '当前工作目录': this.contextPath
      }, {
        '传入路径': this.currentPath
      }, {
        '监听模式': this.watch ? '已开启' : '关闭'
      });
      console.log(table.toString());
      Promise.resolve().then(this.removeBuild.bind(this)).then(this._getEntries.bind(this)).then(function (list) {
        return _this2._pack(list);
      }).then(function () {
        console.log('pack done.');
      }).catch(function (err) {
        console.log(_safe2.default.white.bgRed(err.toString()));
      });
    }
  }, {
    key: '_pack',
    value: function _pack(list) {
      var options = this._getOptions(list);
      return new Promise(function (resolve, reject) {
        (0, _webpack2.default)(options, function (err, stats) {
          if (err) {
            reject(err);
          } else {
            //console.log(stats.toString());
            console.log(stats.toString({
              hash: false,
              version: false,
              timings: false,
              assets: true,
              chunks: true,
              chunkModules: false,
              errorDetails: true,
              colors: true
            }));
            var jsonStats = stats.toJson();
            stats.hasWarnings() && console.log(jsonStats.warnings);
            if (stats.hasErrors()) {
              reject(jsonStats.errors);
            } else {
              resolve();
            }
          }
        });
      });
    }
  }, {
    key: '_getOptions',
    value: function _getOptions(list) {
      var _this3 = this;

      var entries = {};
      var contextPath = this.contextPath;
      var publicPath = '//concat.lietou-static.com/dev/' + this.port + '/' + this.view + '/' + this.version + '/build/';
      list.forEach(function (filepath) {
        var shortname = filepath.replace(contextPath, '').replace(/^[\/\\]|\.js$/ig, '');
        entries[shortname] = './' + shortname + '.js';
      });
      var options = {
        context: contextPath,
        entry: entries,
        output: {
          path: _path2.default.join(contextPath, '../build'),
          filename: '[name].js',
          publicPath: publicPath
        },
        module: {
          loaders: [{
            test: /\.(jpg|jpeg|gif|swf|png|eot|woff|ttf|svg)$/,
            loader: 'file-plus',
            include: this.allDirectories,
            query: {
              context: contextPath,
              name: '[path][name].[ext]',
              map: function map(url, filepath) {
                Object.keys(options.resolve.alias).forEach(function (key) {
                  var portsrc = options.resolve.alias[key];
                  var portdir = _path2.default.join(portsrc, '..');
                  if (filepath.startsWith(portdir)) {
                    filepath = _path2.default.relative(portsrc, filepath);
                    if (filepath.startsWith('..')) {
                      console.error(_safe2.default.white.bgRed('错误的引用关系，只有 src 目录下的内容才能通过相对路径引用：' + filepath));
                    }
                    filepath = key + _path2.default.sep + filepath;
                  }
                });
                var filepathArr = filepath.split(/[\\\/]/);
                if (filepathArr[0] === '@' + _this3.port) {
                  filepathArr = filepathArr.slice(1);
                } else {
                  filepathArr[0] = filepathArr[0].replace(/^@/, '@/');
                }
                filepath = filepathArr.join('/');
                filepath = filepath.replace(/node_modules([\\\/])\.npminstall\1(@[^\\\/]+\1)?[^\\\/]+\1[\d.]+|node_modules/, 'modules');
                filepath = filepath.replace(/\\/g, '/');
                return filepath;
              }
            }
          }, {
            test: /\.css$/,
            include: this.allDirectories,
            loader: _extractTextPlusWebpackPlugin2.default.extract('style-loader', 'css-loader')
          }, {
            test: /\.(jsx?|tpl)$/,
            loader: 'babel-loader',
            include: this.allDirectories,
            exclude: /unpack_files/,
            query: {
              presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
              plugins: [require.resolve('babel-plugin-transform-es3-property-literals'), require.resolve('babel-plugin-transform-es3-member-expression-literals')]
            } //http://babeljs.io/docs/plugins/preset-es2015/
          }],
          preLoaders: [{
            test: /common\.css$/,
            loader: 'spritesify',
            include: this.allDirectories,
            query: {
              spritesPath: _path2.default.join(this.contextPath, 'images/icons/spritesify'),
              distPath: _path2.default.join(contextPath, '../build/images/icons'),
              urlFix: publicPath + 'images/icons/'
            }
          }, {
            test: /common\.css$/,
            loader: 'fsk-font',
            query: {
              dir: _path2.default.join(this.contextPath, 'fonts/svgs'),
              out: _path2.default.join(contextPath, '../build/fonts'),
              font: 'h5icon'
            }
          }, {
            test: /\.css$/,
            loader: 'postcss-loader'
          }, {
            test: /\.tpl$/,
            loader: 'nodetpl',
            include: this.allDirectories
          }]
        },
        postcss: function postcss() {
          return [(0, _postcssLp2.default)({
            autoprefixer: { browsers: ['> 1%', 'IE 7'] }
          })];
        },
        resolve: {
          root: this.basicPaths.map(function (v) {
            return _path2.default.join(v, 'node_modules');
          }),
          extensions: ['', '.js', '.json', '.tpl'],
          modulesDirectories: ['node_modules'],
          alias: {
            antd: _path2.default.join(this.corePath, '../static/unpack_files/antd.min.js')
          }
        },
        watch: this.watch,
        resolveLoader: {
          root: _path2.default.join(__dirname, '../node_modules')
        },
        plugins: [new _extractTextPlusWebpackPlugin2.default('css/[name].css', {
          allChunks: true,
          allEntries: false,
          nameFilter: function nameFilter(name) {
            return name.replace(/[\\\/]js[\\\/]/, '/');
          }
        })],
        externals: [{
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd'
        }]
      };
      // 配置alias
      this.devDirectories.forEach(function (v) {
        var info = _fetUtils2.default.getPathInfo(v);
        options.resolve.alias['@' + info.port] = info.port === _this3.port ? _this3.contextPath : info.contextPath;
      });
      return options;
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
  }, {
    key: 'removeBuild',
    value: function removeBuild() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _fsPath2.default.remove(_path2.default.join(_this4.contextPath, '../build'), function (err) {
          resolve();
        });
      });
    }
  }, {
    key: '_getDevList',
    value: function _getDevList(devPath) {
      var _this5 = this;

      var trunkPath = this.contextPath.replace(/branches[\/\\][^\/\\]+/, 'trunk');
      return _fs2.default.readdirSync(devPath).filter(function (v) {
        return !v.startsWith('.') && _fs2.default.statSync(_path2.default.join(devPath, v)).isDirectory();
      }).map(function (v) {
        return v === trunkPath ? _this5.contextPath : v;
      });
    }
  }, {
    key: '_getEntries',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this6 = this;

        var promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // jshint ignore:line
                promise = function promise() {
                  return new Promise(function (resolve, reject) {
                    _fsPath2.default.find(_path2.default.join(_this6.contextPath, 'js'), function (filepath, stats, filename) {
                      if (/^\./.test(filename)) {
                        return false;
                      }
                      if (stats === 'directory' && filename !== 'lib' || /\.js?$/.test(filename)) {
                        return true;
                      }
                      return false;
                    }, function (err, list) {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(list.files);
                      }
                    });
                  });
                };

                _context.next = 3;
                return promise();

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _getEntries() {
        return _ref.apply(this, arguments);
      }

      return _getEntries;
    }()
  }]);

  return pack;
}();

exports.default = pack;