
## react-demo


这是一个最基本的webpack使用demo，步骤如下：
	
	1. npm install webpack -g 全局安装webpack
	
	2. npm init 创建 package.json
	
	3. npm install webpack --save-dev  安装webpack包依赖
	   npm install --save-dev babel-loader babel-core  安装babel（ES6转ES5）
	   
	4. npm install extract-text-webpack-plugin --save-dev
	5. // loaders之 预处理
	   // css-loader 处理css中路径引用等问题
      // style-loader 动态把样式写入css
		npm install --save-dev css-loader style-loader

	6.配置 webpack.config.js
		var webpack = require('webpack');

		// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');
		// plugins: [commonsPlugin]
		// plugins 是插件项，这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。
		
		module.exports = {
		  //plugins: [commonsPlugin],
		  //entry:  __dirname + "/app/main.js",
		  //已多次提及的唯一入口文件
		  entry: {
		    index:  __dirname + '/app/index.js'
		  },
		  output: {
		    path: __dirname + "/build",
		    //打包后的文件存放的地方
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
		

	5. 执行 webpack 编译

	
## react react-redux react-router

#### react/react-dom
	
	npm install react react-dom --save
	npm install babel-preset-react --save-dev


> createClass 会在react 16中去除，所以不建议使用
>
> bad:
> var App = React.createClass({
  render: function () {
    return (
      <div>
        hello world
      </div>
    );
  }
});
>
> good:
> class Index extends React.Component{
  render () {
    return (
      <div>
        hello world
      </div>
    );
  }
}

#### react-redux

> Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

	// 稳定版
	npm install --save redux
	
	// React 绑定库
	npm install --save react-redux
	
	import { createStore } from 'redux';
	
#### react-router

	npm install --save-dev react-router
	npm install --save react-router-redux@next
	npm install --save history
	
	import {
	  BrowserRouter as Router,
	  Route,
	  Link
	} from 'react-router-dom'
	
> Switch 组件 和 exact 是配合使用的
	
### 高阶 函数，组件

	let fn1 = ()=>{
	  console.log('fn1');
	}
	function go(){
	  return function(Comp) {
	    return Comp()
	  }
	}
	go()(fn1);
	// go() return 一个函数
	// go()(); 执行 go() return的函数 并传入参数 fn1
	
	

> 有的时候你需要替换一些已有组件，而新组件接收的参数和原组件并不完全一致。
> 你可以修改所有使用旧组件的代码来保证传入正确的参数——考虑改行吧如果你真这么想
> 也可以把新组件做一层封装：
	
	class ListAdapter extends Component {
	    mapProps(props) {
	        return {/* new props */}
	    }
	    render() {
	        return <NewList {...mapProps(this.props)} />
	    }
	}


> 如果有十个组件需要适配呢？如果你不想照着上面写十遍，或许高阶组件可以给你答案

	function mapProps(mapFn) {
	    return function(Comp) {
	        return class extends Component {
	            render() {
	                return <Comp {...mapFn(this.props)}/>
	            }
	        }
	    } 
	}
	const ListAdapter = mapProps(mapPropsForNewList)(NewList);



		