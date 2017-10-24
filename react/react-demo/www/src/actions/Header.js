import * as Type from './ActionType.js';

export function add(text){
  return (dispatch, getState) => {
    dispatch({
      type: Type.LIST_ADD,
      payload: text
    });
  }
}

export function remvoe(){
  return (dispatch, getState) => {
    dispatch({
      type: Type.LIST_REMOVE
    });
  }
}