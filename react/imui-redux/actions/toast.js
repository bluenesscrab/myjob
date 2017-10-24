import * as ActionType from './ActionType';
import {enums} from '../constants'

export function openToast({text, time=enums.DEFAULT_TOAST_TIME,top}) {
  return (dispatch, getState) => {
    let timer=getState().toast.timer;
    if(timer) clearTimeout(timer);
    if(time!==0){
      timer = setTimeout(() => dispatch(closeToast()), time);
    }
    dispatch({
      type: ActionType.OPEN_TOAST,
      payload: {text, time, timer, top, mask:false, show:true}
    });   
  }
}

export function closeToast() {
  return {
    type: ActionType.CLOSE_TOAST,
    payload: {text:"",timer:null,show:false}
  };
}
