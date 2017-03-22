var webpack = require('webpack');

module.exports = {
  entry: {
    index:  __dirname + '/src/entry/index.js'
  },
  //entry: __dirname + '/src/entry/index.js', //默认输出main
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "[name].js"//打包后输出文件的文件名
  },
  module: {
    loaders:[
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}