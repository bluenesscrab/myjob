import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  version:'1.0.0',
  name:'vuex-demo'
}
const mutations = {
  fn:function(){

  }
}
export default new Vuex.Store({
  state,
  mutations
})