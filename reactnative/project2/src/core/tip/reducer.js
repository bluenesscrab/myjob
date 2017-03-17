import {OPEN_TIP, CLOSE_TIP} from './action-types';
import {Dimensions,} from 'react-native';

export const initialState = {
  time:0,
  text:"",
  timer:null
};

function formatPosition(position) {
  const {    
    height
  } = Dimensions.get("window");  
  let pos;
  switch(position){
    case 'top':
      pos = {top: height*0.1};
      break;
    case 'center':
      pos = {top: (height-60)/2};
      break;
    case 'bottom':
      pos = {bottom: height*0.1};
      break;
    default:
      if(typeof position==='number') {
        pos = {top: position<0 ? 0 : position};
      }
      else if(typeof position==='object'){
        pos = position
      }
      else {
        pos = {top: height*0.1};
      }
  }
  return pos;
}

function initTip({text='加载中',time,timer=null,position}){
  return {
    time,
    text,
    timer,
    position:formatPosition(position)
  }
}

export function tipReducer(state = initialState, action){
  let newTipStack;
  switch (action.type){
    case OPEN_TIP:
      return Object.assign({}, state, initTip(action.payload));

    case CLOSE_TIP: 
      return Object.assign({}, state, {text:"",timer:null});

    default:
      return state;
  }
}


