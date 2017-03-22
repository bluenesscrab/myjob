
##vue

	 1. npm init
	 2. npm install babel babel-core babel-loader --save-dev
	 2. npm install webpack --save-dev
	 3. npm install css-loader style-loader --save-dev
	 	可以通过 require('./bootstrap.css') 
	 	这样的方式给网页载入一份样式表，非常方便。
	 	
	 4. npm install vuex vue-loader vue vue-template-compiler --save-dev
	 
	 直接执行 webpack -w  编译、监听
	 

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
	
	
vue嵌套[PS:不建议但是没错的写法]
	
	[Vue warn]: Do not use built-in or reserved HTML elements as component id: A,B
	这个报警不是错误
	VUE官方建议 
	其实vue本身是推荐 .vue 的写法的
	配合 webpack 可以做到按需加载组件
	前提是每个组件都是单独的 .vue
	这里 A,B 组件直接内嵌了
	所以给你提示更加合理的写法
	
	a.vue:
	<template>
	  <div>
	    <h3>this is a.vue template!</h3>
	  </div>
	</template>

	b.vue:
	<template>
	  <div>
	    <h3>this is b.vue template!</h3>
	  </div>
	</template>
	
	app.vue
	<template>
	  <h1>{{msg}}</h1>
	  <A></A>
	  <B></B>
	</template>
	<script>
	import A from '../view/a.vue'
	import B from '../view/b.vue'
	export default {
	  data () {
	    return {
	      msg: 'Use Vue 2.0 Today!'
	    }
	  },
	  methods: {},
	  components: {
	    A,
	    B
	  }
	}
	</script>

#### ＜solt＞＜/solt＞ 官方组件
	
	比如你自己做了个一个button组件，在根组件里注册为vButton，从而复用。那么各个button上的文字肯定是不同的，但是这些文字大部分情况下也是不需要动态更新的，那么就不必用props之类的方法从根组件向子组件传递文字，直接用slot即可。
	
	button组件假如是这样：
	<template>
	  <button>
	    <slot></slot>
	  </button>
	</template>


组件仓库结构参考 elme 略微修改了不理解地方：

	完整组件包大致如下：
	|- components/
	|- components/index.js 作为所有组件的入口并且 把单个组件注册到全局，方便使用;
		|- button/button.vue
		|- button/index.js
		|- button/README.md

