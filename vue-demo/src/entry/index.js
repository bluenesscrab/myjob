import Vue from 'vue/dist/vue.js'
//import axios from 'axios'
//
import Vuex from 'vuex'

import App from './app.vue'
import store from '../store/store'

// store.commit('ADD','n');
// store.commit('REMOVE',{a:1});
// store.dispatch('ACTION_ADD');
console.log(`index.js  入口文件！`);
// 创建根实例

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  // template: '<App/>',
  // components: { App },
});