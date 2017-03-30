import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: 0,
  activeNote: {}
};

const mutations = { 
  ADD (state) { // 变更状态
    state.notes++;
    console.log(state.notes)
  },
  REMOVE (state) { // 变更状态
    state.notes--;
    console.log(state.notes)
  }
};

const actions = { // ajax 通常放在这里处理
  ACTION_ADD (context) {
    console.log(` action，执行3m后 ‘ADD’ `);
    setTimeout(function(){
      console.log(`执行ADD`);
      context.commit('ADD');
    },3000);
  }
};

const getters = {
  notesAdd:state => {
    return state.notes+10;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})