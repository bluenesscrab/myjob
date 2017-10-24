/**
 * Created  17/10/17.
 */

const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const FontPluginsPlus = require('font-plugins-plus'); // font处理
const fsPath = require('fs-path');

const Root = path.resolve(__dirname, '../'); //工作目录
const contextPath = path.join(Root, 'src/');  //开发目录
const buildPath = path.join(Root, 'asset/');  //编译目录
const entrys = {}; // 入口
const plugins = []; //插件

fsPath.remove(buildPath, function(){
  fsPath.mkdir(buildPath)
});

//  遍历入口文件
const files = [
  ...glob.sync(path.join(contextPath, 'pages?(.?(*))/*/index.js')), // pages 入口
  
  ...glob.sync(path.join(contextPath, 'view?(.?(*))/*/index.js'))   // react 入口
];
files.forEach( v => {
  let name = v.replace(contextPath, '').replace(/^\//, '');
  entrys[name] = v;
  plugins.push(new htmlWebpackPlugin({
    filename: 'html/' + v.replace(contextPath, '').replace(/\/index\.js$/, '') + '.html',
    template: v.replace('.js', '.html'),
    inject: true,
    chunks: [name]
  }));
});


// 插件配置 css插件配置
plugins.push(new ExtractTextPlugin({
  filename: function (getPath) {
    // return getPath('css/[name].[hash:8].css').replace('.js', '')
    return getPath('css/[name].css').replace('.js', '')
  }
}));

// 插件配置 font 处理
const IconfontFiles = [
  path.join(contextPath, 'fonts/svg/'), // src入口
  ...glob.sync(path.join(Root, 'node_modules/@liepin/*/fonts/'))  // 组件字体入口
];

plugins.push(new FontPluginsPlus({
  name: 'iconfont',  // 字体图标库的名称
  to: path.join(contextPath, 'fonts/'), //出口
  from: IconfontFiles, // 入口 数组或字符串路径
  cssPath:path.join(contextPath, 'common/css/common.css')
}));

// 插件配置 拷贝 static
console.log( {
  from: path.join(contextPath, 'static/'),
  to: path.join(buildPath, 'static/')
});

plugins.push(new CopyWebpackPlugin([
  {
    from: path.join(contextPath, 'static/'),
    to: path.join(buildPath, 'static/')
  }
]));

const config = {
  entry:entrys,
  output: {
    path: buildPath,
    filename: 'js/[name]'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/' + '[name].[ext]',
              // name: 'images/' + '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/' + '[name].[ext]'
            }
          }
        ]
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
        include: contextPath
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
        include: contextPath
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      }
    ]
  },
  plugins: plugins,
  devServer: {
    contentBase: contextPath,
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






