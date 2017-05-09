// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App'
import router from './router/index'


// 引入并使用vue-resource网络请求模块
import VueResource from 'vue-resource'


import store from './store/store'

// 通过 subscribe 来监听 mutation
store.subscribe((mutation, state) => {
  console.log(mutation)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
