## vue

	 1. npm init
	 2. npm install babel babel-core babel-loader --save-dev
	 2. npm install webpack --save-dev
	 3. npm install css-loader style-loader --save-dev
	 	可以通过 require('./bootstrap.css') 
	 	这样的方式给网页载入一份样式表，非常方便。
	 	
	 4. npm install vuex vue-loader vue vue-template-compiler --save-dev
	 
	 直接执行 webpack -w  编译、监听
	 

#### 目录结构	

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


vue ajax

>Vue作为一个没有入侵性的框架并不限制你使用ajax框架。
>
>使用了Vue后，ajax部分你可以做如下选择：
>
>1.使用JS原生XHR接口
>
>2.引入JQuery或者Zepto 使用$.ajax();
>
>3.axios.js Vue官方推荐的ajax库 <https://github.com/mzabriskie/axios/>
>npm install axios
>
>4.使用 fetch.js <https://github.com/github/fetch/>
>
>5.自己封装一个ajax库
>



## vuex 
	npm install vuex --save

项目结构
	
	├── index.html
	├── main.js
	├── api
	│   └── ... # 抽取出API请求
	├── components
	│   ├── App.vue
	│   └── ...
	└── store
	    ├── index.js          # 我们组装模块并导出 store 的地方
	    ├── actions.js        # 根级别的 action
	    ├── mutations.js      # 根级别的 mutation
	    └── modules
	        ├── cart.js       # 购物车模块
	        └── products.js   # 产品模块
	        


在一个模块化的打包系统中，您必须显式地通过 Vue.use() 来安装 Vuex：

	import Vue from 'vue'
	import Vuex from 'vuex'
	
	Vue.use(Vuex)
	
>1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
>
>2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。


methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。


####Mutations(一般用作同步操作)

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

	const store = new Vuex.Store({
	  state: {
	    count: 1
	  },
	  mutations: {
	    increment (state) {
	      // 变更状态
	      state.count++
	    }
	  }
	})

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

	store.commit('increment')


#### 提交载荷（Payload）

	你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：

	mutations: {
	  increment (state, n) {
	    state.count += n
	  }
	}
	store.commit('increment', 10)
	
在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

	mutations: {
	  increment (state, payload) {
	    state.count += payload.amount
	  }
	}
	store.commit('increment', {
	  amount: 10
	})
	
#### Actions(一般用作异步操作，不是直接修改state，而是调用Mutations)

	Action 类似于 mutation，不同在于：
	Action 提交的是 mutation，而不是直接变更状态。
	Action 可以包含任意异步操作。
	
	让我们来注册一个简单的 action：
	const store = new Vuex.Store({
	  state: {
	    count: 0
	  },
	  mutations: {
	    increment (state) {
	      state.count++
	    }
	  },
	  actions: {
	    increment (context) {
	      context.commit('increment')
	    }
	  }
	})
	
#### 分发 Action

	Action 通过 store.dispatch 方法触发：
	store.dispatch('increment')
	
乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：

	actions: {
	  incrementAsync ({ commit }) {
	    setTimeout(() => {
	      commit('increment')
	    }, 1000)
	  }
	}
	
Actions 支持同样的载荷方式和对象方式进行分发：

	// 以载荷形式分发
	store.dispatch('incrementAsync', {
	  amount: 10
	})
	
	// 以对象形式分发
	store.dispatch({
	  type: 'incrementAsync',
	  amount: 10
	})
	
	
#### Modules

使用单一状态树，导致应用的所有状态集中到一个很大的对象。但是，当应用变得很大时，store 对象会变得臃肿不堪。

为了解决以上问题，Vuex 允许我们将 store 分割到模块（module）。每个模块拥有自己的 state、mutation、action、getters、甚至是嵌套子模块——从上至下进行类似的分割：

	const moduleA = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... },
	  getters: { ... }
	}
	
	const moduleB = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... }
	}
	
	const store = new Vuex.Store({
	  modules: {
	    a: moduleA,
	    b: moduleB
	  }
	})

	store.state.a // -> moduleA 的状态
	store.state.b // -> moduleB 的状态
	
模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态。

	const moduleA = {
	  state: { count: 0 },
	  mutations: {
	    increment (state) {
	      // state 模块的局部状态
	      state.count++
	    }
	  },
	
	  getters: {
	    doubleCount (state) {
	      return state.count * 2
	    }
	  }
	}
	

命名空间

模块内部的 action、mutation、和 getter 现在仍然注册在全局命名空间——这样保证了多个模块能够响应同一 mutation 或 action。你可以通过添加前缀或后缀的方式隔离各模块，以避免名称冲突。你也可能希望写出一个可复用的模块，其使用环境不可控。例如，我们想创建一个 todos 模块：

	// types.js
	
	// 定义 getter、action、和 mutation 的名称为常量，以模块名 `todos` 为前缀
	export const DONE_COUNT = 'todos/DONE_COUNT'
	export const FETCH_ALL = 'todos/FETCH_ALL'
	export const TOGGLE_DONE = 'todos/TOGGLE_DONE'
	// modules/todos.js
	import * as types from '../types'
	
	// 使用添加了前缀的名称定义 getter、action 和 mutation
	const todosModule = {
	  state: { todos: [] },
	
	  getters: {
	    [types.DONE_COUNT] (state) {
	      // ...
	    }
	  },
	
	  actions: {
	    [types.FETCH_ALL] (context, payload) {
	      // ...
	    }
	  },
	
	  mutations: {
	    [types.TOGGLE_DONE] (state, payload) {
	      // ...
	    }
	  }
	}
	
Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。Getters 接受 state 作为其第一个参数：

	const store = new Vuex.Store({
	  state: {
	    todos: [
	      { id: 1, text: '...', done: true },
	      { id: 2, text: '...', done: false }
	    ]
	  },
	  getters: {
	    doneTodos: state => {
	      return state.todos.filter(todo => todo.done)
	    }
	  }
	})


### vue-dialog

	npm install hsy-vue-dialog -S
	
在入口 entry/index.js ->
	
	import Dialog from 'hsy-vue-dialog'
	Vue.use(Dialog)
	

### vue-router
	
	npm install vue-router --save
	
如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

	import Vue from 'vue'
	import VueRouter from 'vue-router'
	Vue.use(VueRouter)
	
