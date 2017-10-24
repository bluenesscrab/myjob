var webpack = require('webpack');
module.exports = {
  //entry:  __dirname + "/app/main.js",
  //已多次提及的唯一入口文件
  entry: {
    index:  __dirname + "/www/src/index.js"
  },
  // plugins:  [
  //   new webpack.optimize.CommonsChunkPlugin('common.js'),
  //   new ExtractTextPlugin("styles.css")  
  // ],
  output: {
    path: __dirname + "/www/build",
    //打包后的文件存放的地方
    filename: "[name].js"//打包后输出文件的文件名
  },
  module: {
    loaders:[
      { 
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader"
      },
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {presets: ['react']}
      }
    ]
  }
}