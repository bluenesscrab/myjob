// export const actions = { //ajax 通常放在这里处理;

import * as types from './types'

export default { //ajax 通常放在这里处理;
  ACTION_ADD ({commit}, {}) {
    setTimeout(function(){
      commit(types.ADD, {});
    },3000);
  },
  ACTION_REMOVE ({commit}, {}) {
    setTimeout(function(){
      commit(types.REMOVE, {});
    },3000);
  }
}