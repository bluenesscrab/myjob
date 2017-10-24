import {ActionType} from '../actions';

export const settingInitialState = {
  show: false,
  setting: {
    message: true, //true:接收消息并且提醒 false:接收消息但不提醒
    dialog: true, //true:按Enter发送消息 false:按Ctrl+Enter发送消息
    greeting: true, //自动打招呼设置 true:开启 false:关闭
    application: true //沟通时自动应聘设置 true:开启 false:关闭
  }
};

export function settingReducer(state = settingInitialState, action){
  switch (action.type){
    case ActionType.OPEN_SETTING:
      return Object.assign({}, state, {show: action.payload});
    case ActionType.SELECT_SETTING:
      return Object.assign({}, state, {setting: action.payload});

    default:
      return state;
  }
}