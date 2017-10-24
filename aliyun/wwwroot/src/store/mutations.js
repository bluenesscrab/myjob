// export const mutations = { //ajax 通常放在这里处理;

import * as types from './types'

const mutations = {};

mutations[types.ADD] = function(state, payload) { //变更状态;
	state.notes++;
}

mutations[types.REMOVE] = function(state, payload) { //变更状态;
  state.notes--;
}

export default mutations;