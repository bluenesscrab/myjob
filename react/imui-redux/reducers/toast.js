import {ActionType} from '../actions';

export const initialState = {
  time:0,
  text:"",
  show:false,
  timer:null,
  top:150
};

function format(top){
  let formatted = parseInt(top);
  if(isNaN(formatted)){
    formatted = 150;
  }
  return formatted;
}

function initToast({text='加载中',time,top,timer=null}){
  return {
    text,
    time,
    timer,
    show:true,
    top:format(top)
  }
}

export function toastReducer(state = initialState, action){
  switch (action.type){
    case ActionType.OPEN_TOAST:
      return Object.assign({}, state, initToast(action.payload));

    case ActionType.CLOSE_TOAST: 
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}


