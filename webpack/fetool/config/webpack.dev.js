/**
 * Created  17/10/16.
 */
const Webpack = require('webpack');
const Path = require('path');
const Glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


// const FontPluginsPlus = require('font-plugins-plus'); // font处理
//https://www.npmjs.com/package/iconfont-create-plugin
const IconfontPlugins = require('iconfont-create-plugin'); // font处理
const ExtractTextPlugin = require('extract-text-webpack-plugin'); ///???

const entrys = {}; // 入口
const Root = Path.resolve(__dirname, '../');
const ContextPath = Path.join(Root, 'src');
const Plugins = []; //插件
const Devtools = 'inline-source-map'; //开发工具 ??


//  遍历入口文件
const Files = [
  ...Glob.sync(Path.join(Root, 'src/pages?(.?(*))/*/index.js')), // pages 入口
  ...Glob.sync(Path.join(Root, 'src/view?(.?(*))/*/index.js'))   // react 入口
];


Files.forEach( v => {
  let name = v.replace(ContextPath, '').replace(/^\//, '');
  entrys[name] = v;
  // Plugins.push(new HtmlWebpackPlugin({
  //   filename: 'html' + v.replace(ContextPath, '').replace(/\/index\.js$/, '') + '.html',
  //   template: v.replace('.js', '.html'),
  //   inject: true,
  //   chunks: [name]
  // }));
});

// 出口设置
const Outputs = {
  filename: '[name]',
  path: Path.join(Root, 'asset'),
  pathinfo: true,
  publicPath: '//localhost:3000/'
}; 
// output.pathinfo  默认false 包含了一些module的信息的注解,不要在生产环境里面使用
// output.publicPath publicPath指定了一个在浏览器中被引用的URL地址


// 设置文件拷贝
Plugins.push(new CopyWebpackPlugin([{
  from: Path.join(Root, 'src/static'),
  to: Path.join(Root, 'asset/static')
}]));
console.log({
  from: Path.join(Root, 'src/static'),
  to: Path.join(Root, 'asset/static')
});


// 字体编译设置
const IconfontFiles = [
  Path.join(Root, 'src/fonts'), // src入口
  ...Glob.sync(Path.join(Root, './node_modules/@liepin/**/fonts'))  // 组件字体入口
];
// Plugins.push(new IconfontPlugins({
//   name:"iconfont",  // 字体图标库的名称
//   output:Path.join(Root, 'asset/fonts'), //出口
//   entry:IconfontFiles, // 入口 数组或字符串路径
//   // publishPath:'' //用于配置cdn路径或者是静态资源路径
// }));


Plugins.push(new ExtractTextPlugin('[name].css'));
// Plugins.push( new ExtractTextPlugin({
//   filename: function (getPath) {
//     return getPath('css/[name].[hash:8].css').replace('.js', '')
//   }
// }))

// plugins.push(new webpack.HotModuleReplacementPlugin({
//   title: 'HMR'
// }));

// plugins.push(new webpack.optimize.UglifyJsPlugin({
//   minimize: true,
//   compress: {
//     warnings: false
//   },
//   output: {
//     comments: false
//   }
// }));


const config = {
  entry: entrys,
  output: Outputs,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: Path.join(Root, 'src/')
      },
      { 
        test: /\.css$/,
        include: Path.join(Root, 'src/'),
        loader: ExtractTextPlugin.extract("css-loader")
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: [{
      //       loader: 'css-loader',
      //       options: {
      //         // minimize: true //压缩css
      //       }
      //     }]
      //   }),
      //   include: Path.join(Root, 'src/')
      // },
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
        include: Path.join(Root, 'src/')
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
  plugins: Plugins,
  devtool: Devtools,
  devServer: {
    contentBase: Path.join(__dirname, 'asset'),
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