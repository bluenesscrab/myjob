var webpack = require('webpack');

//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');

// plugins: [commonsPlugin]
// plugins 是插件项，这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。

module.exports = {
  //plugins: [commonsPlugin],
  //entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  entry: {
    index:  __dirname + '/app/index.js'
  },
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "[name].js"//打包后输出文件的文件名
    //filename: "[name]-[hash].js"//打包后输出文件的文件名
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