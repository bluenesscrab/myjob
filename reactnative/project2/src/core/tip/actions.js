import {OPEN_TIP, CLOSE_TIP} from './action-types';
import {DEFAULT_TOAST_TIME} from '../../config';

export function openTip(text, time=DEFAULT_TOAST_TIME,position) {
  return (dispatch, getState) => {
    let timer=getState().tip.timer;
    if(timer) clearTimeout(timer);
    if(time!==0){
      timer = setTimeout(() => dispatch({
        type: CLOSE_TIP,
        payload: {}
      }), time);

    }
    dispatch({
      type: OPEN_TIP,
      payload: {text, time, timer, position}
    });   
  }
}

export function closeTip({}) {
  return {
    type: CLOSE_TIP,
    payload: {}
  };
}
