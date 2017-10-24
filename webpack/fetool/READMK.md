## fetTool

> 1.webpack
> 可以看做是模块打包机
 	
 	npm install webpack -s
 	

> 2.webpack-dev-server  
> PS:  
> 1.是一个轻量级的服务器，修改文件源码后，自动刷新页面将修改同步到页面上  
> 2.使用命令webpack-dev-server --hot --inline完成自动刷新  
> 3.默认的端口号是8080，如果需要8080端口被占用，就需要改端口，webpack-dev-server --port 3000

	npm install webpack-dev-server -s

> 3.path  
> 模块提供了一些用于处理文件路径的小工具
>
	npm install path -s

> 4.glob  
> node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
> 
 
	npm install glob -s

 
> 5.babel  
> 可以将ES6代码转为ES5代码
> 	
 	
 	npm install path -s
 	
 	npm install --save babel-cli babel-preset-env
	"babel": {
	  "presets": [
	    "env"
	  ]
	},
	
 	
> 6.html-webpack-plugin  
> 插件的基本作用就是生成html文件
> 

	npm install html-webpack-plugin -s  
	
	
> 7.copy-webpack-plugin  
> 在webpack中拷贝文件和文件夹
> 

	npm install --save copy-webpack-plugin

参数使用：

	from    定义要拷贝的源目录      from: __dirname + ‘/src/public’  
	to      定义要拷贝到的目标目录   from: __dirname + ‘/dist’  
	toType  file 或者 dir         可选，默认是文件  
	force   强制覆盖先前的插件      可选 默认false
	context   可选 默认base context可用specific context  
	flatten 只拷贝文件不管文件夹    默认是false  
	ignore  忽略拷贝指定的文件      可以用模糊匹配  
 	
> 7.font-plugins-plus  
> 字体编译工具
>

	npm install font-plugins-plus -s


> 8.extract-text-webpack-plugin  
> extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象;
> 

	npm install extract-text-webpack-plugin --s

> 9.iconfont-create-plugin  
> 生成icon font的webpack的plugin插件
> 

	npm install iconfont-create-plugin
		
	{
	    name:"icon",  // 字体图标库的名称
	    output:'/output/font', //出口
	    entry:[], // 入口 数组或字符串路径
	    publishPath:'' //用于配置cdn路径或者是静态资源路径
	}


> 10.loader  
> babel-loader  
> style-loader  
> css-loader  
> html-loader  
> url-loader

	npm install babel-loader -s
	npm install style-loader -s
	npm install css-loader -s
	npm install html-loader -s
	npm install url-loader -s

	