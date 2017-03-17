
##vue

	 1. npm init
	 2. npm install babel babel-core babel-loader --save-dev
	 2. npm install webpack --save-dev
	 3. npm install css-loader style-loader --save-dev
	 	可以通过 require('./bootstrap.css') 
	 	这样的方式给网页载入一份样式表，非常方便。
	 	
	 4. npm install vuex vue-loader vue vue-template-compiler --save-dev
	 
	 直接执行 webpack 编译 加 -w 监听
	 

####目录结构	
	api ：封装与后端接口交互的操作
	common ：放置一些 reset.css 之类的
	components ：组件
	entry ：项目入口文件 index.js,index.css,index.html
	filters ：过滤器。注：虽然 vue2.0 已经基本废弃（只保留了对文本的过滤）了 Vue.filter 的用法，此目录下的方法仍然可用于官方推荐用来替代过滤器的计算属性的计算中
	mixins ：一些通用类的混入部分。比如全选、多选可抽出通用的 list-toggle
	mock ：本地开发的 mock 数据
	utils ：封装的工具，如对上传文件、日期处理等的封装
	views ：单页应用的视图（视图也是组件，也可放到 components 中，但个人觉得放在这里比较一目了然）