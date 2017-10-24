var webpack = require('webpack');

module.exports = {
  entry: {
    index:  __dirname + '/app/index.js'
  },
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "[name].js"//打包后输出文件的文件名
  },
  module: {
    loaders:[
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        query: {presets: ['es2015']}
      }
    ]
  }
}