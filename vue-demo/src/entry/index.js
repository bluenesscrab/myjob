import Vue from 'vue/dist/vue.js'

import App from './app.vue'

import PublicUI from '../components/index'
Vue.use(PublicUI);

console.log(`index.js  入口文件！`);
// 创建根实例
new Vue({
  el: '#app',
  render: h => h(App)
});