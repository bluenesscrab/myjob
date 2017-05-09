import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'


Vue.use(Vuex)

const state = {
  notes: 0,
  activeNote: {}
};

const watch = {
  notes(val){
    console.log(`store.js watch: ${val}`);
  }
};

// const mutations = { 
//   ADD (state, payload) { //变更状态;
//     state.notes++;
//     console.log(state.notes);
//   },
//   REMOVE (state, payload) { //变更状态;
//     state.notes--;
//     console.log(state.notes);
//   }
// };

// const actions = { //ajax 通常放在这里处理;
//   ACTION_ADD (context, {}) {
//     console.log(` action，执行3m后 ‘ADD’ `);
//     setTimeout(function(){
//       context.commit('ADD', {});
//     },3000);
//   },
//   ACTION_REMOVE (context, {}) {
//     console.log(` action，执行3m后 ‘REMOVE’ `);
//     setTimeout(function(){
//       context.commit('REMOVE', {});
//     },3000);
//   }
// };

// const getters = {
//   notesAdd:state => {
//     return state.notes+10;
//   }
// }

export default new Vuex.Store({
  state,
  mutations,
  actions,
  watch,
  getters
})