## node 站点

#### 1. vue-cli快速构建Vue项目

vue-cli是什么？
	
vue-cli 是vue.js的脚手架，用于自动生成vue.js模板工程的。

vue-cli怎么使用？

安装vue-cli之前，需要先装好vue 和 webpack

	npm install -g vue       //全局安装vue
	npm install -g webpack   //全局安装webpack
	npm install -g vue-cli   //全局安装vue-cli


使用vue-cli构建vue项目

	vue init webpack project //生成项目名为projectName的模板
	cd project                              
	npm install //初始化安装依赖
	
	npm run dev


vue-cli生成环境

但是这个只能在本地跑，要如何在我们自己的服务器上访问呢？此时需要执行
	
	npm run build

