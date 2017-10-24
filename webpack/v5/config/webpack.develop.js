var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

//  __dirname + 
module.exports = {
  entry: {
    index:[__dirname + '/src/page/index/index.js',__dirname + '/src/page/index/index.css'],
    common:[__dirname + '/src/common/js/common.js',__dirname + '/src/common/css/common.css']
  },
  output: {
    path: __dirname + "/asset",
    filename: "js/[name].js" //打包后输出文件的文件名
  },
  module: {
    loaders:[
      {
        test: /\.(ejs|tpl)$/, 
        loader: 'ejs-loader',
        query: { 
          variable: 'data', 
          interpolate : '\\{\\{(.+?)\\}\\}', 
          evaluate : '\\[\\[(.+?)\\]\\]' 
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { 
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"]
        })
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        query: {presets: ['env','es2015','stage-0']}
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].css"
    })
  ]
}
// plugins: [
//   new ExtractTextPlugin({
//     filename: "css/[name].css"
//   }),
//   new webpack.optimize.UglifyJsPlugin()
// ]