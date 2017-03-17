'use strict';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import colors from 'colors/safe';
import Table from 'cli-table-zh';
import fsPath from 'fs-path';
import softInfo from '../package';
import utils from './lib/fet-utils';
import ExtractTextPlusPlugin from 'extract-text-plus-webpack-plugin';
/* postCSS依赖*/
import postcss4lp from 'postcss-lp';

let commondTitle = colors.rainbow('\n\t---------- Fet Pack Tools v' + softInfo.version + ' ----------\n');

export default class pack {
  constructor(argv) {
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

  init() {
    var argv = this._argv;
    // 获取当前工作目录 currentPath
    let currentPath = '';
    if (argv.h || argv.help) {
      this.help();
    }
    if (!(argv._ && Array.isArray(argv._) && argv._.length > 0)) {
      this.help();
    }
    currentPath = argv._[0];
    if (!path.isAbsolute(currentPath)) {
      currentPath = path.join(process.cwd(), currentPath);
    }
    // 获取监听模式 watch
    if (argv.watch || argv.w) {
      this.watch = true;
    }
    // 目录信息
    const pathInfo = utils.getPathInfo(currentPath);
    if (pathInfo === null) {
      console.error(colors.white.bgRed('当前工作目录 ' + currentPath + ' 不合法！'));
      process.exit(0);
    }
    Object.assign(this, pathInfo);
    this.basicPaths = [this.contextPath, this.corePath];
    this.devDirectories = this._getDevList(this.devPath).map(v => path.join(this.devPath, v, this.view, this.trunk ? 'trunk' : '', this.version, 'src'));
    this.currentPath = currentPath;
    return this;
  }

  pack() {
    console.log(commondTitle);
    var table = new Table();
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
    Promise.resolve().then(this.removeBuild.bind(this)).then(this._getEntries.bind(this)).then(list => this._pack(list)).then(function() {
      console.log('pack done.');
    }).catch(function(err) {
      console.log(colors.white.bgRed(err.toString()));
    });
  }

  _pack(list) {
    var options = this._getOptions(list);
    return new Promise((resolve, reject) => {
      webpack(options, (err, stats) => {
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
          let jsonStats = stats.toJson();
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

  _getOptions(list) {
    let entries = {};
    let contextPath = this.contextPath;
    let publicPath = '//concat.lietou-static.com/dev/' + this.port + '/' + this.view + '/' + this.version + '/build/';
    list.forEach(filepath => {
      let shortname = filepath.replace(contextPath, '').replace(/^[\/\\]|\.js$/ig, '');
      entries[shortname] = './' + shortname + '.js';
    });
    let options = {
      context: contextPath,
      entry: entries,
      output: {
        path: path.join(contextPath, '../build'),
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
            map: (url, filepath) => {
              Object.keys(options.resolve.alias).forEach(key => {
                let portsrc = options.resolve.alias[key];
                let portdir = path.join(portsrc, '..');
                if (filepath.startsWith(portdir)) {
                  filepath = path.relative(portsrc, filepath);
                  if(filepath.startsWith('..')) {
                    console.error(colors.white.bgRed('错误的引用关系，只有 src 目录下的内容才能通过相对路径引用：' + filepath));
                  }
                  filepath = key + path.sep + filepath;
                }
              });
              let filepathArr = filepath.split(/[\\\/]/);
              if(filepathArr[0] === '@' + this.port) {
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
          loader: ExtractTextPlusPlugin.extract('style-loader', 'css-loader')
        }, {
          test: /\.(jsx?|tpl)$/,
          loader: 'babel-loader',
          include: this.allDirectories,
          exclude: /unpack_files/,
          query: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0')
            ],
            plugins: [
              require.resolve('babel-plugin-transform-es3-property-literals'),
              require.resolve('babel-plugin-transform-es3-member-expression-literals'),
              // require.resolve('babel-plugin-transform-inline-environment-variables'),
              // require.resolve('babel-plugin-transform-decorators-legacy'),
              // require.resolve('babel-plugin-transform-class-properties'),
              // require.resolve('babel-plugin-add-module-exports')
              //require.resolve('babel-plugin-transform-es2015-destructuring')
            ]
          } //http://babeljs.io/docs/plugins/preset-es2015/
        }],
        preLoaders: [{
          test: /common\.css$/,
          loader: 'spritesify',
          include: this.allDirectories,
          query: {
            spritesPath: path.join(this.contextPath, 'images/icons/spritesify'),
            distPath: path.join(contextPath, '../build/images/icons'),
            urlFix: publicPath + 'images/icons/'
          }
        }, {
          test: /common\.css$/,
          loader: 'fsk-font',
          query: {
            dir: path.join(this.contextPath, 'fonts/svgs'),
            out: path.join(contextPath, '../build/fonts'),
            font: 'h5icon'
          }
        }, {
          test:   /\.css$/,
          loader: 'postcss-loader'
        }, {
          test: /\.tpl$/,
          loader: 'nodetpl',
          include: this.allDirectories
        }]
      },
      postcss: function() {
        return [
          postcss4lp({
            autoprefixer: { browsers: ['> 1%', 'IE 7'] }
          })
        ];
      },
      resolve: {
        root: this.basicPaths.map(v => path.join(v, 'node_modules')),
        extensions: ['', '.js', '.json', '.tpl'],
        modulesDirectories: ['node_modules'],
        alias: {
          antd: path.join(this.corePath,'../static/unpack_files/antd.min.js')
        }
      },
      watch: this.watch,
      resolveLoader: {
        root: path.join(__dirname, '../node_modules')
      },
      plugins: [
        new ExtractTextPlusPlugin('css/[name].css', {
          allChunks: true,
          allEntries: false,
          nameFilter: function(name) {
            return name.replace(/[\\\/]js[\\\/]/, '/');
          }
        })
      ],
      externals: [{
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
      }],
    };
    // 配置alias
    this.devDirectories.forEach(v => {
      let info = utils.getPathInfo(v);
      options.resolve.alias['@' + info.port] = info.port === this.port ? this.contextPath : info.contextPath;
    });
    return options;
  }

  help() {
    var table;
    console.log(commondTitle);
    console.log('语法：');
    table = new Table({
      head: ['fet pack <path> --watch']
    });
    console.log(table.toString());
    console.log('参数：');
    table = new Table();
    table.push({
      '<path>': '需要编译的目录'
    }, {
      '-w --watch': '是否监听文件变化'
    });
    console.log(table.toString());
    process.exit(0);
  }

  removeBuild() {
    return new Promise((resolve, reject) => {
      fsPath.remove(path.join(this.contextPath, '../build'), function(err) {
        resolve();
      });
    });
  }

  _getDevList(devPath) {
    let trunkPath = this.contextPath.replace(/branches[\/\\][^\/\\]+/, 'trunk');
    return fs.readdirSync(devPath)
      .filter(v => !v.startsWith('.') && fs.statSync(path.join(devPath, v)).isDirectory())
      .map(v => v === trunkPath ? this.contextPath : v);
  }

  async _getEntries() { // jshint ignore:line
    var promise = () => {
      return new Promise((resolve, reject) => {
        fsPath.find(path.join(this.contextPath, 'js'), (filepath, stats, filename) => {
          if (/^\./.test(filename)) {
            return false;
          }
          if (stats === 'directory' && filename !== 'lib' || /\.js?$/.test(filename)) {
            return true;
          }
          return false;
        }, (err, list) => {
          if (err) {
            reject(err);
          } else {
            resolve(list.files);
          }
        });
      });
    };
    return await promise(); // jshint ignore:line
  }
}
