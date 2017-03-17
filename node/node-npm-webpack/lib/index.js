var fs = require('fs');
var argv = require('optimist').argv;
var webpack = require('webpack');
var packageInfo =  require('../package');//获取package.json的数据

// 获取当前包的版本
if(argv.v || argv.version ) {
  console.log(packageInfo.version);
  process.exit(0);
}

// 监听开关
var watch = false;
if (argv.w || argv.watch ) {
  watch = true;
}

// webpack 编译 
var path = './test/app/';
var build = './test/build/';
var arr = []; // 存放 编译前JS名字
if (argv.b) {
  fs.readdir(path, function(err, files) {
    console.log('path:' + path);
    arr = files.filter(function(v){
      return /\.(js)$/g.test(v)
    });
    var entries = {};

    function _getOptions(list) {
      list.forEach(function(v) {
        var shortname = v.replace('.js', '');
        entries[shortname] = path + shortname + '.js';
        console.log('src: ' + path + shortname + '.js'+ ' ------ build: ' +build + shortname + '.js');
      });
      var options = {
        entry: entries,
        output: {
          path:build,
          filename: '[name].js',
        },
        module:{//添加模块
          loaders:[//模块加载器
            {
                test:/.css$/,//搜索以css后缀名的正则
                loaders:['style','css'],
                exclude:"/node_modules/"//打包时过滤掉这个文件
            },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
              query: {
                presets: ['es2015','react']
              } //http://babeljs.io/docs/plugins/preset-es2015/
            }
          ]
        },
        watch: watch
      };
      return options;
    }
    var options = _getOptions(arr);

    webpack(options, function (err, stats) {
      if (err) {
        console.log(err);
      } else {
        console.log('OK');
      }
    });
  });
}

// var fs = require('fs');
// var argv = require('optimist').argv;
// var webpack = require('webpack');
// var packageInfo =  require('../package');

// var path = './test/app/';
// var build = './test/public/';

// var arr = [];
// var watch = false;

// if(argv.v) {
//   console.log(packageInfo.version);
//   process.exit(0);
// }

// if (argv.w || argv.watch ) {
//   watch = true;
// }

// // const action = argv._.shift(0);
// // switch (action) {
// //   case 'pack':
// //     console.log('case pack');
// //     break;
// //   case 'init':
// //     console.log('case init');
// //     break;
// //   default:
// //     console.log('other '+action);
// // }

// if (argv.p) {
//   fs.readdir(path, function(err, files) {
//     console.log('path:' + path);
//     arr = files.filter(function(v){
//       return /\.(js)$/g.test(v)
//     });
//     var entries = {};
//     function _getOptions(list) {
//       list.forEach(function(v) {
//         var shortname = v.replace('.js', '');
//         console.log('source: ' + path + shortname + '.js'+ ' ------ build: ' +build + shortname + '.js');
//         entries[shortname] = path + shortname + '.js';
//       });
//       var options = {
//         entry: entries,
//         output: {
//           path:build,
//           filename: '[name].js',
//         },
//         module:{//添加模块
//           loaders:[//模块加载器
//             {
//                 test:/.css$/,//搜索以css后缀名的正则
//                 loaders:['style','css'],
//                 exclude:"/node_modules/"//打包时过滤掉这个文件
//             },
//             {
//               test: /\.jsx?$/,
//               exclude: /node_modules/,
//               loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
//               query: {
//                 presets: ['es2015','react']
//               } //http://babeljs.io/docs/plugins/preset-es2015/
//             }
//           ]
//         },
//         watch: watch
//       };
//       return options;
//     }
//     var options = _getOptions(arr);

//     webpack(options, function (err, stats) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('OK');
//       }
//     });
//   });
// }
