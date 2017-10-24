'use strict';
import fs from 'fs';
import fsPath from 'fs-path';
import packageInfo from '../package';
import minimist from 'minimist';
import Table from 'cli-table-zh';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; //css
import FontPluginsPlus from 'font-plugins-plus'; // font
import path from 'path';

let argv = minimist(process.argv.slice(2));

let options = {
  version: packageInfo.version,
  watch: false,
  staticPath:'static', //静态资源夹子
  currentPath: '', // 当前路径
  contextPath:'',  // 工作目录/src/page/
  buildPath:'asset' //编译输出文件夹子
};//参数

console.log(argv);

if(argv.v || argv.version) {
  console.log(options.version);
  process.exit(0);
}

if(argv.w || argv.watch) {
  options.watch = true;
}

console.log('\n\n———————————————— fet2 ————————————————\n');
if(argv.h || argv.help) {
  
  console.log('语法：');
  var table = new Table();
  table.push({
    'fet2': '<path> --watch'
  });
  console.log(table.toString());

  console.log('参数：');
  table = new Table();
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

class Dev {
  constructor(){
    this.init();
    return this;
  }
  init() {
    // 获取当前工作目录 currentPath
    //this._getCurrentPath();

    // 遍历入口文件
    //this._getEntries();

    Promise.resolve().then(this._getCurrentPath.bind(this)).then(this._removeDir.bind(this)).then(this._copy.bind(this)).then(this._getEntries.bind(this)).then(this._pack.bind(this)).then(function() {
      console.log('pack done.');
    }).catch(err=>{
      console.log('???',err);
    });

    
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
    // }, 

  }

  // 获取当前工作目录 currentPath
  _getCurrentPath(){
    console.log('获取当前工作目录');

    return new Promise((resolve, reject) => {
      options.currentPath = argv._[0];
      //path.isAbsolute Boolean 检测path是否为绝对路径。一个绝对路径会解析到相同的位置
      if (!path.isAbsolute(options.currentPath)) {
        options.currentPath = path.join(process.cwd(), /\/src$/g.test(options.currentPath) ? options.currentPath : options.currentPath+'/src');
        options.contextPath = path.join(options.currentPath, 'page');
        options.buildPath = path.join(options.currentPath, '../asset');
        resolve();
      }else{
        reject('获取当前工作目录失败');
      }
    });
    
  }

  // 遍历入口文件
  _getEntries(){
    console.log('遍历入口文件');
    return new Promise((resolve, reject) => {
      fsPath.find(options.contextPath, (err, list) => {
        // list.dirs && list.files
        let entries = {};
        let jsList = list.files.filter(v=>{
          return /\.js$/.test(v)
        });
        if( jsList.length > 0 ){
          jsList.forEach(filepath => {
            let shortname = filepath.replace(options.contextPath, '').replace(/^[\/\\]|\.js$/ig, '');
            entries[shortname] = './' + shortname + '.js';
          });
          resolve(entries);
        }else{
          reject('遍历入口文件失败');
        }
      });
    });
  }

  // webpack 配置
  _getOptions(entries){
    console.log('webpack 配置');
    let publicPath = '//concat.lietou-static.com/dev/lpt/v5/asset';

    let config = {
      context:options.contextPath,
      entry:entries,
      output: {
        path: path.join(options.currentPath, '../asset'),
        filename: '[name].js',
      },
      module: {
        loaders: [
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=img/[hash:8].[name].[ext]'
          },
          { 
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract("css-loader")
          },
          { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader"
          }
        ]
      },
      watch: options.watch,
      plugins: [
        new FontPluginsPlus(),
        new ExtractTextPlugin('[name].css')
      ]
    };

    return config;
  }

  // 移除build;
  _removeDir(){
    console.log('移除build')
    return new Promise((resolve, reject) => {
      fsPath.remove(options.buildPath, function(err) {
        resolve();
      });
    });
  }

  //copy static
  _copy(){
    
    function copy( src, dst ){
      fs.readdir( src, function( err, paths ){
        if( err ){
          console.error(err);
        }
        paths = paths.filter(function(item) {
          return !/^\./.test(item)
        });
        paths.forEach(function( path ){
          var _src = src + '/' + path,
              _dst = dst + '/' + path,
              readable, writable;
          fs.stat( _src, function( err, st ){
            if( err ){
              console.error(err);
            }
            
            if( st.isFile() ){ // 判断是否为文件
              readable = fs.createReadStream( _src ); // 创建读取流
              writable = fs.createWriteStream( _dst ); // 创建写入流 
              readable.pipe( writable ); // 通过管道来传输流
            } else if( st.isDirectory() ){ // 如果是目录则递归调用自身
              existsFn( _src, _dst, copy );
            }
          });
        });
      });
    };

    function existsFn( src, dst, callback ){
      fs.exists( dst, function( exists ){
        if( exists ){ // 已存在
          callback( src, dst);
        }else{ // 不存在
          fs.mkdir( dst, function(){
            callback( src, dst);
          });
        }
      });
    };

    fs.exists( options.buildPath, function( exists ){
      if( !exists ){ // 不存在
        fs.mkdir( options.buildPath, function(){
          let srcPath = path.join(options.currentPath, options.staticPath);
          let dstPath = path.join(options.buildPath, options.staticPath);
          existsFn(srcPath, dstPath, copy)
        });
      }
    });
    
  }

  // webpack 编译
  _pack(entries){
    console.log('webpack 编译');

    let table = new Table();
    table.push({
      '当前工作目录': options.contextPath
    },{
      '版本': options.version
    },{
      '传入路径': options.currentPath
    }, {
      '监听模式': options.watch ? '已开启' : '关闭'
    });
    console.log(table.toString());
    
    return new Promise((resolve, reject) => {
      let config = this._getOptions(entries);

      // http://www.css88.com/doc/webpack/api/node/
      // node + webpack 

      webpack(config,(err, stats) => {
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
          let jsonStats = stats.toJson();
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

}

switch ( argv._.shift(0) ) {
  case 'dev':
    new Dev();
    break;
  case 'pro':
    new Pro();
    break;
  default:
    console.error('>> invalid arguments: ' + action);
}

