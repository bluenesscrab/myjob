import Vue from 'vue/dist/vue.js'
import axios from 'axios'


import App from './app.vue'

// import PublicUI from '../components/index'
// Vue.use(PublicUI);

// axios.post('https://sns.liepin.com/attention/loadattention-b.json',
//   {
//     userh_ids:1616589
//   }
// ).then(function ({data}) {
//   console.log(data);
//   if(data.flag === 1){
//     console.log(data.data);
//   }else{
//     console.log(data.msg);
//   }
// }).catch(function (error) {
//   console.log(error);
// });

console.log(`index.js  入口文件！`);
// 创建根实例
new Vue({
  el: '#app',
  render: h => h(App)
});