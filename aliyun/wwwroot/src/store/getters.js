import * as types from './types'

const getters = { };

getters[types.NOTADD] = function (state){
  return state.notes+10;
}

export default getters;