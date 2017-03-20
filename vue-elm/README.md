
##饿了么 vue
	
	1.npm init
	2.npm install --save-dev vue
	3.npm i element-ui -S
	4.npm install
	5.npm run dev
	  npm run build
	

配置文件

	新建项目，项目结构为：
	|- src/  --------------------- 项目源代码
	    |- App.vue
	    |- main.js  -------------- 入口文件
	|- .babelrc  ----------------- babel 配置文件
	|- index.html  --------------- HTML 模板
	|- package.json  ------------- npm 配置文件
	|- README.md  ---------------- 项目帮助文档
	|- webpack.config.js  -------- webpack 配置文件



#####几个配置文件的典型配置如下：

.babelrc

	{
	  "presets": [
	    ["es2015", { "modules": false }]
	  ]
	}


package.json

	{
	  "name": "element-starter",
	  "scripts": {
	    "dev": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --port 8086",
	    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
	  },
	  "dependencies": {
	    "element-ui": "^1.0.0",
	    "vue": "^2.1.6"
	  },
	  "devDependencies": {
	    "babel-core": "^6.0.0",
	    "babel-loader": "^6.0.0",
	    "babel-preset-es2015": "^6.13.2",
	    "cross-env": "^1.0.6",
	    "css-loader": "^0.23.1",
	    "file-loader": "^0.8.5",
	    "style-loader": "^0.13.1",
	    "vue-loader": "^9.8.0",
	    "webpack": "beta",
	    "webpack-dev-server": "beta"
	  }
	}


webpack.config.js

	var path = require('path')
	var webpack = require('webpack')
	
	module.exports = {
	  entry: './src/main.js',
	  output: {
	    path: path.resolve(__dirname, './dist'),
	    publicPath: '/dist/',
	    filename: 'build.js'
	  },
	  module: {
	    loaders: [
	      {
	        test: /\.vue$/,
	        loader: 'vue-loader'
	      },
	      {
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/
	      },
	      {
	        test: /\.css$/,
	        loader: 'style-loader!css-loader'
	      },
	      {
	        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
	        loader: 'file-loader'
	      },
	      {
	        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
	        loader: 'file-loader',
	        query: {
	          name: '[name].[ext]?[hash]'
	        }
	      }
	    ]
	  },
	  devServer: {
	    historyApiFallback: true,
	    noInfo: true
	  },
	  devtool: '#eval-source-map'
	}
	
	if (process.env.NODE_ENV === 'production') {
	  module.exports.devtool = '#source-map'
	  // http://vue-loader.vuejs.org/en/workflow/production.html
	  module.exports.plugins = (module.exports.plugins || []).concat([
	    new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    })
	  ])
	}
	
	
¶ 引入 Element

你可以引入整个 Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。

¶ 完整引入

在 main.js 中写入以下内容：

	import Vue from 'vue'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-default/index.css'
	import App from './App.vue'
	
	Vue.use(ElementUI)
	
	new Vue({
	  el: '#app',
	  render: h => h(App)
	})
	
	
	
以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。

¶ 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
首先，安装 babel-plugin-component：

	npm install babel-plugin-component -D

	
然后，将 .babelrc 修改为：

	{
	  "presets": [
	    ["es2015", { "modules": false }]
	  ],
	  "plugins": [["component", [
	    {
	      "libraryName": "element-ui",
	      "styleLibraryName": "theme-default"
	    }
	  ]]]
	}
	
	
接下来全部引用，注意样式需要单引：
	
	import Vue from 'vue'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-default/index.css'
	import App from './App.vue'
	
	Vue.use(ElementUI)
	
	new Vue({
	  el: '#app',
	  render: h => h(App)
	})


		