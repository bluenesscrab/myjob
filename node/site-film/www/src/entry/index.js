import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
//import axios from 'axios'

import Dialog from 'hsy-vue-dialog'
Vue.use(Dialog);

// router 路由配置
import router from './router'

// store 数据仓库
import store from '../store/store'

import App from './app.vue'

// import LPDialog from 'lp-dialog'
// LPDialog.install();
// // test npm包 console.log('this is a test dialog demo');

// store.commit('ADD','n');
// store.commit('REMOVE',{a:1});
// store.dispatch('ACTION_ADD');
console.log(`index.js  入口文件！`);
// 创建根实例

// start views
// import Content from '../app/views/content.vue'
// import Header from '../app/views/header.vue'
// import Footer from '../app/views/footer.vue'
// end views



// 通过 subscribe 来监听 mutation
store.subscribe((mutation, state) => {
  console.log(mutation)
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  // template: '<App/>',
  // components: { App },
});