import * as ActionType from './ActionType';

const threshold={
  top: 120,
  right: 380
}
/*移动窗口*/
export function dragDistance({distanceX = 0, distanceY = 0}) {
  return (dispatch, getState)=>{
    let wh = $(window).height();
    let ww = $(window).width();
    let top = Math.max(0, getState().drag.top + distanceY);
    let right = Math.max(0, getState().drag.right - distanceX);
    if(right > ww - threshold.right){
      right = ww - threshold.right;
    }
    if(top > wh-threshold.top){
      top = wh - threshold.top;
    }
    dispatch({
      type: ActionType.DRAG_DISTANCE,
      payload: {top, right}
    });
  }
}

export function dragWindowResize() {
  return (dispatch, getState)=>{
    let wh = $(window).height();
    let ww = $(window).width();
    let top = getState().drag.top;
    let right = getState().drag.right
    if(right > ww - threshold.right){
      right = ww - threshold.right;
    }
    if(top > wh-threshold.top){
      top = wh - threshold.top;
    }
    dispatch({
      type: ActionType.DRAG_DISTANCE,
      payload: {top, right}
    });
  }
}