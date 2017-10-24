var webpack = require('webpack');
//  __dirname + 
module.exports = {
  entry: {
    index:[__dirname + '/src/index.js',__dirname + '/src/index.css'],
    index1:[__dirname + '/src/index1.js',__dirname + '/src/index1.css'],
  },
  output: {
    path: __dirname + "/lib",
    filename: "[name]_build.js"//打包后输出文件的文件名
  },
  module: {
    loaders:[
      { 
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader' 
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        query: {presets: ['es2015','stage-0']}
      }
    ]
  }
}