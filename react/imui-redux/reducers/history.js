import {ActionType} from '../actions';

export const historyInitialState = {
  visible: false,
  initialServerHistory:[],//聊天窗口打开时第一次获取的历史消息
  serverHistory:[],//server保存的聊天记录
  loading: false,
  lastmsgid: -1,
  nomore: false,
  loadingInitialHistory: false,
};

export function historyReducer(state = historyInitialState, action){
  switch (action.type){
    case ActionType.GET_INITIAL_SERVER_HISTORY_START:
      return Object.assign({}, state, {loadingInitialHistory: true});
    case ActionType.GET_INITIAL_SERVER_HISTORY_FAIL:
      return Object.assign({}, state, {loadingInitialHistory: false});
    case ActionType.GET_INITIAL_SERVER_HISTORY:
      return Object.assign({}, state, {initialServerHistory: action.payload, loadingInitialHistory: false});
    case ActionType.CLEAR_INITIAL_SERVER_HISTORY:
      return Object.assign({}, state, {initialServerHistory: []});
    case ActionType.SHOW_HISTORY:
    case ActionType.HIDE_HISTORY:
      return Object.assign({}, state, action.payload);
    case ActionType.GET_SERVER_HISTORY_STARTED:
    case ActionType.GET_SERVER_HISTORY_FAILED:
      return Object.assign({}, state, action.payload);
    case ActionType.GET_SERVER_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        loading:action.payload.loading, 
        lastmsgid:action.payload.lastmsgid,
        serverHistory: action.payload.newpage.concat(state.serverHistory),
        nomore:action.payload.nomore
      });
    case ActionType.UPDATE_INITIAL_SERVER_HISTORY:
      if(action.payload){
        return Object.assign({}, state, {initialServerHistory: action.payload});
      }
      else{
        return state;
      }
    default:
      return state;
  }
}