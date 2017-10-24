'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //css
// font


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPath = require('fs-path');

var _fsPath2 = _interopRequireDefault(_fsPath);

var _cliTableZh = require('cli-table-zh');

var _cliTableZh2 = _interopRequireDefault(_cliTableZh);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _fontPluginsPlus = require('font-plugins-plus');

var _fontPluginsPlus2 = _interopRequireDefault(_fontPluginsPlus);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dev = function () {
  function Dev(options) {
    _classCallCheck(this, Dev);

    //参数
    var opt = Object.assign({
      toolsName: '', // 工具名字 'fet2'
      toolsVersion: '', // 工具版本 '1.0.0'
      currentPath: '', // 当前路径 'src'
      watch: false, // 开启监听 true|false

      version: '', // 业务版本 'v5'
      port: '', // 业务端 'lpt|h|www'
      view: '', // 端口 PC|H5 
      contextPath: [], // 工作目录 []array
      buildPath: '' // 编译输出目录 'asset|temporary'
    }, options);
    this.init(opt);
  }

  _createClass(Dev, [{
    key: 'init',
    value: function init(opt) {
      console.log('dev init');
      // _getParam 获取完整的opt相关信息
      // 

      Promise.resolve(opt).then(this._getParam.bind(this)).catch(function (err) {
        console.log('???', err);
      });

      // 获取当前工作目录 currentPath
      //this._getCurrentPath();

      // 遍历入口文件
      //this._getEntries();

      // Promise.resolve().then(this._getCurrentPath.bind(this)).then(this._removeDir.bind(this)).then(this._copy.bind(this)).then(this._getEntries.bind(this)).then(this._pack.bind(this)).then(function() {
      //   console.log('pack done.');
      // }).catch(err=>{
      //   console.log('???',err);
      // });


      // {
      //   '业务端': this.port
      // }, {
      //   '类型': this.view
      // }, {
      //   '分支': this.trunk
      // }, {
      //   '版本': this.version
      // }, {
      //   '项目根目录': this.rootPath
      // }, {
      //   '公共路径': this.corePath
      // }, {
      //   '当前工作目录': options.contextPath+'page'
      // } 
    }
  }, {
    key: '_getParam',
    value: function _getParam(opt) {
      console.log('_getParam', opt);
      return new Promise(function (resolve, reject) {
        // if( !/src(\/?)$/g.test(options.currentPath) ){
        //   console.error('>> 工作路径不合法，请到src目录下再执行编译');
        // }

        //path.isAbsolute Boolean 检测path是否为绝对路径。一个绝对路径会解析到相同的位置
        if (_path2.default.isAbsolute(opt.currentPath)) {
          opt.currentPath = _path2.default.join(opt.currentPath, /\/src(\/?)$/g.test(opt.currentPath) ? '' : './src');
          _fs2.default.stat(opt.currentPath, function (err, st) {
            if (err) {
              console.error(err);
            }
            if (st && st.isDirectory()) {
              //判断是否为目录
              opt.contextPath = [];
              opt.buildPath = _path2.default.join(opt.currentPath, '../asset');

              console.log(opt);
            } else {
              reject('工作目录不合法');
            }
          });
        } else {
          reject('获取当前工作目录失败');
        }

        //path.isAbsolute Boolean 检测path是否为绝对路径。一个绝对路径会解析到相同的位置
        // if (!path.isAbsolute(options.currentPath)) {

        //   options.currentPath = path.join(process.cwd(), /\/src$/g.test(options.currentPath) ? options.currentPath : options.currentPath+'/src');
        //   options.contextPath = path.join(options.currentPath, 'page');
        //   options.buildPath = path.join(options.currentPath, '../asset');


        //   resolve();
        // }else{
        //   reject('获取当前工作目录失败');
        // }
      });
    }

    // 获取当前工作目录 currentPath

  }, {
    key: '_getCurrentPath',
    value: function _getCurrentPath() {
      console.log('获取当前工作目录');

      return new Promise(function (resolve, reject) {
        options.currentPath = argv._[0];
        //path.isAbsolute Boolean 检测path是否为绝对路径。一个绝对路径会解析到相同的位置
        if (!_path2.default.isAbsolute(options.currentPath)) {
          options.currentPath = _path2.default.join(process.cwd(), /\/src$/g.test(options.currentPath) ? options.currentPath : options.currentPath + '/src');
          options.contextPath = _path2.default.join(options.currentPath, 'page');
          options.buildPath = _path2.default.join(options.currentPath, '../asset');
          resolve();
        } else {
          reject('获取当前工作目录失败');
        }
      });
    }

    // 遍历入口文件

  }, {
    key: '_getEntries',
    value: function _getEntries() {
      console.log('遍历入口文件');
      return new Promise(function (resolve, reject) {
        _fsPath2.default.find(options.contextPath, function (err, list) {
          // list.dirs && list.files
          var entries = {};
          var jsList = list.files.filter(function (v) {
            return (/\.js$/.test(v)
            );
          });
          if (jsList.length > 0) {
            jsList.forEach(function (filepath) {
              var shortname = filepath.replace(options.contextPath, '').replace(/^[\/\\]|\.js$/ig, '');
              entries[shortname] = './' + shortname + '.js';
            });
            resolve(entries);
          } else {
            reject('遍历入口文件失败');
          }
        });
      });
    }

    // webpack 配置

  }, {
    key: '_getOptions',
    value: function _getOptions(entries) {
      console.log('webpack 配置');
      var publicPath = '//concat.lietou-static.com/dev/lpt/v5/asset';

      var config = {
        context: options.contextPath,
        entry: entries,
        output: {
          path: _path2.default.join(options.currentPath, '../asset'),
          filename: '[name].js'
        },
        module: {
          loaders: [{
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=img/[hash:8].[name].[ext]'
          }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: _extractTextWebpackPlugin2.default.extract("css-loader")
          }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }]
        },
        watch: options.watch,
        plugins: [new _fontPluginsPlus2.default(), new _extractTextWebpackPlugin2.default('[name].css')]
      };

      return config;
    }

    // 移除build;

  }, {
    key: '_removeDir',
    value: function _removeDir() {
      console.log('移除build');
      return new Promise(function (resolve, reject) {
        _fsPath2.default.remove(options.buildPath, function (err) {
          resolve();
        });
      });
    }

    //copy static

  }, {
    key: '_copy',
    value: function _copy() {

      function copy(src, dst) {
        _fs2.default.readdir(src, function (err, paths) {
          if (err) {
            console.error(err);
          }
          paths = paths.filter(function (item) {
            return !/^\./.test(item);
          });
          paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable,
                writable;
            _fs2.default.stat(_src, function (err, st) {
              if (err) {
                console.error(err);
              }

              if (st.isFile()) {
                // 判断是否为文件
                readable = _fs2.default.createReadStream(_src); // 创建读取流
                writable = _fs2.default.createWriteStream(_dst); // 创建写入流 
                readable.pipe(writable); // 通过管道来传输流
              } else if (st.isDirectory()) {
                // 如果是目录则递归调用自身
                existsFn(_src, _dst, copy);
              }
            });
          });
        });
      };

      function existsFn(src, dst, callback) {
        _fs2.default.exists(dst, function (exists) {
          if (exists) {
            // 已存在
            callback(src, dst);
          } else {
            // 不存在
            _fs2.default.mkdir(dst, function () {
              callback(src, dst);
            });
          }
        });
      };

      _fs2.default.exists(options.buildPath, function (exists) {
        if (!exists) {
          // 不存在
          _fs2.default.mkdir(options.buildPath, function () {
            var srcPath = _path2.default.join(options.currentPath, options.staticPath);
            var dstPath = _path2.default.join(options.buildPath, options.staticPath);
            existsFn(srcPath, dstPath, copy);
          });
        }
      });
    }

    // webpack 编译

  }, {
    key: '_pack',
    value: function _pack(entries) {
      var _this = this;

      console.log('webpack 编译');

      var table = new _cliTableZh2.default();
      table.push({
        '当前工作目录': options.contextPath
      }, {
        '版本': options.version
      }, {
        '传入路径': options.currentPath
      }, {
        '监听模式': options.watch ? '已开启' : '关闭'
      });
      console.log(table.toString());

      return new Promise(function (resolve, reject) {
        var config = _this._getOptions(entries);

        // http://www.css88.com/doc/webpack/api/node/
        // node + webpack 

        (0, _webpack2.default)(config, function (err, stats) {
          if (err) {
            reject(err);
          } else {
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
            // console.log(jsonStats);
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
  }]);

  return Dev;
}();

exports.default = Dev;