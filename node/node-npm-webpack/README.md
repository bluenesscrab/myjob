
## npm node 使用 创建发布包

#####创建一个符合CommonJS规范的包应该是如下这种结构:
	├── README.md //说明文档
	├── index.js //主入口
	├── lib //功能文件
	├── package.json //包信息
	└── test //测试用例

* 发布 npm publish < folder >
* 安装 npm install < package >

#####NPM 错误提示“uid must be an unsigned int”
	查看文件所属 ls -la /usr/local/lib/node_modules
	查看当前用户 whoami
	修改文件权限 sudo chown -R 【user】 /usr/local/lib/node_modules

#####1. bin/ lib/ test/ index.js
	bin/index  (注意：index 是一个 shell 文件不是js)
	
#####2. 生成 package.json
	1. npm init 生成 package.json
	2. npm init创建的package.json文件只包含了基本的信息，我们还需要加入对其他module的依赖关系
	3. "bin": {
	     "crabtest": "/bin/index.js"
	   }
	   //全局安装生成shell快捷方式文件

package.json 属性说明：

	name - 包名。
	version - 包的版本号。
	description - 包的描述。
	homepage - 包的官网 url 。
	author - 包的作者姓名。
	contributors - 包的其他贡献者姓名。
	
	dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
	devDependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
	
	repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
	main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")。
	keywords - 关键字
	
> 版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
> 
>主版本号：当你做了不兼容的 API 修改，
>
>次版本号：当你做了向下兼容的功能性新增，
>
>修订号：当你做了向下兼容的问题修正。
>
>先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。
>
>dependencies和devDependencies的区别
>
>一个node package有两种依赖，一种是dependencies一种是devDependencies，其中前者依赖的项该是正常运行该包时所需要的依赖项，而后者则是开发的时候需要的依赖项，像一些进行单元测试之类的包。
	
	npm install  将包下载下来在包的根目录里运行,默认会安装两种依赖
	npm install --production  只安装dependencies而不安装devDependencies
	
	npm install packagename  只安装dependencies
	npm install packagename --dev  安装devDependencie
	
	疑问：dependencies中包依赖需要自己加进去，暂时没发现怎么自动添加依赖关系
	   
#####3. 安装optimist
	1. 安装 npm i optimist
	2. --package.json
		"dependencies": {
	     "optimist": "^0.6.1"
	   }
	3. 使用 var argv = require('optimist').argv;
		if (argv.s) {
		  console.log('-s? --s?')
		}
		if (argv.rf) {
		  console.log('--rf?')
		}
	4. 终端:(字母可以用 -w 或者 --w   单词必须用 --word 了)
		bogon:bao1 zhangsen$ crabtest --pub -f
		--pub?
		-f? --f?
		bogon:bao1 zhangsen$ crabtest -pub -f
		-f? --f?


#####webpack
	安装：
	npm i webpack
	引用：
	var webpack = require('webpack');  引用webpack


#####babel.js
npm i babel-loader babel-preset-es2015 babel-preset-react  babel-core  --save-dev
	
	配置：
	module:{//添加模块
          loaders:[//模块加载器
            {
                test:/.css$/,//搜索以css后缀名的正则
                loaders:['style','css'],
                exclude:"/node_modules/"//打包时过滤掉这个文件
            },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
              query: {
                presets: ['es2015','react']
              } //http://babeljs.io/docs/plugins/preset-es2015/
            }
          ]
        }