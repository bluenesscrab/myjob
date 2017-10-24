import * as ActionType from './ActionType';

/*打开im弹窗*/
export function openDialog(parent='panel', content) {
  let payload = {};
  if(parent==='panel'){
    payload = {
      panelVisible: true,
      panelContent: content
    }
  }
  else if(parent==='chat'){
    payload = {
      chatVisible: true,
      chatContent: content
    }
  }
  return {
    type: ActionType.OPEN_DIALOG,
    payload: payload
  };
}
/*关闭im弹窗*/
export function closeDialog(parent='panel') {
  let payload = {};
  if(parent==='panel'){
    payload = {
      panelVisible: false,
      panelContent: null
    }
  }
  else if(parent==='chat'){
    payload = {
      chatVisible: false,
      chatContent: null
    }
  }
  return {
    type: ActionType.CLOSE_DIALOG,
    payload: payload
  };
}