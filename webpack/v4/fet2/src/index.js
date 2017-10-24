'use strict';
import packageInfo from '../package';
import minimist from 'minimist';
import Table from 'cli-table-zh';
import webpack from 'webpack';

import path from 'path';

let argv = minimist(process.argv.slice(2));

let options = {
  watch: false
};//参数

console.log(argv);

if(argv.v || argv.version) {
  console.log(packageInfo.version);
  process.exit(0);
}

// if(argv.w || argv.watch) {
//   options.watch = true;
// }

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

class Build {
  constructor(){
    this.init();
    return this;
  }
  init() {

    webpack({
      entry: {
        index: "/Users/zhangsen/git/myjob/webpack/v4/fet2/test/index.js"
      },
      output: {
        path: "/Users/zhangsen/git/myjob/webpack/v4/fet2/asset",//打包后的文件存放的地方
        filename: "[name].js"//打包后输出文件的文件名
      },
      module: {
        loaders:[
          { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader",
            query: {presets: ['es2015','babel-preset-stage-0']}
          }
        ]
      },
      watch: true
    },function(){
      console.log('-watch-')
    });
  }
}

switch ( argv._.shift(0) ) {
  case 'build':
    new Build();
    break;
  default:
    console.error('>> invalid arguments: ' + action);
}

