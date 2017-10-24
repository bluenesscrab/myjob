/**
 * Created by panyanming on 17/9/9.
 */

const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const join = path.join;
const glob = require('glob');
const entry = {};
const plugins = [];

const Root = path.resolve(__dirname, '../');
const AppRoot = join(Root, 'src/pages');
const files = glob.sync(join(Root, 'src/pages/*/index.js'));

files.forEach(v=> {
  let name = v.replace(AppRoot, '').replace(/^\//, '');
  entry[name] = v;
  plugins.push(new htmlWebpackPlugin({
    filename: 'html' + v.replace(AppRoot, '').replace(/\/index\.js$/, '') + '.html',
    template: v.replace('.js', '.html'),
    inject: true,
    chunks: [name]
  }));
});
// const ignoreFiles = new webpack.IgnorePlugin('',/src\/lib/);

const copyFiles = new CopyWebpackPlugin([
  {
    from: path.join(Root, 'src/lib'),
    to: path.join(Root, 'asset/lib')
  }
]);
plugins.push(copyFiles);
plugins.push(new webpack.HotModuleReplacementPlugin({
  title: 'HMR'
}));
plugins.push(new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
}));

const config = {
  entry: entry,
  output: {
    filename: '[name]',
    path: path.join(Root, 'asset'),
    pathinfo: true,
    publicPath: '//localhost:3000/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: join(Root, 'src/')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              // minimize: true //压缩css
            }
          }]
        }),
        include: join(Root, 'src/')
      },
      {
        test: /\.(jsx?|tpl)$/,
        use: [
          {
            // loader: ['babel-loader', '']
            loader: 'babel-loader'
          }
        ],
        include: join(Root, 'src/')
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href"],
              interpolate: true
            }
          }
        ],
        include: join(Root, 'src/')
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/' + '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: plugins.concat([new ExtractTextPlugin({
    filename: function (getPath) {
      return getPath('css/[name].[hash:8].css').replace('.js', '')
    }
  })]),
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../asset'),
    port: 3000,
    // quiet: false, //控制台中不输出打包的信息
    historyApiFallback: true,//不跳转
    // inline: true,//实时刷新无效,命令行配置有效
    hot: true,//热启动
    lazy: false,//懒加载,
    //反向代理
    proxy: {
      // '/http://chping.site/*':{
      //   target:'http:localhost:3000',
      //   pathRewrite: {
      //     '^/http://chping.site/':''
      //   }
      // }
    }
  }
};

module.exports = config;